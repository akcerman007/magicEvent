// Carousel navigation
const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-nav.prev');
const nextBtn = document.querySelector('.carousel-nav.next');

const scrollAmount = 430; // largeur d'une card + gap

prevBtn.addEventListener('click', () => {
    carouselContainer.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
});

nextBtn.addEventListener('click', () => {
    carouselContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// Drag to scroll functionality
let isDown = false;
let startX;
let scrollLeft;

carouselContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    carouselContainer.style.cursor = 'grabbing';
    carouselContainer.style.userSelect = 'none';
    startX = e.pageX - carouselContainer.offsetLeft;
    scrollLeft = carouselContainer.scrollLeft;
});

carouselContainer.addEventListener('mouseleave', () => {
    isDown = false;
    carouselContainer.style.cursor = 'grab';
});

carouselContainer.addEventListener('mouseup', () => {
    isDown = false;
    carouselContainer.style.cursor = 'grab';
});

carouselContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselContainer.offsetLeft;
    const walk = (x - startX) * 2; // Multiplie par 2 pour un scroll plus rapide
    carouselContainer.scrollLeft = scrollLeft - walk;
});

// Touch support for mobile devices
let touchStartX = 0;
let touchScrollLeft = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].pageX - carouselContainer.offsetLeft;
    touchScrollLeft = carouselContainer.scrollLeft;
});

carouselContainer.addEventListener('touchmove', (e) => {
    const x = e.touches[0].pageX - carouselContainer.offsetLeft;
    const walk = (x - touchStartX) * 2;
    carouselContainer.scrollLeft = touchScrollLeft - walk;
});