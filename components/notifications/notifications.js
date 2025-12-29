/**
 * Sistema de Notificaciones Personalizadas
 * Reemplaza los alerts nativos del navegador con modales estilizados
 */

// Cola de notificaciones
let notificacionesQueue = [];
let notificacionActual = null;

/**
 * Mostrar notificación personalizada
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo: 'success', 'error', 'warning', 'info', 'confirm'
 * @param {function} onConfirm - Callback para confirmación (solo para tipo confirm)
 * @param {function} onCancel - Callback para cancelación (solo para tipo confirm)
 */
function mostrarNotificacion(mensaje, tipo = 'info', onConfirm = null, onCancel = null) {
    const notificacion = {
        id: Date.now(),
        mensaje,
        tipo,
        onConfirm,
        onCancel
    };

    if (notificacionActual) {
        notificacionesQueue.push(notificacion);
    } else {
        mostrarModal(notificacion);
    }
}

function mostrarModal(notificacion) {
    notificacionActual = notificacion;

    // Crear overlay si no existe
    let overlay = document.getElementById('notification-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'notification-overlay';
        overlay.className = 'notification-overlay';
        document.body.appendChild(overlay);
    }

    // Crear modal
    const modal = document.createElement('div');
    modal.className = `notification-modal ${notificacion.tipo}`;
    modal.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                ${getIcono(notificacion.tipo)}
            </div>
            <div class="notification-body">
                <p class="notification-message">${notificacion.mensaje}</p>
            </div>
            <div class="notification-actions">
                ${getButtons(notificacion)}
            </div>
        </div>
    `;

    overlay.appendChild(modal);
    overlay.style.display = 'flex';

    // Animación de entrada
    setTimeout(() => {
        overlay.classList.add('show');
        modal.classList.add('show');
    }, 10);

    // Agregar event listeners a los botones
    if (notificacion.tipo === 'confirm') {
        const btnConfirm = modal.querySelector('.btn-confirm');
        const btnCancel = modal.querySelector('.btn-cancel');

        btnConfirm.onclick = () => {
            if (notificacion.onConfirm) notificacion.onConfirm();
            cerrarNotificacion();
        };

        btnCancel.onclick = () => {
            if (notificacion.onCancel) notificacion.onCancel();
            cerrarNotificacion();
        };
    } else {
        const btnOk = modal.querySelector('.btn-ok');
        btnOk.onclick = cerrarNotificacion;
    }

    // Cerrar con ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape') {
            cerrarNotificacion();
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

function cerrarNotificacion() {
    const overlay = document.getElementById('notification-overlay');
    if (!overlay) return;

    const modal = overlay.querySelector('.notification-modal');
    
    overlay.classList.remove('show');
    if (modal) modal.classList.remove('show');

    setTimeout(() => {
        overlay.innerHTML = '';
        overlay.style.display = 'none';
        notificacionActual = null;

        // Mostrar siguiente notificación de la cola
        if (notificacionesQueue.length > 0) {
            const siguiente = notificacionesQueue.shift();
            mostrarModal(siguiente);
        }
    }, 300);
}

function getIcono(tipo) {
    const iconos = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ',
        confirm: '?'
    };
    return iconos[tipo] || iconos.info;
}

function getButtons(notificacion) {
    if (notificacion.tipo === 'confirm') {
        return `
            <button class="notification-btn btn-confirm">Confirmar</button>
            <button class="notification-btn btn-cancel">Cancelar</button>
        `;
    }
    return '<button class="notification-btn btn-ok">Aceptar</button>';
}

// Atajos para tipos comunes
function notifySuccess(mensaje) {
    mostrarNotificacion(mensaje, 'success');
}

function notifyError(mensaje) {
    mostrarNotificacion(mensaje, 'error');
}

function notifyWarning(mensaje) {
    mostrarNotificacion(mensaje, 'warning');
}

function notifyInfo(mensaje) {
    mostrarNotificacion(mensaje, 'info');
}

function notifyConfirm(mensaje, onConfirm, onCancel) {
    mostrarNotificacion(mensaje, 'confirm', onConfirm, onCancel);
}
/**
 * Modal con campo de input para solicitar datos al usuario
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} placeholder - Placeholder del input
 * @param {string} defaultValue - Valor por defecto
 * @returns {Promise<string|null>} - Valor ingresado o null si cancela
 */
function notifyPrompt(mensaje, placeholder = '', defaultValue = '') {
    return new Promise((resolve) => {
        // Crear overlay
        let overlay = document.getElementById('notification-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'notification-overlay';
            overlay.className = 'notification-overlay';
            document.body.appendChild(overlay);
        }

        // Crear modal con input
        const modal = document.createElement('div');
        modal.className = 'notification-modal info';
        modal.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ℹ️
                </div>
                <div class="notification-body">
                    <p class="notification-message">${mensaje}</p>
                    <input type="text" id="prompt-input" placeholder="${placeholder}" value="${defaultValue}" 
                           style="width: 100%; padding: 12px; margin-top: 15px; background: rgba(255,255,255,0.05); 
                                  border: 2px solid rgba(212,165,116,0.3); border-radius: 8px; color: #fff; 
                                  font-size: 1rem; outline: none;" />
                </div>
                <div class="notification-actions">
                    <button class="notification-btn btn-cancel" style="background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.8); padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                        Cancelar
                    </button>
                    <button class="notification-btn btn-confirm" style="background: linear-gradient(135deg, #d4a574 0%, #f0d9b5 100%); border: none; color: #000; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">
                        Aceptar
                    </button>
                </div>
            </div>
        `;

        overlay.appendChild(modal);
        overlay.style.display = 'flex';

        // Animación de entrada
        setTimeout(() => {
            overlay.classList.add('show');
            modal.classList.add('show');
            document.getElementById('prompt-input').focus();
        }, 10);

        const input = modal.querySelector('#prompt-input');
        const btnConfirm = modal.querySelector('.btn-confirm');
        const btnCancel = modal.querySelector('.btn-cancel');

        const cerrar = (valor) => {
            overlay.classList.remove('show');
            modal.classList.remove('show');
            setTimeout(() => {
                overlay.innerHTML = '';
                overlay.style.display = 'none';
            }, 300);
            resolve(valor);
        };

        btnConfirm.onclick = () => cerrar(input.value.trim() || null);
        btnCancel.onclick = () => cerrar(null);

        // Enter para confirmar
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                cerrar(input.value.trim() || null);
            }
        });

        // ESC para cancelar
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                cerrar(null);
                document.removeEventListener('keydown', handleEsc);
            }
        };
        document.addEventListener('keydown', handleEsc);
    });
}
// Reemplazar alert y confirm nativos (opcional)
function reemplazarAlertsNativos() {
    window.alertOriginal = window.alert;
    window.confirmOriginal = window.confirm;

    window.alert = function(mensaje) {
        mostrarNotificacion(mensaje, 'info');
    };

    window.confirm = function(mensaje) {
        return new Promise((resolve) => {
            notifyConfirm(mensaje, 
                () => resolve(true),
                () => resolve(false)
            );
        });
    };
}

// Auto-inicializar al cargar el script
document.addEventListener('DOMContentLoaded', () => {
    // No reemplazar automáticamente para mantener compatibilidad
    // Para usar: llamar a reemplazarAlertsNativos() manualmente
});
