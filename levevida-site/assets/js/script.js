/* ============================================
   LEVE VIDA - JAVASCRIPT PRINCIPAL
   Arquivo: script.js
   Descrição: Funcionalidades interativas do site
   ============================================ */

// ============================================
// MENU MOBILE (HAMBURGER)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Toggle menu mobile
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// ============================================
// NAVEGAÇÃO SUAVE (SMOOTH SCROLL)
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Verifica se não é apenas "#"
        if (href && href !== '#') {
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const headerOffset = 80; // Altura do header fixo
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// HIGHLIGHT DO MENU ATIVO
// ============================================
function highlightActiveMenu() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remove active de todos
        link.classList.remove('active');
        
        // Adiciona active ao link correspondente
        const linkPath = link.getAttribute('href');
        if (linkPath && (currentPath.endsWith(linkPath) || (currentPath === '/' && linkPath === 'index.html'))) {
            link.classList.add('active');
        }
    });
}

// Executar ao carregar a página
document.addEventListener('DOMContentLoaded', highlightActiveMenu);

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validação básica
        const nome = document.querySelector('#nome').value.trim();
        const email = document.querySelector('#email').value.trim();
        const mensagem = document.querySelector('#mensagem').value.trim();
        
        if (!nome || !email || !mensagem) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Simular envio (aqui você pode integrar com um serviço real)
        showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
    });
}

// ============================================
// NEWSLETTER
// ============================================
const newsletterForm = document.querySelector('#newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.querySelector('#newsletter-email').value.trim();
        
        if (!email) {
            showMessage('Por favor, insira seu e-mail.', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Simular inscrição
        showMessage('Inscrição realizada com sucesso! Você receberá nossas novidades.', 'success');
        newsletterForm.reset();
    });
}

// ============================================
// VALIDAÇÃO DE EMAIL
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// MENSAGENS DE FEEDBACK
// ============================================
function showMessage(message, type) {
    // Remove mensagens existentes
    const existingMessage = document.querySelector('.feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `feedback-message feedback-${type}`;
    messageDiv.textContent = message;
    
    // Estilos inline para a mensagem
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(messageDiv);
    
    // Remove após 4 segundos
    setTimeout(() => {
        messageDiv.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            messageDiv.remove();
        }, 300);
    }, 4000);
}

// Adiciona animações CSS para as mensagens
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// FILTROS DE ARTIGOS (se existir na página)
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const cards = document.querySelectorAll('.card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Animação de fade in
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Adiciona animação fade in
    const fadeInStyle = document.createElement('style');
    fadeInStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(fadeInStyle);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    // Scroll suave ao topo
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Efeito hover
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.3)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    });
}

// Criar botão ao carregar a página
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ============================================
// LAZY LOADING DE IMAGENS (se necessário)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Observar todas as imagens com classe 'lazy'
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PREVENÇÃO DE MÚLTIPLOS CLIQUES EM BOTÕES
// ============================================
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        // Desabilita o botão temporariamente
        this.disabled = true;
        
        // Reabilita após 2 segundos
        setTimeout(() => {
            this.disabled = false;
        }, 2000);
    });
});

// ============================================
// LOG DE INICIALIZAÇÃO
// ============================================
console.log('🚀 Leve Vida - Site carregado com sucesso!');
console.log('📧 Contato: equipelevevida@gmail.com');
