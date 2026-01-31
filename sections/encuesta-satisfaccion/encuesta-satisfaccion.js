/**
 * Encuesta de Satisfacción - Lógica de la aplicación
 * 
 * Maneja el formulario de encuesta de satisfacción del cliente
 * con validaciones, escalas de rating y envío al backend.
 */

let token = null;
const respuestas = {
    satisfaccionGeneral: 0,
    cumplioExpectativas: 0,
    recomendaria: 0,
    volveria: 0
};

/**
 * Cargar formulario con token de URL
 */
function cargarFormulario() {
    const urlParams = new URLSearchParams(window.location.search);
    token = urlParams.get('token');

    const formContainer = document.getElementById('form-container');

    if (!token) {
        mostrarError('Token inválido. Por favor, usa el link que recibiste por WhatsApp.');
        return;
    }

    formContainer.innerHTML = `
        <form id="encuesta-form" onsubmit="enviarEncuesta(event)">
            <!-- Aviso de privacidad -->
            <div class="aviso-privado">
                <span class="icono-info">🔒</span>
                <p><strong>Encuesta Confidencial:</strong> Tus respuestas son privadas y solo serán vistas por los administradores para mejorar el servicio.</p>
            </div>

            <!-- Sección 1: Preguntas Principales -->
            <div class="form-section">
                <h3 class="section-title">Evaluación General</h3>
                <p class="section-subtitle">Las siguientes preguntas son obligatorias</p>

                <div class="form-group">
                    <label class="form-label">1️⃣ ¿Qué tan satisfecho/a quedaste con el quincho?</label>
                    <div class="rating-container" id="rating-satisfaccion"></div>
                </div>

                <div class="form-group">
                    <label class="form-label">2️⃣ ¿El quincho cumplió tus expectativas?</label>
                    <div class="rating-container" id="rating-expectativas"></div>
                </div>

                <div class="form-group">
                    <label class="form-label">3️⃣ ¿Qué tan probable es que recomiendes el quincho a un amigo o familiar?</label>
                    <div class="rating-container" id="rating-recomendaria"></div>
                </div>

                <div class="form-group">
                    <label class="form-label">4️⃣ ¿Qué tan probable es que vuelvas a usar este quincho?</label>
                    <div class="rating-container" id="rating-volveria"></div>
                </div>

                <div class="form-group">
                    <label class="form-label">¿Por qué? (opcional)</label>
                    <textarea 
                        class="form-textarea" 
                        id="porQueRecomendaria"
                        placeholder="Contanos tu opinión..."
                        maxlength="500"
                    ></textarea>
                </div>
            </div>

            <!-- Sección 2: Comentarios Rápidos -->
            <div class="form-section">
                <h3 class="section-title">Comentarios Rápidos</h3>
                <p class="section-subtitle">Opcional - Tu feedback es muy valioso</p>

                <div class="form-group">
                    <label class="form-label">✍️ ¿Qué fue lo que más te gustó?</label>
                    <textarea 
                        class="form-textarea" 
                        id="queGusto"
                        placeholder="Contanos qué te encantó del quincho..."
                        maxlength="500"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">✍️ ¿Qué mejorarías o cambiarías?</label>
                    <textarea 
                        class="form-textarea" 
                        id="queMejorar"
                        placeholder="Sugerencias para mejorar..."
                        maxlength="500"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">✍️ ¿Qué le agregarías?</label>
                    <textarea 
                        class="form-textarea" 
                        id="queAgregar"
                        placeholder="Ideas de cosas que te gustaría que tenga..."
                        maxlength="500"
                    ></textarea>
                </div>
            </div>

            <button type="submit" class="btn-enviar" id="btn-enviar">
                ENVIAR ENCUESTA
            </button>
        </form>
    `;

    // Renderizar escalas de rating
    renderRatingScale('rating-satisfaccion', 'satisfaccionGeneral', true);
    renderRatingScale('rating-expectativas', 'cumplioExpectativas', true);
    renderRatingScale('rating-recomendaria', 'recomendaria', true);
    renderRatingScale('rating-volveria', 'volveria', true);
}

/**
 * Renderizar escala de rating (1-5) para una pregunta
 * @param {string} containerId - ID del contenedor
 * @param {string} field - Campo de respuestas a actualizar
 * @param {boolean} isRequired - Si es obligatorio
 */
function renderRatingScale(containerId, field, isRequired) {
    const container = document.getElementById(containerId);
    const labels = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
    
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement('div');
        option.className = 'rating-option';
        option.innerHTML = `
            <button type="button" class="rating-btn" data-value="${i}" data-field="${field}">
                ${i}
            </button>
            <span class="rating-label">${labels[i-1]}</span>
        `;
        container.appendChild(option);
        
        const btn = option.querySelector('.rating-btn');
        btn.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            const field = this.dataset.field;
            
            // Guardar respuesta
            respuestas[field] = value;
            
            // Actualizar UI
            container.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    }
}

/**
 * Enviar encuesta al backend
 * @param {Event} event - Evento del formulario
 */
async function enviarEncuesta(event) {
    event.preventDefault();

    // Validar preguntas obligatorias
    if (!respuestas.satisfaccionGeneral || !respuestas.cumplioExpectativas || 
        !respuestas.recomendaria || !respuestas.volveria) {
        mostrarError('Por favor, responde todas las preguntas obligatorias (1-4)');
        return;
    }

    const btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.disabled = true;
    btnEnviar.textContent = 'ENVIANDO...';

    try {
        const encuestaData = {
            token: token,
            satisfaccionGeneral: respuestas.satisfaccionGeneral,
            cumplioExpectativas: respuestas.cumplioExpectativas,
            recomendaria: respuestas.recomendaria,
            volveria: respuestas.volveria,
            porQueRecomendaria: document.getElementById('porQueRecomendaria').value || null,
            queGusto: document.getElementById('queGusto').value || null,
            queMejorar: document.getElementById('queMejorar').value || null,
            queAgregar: document.getElementById('queAgregar').value || null
        };

        const response = await crearEncuesta(encuestaData);

        if (response && response.success) {
            mostrarExito('¡Gracias por tu tiempo! Tu encuesta ha sido enviada exitosamente.');
            document.getElementById('form-container').innerHTML = `
                <div style="text-align: center; padding: 3rem 2rem;">
                    <div style="font-size: 5rem; margin-bottom: 1.5rem;">✓</div>
                    <h2 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 1rem;">¡Encuesta Completada!</h2>
                    <p style="color: rgba(255,255,255,0.7); line-height: 1.8;">
                        Tu feedback es muy importante para nosotros y nos ayudará a seguir mejorando.
                        <br><br>
                        ¡Esperamos verte pronto!
                    </p>
                </div>
            `;
        } else {
            throw new Error(response?.message || 'Error al enviar la encuesta');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarError(error.message || 'Error al enviar la encuesta. Intentá nuevamente.');
        btnEnviar.disabled = false;
        btnEnviar.textContent = 'ENVIAR ENCUESTA';
    }
}

/**
 * Mostrar mensaje de error
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarError(mensaje) {
    const container = document.getElementById('mensaje-container');
    container.innerHTML = `<div class="mensaje error">${mensaje}</div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Mostrar mensaje de éxito
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarExito(mensaje) {
    const container = document.getElementById('mensaje-container');
    container.innerHTML = `<div class="mensaje exito">${mensaje}</div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cargar formulario al iniciar
document.addEventListener('DOMContentLoaded', cargarFormulario);
