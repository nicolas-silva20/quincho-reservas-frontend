// Renderizar sección Reservar
function renderReservar() {
    const reservarSection = document.querySelector('.reservar-section');
    reservarSection.innerHTML = `
        <div class="reservar-container">
            <div class="reservar-image">
                <img src="assets/images/reservar-bg.jpg" alt="Quincho El Umbral">
            </div>
            
            <div class="reservar-content">
                <p class="reservar-subtitle">QUERÉS RESERVAR?</p>
                <h2 class="reservar-title">
                    PERSONALICEMOS<br>
                    TU EXPERIENCIA
                </h2>
                
                <form class="reservar-form" id="reservar-form" onsubmit="handleReservarSubmit(event)">
                    <div class="form-group">
                        <input 
                            type="text" 
                            class="form-input" 
                            id="nombre"
                            placeholder="Ingresá tu nombre"
                            required
                        >
                    </div>
                    <button type="submit" class="btn-continuar">
                        Continuar
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Manejar submit del formulario
function handleReservarSubmit(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    
    // Guardar nombre en sessionStorage
    sessionStorage.setItem('clienteNombre', nombre);
    
    // Ocultar todas las secciones excepto navbar
    document.querySelector('.landing-section').style.display = 'none';
    document.querySelector('.que-ofrecemos-section').style.display = 'none';
    document.querySelector('.reservar-section').style.display = 'none';
    document.querySelector('.resenas-section').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    
    // Mostrar sección de selección de experiencia
    const experienciaSection = document.querySelector('.seleccionar-experiencia-section');
    experienciaSection.style.display = 'flex';
    
    // Scroll hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar sección reservar
document.addEventListener('DOMContentLoaded', renderReservar);