document.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initCitiesCarousel();
});

function initHeroCarousel() {
    const heroImages = document.querySelectorAll('.hero-carousel img');
    
    if (heroImages.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 5000; // Troca a cada 5 segundos

    setInterval(() => {
        heroImages[currentIndex].classList.remove('active');

        currentIndex = (currentIndex + 1) % heroImages.length;

        heroImages[currentIndex].classList.add('active');
    }, intervalTime);
}

function initCitiesCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const cards = document.querySelectorAll('.card-cidade');

    if (!track || !cards.length) return;

    let currentIndex = 0;
    const gap = 20; 
    const cardWidth = cards[0].offsetWidth;

    function updateCarousel() {
        const moveAmount = (cardWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${moveAmount}px)`;
    }

    function getMaxIndex() {
        const containerWidth = document.querySelector('.carousel-track-container').offsetWidth;
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

    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}