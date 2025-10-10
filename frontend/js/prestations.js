// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const links = document.querySelectorAll('.nav-links a');
links.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
    });
});

// ===== PARALLAX EFFECT FOR HERO =====
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroParallax = document.querySelector('.hero-parallax-image');
            
            if (heroParallax) {
                // Effet parallax prononcé avec zoom
                heroParallax.style.transform = `translateY(${scrolled * 0.6}px) scale(1.1)`;
            }
            
            ticking = false;
        });
        ticking = true;
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== INTERSECTION OBSERVER FOR CARDS ANIMATIONS =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Une fois animé, on arrête d'observer cet élément
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer toutes les cards
const serviceCards = document.querySelectorAll('.service-card');
const pricingCards = document.querySelectorAll('.pricing-card');
const galleryItems = document.querySelectorAll('.gallery-item-prestation');

serviceCards.forEach(card => observer.observe(card));
pricingCards.forEach(card => observer.observe(card));
galleryItems.forEach(item => observer.observe(item));

// ===== CTA BUTTONS =====
const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-secondary, .cta-button-large');
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // If button is not a link, scroll to contact
        if (!button.hasAttribute('href') || button.getAttribute('href') === '#') {
            e.preventDefault();
            window.location.href = 'index.html#contact';
        }
    });
});

// ===== SCROLL TO TOP ON PAGE LOAD =====
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});