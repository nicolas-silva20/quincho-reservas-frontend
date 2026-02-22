// Renderizar Landing Section
function renderLanding() {
    const landingSection = document.querySelector('.landing-section');
    landingSection.innerHTML = `
        <div class="hero-content">
            <h1 class="hero-title">EL UMBRAL</h1>
            <h2 class="hero-subtitle">-TU PRÓXIMO QUINCHO-</h2>
            <p class="hero-description">
                Cruzá la puerta, descubrí un lugar mejor donde los instantes se convierten en recuerdos eternos
            </p>
            <button class="scroll-btn" onclick="scrollToSection('#about')">
                <span>CONOCER MÁS</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1V15M8 15L1 8M8 15L15 8" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
        </div>
        <div class="hero-overlay"></div>
    `;
}

// Inicializar landing
document.addEventListener('DOMContentLoaded', renderLanding);