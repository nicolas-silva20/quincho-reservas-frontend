// Datos de las reseñas (se cargarán desde el backend)
let resenasData = [
    {
        nombre: "EVAN LAHTI",
        fecha: "October 18, 2018",
        texto: '"One of my gaming highlights of the year."'
    },
    {
        nombre: "JADA GRIFFIN",
        fecha: "October 19, 2018",
        texto: '"The next big thing in the world of streaming and survival games."'
    },
    {
        nombre: "AARON WILLIAMS",
        fecha: "October 24, 2018",
        texto: '"Snoop Dogg Playing The Wildly Entertaining \'SOS\' Is Ridiculous."'
    }
];

// Cargar reseñas desde el backend
async function cargarResenasDesdeAPI() {
    try {
        console.log('🔍 Intentando cargar reseñas desde API...');
        const response = await obtenerTodasLasResenas();
        
        if (response.success && response.data.length > 0) {
            console.log('✅ Reseñas cargadas desde el backend:', response.data);
            
            // Seleccionar 4-5 reseñas aleatoriamente
            let resenasSeleccionadas = [...response.data];
            const cantidadMostrar = Math.min(Math.max(4, Math.floor(Math.random() * 2) + 4), response.data.length);
            
            // Mezclar array y tomar las primeras 4-5
            resenasSeleccionadas = resenasSeleccionadas
                .sort(() => Math.random() - 0.5)
                .slice(0, cantidadMostrar);
            
            // Actualizar resenasData con datos reales del backend
            resenasData = resenasSeleccionadas.map(resena => {
                // Convertir array de fecha a objeto Date
                let fechaFormateada = 'Fecha no disponible';
                
                if (Array.isArray(resena.fechaCreacion)) {
                    // Backend devuelve: [año, mes, día, hora, minuto, segundo, nano]
                    const [year, month, day] = resena.fechaCreacion;
                    const fecha = new Date(year, month - 1, day); // mes-1 porque Date usa 0-11
                    fechaFormateada = fecha.toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                } else if (typeof resena.fechaCreacion === 'string') {
                    const fecha = new Date(resena.fechaCreacion);
                    fechaFormateada = fecha.toLocaleDateString('es-AR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }
                
                return {
                    nombre: resena.nombreCliente.toUpperCase(),
                    fecha: fechaFormateada,
                    texto: `"${resena.comentario}"`
                };
            });
            
            // Re-renderizar con datos reales
            renderResenas();
        }
    } catch (error) {
        console.error('❌ Error al cargar reseñas desde API:', error);
        console.log('🔙 Manteniendo reseñas de ejemplo');
        // Si falla, mantener datos de ejemplo
    }
}

// Renderizar sección Reseñas
function renderResenas() {
    const resenasSection = document.querySelector('.resenas-section');
    resenasSection.innerHTML = `
        <div class="resenas-container">
            <div class="resenas-header">
                <p class="resenas-subtitle">TESTIMONIOS</p>
                <h2 class="resenas-title">
                    ¿QUÉ OPINARON<br>
                    LOS VISITANTES?
                </h2>
            </div>
            
            <div class="resenas-content">
                <div class="resenas-grid">
                    ${resenasData.map(resena => `
                        <div class="resena-card">
                            <div class="resena-header">
                                <div class="resena-info">
                                    <h4>${resena.nombre}</h4>
                                    <span class="resena-date">${resena.fecha}</span>
                                </div>
                            </div>
                            <p class="resena-text">${resena.texto}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Función para ver más reseñas (por ahora solo muestra un mensaje)
function verMasResenas() {
    notifyInfo('Próximamente podrás ver todas las reseñas de nuestros clientes.');
}

// Inicializar sección reseñas
document.addEventListener('DOMContentLoaded', () => {
    renderResenas();
    cargarResenasDesdeAPI(); // Cargar datos reales del backend
    
    // Rotar reseñas cada 15 segundos
    setInterval(() => {
        cargarResenasDesdeAPI();
    }, 15000);
});