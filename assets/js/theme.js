/**
 * Seletor de temas - WebDev
 * Flood360 - Prevenção de Enchentes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const themeButtons = document.querySelectorAll('.theme-btn');
    const root = document.documentElement;
    
    // Cores para cada tema
    const themes = {
        blue: {
            primaryBlue: '#0077cc',
            primaryGreen: '#2a9d8f',
            lightBlue: '#a8dadc',
            darkText: '#1d3557',
            lightText: '#f1faee',
            background: '#f8f9fa'
        },
        green: {
            primaryBlue: '#2a9d8f',
            primaryGreen: '#57cc99',
            lightBlue: '#c7f9cc',
            darkText: '#22577a',
            lightText: '#f1faee',
            background: '#f8f9fa'
        },
        dark: {
            primaryBlue: '#07C1EFFF',
            primaryGreen: '#08D8C7FF',
            lightBlue: '#09E4D9FF',
            darkText: '#0BCAE3FF',
            lightText: '#e0e0e0',
            background: '#121212'
        }
    };
    
    // Função para aplicar tema
    function applyTheme(theme) {
        // Salvar tema selecionado no localStorage
        localStorage.setItem('flood360Theme', theme);
        
        // Aplicar variáveis CSS do tema
        root.style.setProperty('--primary-blue', themes[theme].primaryBlue);
        root.style.setProperty('--primary-green', themes[theme].primaryGreen);
        root.style.setProperty('--light-blue', themes[theme].lightBlue);
        root.style.setProperty('--dark-text', themes[theme].darkText);
        root.style.setProperty('--light-text', themes[theme].lightText);
        root.style.setProperty('--background-light', themes[theme].background);
        
        // Atualizar classe ativa nos botões de tema
        themeButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.theme === theme) {
                button.classList.add('active');
            }
        });
    }
    
    // Event listeners para os botões de tema
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            applyTheme(theme);
        });
    });
    
    // Verificar se há um tema salvo no localStorage
    const savedTheme = localStorage.getItem('flood360Theme');
    if (savedTheme && themes[savedTheme]) {
        applyTheme(savedTheme);
    } else {
        // Tema padrão
        applyTheme('blue');
    }
});
