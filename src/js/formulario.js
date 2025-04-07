/**
 * Validação de formulário para o portfólio pessoal
 * Autor: Seu Nome
 * Data: 2023
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Obter elementos do formulário
    const contactForm = document.getElementById('contactForm');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const assuntoInput = document.getElementById('assunto');
    const mensagemInput = document.getElementById('mensagem');
    const submitButton = document.getElementById('submit-btn');
    
    // Obter elementos de erro
    const nomeError = document.getElementById('nome-error');
    const emailError = document.getElementById('email-error');
    const assuntoError = document.getElementById('assunto-error');
    const mensagemError = document.getElementById('mensagem-error');
    
    // Adicionar eventos de validação em tempo real
    if (nomeInput) nomeInput.addEventListener('input', validateNome);
    if (emailInput) emailInput.addEventListener('input', validateEmail);
    if (assuntoInput) assuntoInput.addEventListener('input', validateAssunto);
    if (mensagemInput) mensagemInput.addEventListener('input', validateMensagem);
    
    // Adicionar evento de submit
    if (contactForm) contactForm.addEventListener('submit', handleSubmit);
    
    /**
     * Exibe mensagem de erro para um campo específico
     * @param {HTMLElement} inputElement - Elemento de input
     * @param {HTMLElement} errorElement - Elemento de exibição do erro
     * @param {string} message - Mensagem de erro
     */
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        errorElement.textContent = message;
    }
    
    /**
     * Remove a mensagem de erro para um campo específico
     * @param {HTMLElement} inputElement - Elemento de input
     * @param {HTMLElement} errorElement - Elemento de exibição do erro
     */
    function clearError(inputElement, errorElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
        errorElement.textContent = '';
    }
    
    /**
     * Valida o campo de nome
     * @param {Event} e - Evento de input
     */
    function validateNome(e) {
        const value = e.target.value.trim();
        
        if (value === '') {
            showError(nomeInput, nomeError, 'Por favor, insira seu nome');
            return false;
        } else if (value.length < 2) {
            showError(nomeInput, nomeError, 'O nome deve ter pelo menos 2 caracteres');
            return false;
        } else {
            clearError(nomeInput, nomeError);
            return true;
        }
    }
    
    /**
     * Valida o campo de email
     * @param {Event} e - Evento de input
     */
    function validateEmail(e) {
        const value = e.target.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            showError(emailInput, emailError, 'Por favor, insira seu email');
            return false;
        } else if (!emailRegex.test(value)) {
            showError(emailInput, emailError, 'Por favor, insira um email válido');
            return false;
        } else {
            clearError(emailInput, emailError);
            return true;
        }
    }
    
    /**
     * Valida o campo de assunto
     * @param {Event} e - Evento de input
     */
    function validateAssunto(e) {
        const value = e.target.value.trim();
        
        if (value === '') {
            showError(assuntoInput, assuntoError, 'Por favor, insira um assunto');
            return false;
        } else if (value.length < 5) {
            showError(assuntoInput, assuntoError, 'O assunto deve ter pelo menos 5 caracteres');
            return false;
        } else {
            clearError(assuntoInput, assuntoError);
            return true;
        }
    }
    
    /**
     * Valida o campo de mensagem
     * @param {Event} e - Evento de input
     */
    function validateMensagem(e) {
        const value = e.target.value.trim();
        
        if (value === '') {
            showError(mensagemInput, mensagemError, 'Por favor, escreva uma mensagem');
            return false;
        } else if (value.length < 10) {
            showError(mensagemInput, mensagemError, 'A mensagem deve ter pelo menos 10 caracteres');
            return false;
        } else {
            clearError(mensagemInput, mensagemError);
            return true;
        }
    }
    
    /**
     * Valida o formulário inteiro
     * @returns {boolean} - Verdadeiro se todos os campos são válidos
     */
    function validateForm() {
        let isValid = true;
        
        // Simular eventos para acionar validações
        const nameEvent = { target: nomeInput };
        const emailEvent = { target: emailInput };
        const assuntoEvent = { target: assuntoInput };
        const mensagemEvent = { target: mensagemInput };
        
        // Acumular resultados das validações
        if (!validateNome(nameEvent)) isValid = false;
        if (!validateEmail(emailEvent)) isValid = false;
        if (!validateAssunto(assuntoEvent)) isValid = false;
        if (!validateMensagem(mensagemEvent)) isValid = false;
        
        return isValid;
    }
    
    /**
     * Alterna o estado do botão de envio entre normal e loading
     * @param {boolean} isLoading - Indica se está carregando
     */
    function toggleButtonLoading(isLoading) {
        const buttonText = document.getElementById('btn-text');
        const buttonLoading = document.getElementById('btn-loading');
        
        if (isLoading) {
            buttonText.classList.add('d-none');
            buttonLoading.classList.remove('d-none');
            submitButton.disabled = true;
        } else {
            buttonText.classList.remove('d-none');
            buttonLoading.classList.add('d-none');
            submitButton.disabled = false;
        }
    }
    
    /**
     * Manipula o envio do formulário
     * @param {Event} e - Evento de envio
     */
    function handleSubmit(e) {
        e.preventDefault();
        
        // Validar formulário
        if (!validateForm()) {
            return;
        }
        
        // Mostrar estado de loading
        toggleButtonLoading(true);
        
        // Simular envio do formulário (substituir por envio real em produção)
        simulateFormSubmission();
    }
    
    /**
     * Simula o envio do formulário (para fins de demonstração)
     * Em um caso real, isso seria substituído pelo envio AJAX para o backend
     */
    function simulateFormSubmission() {
        // Simular tempo de processamento
        setTimeout(() => {
            // Resetar estado de loading
            toggleButtonLoading(false);
            
            // Exibir mensagem de sucesso
            Swal.fire({
                title: 'Mensagem Enviada!',
                text: 'Obrigado pelo contato. Responderei em breve!',
                icon: 'success',
                confirmButtonColor: 'var(--destaque)',
                confirmButtonText: 'OK'
            }).then(() => {
                // Limpar formulário
                contactForm.reset();
                
                // Remover classes de validação
                const formInputs = contactForm.querySelectorAll('.form-control');
                formInputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
            });
        }, 1500);
    }
});
