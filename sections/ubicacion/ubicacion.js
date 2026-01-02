// Sección de Ubicación
document.addEventListener('DOMContentLoaded', function() {
    const ubicacionSection = document.querySelector('.ubicacion-section');
    
    if (ubicacionSection) {
        ubicacionSection.innerHTML = `
            <div class="ubicacion-container">
                <div class="ubicacion-header">
                    <p class="ubicacion-subtitle">¿Dónde estamos?</p>
                    <h2 class="ubicacion-title">NUESTRA UBICACIÓN</h2>
                </div>
                <div class="ubicacion-content">
                    <div class="ubicacion-info">
                        <p class="ubicacion-direccion">
                            <span class="ubicacion-direccion-icon">📍</span>
                            Victoria 1813, Villa Nueva, Guaymallén, Mendoza, Argentina
                        </p>
                        <ul class="ubicacion-detalles">
                            <li>A 10 minutos del centro de Mendoza</li>
                            <li>Fácil acceso por calles Avellaneda, Libertad y Godoy Cruz</li>
                            <li>Zona segura y tranquila</li>
                        </ul>
                        <a href="https://www.google.com/maps/dir/?api=1&destination=Victoria+1813,+Villa+Nueva,+Guaymallén,+Mendoza" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="ubicacion-btn">
                            Cómo llegar
                        </a>
                    </div>
                    <div class="ubicacion-mapa-container">
                        <iframe 
                            src="https://www.google.com/maps?q=Victoria+1813,+M5521+Mendoza&output=embed" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade"
                            title="Ubicación Quincho El Umbral">
                        </iframe>
                    </div>
                </div>
            </div>
        `;
    }
});
