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
                
                <div class="footer-social">
                    <a href="https://instagram.com" target="_blank" class="social-link" title="Instagram">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </a>
                </div>
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