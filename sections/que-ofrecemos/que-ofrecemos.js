// Datos del carrusel (aquí defines las rutas de las imágenes)
const carouselImages = [
    'assets/images/carousel/image1.jpg',
    'assets/images/carousel/image2.jpg',
    'assets/images/carousel/image3.jpg',
    'assets/images/carousel/image4.jpg',
    'assets/images/carousel/image5.jpg',
    'assets/images/carousel/image6.jpg',
    'assets/images/carousel/image7.jpg',
    'assets/images/carousel/image8.jpg',
    'assets/images/carousel/image10.jpg',
    'assets/images/carousel/image11.jpg',
    'assets/images/carousel/image12.jpg',
    'assets/images/carousel/image13.jpg'
];

let currentSlide = 0;

// Renderizar sección Que Ofrecemos
function renderQueOfrecemos() {
    const queOfrecemosSection = document.querySelector('.que-ofrecemos-section');
    queOfrecemosSection.innerHTML = `
        <div class="que-ofrecemos-container">
            <div class="que-ofrecemos-content">
                <p class="que-ofrecemos-subtitle">QUE TE OFRECEMOS</p>
                <h2 class="que-ofrecemos-title">
                    TODAS LAS COMODIDADES<br>
                    PARA QUE TU EXPERIENCIA<br>
                    SEA PERFECTA
                </h2>
                <div class="decorative-line"></div>
                <p class="que-ofrecemos-description">
                    Contamos con churrasqueras, horno de barro, fogón, barra, pileta y más para que disfrutes al máximo.
                </p>
            </div>
            
            <div class="carousel-container">
                <div class="carousel-wrapper">
                    <div class="carousel-track" id="carousel-track">
                        ${carouselImages.map((img, index) => `
                            <div class="carousel-slide">
                                <img src="${img}" alt="Imagen ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                    
                    <button class="carousel-arrow prev" onclick="moveCarousel(-1)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </button>
                    
                    <button class="carousel-arrow next" onclick="moveCarousel(1)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6"/>
                        </svg>
                    </button>
                    
                    <div class="carousel-controls">
                        ${carouselImages.map((_, index) => `
                            <span class="carousel-dot ${index === 0 ? 'active' : ''}" 
                                  onclick="goToSlide(${index})">
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para mover el carrusel
function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    currentSlide += direction;
    
    // Loop infinito
    if (currentSlide < 0) {
        currentSlide = carouselImages.length - 1;
    } else if (currentSlide >= carouselImages.length) {
        currentSlide = 0;
    }
    
    updateCarousel(track, dots);
}

// Función para ir a un slide específico
function goToSlide(index) {
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    currentSlide = index;
    updateCarousel(track, dots);
}

// Actualizar el carrusel
function updateCarousel(track, dots) {
    const slideWidth = 100; // Cada slide ocupa 100% del contenedor
    track.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
    
    // Actualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Auto-play del carrusel
let autoplayInterval;

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000); // Cambia cada 5 segundos
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// Pausar autoplay al hacer hover
document.addEventListener('DOMContentLoaded', () => {
    renderQueOfrecemos();
    startAutoplay();
    
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }
});

// Ajustar carrusel al redimensionar ventana
window.addEventListener('resize', () => {
    const track = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    if (track && dots.length > 0) {
        updateCarousel(track, dots);
    }
});