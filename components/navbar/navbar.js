// Renderizar Navbar
function renderNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.className = 'navbar';
    navbar.innerHTML = `
        <div class="nav-container">
            <div class="logo">
                <img src="assets/images/logo.png" alt="El Umbral Logo" onclick="scrollToTop()">
            </div>
            <ul class="nav-menu">
                <li><a href="#main">INICIO</a></li>
                <li><a href="#about">QUÉ OFRECEMOS</a></li>
                <li><a href="#game-features">RESERVAR</a></li>
                <li><a href="#quotes">RESEÑAS</a></li>
            </ul>
        </div>
    `;
}

// Efecto de scroll en navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Scroll al top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar navbar
document.addEventListener('DOMContentLoaded', renderNavbar);