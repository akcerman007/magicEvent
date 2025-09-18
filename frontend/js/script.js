const slides = document.querySelectorAll('.slide');

slides.forEach(slide => {
    slide.addEventListener('mouseenter', () => {
        slides.forEach(s => s.classList.remove('active'));
        slide.classList.add('active');
    });

    slide.addEventListener('mouseleave', () => {
        slide.classList.remove('active');
    });
});
