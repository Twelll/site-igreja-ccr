document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initCitiesCarousel();
    initMemberToggles();
});

function initHeroCarousel() {
    const heroImages = document.querySelectorAll('.hero-carousel img');
    const heroContainer = document.querySelector('.hero-carousel'); 

    if (heroImages.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 5000;
    let interval;

    const startInterval = () => {
        interval = setInterval(() => {
            heroImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % heroImages.length;
            heroImages[currentIndex].classList.add('active');
        }, intervalTime);
    };

    const stopInterval = () => {
        clearInterval(interval);
    };

    // Inicia o carrossel
    startInterval();

    // Pausa ao passar o mouse
    if (heroContainer) {
        heroContainer.addEventListener('mouseenter', stopInterval);
        heroContainer.addEventListener('mouseleave', startInterval);
    }
}

function initCitiesCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const cards = document.querySelectorAll('.card-cidade');

    if (!track || !cards.length) return;

    let currentIndex = 0;

    // Função para pegar o GAP diretamente do CSS
    function getGap() {
        const style = window.getComputedStyle(track);
        return parseInt(style.gap || 0);
    }

    function getCardWidth() {
        return cards[0].offsetWidth;
    }

    function updateCarousel() {
        const cardWidth = getCardWidth();
        const gap = getGap();
        const moveAmount = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${moveAmount}px)`;
    }

    function getMaxIndex() {
        const containerWidth = document.querySelector('.carousel-track-container').offsetWidth;
        const cardWidth = getCardWidth();
        const gap = getGap();
        const visibleCards = Math.floor(containerWidth / (cardWidth + gap));
        return Math.max(0, cards.length - visibleCards);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIndex = getMaxIndex();
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = getMaxIndex(); 
            }
            updateCarousel();
        });
    }

    // --- CORREÇÃO DE RESIZE APLICADA AQUI (LOCAL CORRETO) ---
    let resizeTimer;
    let lastWidth = window.innerWidth;

    window.addEventListener('resize', () => {
        // Limpa o timer anterior se o usuário ainda estiver redimensionando
        clearTimeout(resizeTimer);

        // Cria um novo timer para executar apenas após 250ms de pausa
        resizeTimer = setTimeout(() => {
            // Verifica se a largura realmente mudou (evita disparo no scroll do mobile)
            if (window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth; // Atualiza a largura salva

                // 1. Reseta e atualiza o carrossel (Agora funciona pois está no escopo certo!)
                currentIndex = 0;
                updateCarousel();

                // 2. Recalcula altura dos toggles se necessário (Global)
                const toggles = document.querySelectorAll('.btn-toggle-membros');
                toggles.forEach(btn => {
                    if (btn.classList.contains('aberto')) {
                        const content = btn.nextElementSibling;
                        content.style.maxHeight = content.scrollHeight + "px";
                    }
                });
            }
        }, 250); 
    });
}

function initMemberToggles() {
    const toggles = document.querySelectorAll('.btn-toggle-membros');

    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('aberto');
            const content = btn.nextElementSibling;

            // Lógica de alternância (abrir/fechar)
            const isOpen = content.style.maxHeight ? true : false;

            if (isOpen) {
                content.style.maxHeight = null;
                btn.setAttribute('aria-expanded', 'false'); // Acessibilidade corrigida
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                btn.setAttribute('aria-expanded', 'true'); // Acessibilidade corrigida
            }
        });
    });
}