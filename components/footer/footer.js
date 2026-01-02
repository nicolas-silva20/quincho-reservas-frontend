// Renderizar Footer
function renderFooter() {
    const footer = document.getElementById('footer');
    footer.className = 'footer';
    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-content">
                <nav>
                    <ul class="footer-nav">
                        <li><a href="#main">INICIO</a></li>
                        <li><a href="#about">QUÉ OFRECEMOS</a></li>
                        <li><a href="#game-features">RESERVAR</a></li>
                        <li><a href="#quotes">RESEÑAS</a></li>
                    </ul>
                </nav>
            </div>
            
            <div class="footer-bottom">
                <p class="footer-copyright">
                    © 2025 Quincho El Umbral. All Rights Reserved
                </p>
                <div class="footer-links">
                    <a href="politica-privacidad.html">POLÍTICA DE PRIVACIDAD</a>
                    <span>|</span>
                    <a href="terminos-condiciones.html">TÉRMINOS Y CONDICIONES</a>
                    <span>|</span>
                    <a href="codigo-conducta.html">CÓDIGO DE CONDUCTA</a>
                </div>
            </div>
        </div>
    `;
}

// Inicializar footer
document.addEventListener('DOMContentLoaded', renderFooter);