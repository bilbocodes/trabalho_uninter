/**
 * Main JavaScript para o portfólio pessoal
 * Autor: Luka Andrade - RU: 4473328
 * Data: 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Inicializar funções
    init();
    
    /**
     * Inicializa todas as funções do site
     */
    function init() {
        // Detectar scroll para mudar o fundo da barra de navegação
        window.addEventListener('scroll', toggleNavbarBg);
        
        // Destacar link ativo na navegação com base na seção visível
        window.addEventListener('scroll', highlightNavLink);
        
        // Rolagem suave para links internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', scrollToSection);
        });
        
        // Configurar observer para animar elementos quando ficam visíveis
        observeElements();
        
        // Animar barras de progresso quando visíveis
        window.addEventListener('scroll', animateProgressBars);
        
    }
    
    /**
     * Altera o fundo da barra de navegação ao rolar
     */
    function toggleNavbarBg() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    /**
     * Destaca o link ativo na navegação com base na seção visível
     */
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                document.querySelector('.navbar a[href="#' + sectionId + '"]').classList.add('active');
            } else {
                document.querySelector('.navbar a[href="#' + sectionId + '"]').classList.remove('active');
            }
        });
    }
    
    /**
     * Rolagem suave ao clicar nos links da navegação
     */
    function scrollToSection(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        const offsetTop = document.querySelector(href).offsetTop;
        
        window.scroll({
            top: offsetTop - 70,
            behavior: 'smooth'
        });
    }
    

    /**
     * Animar barras de progresso quando visíveis
     */
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            if (isElementInViewport(bar.parentElement) && bar.style.width === "0px") {
                const width = bar.getAttribute('aria-valuenow') + '%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }
    
    /**
     * Verifica se um elemento está visível na viewport
     * @param {HTMLElement} el - Elemento a ser verificado
     * @returns {boolean} - Verdadeiro se o elemento estiver visível
     */
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    /**
     * Adiciona classe 'fade-in' aos elementos que ficam visíveis durante o scroll
     */
    function fadeInElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    /**
     * Configura observador para animar elementos quando ficam visíveis
     */
    function observeElements() {
        // Observer para animar elementos
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observar todos os elementos com classe fade-in
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
    }
});
