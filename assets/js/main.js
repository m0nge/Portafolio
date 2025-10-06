// Símbolos para el efecto Matrix
const matrixSymbols = [
    '0', '1', '0', '1', '0', '1',
    '#', '</', '>', '<', '/>',
    '{', '}', '(', ')', '[', ']',
    '0', '1', '0', '1'
];

// Crear partículas estilo Matrix
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = matrixSymbols[Math.floor(Math.random() * matrixSymbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 12 + 's';
        particle.style.animationDuration = (Math.random() * 8 + 8) + 's';
        particle.style.fontSize = (Math.random() * 10 + 12) + 'px';
        particlesContainer.appendChild(particle);
    }
}

// Indicador de progreso de scroll
function updateScrollIndicator() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollIndicator = document.getElementById('scrollIndicator');
    scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
}

// Animaciones al scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Efecto parallax en el hero
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Efecto hover mejorado en cards
function setupProjectCards() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03) rotateY(3deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
        });
    });
}

// Custom cursor effect
function setupCustomCursor() {
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'cursor';
            newCursor.style.cssText = `
                position: fixed;
                width: 30px;
                height: 30px;
                background: radial-gradient(circle, rgba(0, 255, 65, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                mix-blend-mode: screen;
                transition: transform 0.15s ease;
                box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
            `;
            document.body.appendChild(newCursor);
        }
        
        const actualCursor = document.querySelector('.cursor');
        actualCursor.style.left = e.clientX - 15 + 'px';
        actualCursor.style.top = e.clientY - 15 + 'px';
    });
}

// Inicializar todo
function init() {
    createParticles();
    setupScrollAnimations();
    setupParallax();
    setupProjectCards();
    setupCustomCursor();

    window.addEventListener('scroll', updateScrollIndicator);
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);