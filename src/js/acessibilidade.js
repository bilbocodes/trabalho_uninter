/**
 * Funcionalidades de acessibilidade para o portfólio pessoal
 * Autor: Luka Andrade - RU: 4473328
 * Data: 2025
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Inicializar funções de acessibilidade
    initAccessibility();
    
    /**
     * Inicializa todas as funcionalidades de acessibilidade
     */
    function initAccessibility() {
        // Adicionar controles de acessibilidade
        createAccessibilityControls();
        
        // Verificar preferência de redução de movimento
        checkReducedMotion();
        
        // Melhorar navegação por teclado
        improveKeyboardNavigation();
        
        // Adicionar atributos ARIA onde necessário
        addAriaAttributes();
    }
    
    /**
     * Criar controles de acessibilidade
     */
    function createAccessibilityControls() {
        const controls = document.createElement('div');
        controls.className = 'accessibility-controls';
        
        // Botão para aumentar texto
        const textSizeBtn = document.createElement('button');
        textSizeBtn.className = 'accessibility-btn text-size-btn';
        textSizeBtn.setAttribute('aria-label', 'Alternar tamanho do texto');
        textSizeBtn.innerHTML = '<i class="fas fa-text-height"></i>';
        textSizeBtn.addEventListener('click', toggleTextSize);
        
        // Botão para alto contraste
        const contrastBtn = document.createElement('button');
        contrastBtn.className = 'accessibility-btn contrast-btn';
        contrastBtn.setAttribute('aria-label', 'Alternar alto contraste');
        contrastBtn.innerHTML = '<i class="fas fa-adjust"></i>';
        contrastBtn.addEventListener('click', toggleHighContrast);
        
        controls.appendChild(textSizeBtn);
        controls.appendChild(contrastBtn);
        
        document.body.appendChild(controls);
    }
    
    /**
     * Alternar tamanho do texto
     */
    function toggleTextSize() {
        document.body.classList.toggle('larger-text');
        
        // Anunciar para leitores de tela
        const isLarger = document.body.classList.contains('larger-text');
        announceToScreenReaders(isLarger ? 'Texto ampliado ativado' : 'Texto normal ativado');
        
        // Salvar preferência no localStorage
        localStorage.setItem('largerText', isLarger);
    }
    
    /**
     * Alternar modo de alto contraste
     */
    function toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        
        // Anunciar para leitores de tela
        const isHighContrast = document.body.classList.contains('high-contrast');
        announceToScreenReaders(isHighContrast ? 'Alto contraste ativado' : 'Contraste normal ativado');
        
        // Salvar preferência no localStorage
        localStorage.setItem('highContrast', isHighContrast);
    }
    
    /**
     * Verificar preferência de redução de movimento
     */
    function checkReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.documentElement.classList.add('reduced-motion');
        }
    }
    
    /**
     * Melhorar navegação por teclado
     */
    function improveKeyboardNavigation() {
        // Adicionar classe focus-visible a elementos ao navegar com tab
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        // Remover classe ao usar o mouse
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    /**
     * Adicionar atributos ARIA onde necessário
     */
    function addAriaAttributes() {
        // Marcar região atual na navegação
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                document.querySelectorAll('.nav-link').forEach(item => {
                    item.setAttribute('aria-current', 'false');
                });
                this.setAttribute('aria-current', 'page');
            });
        });
        
        // Adicionar rótulos a ícones sem texto
        document.querySelectorAll('.social-icons a').forEach(icon => {
            if (!icon.getAttribute('aria-label')) {
                const iconClass = icon.querySelector('i').className;
                let label = 'Mídia social';
                
                if (iconClass.includes('github')) label = 'GitHub';
                if (iconClass.includes('linkedin')) label = 'LinkedIn';
                if (iconClass.includes('twitter')) label = 'Twitter';
                if (iconClass.includes('instagram')) label = 'Instagram';
                if (iconClass.includes('envelope')) label = 'Email';
                
                icon.setAttribute('aria-label', label);
            }
        });
    }
    
    /**
     * Anunciar para leitores de tela
     * @param {string} message - Mensagem a ser anunciada
     */
    function announceToScreenReaders(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('visually-hidden');
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 3000);
    }
    
    // Carregar preferências salvas
    function loadSavedPreferences() {
        // Verificar preferência de tamanho de texto
        if (localStorage.getItem('largerText') === 'true') {
            document.body.classList.add('larger-text');
        }
        
        // Verificar preferência de contraste
        if (localStorage.getItem('highContrast') === 'true') {
            document.body.classList.add('high-contrast');
        }
    }
    
    // Carregar preferências ao iniciar
    loadSavedPreferences();
});
