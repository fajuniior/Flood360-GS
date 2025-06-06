/**
 * Validação de formulário - WebDev
 * Flood360 - Prevenção de Enchentes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do formulário
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Função para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Função para mostrar erro
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.add('error');
        errorMessage.textContent = message;
    }
    
    // Função para limpar erro
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        formGroup.classList.remove('error');
        errorMessage.textContent = '';
    }
    
    // Função para validar campo
    function validateField(input, validationFunction, errorMessage) {
        if (!validationFunction(input.value)) {
            showError(input, errorMessage);
            return false;
        } else {
            clearError(input);
            return true;
        }
    }
    
    // Event listeners para validação em tempo real
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, value => value.trim().length >= 3, 'Nome deve ter pelo menos 3 caracteres');
    });
    
    emailInput.addEventListener('blur', () => {
        validateField(emailInput, value => isValidEmail(value), 'Email inválido');
    });
    
    subjectInput.addEventListener('blur', () => {
        validateField(subjectInput, value => value.trim().length >= 5, 'Assunto deve ter pelo menos 5 caracteres');
    });
    
    messageInput.addEventListener('blur', () => {
        validateField(messageInput, value => value.trim().length >= 10, 'Mensagem deve ter pelo menos 10 caracteres');
    });
    
    // Event listener para envio do formulário
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar todos os campos
        const isNameValid = validateField(nameInput, value => value.trim().length >= 3, 'Nome deve ter pelo menos 3 caracteres');
        const isEmailValid = validateField(emailInput, value => isValidEmail(value), 'Email inválido');
        const isSubjectValid = validateField(subjectInput, value => value.trim().length >= 5, 'Assunto deve ter pelo menos 5 caracteres');
        const isMessageValid = validateField(messageInput, value => value.trim().length >= 10, 'Mensagem deve ter pelo menos 10 caracteres');
        
        // Se todos os campos forem válidos, enviar o formulário
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulação de envio bem-sucedido
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        }
    });
});
