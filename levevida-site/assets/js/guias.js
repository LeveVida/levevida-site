/**
 * Sistema de Guias Dinâmicos - Leve Vida
 * 
 * Este script carrega guias de viagem de arquivos JSON e renderiza
 * dinamicamente na página, sem necessidade de editar HTML
 * 
 * @version 2.0
 */

// ============================================
// CONFIGURAÇÃO
// ============================================

const GUIAS_CONFIG = {
    diretorio: 'guias/',
    lista: [
        'fortaleza'
        // Adicione novos guias aqui, ex: 'rio-de-janeiro', 'bahia'
    ]
};

// ============================================
// FUNÇÕES DE CARREGAMENTO
// ============================================

/**
 * Carrega a configuração de um guia
 */
async function carregarGuia(guiaId) {
    try {
        const response = await fetch(`${GUIAS_CONFIG.diretorio}${guiaId}/config.json`);
        if (!response.ok) throw new Error(`Erro ao carregar guia ${guiaId}`);
        return await response.json();
    } catch (error) {
        console.error(`Erro ao carregar guia ${guiaId}:`, error);
        return null;
    }
}

/**
 * Carrega todos os guias disponíveis
 */
async function carregarTodosGuias() {
    const promises = GUIAS_CONFIG.lista.map(id => carregarGuia(id));
    const guias = await Promise.all(promises);
    return guias.filter(g => g !== null);
}

// ============================================
// RENDERIZAÇÃO - LISTA DE GUIAS
// ============================================

/**
 * Renderiza card de guia na página guias.html
 */
function renderizarCardGuia(guia) {
    return `
        <article class="card">
            <div class="card-icon">
                <i class="fas ${guia.icone}"></i>
            </div>
            <h3 class="card-title">${guia.titulo}</h3>
            <p class="card-description">
                ${guia.descricao}
            </p>
            <ul class="benefits-list" style="font-size: 0.9rem; margin: 1rem 0;">
                <li>${guia.meta.duracao}</li>
                <li>Orçamento médio: ${guia.meta.orcamento}</li>
                ${guia.meta.clima ? `<li>${guia.meta.clima}</li>` : ''}
            </ul>
            <a href="guia.html?id=${guia.id}" class="card-link">
                Ver guia completo <i class="fas fa-arrow-right"></i>
            </a>
        </article>
    `;
}

/**
 * Renderiza a lista de guias em guias.html
 */
async function renderizarListaGuias() {
    const container = document.getElementById('guias-container');
    if (!container) return;
    
    const guias = await carregarTodosGuias();
    
    if (guias.length === 0) {
        container.innerHTML = '<p>Nenhum guia disponível no momento.</p>';
        return;
    }
    
    container.innerHTML = guias.map(guia => renderizarCardGuia(guia)).join('');
}

// ============================================
// RENDERIZAÇÃO - PÁGINA DO GUIA
// ============================================

/**
 * Renderiza seção de texto
 */
function renderizarSecaoTexto(secao) {
    return `
        <section class="guide-section">
            <div class="section-icon">${secao.icone ? `<i class="fas ${secao.icone}"></i>` : ''}</div>
            <h2 class="section-title">${secao.titulo}</h2>
            ${secao.imagem ? `<img src="${secao.imagem}" alt="${secao.titulo}" class="guide-image">` : ''}
            <p style="font-size: 1.1rem; line-height: 1.8;">${secao.conteudo}</p>
        </section>
    `;
}

/**
 * Renderiza seção de cards (praias, pontos turísticos, etc)
 */
function renderizarSecaoCards(secao) {
    const cardsHtml = secao.items.map(item => `
        <div class="beach-card">
            ${item.imagem ? `<img src="${item.imagem}" alt="${item.titulo}">` : ''}
            <div class="beach-card-content">
                <h3>${item.emoji || ''} ${item.titulo}</h3>
                <p style="line-height: 1.7;">${item.descricao}</p>
                ${item.destaque ? `
                    <div class="activity-grid">
                        ${item.destaque.map(d => `
                            <div class="activity-item">
                                <p>${d}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
    
    return `
        <section class="guide-section">
            <div class="section-icon"><i class="fas ${secao.icone}"></i></div>
            <h2 class="section-title">${secao.titulo}</h2>
            ${cardsHtml}
        </section>
    `;
}

/**
 * Renderiza tabela comparativa
 */
function renderizarSecaoTabela(secao) {
    const theadHtml = `
        <thead>
            <tr>
                ${secao.colunas.map(col => `<th>${col}</th>`).join('')}
            </tr>
        </thead>
    `;
    
    const tbodyHtml = `
        <tbody>
            ${secao.linhas.map(linha => `
                <tr>
                    ${linha.map((cel, idx) => `
                        <td>${idx === 0 ? `<strong>${cel}</strong>` : cel}</td>
                    `).join('')}
                </tr>
            `).join('')}
        </tbody>
    `;
    
    return `
        <section class="guide-section">
            <div class="section-icon"><i class="fas ${secao.icone}"></i></div>
            <h2 class="section-title">${secao.titulo}</h2>
            <div class="table-responsive">
                <table class="guide-table">
                    ${theadHtml}
                    ${tbodyHtml}
                </table>
            </div>
        </section>
    `;
}

/**
 * Renderiza lista de pontos turísticos
 */
function renderizarSecaoLista(secao) {
    const itemsHtml = secao.items.map(item => `
        <div class="card" style="margin-bottom: 2rem;">
            <h3 style="color: var(--color-secondary); margin-bottom: 1rem;">
                ${item.titulo}
            </h3>
            <p style="color: #999; margin-bottom: 0.5rem;"><strong>Tipo:</strong> ${item.tipo}</p>
            <p style="line-height: 1.7; margin-bottom: 1rem;">${item.descricao}</p>
            ${item.dica ? `
                <div class="info-box" style="margin: 0;">
                    <p style="margin: 0;"><i class="fas fa-info-circle"></i> <strong>Dica:</strong> ${item.dica}</p>
                </div>
            ` : ''}
        </div>
    `).join('');
    
    return `
        <section class="guide-section">
            <div class="section-icon"><i class="fas ${secao.icone}"></i></div>
            <h2 class="section-title">${secao.titulo}</h2>
            ${itemsHtml}
        </section>
    `;
}

/**
 * Renderiza seção de gastronomia
 */
function renderizarSecaoGastronomia(secao) {
    const itemsHtml = secao.items.map(item => `
        <div class="cuisine-item">
            ${item.imagem ? `<img src="${item.imagem}" alt="${item.nome}">` : ''}
            <div class="cuisine-content">
                <h4 style="color: var(--color-primary); margin-bottom: 0.5rem;">
                    ${item.emoji} ${item.nome}
                </h4>
                <p>${item.descricao}</p>
                <p style="color: #666; font-size: 0.9rem; margin-top: 0.5rem;">
                    <strong>Onde:</strong> ${item.onde}<br>
                    <strong>Preço médio:</strong> ${item.preco}
                </p>
            </div>
        </div>
    `).join('');
    
    return `
        <section class="guide-section">
            <div class="section-icon"><i class="fas ${secao.icone}"></i></div>
            <h2 class="section-title">${secao.titulo}</h2>
            <div class="cuisine-list">
                ${itemsHtml}
            </div>
        </section>
    `;
}

/**
 * Renderiza seção de orçamento
 */
function renderizarSecaoOrcamento(secao) {
    const opcoesHtml = secao.opcoes.map(opcao => `
        <div class="budget-card">
            <div class="budget-header">
                <h4 style="color: ${opcao.cor}; margin: 0;">${opcao.nivel}</h4>
                <span class="budget-price" style="color: ${opcao.cor};">${opcao.total}</span>
            </div>
            <div class="table-responsive">
                <table class="guide-table">
                    <tbody>
                        ${opcao.items.map(item => `
                            <tr>
                                <td><strong>${item.item}</strong></td>
                                <td>${item.valor}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `).join('');
    
    return `
        <section class="guide-section">
            <div class="section-icon"><i class="fas ${secao.icone}"></i></div>
            <h2 class="section-title">${secao.titulo}</h2>
            ${opcoesHtml}
        </section>
    `;
}

/**
 * Renderiza seção de dicas
 */
function renderizarSecaoDicas(secao) {
    const tipoClasses = {
        'info': 'info-box',
        'warning': 'warning-box',
        'tip': 'tip-box'
    };
    
    const itemsHtml = secao.items.map(item => `
        <div class="${tipoClasses[item.tipo] || 'info-box'}">
            <h4 style="margin-bottom: 0.5rem;">
                <i class="fas ${item.icone}"></i> ${item.titulo}
            </h4>
            <p style="margin: 0;">${item.conteudo}</p>
        </div>
    `).join('');
    
    return `
        <section class="guide-section">
            <div class="section-icon"><i class="fas ${secao.icone}"></i></div>
            <h2 class="section-title">${secao.titulo}</h2>
            ${itemsHtml}
        </section>
    `;
}

/**
 * Renderiza seção baseada no tipo
 */
function renderizarSecao(secao) {
    switch (secao.tipo) {
        case 'texto':
            return renderizarSecaoTexto(secao);
        case 'cards':
            return renderizarSecaoCards(secao);
        case 'tabela':
            return renderizarSecaoTabela(secao);
        case 'lista':
            return renderizarSecaoLista(secao);
        case 'gastronomia':
            return renderizarSecaoGastronomia(secao);
        case 'orcamento':
            return renderizarSecaoOrcamento(secao);
        case 'dicas':
            return renderizarSecaoDicas(secao);
        default:
            return `<p>Tipo de seção desconhecido: ${secao.tipo}</p>`;
    }
}

/**
 * Renderiza o header do guia
 */
function renderizarHeaderGuia(guia) {
    return `
        <section class="guide-header" style="background: linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%), url('${guia.imagem_capa}') center/cover;">
            <div class="guide-hero-content">
                <h1>${guia.titulo}</h1>
                <p class="subtitle">${guia.subtitulo}</p>
                
                <div class="guide-meta">
                    <div class="guide-meta-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${guia.meta.duracao}</span>
                    </div>
                    <div class="guide-meta-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>${guia.meta.orcamento}</span>
                    </div>
                    ${guia.meta.clima ? `
                        <div class="guide-meta-item">
                            <i class="fas fa-sun"></i>
                            <span>${guia.meta.clima}</span>
                        </div>
                    ` : ''}
                    ${guia.meta.voos ? `
                        <div class="guide-meta-item">
                            <i class="fas fa-plane"></i>
                            <span>${guia.meta.voos}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </section>
    `;
}

/**
 * Renderiza materiais para download
 */
function renderizarMateriaisDownload(guia) {
    if (!guia.download_materiais || guia.download_materiais.length === 0) return '';
    
    const materiaisHtml = guia.download_materiais.map(material => `
        <div class="card" style="text-align: center;">
            <i class="fas ${material.icone}" style="font-size: 3rem; color: var(--color-primary); margin-bottom: 1rem;"></i>
            <h4 style="color: var(--color-secondary); margin-bottom: 0.5rem;">${material.titulo}</h4>
            <p style="color: #666; margin-bottom: 1rem;">${material.descricao}</p>
            <a href="${GUIAS_CONFIG.diretorio}${guia.id}/${material.arquivo}" 
               class="btn btn-primary" 
               download>
                <i class="fas fa-download"></i> Baixar
            </a>
        </div>
    `).join('');
    
    return `
        <section class="guide-section">
            <div class="section-icon"><i class="fas fa-download"></i></div>
            <h2 class="section-title">Materiais para Download</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                ${materiaisHtml}
            </div>
        </section>
    `;
}

/**
 * Renderiza página completa do guia
 */
async function renderizarPaginaGuia() {
    const urlParams = new URLSearchParams(window.location.search);
    const guiaId = urlParams.get('id');
    
    if (!guiaId) {
        document.getElementById('guia-content').innerHTML = `
            <div class="container" style="margin-top: 120px; text-align: center;">
                <h1>Guia não encontrado</h1>
                <p>O guia solicitado não existe.</p>
                <a href="guias.html" class="btn btn-primary">Ver todos os guias</a>
            </div>
        `;
        return;
    }
    
    const guia = await carregarGuia(guiaId);
    
    if (!guia) {
        document.getElementById('guia-content').innerHTML = `
            <div class="container" style="margin-top: 120px; text-align: center;">
                <h1>Erro ao carregar guia</h1>
                <p>Não foi possível carregar o guia "${guiaId}".</p>
                <a href="guias.html" class="btn btn-primary">Ver todos os guias</a>
            </div>
        `;
        return;
    }
    
    // Atualiza título da página
    document.title = `${guia.titulo} | Leve Vida`;
    
    // Renderiza conteúdo
    const headerHtml = renderizarHeaderGuia(guia);
    const secoesHtml = guia.secoes.map(secao => renderizarSecao(secao)).join('');
    const materiaisHtml = renderizarMateriaisDownload(guia);
    
    // Call to action
    const ctaHtml = `
        <section class="guide-section" style="text-align: center; background: var(--gradient-primary); padding: 4rem 2rem; border-radius: 20px; color: white; margin-top: 4rem;">
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem; color: white;">
                ✈️ Pronto para Viajar?
            </h2>
            <p style="font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.95;">
                Confira nosso e-book completo com ainda mais dicas!
            </p>
            <a href="e-book.html" class="btn btn-large" style="background: white; color: var(--color-primary); display: inline-block;">
                <i class="fas fa-book"></i> Ver E-book Completo
            </a>
        </section>
    `;
    
    document.getElementById('guia-content').innerHTML = `
        ${headerHtml}
        <div class="container">
            ${secoesHtml}
            ${materiaisHtml}
            ${ctaHtml}
        </div>
    `;
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Se estiver na página de lista de guias
    if (document.getElementById('guias-container')) {
        renderizarListaGuias();
    }
    
    // Se estiver na página de um guia específico
    if (document.getElementById('guia-content')) {
        renderizarPaginaGuia();
    }
});
