/**
 * Sistema de SEO Dinâmico - Leve Vida
 * 
 * Aplica automaticamente:
 * - Meta tags otimizadas
 * - Open Graph (Facebook, LinkedIn)
 * - Twitter Cards
 * - Schema.org (Rich Snippets)
 * - Breadcrumbs
 * - Canonical URLs
 * - Links internos (clusters)
 * 
 * @version 3.0
 */

// ============================================
// APLICAR SEO NA PÁGINA
// ============================================

function aplicarSEO() {
    const paginaAtual = obterPaginaAtual();
    const seoData = SEO_CONFIG[paginaAtual] || SEO_CONFIG["index.html"];
    
    // Meta tags básicas
    aplicarMetaTags(seoData);
    
    // Open Graph
    aplicarOpenGraph(seoData);
    
    // Twitter Cards
    aplicarTwitterCards(seoData);
    
    // Canonical URL
    aplicarCanonical(paginaAtual);
    
    // Schema.org
    aplicarSchema(paginaAtual);
    
    // Breadcrumbs
    aplicarBreadcrumbs(paginaAtual);
    
    // Links de clusters (SEO interno)
    aplicarClusters(paginaAtual);
}

/**
 * Obter página atual
 */
function obterPaginaAtual() {
    const path = window.location.pathname;
    const pagina = path.split('/').pop() || 'index.html';
    return pagina === '' ? 'index.html' : pagina;
}

/**
 * Aplicar meta tags básicas
 */
function aplicarMetaTags(seoData) {
    // Title
    document.title = seoData.titulo;
    
    // Description
    setMetaTag('description', seoData.descricao);
    
    // Keywords
    setMetaTag('keywords', seoData.palavrasChave);
    
    // Author
    setMetaTag('author', SITE_CONFIG.legal.responsavel);
    
    // Robots
    setMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    
    // Language
    document.documentElement.lang = 'pt-BR';
}

/**
 * Aplicar Open Graph (Facebook, LinkedIn)
 */
function aplicarOpenGraph(seoData) {
    setMetaProperty('og:type', seoData.tipo || 'website');
    setMetaProperty('og:title', seoData.titulo);
    setMetaProperty('og:description', seoData.descricao);
    setMetaProperty('og:url', SITE_CONFIG.url + '/' + obterPaginaAtual());
    setMetaProperty('og:site_name', SITE_CONFIG.nome);
    setMetaProperty('og:locale', 'pt_BR');
    setMetaProperty('og:image', SITE_CONFIG.url + '/' + (seoData.imagemOG || SITE_CONFIG.logo.ogImage));
    setMetaProperty('og:image:width', '1200');
    setMetaProperty('og:image:height', '630');
    setMetaProperty('og:image:alt', seoData.titulo);
}

/**
 * Aplicar Twitter Cards
 */
function aplicarTwitterCards(seoData) {
    setMetaName('twitter:card', 'summary_large_image');
    setMetaName('twitter:title', seoData.titulo);
    setMetaName('twitter:description', seoData.descricao);
    setMetaName('twitter:image', SITE_CONFIG.url + '/' + (seoData.imagemOG || SITE_CONFIG.logo.ogImage));
    setMetaName('twitter:site', '@levevida'); // Adicione seu @
    setMetaName('twitter:creator', '@levevida');
}

/**
 * Aplicar Canonical URL
 */
function aplicarCanonical(pagina) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = SITE_CONFIG.url + '/' + pagina;
}

/**
 * Aplicar Schema.org JSON-LD
 */
function aplicarSchema(pagina) {
    // Remove schemas existentes
    document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    
    // Organization (todas as páginas)
    inserirSchema(SCHEMA_CONFIG.organization);
    
    // Website (todas as páginas)
    inserirSchema(SCHEMA_CONFIG.website);
    
    // Schema específico da página
    if (pagina === 'e-book.html') {
        inserirSchema(SCHEMA_CONFIG.ebook);
    }
    
    // Para guias individuais
    if (pagina.includes('guia.html')) {
        const guiaId = new URLSearchParams(window.location.search).get('id');
        if (guiaId) {
            aplicarSchemaGuia(guiaId);
        }
    }
}

/**
 * Aplicar schema de guia específico
 */
async function aplicarSchemaGuia(guiaId) {
    try {
        const response = await fetch(`guias/${guiaId}/config.json`);
        const guia = await response.json();
        
        const schemaGuia = {
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": guia.titulo,
            "description": guia.descricao,
            "url": `${SITE_CONFIG.url}/guia.html?id=${guiaId}`,
            "image": guia.imagem_capa,
            "provider": {
                "@type": "Organization",
                "name": SITE_CONFIG.nome
            }
        };
        
        inserirSchema(schemaGuia);
    } catch (error) {
        console.error('Erro ao carregar schema do guia:', error);
    }
}

/**
 * Inserir schema no head
 */
function inserirSchema(schemaObj) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaObj);
    document.head.appendChild(script);
}

/**
 * Helper: Set meta tag
 */
function setMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
    }
    meta.content = content;
}

/**
 * Helper: Set meta property
 */
function setMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
    }
    meta.content = content;
}

/**
 * Helper: Set meta name (Twitter)
 */
function setMetaName(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
    }
    meta.content = content;
}

// ============================================
// BREADCRUMBS (MIGALHAS DE PÃO)
// ============================================

function aplicarBreadcrumbs(pagina) {
    const container = document.getElementById('breadcrumbs');
    if (!container) return;
    
    let breadcrumbs = BREADCRUMBS_CONFIG[pagina] || BREADCRUMBS_CONFIG["index.html"];
    
    // Se for guia dinâmico, ajustar título
    if (pagina.includes('guia.html')) {
        const guiaId = new URLSearchParams(window.location.search).get('id');
        if (guiaId) {
            breadcrumbs = [...BREADCRUMBS_CONFIG["guia-detalhes"]];
            carregarTituloGuia(guiaId).then(titulo => {
                breadcrumbs[breadcrumbs.length - 1].texto = titulo;
                renderizarBreadcrumbs(container, breadcrumbs);
            });
            return;
        }
    }
    
    renderizarBreadcrumbs(container, breadcrumbs);
}

/**
 * Renderizar breadcrumbs HTML
 */
function renderizarBreadcrumbs(container, breadcrumbs) {
    const items = breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return `
            <li class="breadcrumb-item ${isLast ? 'active' : ''}">
                ${isLast 
                    ? `<span>${item.texto}</span>`
                    : `<a href="${item.url}">${item.texto}</a>`
                }
            </li>
        `;
    }).join('<i class="fas fa-chevron-right"></i>');
    
    container.innerHTML = `<ul class="breadcrumb">${items}</ul>`;
    
    // Schema.org BreadcrumbList
    const schemaBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.texto,
            "item": item.url === '#' ? undefined : SITE_CONFIG.url + '/' + item.url
        }))
    };
    
    inserirSchema(schemaBreadcrumb);
}

/**
 * Carregar título do guia
 */
async function carregarTituloGuia(guiaId) {
    try {
        const response = await fetch(`guias/${guiaId}/config.json`);
        const guia = await response.json();
        return guia.titulo;
    } catch (error) {
        return 'Guia de Viagem';
    }
}

// ============================================
// SISTEMA DE CLUSTERS (LINKS INTERNOS)
// ============================================

function aplicarClusters(pagina) {
    const container = document.getElementById('links-relacionados');
    if (!container) return;
    
    // Identificar cluster da página atual
    let clusterAtual = null;
    let linksRelacionados = [];
    
    // Se for página pilar
    if (pagina === 'guias.html') {
        clusterAtual = CLUSTERS_CONFIG.guias;
        linksRelacionados = clusterAtual.relacionados;
    } else if (pagina === 'milhas.html') {
        clusterAtual = CLUSTERS_CONFIG.milhas;
        linksRelacionados = clusterAtual.relacionados;
    } else if (pagina.includes('guia.html')) {
        // Páginas de guias linkam para página pilar
        linksRelacionados = [
            {
                titulo: "Ver Todos os Guias de Viagem",
                url: "guias.html",
                relevancia: "alta"
            },
            {
                titulo: "Como Usar Milhas para Viajar",
                url: "milhas.html",
                relevancia: "alta"
            },
            {
                titulo: "E-book ROTA DAS MILHAS",
                url: "e-book.html",
                relevancia: "média"
            }
        ];
    }
    
    if (linksRelacionados.length > 0) {
        renderizarLinksRelacionados(container, linksRelacionados);
    }
}

/**
 * Renderizar links relacionados
 */
function renderizarLinksRelacionados(container, links) {
    const html = `
        <div class="links-relacionados">
            <h3><i class="fas fa-link"></i> Conteúdos Relacionados</h3>
            <div class="links-grid">
                ${links.map(link => `
                    <a href="${link.url}" class="link-card ${link.relevancia}">
                        <i class="fas fa-arrow-right"></i>
                        <span>${link.titulo}</span>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// RENDERIZAR MENU DINÂMICO
// ============================================

function renderizarMenu() {
    const menuContainer = document.querySelector('.nav-menu');
    if (!menuContainer) return;
    
    const paginaAtual = obterPaginaAtual();
    
    const menuHtml = MENU_CONFIG.items.map(item => {
        const isAtivo = paginaAtual === item.url;
        const destaque = item.destaque ? ' destaque' : '';
        const pilar = item.isPilar ? ' pilar' : '';
        
        return `
            <li>
                <a href="${item.url}" 
                   class="nav-link${isAtivo ? ' active' : ''}${destaque}${pilar}"
                   title="${item.descricao}">
                    <i class="fas ${item.icone}"></i>
                    ${item.texto}
                </a>
            </li>
        `;
    }).join('');
    
    menuContainer.innerHTML = menuHtml;
}

// ============================================
// RENDERIZAR FOOTER DINÂMICO
// ============================================

function renderizarFooter() {
    const footerAbout = document.querySelector('.footer-section:first-child p');
    if (footerAbout) {
        footerAbout.textContent = SITE_CONFIG.descricao.substring(0, 150) + '...';
    }
    
    // Atualizar ano
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        footerBottom.innerHTML = `&copy; ${new Date().getFullYear()} ${SITE_CONFIG.nome} - Todos os direitos reservados`;
    }
    
    // Atualizar slogan
    const sloganElement = document.querySelector('.footer-bottom p:last-child');
    if (sloganElement) {
        sloganElement.textContent = SITE_CONFIG.slogan;
    }
    
    // Atualizar contato
    const footerContato = document.querySelector('.footer-section:last-child');
    if (footerContato) {
        footerContato.innerHTML = `
            <h3>Contato</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${SITE_CONFIG.contato.endereco}</p>
            <p><i class="fas fa-phone"></i> ${SITE_CONFIG.contato.telefoneDisplay}</p>
            <p><i class="fas fa-envelope"></i> ${SITE_CONFIG.contato.email}</p>
        `;
    }
    
    // Atualizar redes sociais
    renderizarRedesSociais();
}

/**
 * Renderizar redes sociais
 */
function renderizarRedesSociais() {
    const socialContainer = document.querySelector('.social-media');
    if (!socialContainer) return;
    
    const redes = Object.entries(SITE_CONFIG.redesSociais);
    const socialHtml = redes.map(([nome, dados]) => {
        const icone = nome === 'kwai' ? 'fa-video' : `fa-${nome}`;
        return `
            <a href="${dados.url}" 
               class="social-link" 
               title="${nome}" 
               aria-label="${nome}"
               target="_blank"
               rel="noopener noreferrer">
                <i class="fab ${icone}"></i>
            </a>
        `;
    }).join('');
    
    socialContainer.innerHTML = socialHtml;
}

// ============================================
// PERFORMANCE & LAZY LOADING
// ============================================

/**
 * Lazy loading de imagens
 */
function aplicarLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Preconnect para recursos externos
 */
function aplicarPreconnect() {
    const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com',
        'https://images.unsplash.com'
    ];
    
    domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
}

// ============================================
// ANALYTICS & ADSENSE
// ============================================

/**
 * Carregar Google Analytics
 */
function carregarAnalytics() {
    if (!SITE_CONFIG.analytics.gaId || SITE_CONFIG.analytics.gaId === 'G-XXXXXXXXXX') {
        return; // Não carregar se não configurado
    }
    
    // Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.analytics.gaId}`;
    document.head.appendChild(script1);
    
    const script2 = document.createElement('script');
    script2.textContent = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${SITE_CONFIG.analytics.gaId}');
    `;
    document.head.appendChild(script2);
}

/**
 * Carregar Google AdSense
 */
function carregarAdSense() {
    if (!SITE_CONFIG.analytics.adsenseId || SITE_CONFIG.analytics.adsenseId === 'ca-pub-XXXXXXXXXXXXXXXX') {
        return; // Não carregar se não configurado
    }
    
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE_CONFIG.analytics.adsenseId}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Aplicar SEO
    aplicarSEO();
    
    // Renderizar elementos dinâmicos
    renderizarMenu();
    renderizarFooter();
    
    // Performance
    aplicarLazyLoading();
    aplicarPreconnect();
    
    // Analytics (apenas em produção)
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        carregarAnalytics();
        carregarAdSense();
    }
    
    // Log para debug
    console.log('✅ Sistema SEO carregado');
    console.log('📄 Página:', obterPaginaAtual());
    console.log('🎯 SEO aplicado:', SEO_CONFIG[obterPaginaAtual()]);
});
