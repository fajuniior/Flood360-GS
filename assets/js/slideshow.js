/**
 * Slideshow de imagens - WebDev
 * Flood360 - Prevenção de Enchentes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos os slideshows na página
    initializeSlideshow('#problema-slideshow');
    initializeSlideshow('#quiz-slideshow');
    
    // Função para inicializar um slideshow específico
    function initializeSlideshow(containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return; // Se o container não existir, sair da função
        
        // Variáveis do slideshow
        let slideIndex = 0;
        const slides = container.querySelectorAll('.slide');
        const dots = container.querySelectorAll('.dot');
        const prev = container.querySelector('.prev');
        const next = container.querySelector('.next');
        
        if (!slides.length) return; // Se não houver slides, sair da função
        
        // Inicializar o slideshow
        showSlides(0);
        
        // Função para mostrar um slide específico
        function showSlides(n) {
            // Ajustar o índice se estiver fora dos limites
            if (n >= slides.length) {
                slideIndex = 0;
            } else if (n < 0) {
                slideIndex = slides.length - 1;
            } else {
                slideIndex = n;
            }
            
            // Esconder todos os slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                if (dots[i]) dots[i].classList.remove('active');
            }
            
            // Mostrar o slide atual
            slides[slideIndex].style.display = "block";
            if (dots[slideIndex]) dots[slideIndex].classList.add('active');
        }
        
        // Event listeners para navegação
        if (prev) {
            prev.addEventListener('click', (e) => {
                e.preventDefault();
                showSlides(slideIndex - 1);
            });
        }
        
        if (next) {
            next.addEventListener('click', (e) => {
                e.preventDefault();
                showSlides(slideIndex + 1);
            });
        }
        
        // Event listeners para os pontos de navegação
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlides(index);
            });
        });
        
        // Avançar slides automaticamente a cada 5 segundos
        setInterval(() => {
            showSlides(slideIndex + 1);
        }, 5000);
    }
});

