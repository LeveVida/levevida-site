/**
 * Sistema de Vendas e Downloads - E-book Leve Vida
 * 
 * Controla:
 * - Downloads gratuitos (amostra + planilha)
 * - Vendas do e-book completo
 * - Entrega automática pós-pagamento
 * - Rastreamento de conversões
 * 
 * @version 3.0
 */

// ============================================
// RENDERIZAR PÁGINA DO E-BOOK
// ============================================

function renderizarPaginaEbook() {
    // Hero Section
    renderizarHeroEbook();
    
    // Benefícios
    renderizarBeneficios();
    
    // Depoimentos
    renderizarDepoimentos();
    
    // Garantia
    renderizarGarantia();
    
    // Downloads Gratuitos
    renderizarDownloadsGratuitos();
    
    // FAQ
    renderizarFAQ();
    
    // CTA Final
    renderizarCTAFinal();
}

/**
 * Renderizar Hero do E-book
 */
function renderizarHeroEbook() {
    const container = document.getElementById('ebook-hero');
    if (!container) return;
    
    const html = `
        <div class="ebook-hero">
            <div class="ebook-hero-content">
                <div class="ebook-imagem">
                    <img src="${EBOOK_CONFIG.imagens.capa}" 
                         alt="${EBOOK_CONFIG.titulo}"
                         class="capa-ebook">
                    <div class="preco-tag">
                        <span class="preco-de">De ${EBOOK_CONFIG.precos.moeda} ${EBOOK_CONFIG.precos.de.toFixed(2)}</span>
                        <span class="preco-por">Por ${EBOOK_CONFIG.precos.moeda} ${EBOOK_CONFIG.precos.por.toFixed(2)}</span>
                        <span class="desconto-badge">${EBOOK_CONFIG.precos.desconto}% OFF</span>
                    </div>
                </div>
                
                <div class="ebook-info">
                    <h1>${EBOOK_CONFIG.titulo}</h1>
                    <p class="subtitulo">${EBOOK_CONFIG.subtitulo}</p>
                    <p class="autor">Por ${EBOOK_CONFIG.autor}</p>
                    
                    <p class="descricao">${EBOOK_CONFIG.descricao}</p>
                    
                    <div class="cta-buttons">
                        <a href="${EBOOK_CONFIG.linkPagamento}" 
                           class="btn btn-primary btn-large"
                           onclick="rastrearClique('comprar_agora')">
                            <i class="fas fa-shopping-cart"></i> Comprar Agora
                        </a>
                        <a href="#amostra-gratis" 
                           class="btn btn-secondary btn-large">
                            <i class="fas fa-download"></i> Baixar Amostra Grátis
                        </a>
                    </div>
                    
                    <div class="garantia-rapida">
                        <i class="fas fa-shield-alt"></i>
                        <span>Garantia de ${EBOOK_CONFIG.garantia.dias} dias</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Renderizar Benefícios
 */
function renderizarBeneficios() {
    const container = document.getElementById('ebook-beneficios');
    if (!container) return;
    
    const html = `
        <h2 class="section-title">O que você vai aprender</h2>
        <div class="beneficios-grid">
            ${EBOOK_CONFIG.beneficios.map(item => `
                <div class="beneficio-item">
                    <span class="beneficio-icon">${item.icone}</span>
                    <p>${item.texto}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Renderizar Depoimentos
 */
function renderizarDepoimentos() {
    const container = document.getElementById('ebook-depoimentos');
    if (!container) return;
    
    const html = `
        <h2 class="section-title">O que os alunos dizem</h2>
        <div class="depoimentos-grid">
            ${EBOOK_CONFIG.depoimentos.map(dep => `
                <div class="depoimento-card">
                    <div class="depoimento-header">
                        <img src="${dep.foto}" alt="${dep.nome}" class="avatar">
                        <div>
                            <strong>${dep.nome}</strong>
                            <p style="font-size: 0.9rem; color: #666;">${dep.cidade}</p>
                        </div>
                    </div>
                    <div class="estrelas">
                        ${'★'.repeat(dep.estrelas)}
                    </div>
                    <p class="depoimento-texto">"${dep.texto}"</p>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Renderizar Garantia
 */
function renderizarGarantia() {
    const container = document.getElementById('ebook-garantia');
    if (!container) return;
    
    const html = `
        <div class="garantia-box">
            <i class="fas fa-shield-alt"></i>
            <h3>Garantia de ${EBOOK_CONFIG.garantia.dias} Dias</h3>
            <p>${EBOOK_CONFIG.garantia.texto}</p>
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Renderizar Downloads Gratuitos
 */
function renderizarDownloadsGratuitos() {
    const container = document.getElementById('downloads-gratuitos');
    if (!container) return;
    
    const downloadsEbook = DOWNLOADS_GRATUITOS.filter(d => 
        d.categoria === 'e-book' || d.categoria === 'ferramenta'
    );
    
    const html = `
        <h2 class="section-title" id="amostra-gratis">Downloads Gratuitos</h2>
        <p style="text-align: center; max-width: 700px; margin: 0 auto 3rem;">
            Comece agora mesmo! Baixe a amostra grátis do e-book e a planilha de controle de milhas.
        </p>
        
        <div class="downloads-grid">
            ${downloadsEbook.map(item => `
                <div class="download-card">
                    ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}">` : ''}
                    <div class="download-content">
                        <i class="fas ${item.icone}" style="font-size: 3rem; color: var(--color-primary);"></i>
                        <h3>${item.titulo}</h3>
                        <p>${item.descricao}</p>
                        <p class="download-meta">${item.tipo} • ${item.tamanho}</p>
                        <button onclick="baixarArquivo('${item.id}', '${item.arquivo}')" 
                                class="btn btn-primary">
                            <i class="fas fa-download"></i> Baixar Grátis
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Renderizar FAQ
 */
function renderizarFAQ() {
    const container = document.getElementById('ebook-faq');
    if (!container) return;
    
    const faqs = [
        {
            pergunta: "Como recebo o e-book após a compra?",
            resposta: "Após a confirmação do pagamento, você receberá um e-mail com o link para download. O processo é 100% automático e leva apenas alguns minutos."
        },
        {
            pergunta: "O e-book é em PDF?",
            resposta: "Sim! O e-book está em formato PDF, podendo ser lido em qualquer dispositivo (computador, celular, tablet, Kindle)."
        },
        {
            pergunta: "Posso imprimir o e-book?",
            resposta: "Sim, você pode imprimir o e-book quantas vezes quiser para seu uso pessoal."
        },
        {
            pergunta: "Tem garantia?",
            resposta: `Sim! Temos garantia de ${EBOOK_CONFIG.garantia.dias} dias. Se não gostar do conteúdo, devolvemos 100% do seu dinheiro.`
        },
        {
            pergunta: "As planilhas são compatíveis com Excel?",
            resposta: "Sim! As planilhas estão em formato XLSX e funcionam no Excel, Google Sheets e LibreOffice."
        },
        {
            pergunta: "Recebo atualizações gratuitas?",
            resposta: "Sim! Todas as atualizações do e-book são gratuitas para sempre."
        }
    ];
    
    const html = `
        <h2 class="section-title">Perguntas Frequentes</h2>
        <div class="faq-container">
            ${faqs.map((faq, index) => `
                <div class="faq-item">
                    <button class="faq-pergunta" onclick="toggleFAQ(${index})">
                        <span>${faq.pergunta}</span>
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="faq-resposta" id="faq-${index}">
                        <p>${faq.resposta}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = html;
}

/**
 * Renderizar CTA Final
 */
function renderizarCTAFinal() {
    const container = document.getElementById('ebook-cta-final');
    if (!container) return;
    
    const html = `
        <div class="cta-final">
            <h2>Pronto para Transformar Suas Viagens?</h2>
            <p>Mais de 1.500 pessoas já compraram o e-book e estão viajando mais gastando menos!</p>
            <div class="preco-destaque">
                <span class="preco-grande">${EBOOK_CONFIG.precos.moeda} ${EBOOK_CONFIG.precos.por.toFixed(2)}</span>
                <span class="preco-parcelado">ou 12x de ${EBOOK_CONFIG.precos.moeda} ${(EBOOK_CONFIG.precos.por / 12).toFixed(2)}</span>
            </div>
            <a href="${EBOOK_CONFIG.linkPagamento}" 
               class="btn btn-primary btn-large"
               onclick="rastrearClique('comprar_final')">
                <i class="fas fa-shopping-cart"></i> Comprar Agora
            </a>
            <p class="garantia-texto">
                <i class="fas fa-shield-alt"></i>
                Garantia de ${EBOOK_CONFIG.garantia.dias} dias - Risco zero para você
            </p>
        </div>
    `;
    
    container.innerHTML = html;
}

// ============================================
// SISTEMA DE DOWNLOAD
// ============================================

/**
 * Processar download de arquivo gratuito
 */
function baixarArquivo(id, arquivo) {
    // Rastrear download
    rastrearEvento('download', id);
    
    // Criar link temporário
    const link = document.createElement('a');
    link.href = arquivo;
    link.download = arquivo.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Mostrar mensagem de sucesso
    mostrarNotificacao('Download iniciado! 🎉', 'success');
    
    // Se for amostra, mostrar CTA para e-book completo
    if (id === 'amostra-ebook') {
        setTimeout(() => {
            mostrarCTAEbook();
        }, 3000);
    }
}

/**
 * Mostrar CTA para e-book após download da amostra
 */
function mostrarCTAEbook() {
    const modal = `
        <div class="modal-overlay" onclick="fecharModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="fecharModal()">×</button>
                <h2>Gostou da amostra?</h2>
                <p>O e-book completo tem muito mais conteúdo!</p>
                <ul style="text-align: left; margin: 2rem 0;">
                    <li>✅ 150+ páginas de conteúdo</li>
                    <li>✅ Estratégias avançadas</li>
                    <li>✅ Planilhas e calculadoras</li>
                    <li>✅ Atualizações gratuitas</li>
                </ul>
                <a href="${EBOOK_CONFIG.linkPagamento}" 
                   class="btn btn-primary btn-large"
                   onclick="rastrearClique('comprar_modal')">
                    Quero o E-book Completo
                </a>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

/**
 * Fechar modal
 */
function fecharModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.remove();
}

// ============================================
// SISTEMA DE RASTREAMENTO
// ============================================

/**
 * Rastrear cliques em CTAs
 */
function rastrearClique(acao) {
    rastrearEvento('clique_cta', acao);
    
    // Google Analytics (se configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            'event_category': 'CTA',
            'event_label': acao,
            'value': EBOOK_CONFIG.precos.por
        });
    }
}

/**
 * Rastrear eventos genéricos
 */
function rastrearEvento(categoria, acao) {
    console.log(`📊 Evento: ${categoria} - ${acao}`);
    
    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', acao, {
            'event_category': categoria
        });
    }
    
    // Facebook Pixel (se configurado)
    if (typeof fbq !== 'undefined') {
        fbq('track', categoria, { action: acao });
    }
}

// ============================================
// TOGGLE FAQ
// ============================================

function toggleFAQ(index) {
    const resposta = document.getElementById(`faq-${index}`);
    const pergunta = resposta.previousElementSibling;
    const icon = pergunta.querySelector('i');
    
    // Toggle
    if (resposta.style.maxHeight) {
        resposta.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Fechar outros
        document.querySelectorAll('.faq-resposta').forEach(r => {
            r.style.maxHeight = null;
        });
        document.querySelectorAll('.faq-pergunta i').forEach(i => {
            i.style.transform = 'rotate(0deg)';
        });
        
        // Abrir este
        resposta.style.maxHeight = resposta.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}

// ============================================
// NOTIFICAÇÕES
// ============================================

function mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    
    document.body.appendChild(notificacao);
    
    setTimeout(() => notificacao.classList.add('show'), 100);
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Se estiver na página do e-book
    if (window.location.pathname.includes('e-book.html')) {
        renderizarPaginaEbook();
    }
    
    // Se estiver na página de downloads
    if (window.location.pathname.includes('downloads.html')) {
        renderizarPaginaDownloads();
    }
});

// ============================================
// RENDERIZAR PÁGINA DE DOWNLOADS
// ============================================

function renderizarPaginaDownloads() {
    const container = document.getElementById('downloads-lista');
    if (!container) return;
    
    const categorias = {
        'e-book': 'E-book',
        'ferramenta': 'Ferramentas',
        'guia': 'Guias'
    };
    
    Object.entries(categorias).forEach(([catId, catNome]) => {
        const itens = DOWNLOADS_GRATUITOS.filter(d => d.categoria === catId);
        
        if (itens.length > 0) {
            const html = `
                <section class="download-categoria">
                    <h2 class="section-title">${catNome}</h2>
                    <div class="downloads-grid">
                        ${itens.map(item => `
                            <div class="download-card">
                                ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}">` : ''}
                                <div class="download-content">
                                    <i class="fas ${item.icone}"></i>
                                    <h3>${item.titulo}</h3>
                                    <p>${item.descricao}</p>
                                    <p class="download-meta">${item.tipo} • ${item.tamanho}</p>
                                    <button onclick="baixarArquivo('${item.id}', '${item.arquivo}')" 
                                            class="btn btn-primary">
                                        <i class="fas fa-download"></i> Baixar Grátis
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </section>
            `;
            
            container.insertAdjacentHTML('beforeend', html);
        }
    });
}
