// Proteger ruta admin
protegerRutaAdmin();

// Variables globales
let todasLasReservas = [];
let reservasFiltradas = [];
let paginaActual = 1;
let reservasPorPagina = 10;
let ordenActual = { columna: null, direccion: 'asc' };

// Cargar reservas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarReservas();
    configurarFiltros();
    inicializarHeadersOrdenables();
});

/**
 * Cargar todas las reservas desde el backend
 */
async function cargarReservas() {
    const loading = document.getElementById('loading');
    const noData = document.getElementById('no-data');
    const table = document.getElementById('reservas-table');
    
    loading.style.display = 'block';
    noData.style.display = 'none';
    table.style.display = 'none';
    
    try {
        const response = await obtenerTodasLasReservasAdmin();
        const reservas = response.data || [];
        todasLasReservas = reservas;
        reservasFiltradas = reservas;
        
        loading.style.display = 'none';
        
        if (reservas.length === 0) {
            noData.style.display = 'block';
        } else {
            table.style.display = 'table';
            paginaActual = 1;
            renderizarReservas(reservas);
            renderizarPaginacion();
            actualizarEstadisticas(reservas);
        }
    } catch (error) {
        loading.style.display = 'none';
        noData.style.display = 'block';
        notifyError('Error al cargar las reservas: ' + error.message);
    }
}

/**
 * Renderizar reservas en la tabla con paginación
 */
function renderizarReservas(reservas) {
    const tbody = document.getElementById('reservas-tbody');
    tbody.innerHTML = '';
    
    // Calcular índices de paginación
    const inicio = (paginaActual - 1) * reservasPorPagina;
    const fin = inicio + reservasPorPagina;
    const reservasPaginadas = reservas.slice(inicio, fin);
    
    reservasPaginadas.forEach(reserva => {
        const row = document.createElement('tr');
        
        // Parsear fecha (puede venir como array [2025, 1, 15, 18, 0, 0] o string)
        const fechaEvento = parsearFecha(reserva.fechaEvento);
        const fecha = fechaEvento.toLocaleDateString('es-AR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
        const hora = fechaEvento.toLocaleTimeString('es-AR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Parsear hora inicio si viene como array
        let horaEvento = '';
        if (Array.isArray(reserva.horaInicio)) {
            horaEvento = `${String(reserva.horaInicio[0]).padStart(2, '0')}:${String(reserva.horaInicio[1]).padStart(2, '0')}`;
        } else {
            horaEvento = reserva.horaInicio || hora;
        }
        
        row.innerHTML = `
            <td>#${reserva.id}</td>
            <td>${reserva.nombreCliente}</td>
            <td>${reserva.telefonoCliente}</td>
            <td>${reserva.nombreExperiencia}</td>
            <td>${fecha}</td>
            <td>${horaEvento}</td>
            <td>${reserva.horarioContacto || 'N/A'}</td>
            <td>$${reserva.precioTotal.toLocaleString()}</td>
            <td>
                <span class="estado-badge ${reserva.estado}">${formatearEstado(reserva.estado)}</span>
            </td>
            <td>
                <span class="pago-badge ${reserva.estadoPago}">${formatearEstadoPago(reserva.estadoPago)}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-ver" onclick="verDetalle(${reserva.id})">Ver</button>
                    ${reserva.estado !== 'CANCELADA_CLIENTE' && reserva.estado !== 'CANCELADA_ADMIN' ? 
                        `<button class="btn-action btn-estado" onclick="cambiarEstado(${reserva.id})">Estado</button>
                         <button class="btn-action btn-cancelar" onclick="confirmarCancelacion(${reserva.id})">Cancelar</button>` 
                        : ''}
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // Actualizar iconos de ordenamiento en headers
    actualizarIconosOrdenamiento();
}

/**
 * Renderizar controles de paginación
 */
function renderizarPaginacion() {
    const totalPaginas = Math.ceil(reservasFiltradas.length / reservasPorPagina);
    const paginacionContainer = document.getElementById('paginacion');
    
    if (!paginacionContainer) {
        // Crear contenedor si no existe
        const table = document.getElementById('reservas-table');
        const tableContainer = document.querySelector('.reservas-table-container');
        
        if (!table && !tableContainer) {
            console.error('No se encontró la tabla ni el contenedor');
            return;
        }
        
        const container = document.createElement('div');
        container.id = 'paginacion';
        container.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin-top: 1.5rem; padding: 1rem;';
        
        // Insertar después de la tabla si existe, sino después del contenedor
        if (table && table.parentNode) {
            table.parentNode.insertBefore(container, table.nextSibling);
        } else if (tableContainer && tableContainer.parentNode) {
            tableContainer.parentNode.insertBefore(container, tableContainer.nextSibling);
        }
    }
    
    const container = document.getElementById('paginacion');
    container.innerHTML = '';
    
    if (totalPaginas <= 1) return;
    
    // Botón anterior
    const btnAnterior = document.createElement('button');
    btnAnterior.textContent = '« Anterior';
    btnAnterior.className = 'btn-paginacion';
    btnAnterior.disabled = paginaActual === 1;
    btnAnterior.onclick = () => cambiarPagina(paginaActual - 1);
    container.appendChild(btnAnterior);
    
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        if (i === 1 || i === totalPaginas || (i >= paginaActual - 1 && i <= paginaActual + 1)) {
            const btnPagina = document.createElement('button');
            btnPagina.textContent = i;
            btnPagina.className = `btn-paginacion ${i === paginaActual ? 'active' : ''}`;
            btnPagina.onclick = () => cambiarPagina(i);
            container.appendChild(btnPagina);
        } else if (i === paginaActual - 2 || i === paginaActual + 2) {
            const span = document.createElement('span');
            span.textContent = '...';
            span.style.padding = '0 0.5rem';
            container.appendChild(span);
        }
    }
    
    // Botón siguiente
    const btnSiguiente = document.createElement('button');
    btnSiguiente.textContent = 'Siguiente »';
    btnSiguiente.className = 'btn-paginacion';
    btnSiguiente.disabled = paginaActual === totalPaginas;
    btnSiguiente.onclick = () => cambiarPagina(paginaActual + 1);
    container.appendChild(btnSiguiente);
    
    // Info de página
    const info = document.createElement('span');
    info.style.cssText = 'margin-left: 1rem; color: rgba(255,255,255,0.7);';
    info.textContent = `Mostrando ${((paginaActual - 1) * reservasPorPagina) + 1}-${Math.min(paginaActual * reservasPorPagina, reservasFiltradas.length)} de ${reservasFiltradas.length}`;
    container.appendChild(info);
}

/**
 * Cambiar página
 */
function cambiarPagina(nuevaPagina) {
    paginaActual = nuevaPagina;
    renderizarReservas(reservasFiltradas);
    renderizarPaginacion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Ordenar reservas por columna
 */
function ordenarPor(columna) {
    if (ordenActual.columna === columna) {
        ordenActual.direccion = ordenActual.direccion === 'asc' ? 'desc' : 'asc';
    } else {
        ordenActual.columna = columna;
        ordenActual.direccion = 'asc';
    }
    
    reservasFiltradas.sort((a, b) => {
        let valorA, valorB;
        
        switch(columna) {
            case 'id':
            case 'precioTotal':
                valorA = a[columna];
                valorB = b[columna];
                break;
            case 'fechaEvento':
                valorA = parsearFecha(a[columna]).getTime();
                valorB = parsearFecha(b[columna]).getTime();
                break;
            case 'horaInicio':
                valorA = Array.isArray(a[columna]) ? a[columna][0] * 60 + a[columna][1] : 0;
                valorB = Array.isArray(b[columna]) ? b[columna][0] * 60 + b[columna][1] : 0;
                break;
            default:
                valorA = (a[columna] || '').toString().toLowerCase();
                valorB = (b[columna] || '').toString().toLowerCase();
        }
        
        if (valorA < valorB) return ordenActual.direccion === 'asc' ? -1 : 1;
        if (valorA > valorB) return ordenActual.direccion === 'asc' ? 1 : -1;
        return 0;
    });
    
    paginaActual = 1;
    renderizarReservas(reservasFiltradas);
    renderizarPaginacion();
}

/**
 * Actualizar iconos de ordenamiento en los headers de la tabla
 */
function actualizarIconosOrdenamiento() {
    // Remover todos los iconos existentes
    document.querySelectorAll('.sort-icon').forEach(icon => icon.remove());
    
    // Agregar iconos según el estado actual
    const headers = document.querySelectorAll('.reservas-table th[data-column]');
    headers.forEach(th => {
        const columna = th.getAttribute('data-column');
        const icon = document.createElement('span');
        icon.className = 'sort-icon';
        
        if (ordenActual.columna === columna) {
            icon.innerHTML = ordenActual.direccion === 'asc' ? ' ▲' : ' ▼';
            icon.style.color = '#d4a574';
        } else {
            icon.innerHTML = ' ⇅';
            icon.style.color = 'rgba(255,255,255,0.3)';
        }
        
        th.appendChild(icon);
    });
}

/**
 * Inicializar headers ordenables
 */
function inicializarHeadersOrdenables() {
    const headers = document.querySelectorAll('.reservas-table th[data-column]');
    headers.forEach(th => {
        th.style.cursor = 'pointer';
        th.style.userSelect = 'none';
        th.addEventListener('click', () => {
            const columna = th.getAttribute('data-column');
            ordenarPor(columna);
        });
    });
    actualizarIconosOrdenamiento();
}

/**
 * Parsear fecha desde formato array o string
 */
function parsearFecha(fechaArray) {
    if (Array.isArray(fechaArray)) {
        return new Date(
            fechaArray[0], 
            fechaArray[1] - 1, 
            fechaArray[2], 
            fechaArray[3] || 0, 
            fechaArray[4] || 0, 
            fechaArray[5] || 0
        );
    }
    return new Date(fechaArray);
}

/**
 * Formatear estado para mostrar
 */
function formatearEstado(estado) {
    const estados = {
        'PRE_CONFIRMADA': 'Pre-confirmada',
        'CONFIRMADA': 'Confirmada',
        'PAGADA_COMPLETA': 'Pagada',
        'EN_CURSO': 'En Curso',
        'FINALIZADA': 'Finalizada',
        'CANCELADA_CLIENTE': 'Cancelada (Cliente)',
        'CANCELADA_ADMIN': 'Cancelada (Admin)'
    };
    return estados[estado] || estado;
}

/**
 * Formatear estado de pago
 */
function formatearEstadoPago(estado) {
    const estados = {
        'PENDIENTE': 'Pendiente',
        'SENA_PAGADA': 'Seña Pagada',
        'PAGADO_COMPLETO': 'Pago Completo',
        'DEPOSITO_DEVUELTO': 'Depósito Devuelto'
    };
    return estados[estado] || estado;
}

/**
 * Actualizar estadísticas
 */
function actualizarEstadisticas(reservas) {
    const total = reservas.length;
    const preconfirmadas = reservas.filter(r => r.estado === 'PRE_CONFIRMADA').length;
    const confirmadas = reservas.filter(r => r.estado === 'CONFIRMADA').length;
    const finalizadas = reservas.filter(r => r.estado === 'FINALIZADA').length;
    
    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-preconfirmadas').textContent = preconfirmadas;
    document.getElementById('stat-confirmadas').textContent = confirmadas;
    document.getElementById('stat-finalizadas').textContent = finalizadas;
}

/**
 * Configurar filtros de búsqueda
 */
function configurarFiltros() {
    const searchInput = document.getElementById('search-input');
    const filterEstado = document.getElementById('filter-estado');
    
    searchInput.addEventListener('input', aplicarFiltros);
    filterEstado.addEventListener('change', aplicarFiltros);
}

/**
 * Aplicar filtros de búsqueda
 */
function aplicarFiltros() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const estadoFiltro = document.getElementById('filter-estado').value;
    
    reservasFiltradas = todasLasReservas.filter(reserva => {
        const matchSearch = 
            reserva.nombreCliente.toLowerCase().includes(searchTerm) ||
            reserva.telefonoCliente.includes(searchTerm);
        
        const matchEstado = !estadoFiltro || reserva.estado === estadoFiltro;
        
        return matchSearch && matchEstado;
    });
    
    renderizarReservas(reservasFiltradas);
    actualizarEstadisticas(reservasFiltradas);
}

/**
 * Ver detalle de una reserva
 */
function verDetalle(id) {
    const reserva = todasLasReservas.find(r => r.id === id);
    if (!reserva) return;
    
    const fechaEvento = parsearFecha(reserva.fechaEvento);
    const fechaCreacion = parsearFecha(reserva.fechaCreacion);
    
    // Parsear extras de observaciones si existen
    let extrasHTML = '';
    if (reserva.observaciones) {
        try {
            const observacionesObj = JSON.parse(reserva.observaciones);
            if (observacionesObj.extras && observacionesObj.extras.length > 0) {
                extrasHTML = `
                    <div class="detalle-section">
                        <h4>🛒 Extras Seleccionados</h4>
                        <table class="extras-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Cantidad</th>
                                    <th>Precio Unit.</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${observacionesObj.extras.map(extra => `
                                    <tr>
                                        <td>${extra.nombre}</td>
                                        <td>${extra.cantidad}</td>
                                        <td>$${extra.precioUnitario.toLocaleString()}</td>
                                        <td>$${extra.subtotal.toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
            }
        } catch (e) {
            console.log('No hay extras parseables en observaciones');
        }
    }
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="detalle-section">
            <h4>📋 Información de la Reserva</h4>
            <div class="detalle-item">
                <span class="detalle-label">ID:</span>
                <span class="detalle-value">#${reserva.id}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Fecha Creación:</span>
                <span class="detalle-value">${fechaCreacion.toLocaleDateString('es-AR')} ${fechaCreacion.toLocaleTimeString('es-AR')}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Estado:</span>
                <span class="detalle-value">
                    <span class="estado-badge ${reserva.estado}">${formatearEstado(reserva.estado)}</span>
                </span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Estado Pago:</span>
                <span class="detalle-value">
                    <span class="pago-badge ${reserva.estadoPago}">${formatearEstadoPago(reserva.estadoPago)}</span>
                </span>
            </div>
        </div>
        
        <div class="detalle-section">
            <h4>👤 Datos del Cliente</h4>
            <div class="detalle-item">
                <span class="detalle-label">Nombre:</span>
                <span class="detalle-value">${reserva.nombreCliente}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Teléfono:</span>
                <span class="detalle-value">${reserva.telefonoCliente}</span>
            </div>
            ${reserva.emailCliente ? `
            <div class="detalle-item">
                <span class="detalle-label">Email:</span>
                <span class="detalle-value">${reserva.emailCliente}</span>
            </div>
            ` : ''}
            ${reserva.horarioContacto ? `
            <div class="detalle-item">
                <span class="detalle-label">Horario Contacto:</span>
                <span class="detalle-value">${reserva.horarioContacto}</span>
            </div>
            ` : ''}
        </div>
        
        <div class="detalle-section">
            <h4>🎉 Detalles del Evento</h4>
            <div class="detalle-item">
                <span class="detalle-label">Experiencia:</span>
                <span class="detalle-value">${reserva.nombreExperiencia}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Fecha Evento:</span>
                <span class="detalle-value">${fechaEvento.toLocaleDateString('es-AR')}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Hora:</span>
                <span class="detalle-value">${fechaEvento.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        </div>
        
        ${extrasHTML}
        
        <div class="detalle-section">
            <h4>💰 Información de Pago</h4>
            <div class="detalle-item">
                <span class="detalle-label">Precio Experiencia:</span>
                <span class="detalle-value">$${reserva.precioExperiencia.toLocaleString()}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Depósito Garantía:</span>
                <span class="detalle-value">$${reserva.depositoGarantia.toLocaleString()}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Total:</span>
                <span class="detalle-value">$${reserva.precioTotal.toLocaleString()}</span>
            </div>
        </div>
    `;
    
    document.getElementById('modal-detalle').style.display = 'flex';
}

/**
 * Mostrar link de reseña existente
 */
function mostrarLinkResena(token, telefono, nombreCliente) {
    const link = `https://quinchoelumbral.netlify.app/dejar-resena.html?token=${token}`;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="detalle-section" style="text-align: center;">
            <h3 style="color: #d4a574; margin-bottom: 1rem;">🔗 Link de Reseña</h3>
            
            <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; word-break: break-all;">
                <strong>Link:</strong><br>
                <a href="${link}" target="_blank" style="color: #d4a574;">${link}</a>
            </div>
            
            <button class="btn-primary" onclick="copiarAlPortapapeles('${link}')" style="margin-right: 0.5rem;">
                📋 Copiar Link
            </button>
            <button class="btn-primary" onclick="abrirWhatsApp('${telefono}', '${token}', '${nombreCliente}')">
                📱 Enviar por WhatsApp
            </button>
        </div>
    `;
    
    document.getElementById('modal-detalle').style.display = 'flex';
}

/**
 * Mostrar popup con link de encuesta de satisfacción
 */
function mostrarLinkEncuesta(token, telefono, nombreCliente) {
    const link = `https://quinchoelumbral.netlify.app/encuesta-satisfaccion.html?token=${token}`;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="detalle-section" style="text-align: center;">
            <h3 style="color: #d4a574; margin-bottom: 1rem;">📊 Link de Encuesta de Satisfacción</h3>
            
            <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">
                El cliente ya procesó su reseña. Ahora puedes enviarle la encuesta de satisfacción para obtener feedback detallado.
            </p>
            
            <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; word-break: break-all;">
                <strong>Link:</strong><br>
                <a href="${link}" target="_blank" style="color: #d4a574;">${link}</a>
            </div>
            
            <button class="btn-primary" onclick="copiarAlPortapapeles('${link}')" style="margin-right: 0.5rem;">
                📋 Copiar Link
            </button>
            <button class="btn-primary" onclick="abrirWhatsAppEncuesta('${telefono}', '${token}', '${nombreCliente}')">
                📱 Enviar por WhatsApp
            </button>
        </div>
    `;
    
    document.getElementById('modal-detalle').style.display = 'flex';
}

/**
 * Cambiar estado de una reserva
 */
async function cambiarEstado(id) {
    const reserva = todasLasReservas.find(r => r.id === id);
    if (!reserva) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="detalle-section">
            <h3 style="color: #d4a574; margin-bottom: 1.5rem;">⚙️ Gestionar Reserva #${id}</h3>
            
            <div class="detalle-item">
                <span class="detalle-label">Cliente:</span>
                <span class="detalle-value">${reserva.nombreCliente}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Experiencia:</span>
                <span class="detalle-value">${reserva.nombreExperiencia}</span>
            </div>
            <div class="detalle-item">
                <span class="detalle-label">Fecha:</span>
                <span class="detalle-value">${parsearFecha(reserva.fechaEvento).toLocaleDateString('es-AR')}</span>
            </div>
        </div>
        
        <div class="detalle-section">
            <h4>📊 Cambiar Estado de Reserva</h4>
            <div class="detalle-item">
                <span class="detalle-label">Estado Actual:</span>
                <span class="detalle-value">
                    <span class="estado-badge ${reserva.estado}">${formatearEstado(reserva.estado)}</span>
                </span>
            </div>
            
            <div style="margin-top: 1rem;">
                <select id="nuevo-estado" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 2px solid rgba(212,165,116,0.3); border-radius: 8px; color: #fff; font-size: 1rem; margin-bottom: 1rem;">
                    <option value="">-- Seleccionar nuevo estado --</option>
                    <option value="PRE_CONFIRMADA">Pre-confirmada</option>
                    <option value="CONFIRMADA">Confirmada</option>
                    <option value="PAGADA_COMPLETA">Pagada Completa</option>
                    <option value="EN_CURSO">En Curso</option>
                    <option value="FINALIZADA">Finalizada</option>
                </select>
                <button class="btn-primary" onclick="ejecutarCambioEstado(${id})" style="width: 100%; padding: 0.75rem;">
                    ✓ Guardar Estado
                </button>
            </div>
        </div>
        
        <div class="detalle-section">
            <h4>💰 Cambiar Estado de Pago</h4>
            <div class="detalle-item">
                <span class="detalle-label">Estado Actual:</span>
                <span class="detalle-value">
                    <span class="pago-badge ${reserva.estadoPago}">${formatearEstadoPago(reserva.estadoPago)}</span>
                </span>
            </div>
            
            <div style="margin-top: 1rem;">
                <select id="nuevo-estado-pago" style="width: 100%; padding: 0.75rem; background: rgba(255,255,255,0.05); border: 2px solid rgba(212,165,116,0.3); border-radius: 8px; color: #fff; font-size: 1rem; margin-bottom: 1rem;">
                    <option value="">-- Seleccionar nuevo estado --</option>
                    <option value="PENDIENTE">Pendiente</option>
                    <option value="SENA_PAGADA">Seña Pagada</option>
                    <option value="PAGADO_COMPLETO">Pago Completo</option>
                    <option value="DEPOSITO_DEVUELTO">Depósito Devuelto</option>
                </select>
                <button class="btn-primary" onclick="ejecutarCambioEstadoPago(${id})" style="width: 100%; padding: 0.75rem;">
                    ✓ Guardar Estado de Pago
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('modal-detalle').style.display = 'flex';
}

/**
 * Ejecutar cambio de estado de reserva
 */
async function ejecutarCambioEstado(id) {
    const nuevoEstado = document.getElementById('nuevo-estado').value;
    
    if (!nuevoEstado) {
        notifyWarning('Debe seleccionar un estado');
        return;
    }
    
    // Si el nuevo estado es FINALIZADA, usar la función especial que genera el token
    if (nuevoEstado === 'FINALIZADA') {
        cerrarModal();
        await marcarComoFinalizada(id);
        return;
    }
    
    try {
        await actualizarEstadoReserva(id, nuevoEstado);
        notifySuccess('Estado actualizado exitosamente');
        cerrarModal();
        cargarReservas();
    } catch (error) {
        notifyError('Error al actualizar estado: ' + error.message);
    }
}

/**
 * Ejecutar cambio de estado de pago
 */
async function ejecutarCambioEstadoPago(id) {
    const nuevoEstadoPago = document.getElementById('nuevo-estado-pago').value;
    
    if (!nuevoEstadoPago) {
        notifyWarning('Debe seleccionar un estado de pago');
        return;
    }
    
    try {
        await actualizarEstadoPagoReserva(id, nuevoEstadoPago);
        notifySuccess('Estado de pago actualizado exitosamente');
        cerrarModal();
        cargarReservas();
    } catch (error) {
        notifyError('Error al actualizar estado de pago: ' + error.message);
    }
}

/**
 * Confirmar cancelación de reserva
 */
function confirmarCancelacion(id) {
    const reserva = todasLasReservas.find(r => r.id === id);
    if (!reserva) return;
    
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <div class="detalle-section">
            <h4>⚠️ Cancelar Reserva #${id}</h4>
            <p><strong>Cliente:</strong> ${reserva.nombreCliente}</p>
            <p><strong>Fecha Evento:</strong> ${parsearFecha(reserva.fechaEvento).toLocaleDateString('es-AR')}</p>
            <p style="margin-top: 1rem; color: #842029;">
                ¿Está seguro que desea cancelar esta reserva? Esta acción liberará la fecha para que otros clientes puedan reservar.
            </p>
            
            <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
                <button class="btn-secondary" onclick="cerrarModal()">No, volver</button>
                <button class="btn-danger" onclick="ejecutarCancelacion(${id})">Sí, cancelar reserva</button>
            </div>
        </div>
    `;
    
    document.getElementById('modal-detalle').style.display = 'flex';
}

/**
 * Ejecutar cancelación de reserva
 */
async function ejecutarCancelacion(id) {
    try {
        await cancelarReservaAdmin(id);
        notifySuccess('Reserva cancelada exitosamente. La fecha ahora está disponible.');
        cerrarModal();
        cargarReservas();
    } catch (error) {
        notifyError('Error al cancelar reserva: ' + error.message);
    }
}

/**
 * Cerrar modal
 */
function cerrarModal() {
    document.getElementById('modal-detalle').style.display = 'none';
}

/**
 * Cerrar sesión
 */
function logout() {
    notifyConfirm(
        '¿Está seguro que desea cerrar sesión?',
        () => {
            localStorage.removeItem('adminToken');
            window.location.href = 'admin-login.html';
        }
    );
}

// =================== LISTA DE ESPERA ===================
async function verListaEspera() {
    try {
        const response = await obtenerListaEspera();
        const listaEspera = response.data || [];
        
        if (!listaEspera || listaEspera.length === 0) {
            notifyInfo('No hay personas en la lista de espera.');
            return;
        }

        // Crear contenido del modal estilizado tipo cards
        const modalContent = `
            <div class="detalle-section">
                <h3 style="color: #d4a574; margin-bottom: 1.5rem; text-align: center;">📋 Lista de Espera</h3>
                <p style="text-align: center; color: rgba(255,255,255,0.7); margin-bottom: 1.5rem;">
                    ${listaEspera.length} ${listaEspera.length === 1 ? 'persona' : 'personas'} esperando disponibilidad
                </p>
            </div>
            
            <div style="max-height: 60vh; overflow-y: auto; margin-top: 1rem;">
                ${listaEspera.map(item => `
                    <div class="detalle-section" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(212,165,116,0.2); border-radius: 10px; padding: 1.5rem; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                            <div>
                                <h4 style="color: #d4a574; margin: 0 0 0.5rem 0;">${item.nombreCliente}</h4>
                                <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 0.9rem;">ID: #${item.id}</p>
                            </div>
                            <span style="padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.8rem; ${item.notificado ? 'background: rgba(76,175,80,0.2); color: #4caf50;' : 'background: rgba(255,152,0,0.2); color: #ff9800;'}">
                                ${item.notificado ? '✓ Notificado' : '⏳ Pendiente'}
                            </span>
                        </div>
                        
                        <div class="detalle-item" style="margin: 0.5rem 0;">
                            <span class="detalle-label">📞 Teléfono:</span>
                            <span class="detalle-value" style="color: #d4a574;">${item.telefono}</span>
                        </div>
                        
                        <div class="detalle-item" style="margin: 0.5rem 0;">
                            <span class="detalle-label">🎉 Experiencia:</span>
                            <span class="detalle-value">${item.experiencia?.nombre || 'N/A'}</span>
                        </div>
                        
                        <div class="detalle-item" style="margin: 0.5rem 0;">
                            <span class="detalle-label">📅 Fecha deseada:</span>
                            <span class="detalle-value">${formatearFecha(item.fechaDeseada)}</span>
                        </div>
                        
                        <div class="detalle-item" style="margin: 0.5rem 0;">
                            <span class="detalle-label">🕐 Hora deseada:</span>
                            <span class="detalle-value">${item.horaDeseada || 'N/A'}</span>
                        </div>
                        
                        <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap;">
                            <button onclick='convertirAReserva(${JSON.stringify(item).replace(/'/g, "&apos;")})' 
                                    class="btn-primary" style="flex: 1; min-width: 150px; padding: 0.75rem; font-size: 0.9rem;">
                                📅 Convertir a Reserva
                            </button>
                            ${!item.notificado ? `
                                <button onclick="marcarComoNotificado(${item.id})" 
                                        class="btn-action btn-ver" style="flex: 1; min-width: 120px; padding: 0.75rem; font-size: 0.9rem;">
                                    ✓ Marcar Notificado
                                </button>
                            ` : ''}
                            <button onclick="eliminarDeListaEspera(${item.id})" 
                                    class="btn-action btn-cancelar" style="padding: 0.75rem; font-size: 0.9rem;">
                                🗑️ Eliminar
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Mostrar en el modal existente
        const modal = document.getElementById('modal-detalle');
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = modalContent;
        modal.style.display = 'flex';
    } catch (error) {
        console.error('Error al cargar lista de espera:', error);
        notifyError('Error al cargar la lista de espera. Verifica la conexión con el servidor.');
    }
}

async function marcarComoNotificado(id) {
    notifyConfirm(
        '¿Marcar como notificado?',
        async () => {
            try {
                await marcarNotificado(id);
                notifySuccess('✓ Marcado como notificado exitosamente');
                verListaEspera(); // Recargar la lista
            } catch (error) {
                console.error('Error al marcar como notificado:', error);
                notifyError('Error al marcar como notificado');
            }
        }
    );
}

async function eliminarDeListaEspera(id) {
    notifyConfirm(
        '¿Está seguro de eliminar esta entrada de la lista de espera?',
        async () => {
            try {
                await eliminarEntradaListaEspera(id);
                notifySuccess('✓ Entrada eliminada exitosamente');
                verListaEspera(); // Recargar la lista
            } catch (error) {
                console.error('Error al eliminar entrada:', error);
                notifyError('Error al eliminar la entrada');
            }
        }
    );
}

async function convertirAReserva(item) {
    try {
        console.log('=== CONVERTIR A RESERVA ===');
        console.log('Item recibido:', item);
        console.log('Tipo de item:', typeof item);
        
        // Si viene como string (desde onclick), parsearlo
        if (typeof item === 'string') {
            try {
                item = JSON.parse(item);
                console.log('Item parseado:', item);
            } catch (e) {
                console.error('Error al parsear item:', e);
                notifyError('❌ Error al procesar los datos de la lista de espera');
                return;
            }
        }
        
        // Formatear la fecha correctamente (puede venir como array [2026,1,7] o string)
        let fechaFormateada;
        if (Array.isArray(item.fechaDeseada)) {
            // Si viene como array [año, mes, día], convertir a YYYY-MM-DD
            const [year, month, day] = item.fechaDeseada;
            fechaFormateada = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        } else {
            // Si ya es string, usarla directamente
            fechaFormateada = item.fechaDeseada;
        }
        
        console.log('Fecha formateada para verificación:', fechaFormateada);
        console.log('Hora para verificación:', item.horaDeseada);
        
        // Verificar disponibilidad
        console.log('Verificando disponibilidad para:', fechaFormateada, item.horaDeseada);
        const response = await verificarDisponibilidadAPI(fechaFormateada, item.horaDeseada);
        console.log('Respuesta de disponibilidad:', response);
        console.log('response.data:', response?.data);
        console.log('response.data.disponible:', response?.data?.disponible);
        
        if (!response || !response.success || !response.data || !response.data.disponible) {
            const mensaje = response?.data?.mensaje || 'Fecha ocupada';
            console.log('❌ Fecha NO disponible - mostrando error');
            console.log('Llamando a notifyError con mensaje:', `❌ No se puede convertir a reserva\n\nLa fecha ${formatearFecha(item.fechaDeseada)} a las ${item.horaDeseada} todavía está ocupada.\n\nMotivo: ${mensaje}\n\nDebes esperar a que se libere la fecha o eliminar esta entrada de lista de espera.`);
            
            // Cerrar el modal de lista de espera antes de mostrar el error
            cerrarModal();
            
            // Esperar un momento para que el modal se cierre completamente
            setTimeout(() => {
                notifyError(`❌ No se puede convertir a reserva\n\nLa fecha ${formatearFecha(item.fechaDeseada)} a las ${item.horaDeseada} todavía está ocupada.\n\nMotivo: ${mensaje}\n\nDebes esperar a que se libere la fecha o eliminar esta entrada de lista de espera.`);
            }, 350);
            
            console.log('notifyError ejecutado');
            return;
        }
        
        console.log('✅ Fecha disponible - mostrando confirmación');
        
        // Confirmar conversión
        notifyConfirm(
            `¿Convertir a reserva?\n\nCliente: ${item.nombreCliente}\nFecha: ${formatearFecha(item.fechaDeseada)}\nHora: ${item.horaDeseada}\nExperiencia: ${item.experiencia?.nombre || 'N/A'}`,
            async () => {
                try {
                    // Crear la reserva
                    const reservaData = {
                        cliente: {
                            nombre: item.nombreCliente,
                            telefono: item.telefono,
                            email: item.email
                        },
                        experienciaId: item.experiencia?.id,
                        fechaEvento: fechaFormateada,
                        horaInicio: [item.horaDeseada], // Array con la hora
                        itemsSeleccionados: [], // Sin items adicionales por defecto
                        observaciones: `Convertida desde lista de espera #${item.id}`
                    };
                    
                    await crearReserva(reservaData);
                    
                    // Eliminar de lista de espera
                    await eliminarEntradaListaEspera(item.id);
                    
                    notifySuccess('✅ ¡Reserva creada exitosamente!\n\nLa entrada ha sido eliminada de la lista de espera.');
                    
                    // Recargar ambas listas
                    verListaEspera();
                    cargarReservas();
                } catch (innerError) {
                    console.error('Error al convertir a reserva:', innerError);
                    notifyError('❌ Error al convertir a reserva: ' + (innerError.message || 'Error desconocido'));
                }
            }
        );
        
    } catch (error) {
        console.error('Error al convertir a reserva:', error);
        notifyError('❌ Error al convertir a reserva: ' + (error.message || 'Error desconocido'));
    }
}

function formatearFecha(fecha) {
    if (!fecha) return 'N/A';
    
    let date;
    if (Array.isArray(fecha)) {
        // Backend devuelve: [año, mes, día, hora, minuto, segundo, nano]
        const [year, month, day] = fecha;
        date = new Date(year, month - 1, day); // mes-1 porque Date usa 0-11
    } else {
        date = new Date(fecha);
    }
    
    return date.toLocaleDateString('es-AR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}
/**
 * Ver y gestionar reseñas
 */
async function verResenas() {
    try {
        const response = await obtenerTodasLasResenasAdmin();
        
        if (!response.success) {
            notifyError('❌ Error al cargar reseñas');
            return;
        }

        const resenas = response.data || [];
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="lista-section">
                <h3>⭐ Gestión de Reseñas</h3>
                <div class="stats">
                    <span>Total: ${resenas.length}</span>
                    <span>Aprobadas: ${resenas.filter(r => r.aprobada).length}</span>
                    <span>Pendientes: ${resenas.filter(r => !r.aprobada).length}</span>
                </div>
                <table class="tabla-lista">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Calificación</th>
                            <th>Comentario</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-resenas-body">
                        ${resenas.length === 0 
                            ? '<tr><td colspan="7" style="text-align: center; padding: 2rem;">No hay reseñas disponibles</td></tr>'
                            : resenas.map(r => `
                                <tr>
                                    <td>#${r.id}</td>
                                    <td>${r.nombreCliente || 'Anónimo'}</td>
                                    <td>${generarEstrellas(r.calificacion)}</td>
                                    <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${r.comentario}</td>
                                    <td>${formatearFecha(r.fechaCreacion)}</td>
                                    <td>
                                        <span class="estado ${r.aprobada ? 'confirmada' : 'preconfirmada'}">
                                            ${r.aprobada ? '✅ Aprobada' : '⏳ Pendiente'}
                                        </span>
                                    </td>
                                    <td>
                                        ${!r.aprobada 
                                            ? `<button class="btn-accion btn-confirmar" onclick="aprobarResenaBtn(${r.id})">✅ Aprobar</button>`
                                            : `<button class="btn-accion btn-cancelar" onclick="rechazarResenaBtn(${r.id})">❌ Rechazar</button>`
                                        }
                                        <button class="btn-accion btn-eliminar" onclick="eliminarResenaBtn(${r.id})">🗑️ Eliminar</button>
                                    </td>
                                </tr>
                            `).join('')
                        }
                    </tbody>
                </table>
            </div>
        `;

        // Mostrar en el modal existente
        const modal = document.getElementById('modal-detalle');
        modal.style.display = 'flex';
    } catch (error) {
        console.error('Error al cargar reseñas:', error);
        notifyError('❌ Error al cargar reseñas');
    }
}

/**
 * Generar visualización de estrellas
 */
function generarEstrellas(calificacion) {
    const estrellas = '★'.repeat(calificacion) + '☆'.repeat(5 - calificacion);
    return `<span style="color: #d4a574; font-size: 1.2rem;">${estrellas}</span>`;
}

/**
 * Aprobar una reseña
 */
async function aprobarResenaBtn(id) {
    notifyConfirm(
        '¿Aprobar esta reseña para que sea visible públicamente?',
        async () => {
            try {
                const response = await aprobarResena(id);
                
                if (response.success) {
                    notifySuccess('✅ Reseña aprobada exitosamente');
                    verResenas(); // Recargar lista
                    
                    // Si la respuesta incluye token de encuesta, mostrar popup
                    if (response.data && response.data.encuestaToken) {
                        mostrarLinkEncuesta(
                            response.data.encuestaToken,
                            response.data.telefonoCliente,
                            response.data.nombreCliente
                        );
                    }
                } else {
                    notifyError('❌ Error al aprobar reseña');
                }
            } catch (error) {
                console.error('Error al aprobar reseña:', error);
                notifyError('❌ Error al aprobar reseña');
            }
        }
    );
}

/**
 * Rechazar/ocultar una reseña
 */
async function rechazarResenaBtn(id) {
    notifyConfirm(
        '¿Rechazar/ocultar esta reseña?',
        async () => {
            try {
                const response = await rechazarResena(id);
                
                if (response.success) {
                    notifySuccess('✅ Reseña rechazada exitosamente');
                    verResenas(); // Recargar lista
                    
                    // Si la respuesta incluye token de encuesta, mostrar popup
                    if (response.data && response.data.encuestaToken) {
                        mostrarLinkEncuesta(
                            response.data.encuestaToken,
                            response.data.telefonoCliente,
                            response.data.nombreCliente
                        );
                    }
                } else {
                    notifyError('❌ Error al rechazar reseña');
                }
            } catch (error) {
                console.error('Error al rechazar reseña:', error);
                notifyError('❌ Error al rechazar reseña');
            }
        }
    );
}

/**
 * Eliminar permanentemente una reseña
 */
async function eliminarResenaBtn(id) {
    notifyConfirm(
        '⚠️ ¿ELIMINAR permanentemente esta reseña?\n\nEsta acción NO se puede deshacer.',
        async () => {
            try {
                const response = await eliminarResena(id);
                
                if (response.success) {
                    notifySuccess('✅ Reseña eliminada exitosamente');
                    verResenas(); // Recargar lista
                    
                    // Si la respuesta incluye token de encuesta, mostrar popup
                    if (response.data && response.data.encuestaToken) {
                        mostrarLinkEncuesta(
                            response.data.encuestaToken,
                            response.data.telefonoCliente,
                            response.data.nombreCliente
                        );
                    }
                } else {
                    notifyError('❌ Error al eliminar reseña');
                }
            } catch (error) {
                console.error('Error al eliminar reseña:', error);
                notifyError('❌ Error al eliminar reseña');
            }
        }
    );
}

/**
 * Marcar reserva como finalizada y generar token de reseña
 */
async function marcarComoFinalizada(id) {
    notifyConfirm(
        '¿Marcar esta reserva como finalizada?\n\nSe generará un link único para que el cliente deje su reseña.',
        async () => {
            try {
        const response = await apiRequest(`/reservas/${id}/finalizar`, {
            method: 'PUT',
            requiresAuth: true
        });
        
        if (response.success) {
            const token = response.data.resenaToken;
            const link = `https://quinchoelumbral.netlify.app/dejar-resena.html?token=${token}`;
            
            // Crear modal personalizado con el link
            const modalBody = document.getElementById('modal-body');
            modalBody.innerHTML = `
                <div class="detalle-section" style="text-align: center;">
                    <h3 style="color: #d4a574; margin-bottom: 1rem;">✅ Reserva Finalizada</h3>
                    <p style="margin-bottom: 1.5rem;">Link de reseña generado exitosamente</p>
                    
                    <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; word-break: break-all;">
                        <strong>Link:</strong><br>
                        <a href="${link}" target="_blank" style="color: #d4a574;">${link}</a>
                    </div>
                    
                    <button class="btn-primary" onclick="copiarAlPortapapeles('${link}')" style="margin-right: 0.5rem;">
                        📋 Copiar Link
                    </button>
                    <button class="btn-primary" onclick="abrirWhatsApp('${response.data.telefonoCliente}', '${token}', '${response.data.nombreCliente}')">
                        📱 Enviar por WhatsApp
                    </button>
                </div>
            `;
            
            document.getElementById('modal-detalle').style.display = 'flex';
            
            // Recargar lista de reservas
            cargarReservas();
        } else {
            notifyError('❌ Error al finalizar reserva: ' + (response.message || 'Error desconocido'));
        }
    } catch (error) {
        console.error('Error al finalizar reserva:', error);
        notifyError('❌ Error al finalizar reserva: ' + (error.message || 'Error desconocido'));
    }
        }
    );
}

/**
 * Ver y gestionar encuestas de satisfacción
 */
async function verEncuestas() {
    try {
        // Cargar encuestas y estadísticas en paralelo
        const [encuestasResponse, estadisticasResponse] = await Promise.all([
            obtenerTodasLasEncuestas(),
            obtenerEstadisticasEncuestas()
        ]);
        
        if (!encuestasResponse.success) {
            notifyError('❌ Error al cargar encuestas');
            return;
        }

        const encuestas = encuestasResponse.data || [];
        const stats = estadisticasResponse.success ? estadisticasResponse.data : {};
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="lista-section">
                <h3>📊 Gestión de Encuestas de Satisfacción</h3>
                
                <!-- Estadísticas Generales -->
                <div class="encuestas-estadisticas" style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 1.5rem; border-radius: 10px; margin-bottom: 1.5rem; border: 1px solid #d4a574;">
                    <h4 style="color: #d4a574; margin-bottom: 1rem;">📈 Estadísticas Globales</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div style="background: rgba(212, 165, 116, 0.1); padding: 1rem; border-radius: 8px; text-align: center;">
                            <div style="font-size: 0.9rem; color: #999; margin-bottom: 0.5rem;">Total Encuestas</div>
                            <div style="font-size: 2rem; color: #d4a574; font-weight: bold;">${stats.totalEncuestas || 0}</div>
                        </div>
                        <div style="background: rgba(212, 165, 116, 0.1); padding: 1rem; border-radius: 8px; text-align: center;">
                            <div style="font-size: 0.9rem; color: #999; margin-bottom: 0.5rem;">NPS Score</div>
                            <div style="font-size: 2rem; color: ${(stats.npsScore || 0) >= 50 ? '#4caf50' : (stats.npsScore || 0) >= 0 ? '#ff9800' : '#f44336'}; font-weight: bold;">
                                ${stats.npsScore !== undefined ? stats.npsScore.toFixed(1) : 'N/A'}
                            </div>
                        </div>
                        <div style="background: rgba(212, 165, 116, 0.1); padding: 1rem; border-radius: 8px; text-align: center;">
                            <div style="font-size: 0.9rem; color: #999; margin-bottom: 0.5rem;">Satisfacción General</div>
                            <div style="font-size: 2rem; color: #d4a574; font-weight: bold;">${stats.promedioSatisfaccionGeneral !== undefined ? stats.promedioSatisfaccionGeneral.toFixed(1) : 'N/A'}/5</div>
                        </div>
                        <div style="background: rgba(212, 165, 116, 0.1); padding: 1rem; border-radius: 8px; text-align: center;">
                            <div style="font-size: 0.9rem; color: #999; margin-bottom: 0.5rem;">Recomendación</div>
                            <div style="font-size: 2rem; color: #d4a574; font-weight: bold;">${stats.promedioRecomendaria !== undefined ? stats.promedioRecomendaria.toFixed(1) : 'N/A'}/5</div>
                        </div>
                    </div>
                </div>
                
                <!-- Tabla de Encuestas -->
                <table class="tabla-lista">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Satisfacción</th>
                            <th>Recomendaría</th>
                            <th>Volvería</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-encuestas-body">
                        ${encuestas.length === 0 
                            ? '<tr><td colspan="7" style="text-align: center; padding: 2rem;">No hay encuestas disponibles</td></tr>'
                            : encuestas.map(e => `
                                <tr>
                                    <td>#${e.id}</td>
                                    <td>${e.nombreCliente || 'Anónimo'}</td>
                                    <td>${formatearFecha(e.fechaRespuesta)}</td>
                                    <td>${generarEscalaColor(e.satisfaccionGeneral)}</td>
                                    <td>${generarEscalaColor(e.recomendaria)}</td>
                                    <td>${generarEscalaColor(e.volveria)}</td>
                                    <td>
                                        <button class="btn-accion btn-ver" onclick="verDetalleEncuesta(${e.id})">👁️ Ver</button>
                                    </td>
                                </tr>
                            `).join('')
                        }
                    </tbody>
                </table>
            </div>
        `;

        // Mostrar en el modal existente
        const modal = document.getElementById('modal-detalle');
        modal.style.display = 'flex';
    } catch (error) {
        console.error('Error al cargar encuestas:', error);
        notifyError('❌ Error al cargar encuestas');
    }
}

/**
 * Ver detalle completo de una encuesta
 */
async function verDetalleEncuesta(id) {
    try {
        const response = await obtenerTodasLasEncuestas();
        if (!response.success) {
            notifyError('❌ Error al cargar detalle');
            return;
        }
        
        const encuesta = response.data.find(e => e.id === id);
        if (!encuesta) {
            notifyError('❌ Encuesta no encontrada');
            return;
        }
        
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="detalle-encuesta" style="max-width: 700px; margin: 0 auto;">
                <button class="btn-secondary" onclick="verEncuestas()" style="margin-bottom: 1rem;">← Volver a lista</button>
                
                <h3 style="color: #d4a574; margin-bottom: 1.5rem;">📊 Detalle de Encuesta #${encuesta.id}</h3>
                
                <!-- Info Cliente y Reserva -->
                <div style="background: rgba(212, 165, 116, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <p><strong>Cliente:</strong> ${encuesta.nombreCliente || 'Anónimo'}</p>
                    <p><strong>Teléfono:</strong> ${encuesta.telefonoCliente || 'N/A'}</p>
                    <p><strong>Reserva ID:</strong> #${encuesta.reservaId || 'N/A'}</p>
                    <p><strong>Fecha Respuesta:</strong> ${formatearFecha(encuesta.fechaRespuesta)}</p>
                </div>
                
                <!-- Evaluación General -->
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #d4a574; margin-bottom: 1rem;">⭐ Evaluación General</h4>
                    <div style="background: #1a1a1a; padding: 1rem; border-radius: 8px;">
                        ${renderizarCampoEscala('Satisfacción General', encuesta.satisfaccionGeneral)}
                        ${renderizarCampoEscala('Cumplió Expectativas', encuesta.cumplioExpectativas)}
                        ${renderizarCampoEscala('Recomendaría El Umbral', encuesta.recomendaria)}
                        ${renderizarCampoEscala('Volvería a Visitarnos', encuesta.volveria)}
                    </div>
                </div>
                
                <!-- Comentarios y Feedback -->
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: #d4a574; margin-bottom: 1rem;">💬 Comentarios Detallados</h4>
                    ${encuesta.porQueRecomendaria ? `
                        <div style="background: #1a1a1a; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <strong style="color: #d4a574;">¿Por qué recomendarías El Umbral?</strong>
                            <p style="margin-top: 0.5rem; line-height: 1.6;">${encuesta.porQueRecomendaria}</p>
                        </div>
                    ` : ''}
                    ${encuesta.queGusto ? `
                        <div style="background: #1a1a1a; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <strong style="color: #4caf50;">✅ ¿Qué fue lo que más te gustó?</strong>
                            <p style="margin-top: 0.5rem; line-height: 1.6;">${encuesta.queGusto}</p>
                        </div>
                    ` : ''}
                    ${encuesta.queMejorar ? `
                        <div style="background: #1a1a1a; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <strong style="color: #ff9800;">⚠️ ¿Qué podríamos mejorar?</strong>
                            <p style="margin-top: 0.5rem; line-height: 1.6;">${encuesta.queMejorar}</p>
                        </div>
                    ` : ''}
                    ${encuesta.queAgregar ? `
                        <div style="background: #1a1a1a; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                            <strong style="color: #2196f3;">💡 ¿Qué te gustaría que agreguemos?</strong>
                            <p style="margin-top: 0.5rem; line-height: 1.6;">${encuesta.queAgregar}</p>
                        </div>
                    ` : ''}
                    ${!encuesta.porQueRecomendaria && !encuesta.queGusto && !encuesta.queMejorar && !encuesta.queAgregar ? 
                        '<p style="color: #999; font-style: italic;">No se proporcionaron comentarios adicionales</p>' : ''
                    }
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error al cargar detalle:', error);
        notifyError('❌ Error al cargar detalle');
    }
}

/**
 * Renderizar campo de escala (1-5) con visualización
 */
function renderizarCampoEscala(label, valor) {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid rgba(212, 165, 116, 0.2);">
            <span style="color: #ccc;">${label}:</span>
            <span>${generarEscalaColor(valor)}</span>
        </div>
    `;
}

/**
 * Generar visualización de escala con color
 */
function generarEscalaColor(valor) {
    if (!valor) return '<span style="color: #999;">N/A</span>';
    
    const colores = {
        1: '#f44336',
        2: '#ff9800',
        3: '#ffc107',
        4: '#8bc34a',
        5: '#4caf50'
    };
    
    const color = colores[valor] || '#999';
    const circulos = [];
    
    for (let i = 1; i <= 5; i++) {
        circulos.push(`<span style="color: ${i <= valor ? color : '#333'}; font-size: 1.2rem;">${i <= valor ? '●' : '○'}</span>`);
    }
    
    return `
        <div style="display: inline-flex; align-items: center; gap: 0.25rem;">
            ${circulos.join('')}
            <strong style="color: ${color}; margin-left: 0.5rem;">${valor}/5</strong>
        </div>
    `;
}

/**
 * Copiar texto al portapapeles
 */
function copiarAlPortapapeles(texto) {
    navigator.clipboard.writeText(texto).then(() => {
        notifySuccess('✅ Link copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar:', err);
        notifyError('❌ No se pudo copiar al portapapeles');
        alert('❌ No se pudo copiar al portapapeles');
    });
}

/**
 * Abrir WhatsApp con mensaje pre-formateado
 */
function abrirWhatsApp(telefono, token, nombreCliente) {
    // Eliminar caracteres no numéricos
    const telefonoLimpio = telefono.replace(/\D/g, '');
    
    // Mensaje personalizado
    const mensaje = `¡Hola ${nombreCliente}! Gracias por visitarnos en El Umbral del Quincho. 🎉\n\nNos encantaría conocer tu experiencia. Por favor, dejanos tu reseña en el siguiente link:\n\nhttps://quinchoelumbral.netlify.app/dejar-resena.html?token=${token}\n\n¡Esperamos verte pronto! 🌟`;
    
    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Abrir WhatsApp
    const whatsappLink = `https://wa.me/${telefonoLimpio}?text=${mensajeCodificado}`;
    window.open(whatsappLink, '_blank');
}

/**
 * Abrir WhatsApp con link de encuesta de satisfacción
 */
function abrirWhatsAppEncuesta(telefono, token, nombreCliente) {
    // Eliminar caracteres no numéricos
    const telefonoLimpio = telefono.replace(/\D/g, '');
    
    // Mensaje personalizado para encuesta
    const mensaje = `¡Hola ${nombreCliente}! Gracias por tu reseña. 📊\n\nNos ayudarías mucho completando esta breve encuesta de satisfacción. Tu opinión es muy importante para seguir mejorando:\n\nhttps://quinchoelumbral.netlify.app/encuesta-satisfaccion.html?token=${token}\n\n¡Gracias por tu tiempo! 🌟`;
    
    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Abrir WhatsApp
    const whatsappLink = `https://wa.me/${telefonoLimpio}?text=${mensajeCodificado}`;
    window.open(whatsappLink, '_blank');
}

/**
 * Renderizar reservas adaptable (tabla o cards según tamaño de pantalla)
 */
function renderizarReservasResponsive() {
    const isMobile = window.innerWidth <= 480;
    const container = document.querySelector('.reservas-table-container');
    
    if (isMobile && !container.classList.contains('mobile-cards')) {
        // Cambiar a modo cards
        container.classList.add('mobile-cards');
        renderizarReservasCards(reservasFiltradas);
    } else if (!isMobile && container.classList.contains('mobile-cards')) {
        // Volver a modo tabla
        container.classList.remove('mobile-cards');
        renderizarReservas(reservasFiltradas);
    }
}

/**
 * Renderizar reservas como cards para móvil
 */
function renderizarReservasCards(reservas) {
    const container = document.querySelector('.reservas-table-container');
    const inicio = (paginaActual - 1) * reservasPorPagina;
    const fin = inicio + reservasPorPagina;
    const reservasPaginadas = reservas.slice(inicio, fin);
    
    container.innerHTML = '';
    
    reservasPaginadas.forEach(reserva => {
        const fechaEvento = parsearFecha(reserva.fechaEvento);
        const fecha = fechaEvento.toLocaleDateString('es-AR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
        
        let horaEvento = '';
        if (Array.isArray(reserva.horaInicio)) {
            horaEvento = `${String(reserva.horaInicio[0]).padStart(2, '0')}:${String(reserva.horaInicio[1]).padStart(2, '0')}`;
        } else {
            horaEvento = reserva.horaInicio || '';
        }
        
        const card = document.createElement('div');
        card.className = 'reserva-card-mobile';
        card.innerHTML = `
            <div class="reserva-card-header">
                <span class="reserva-card-id">#${reserva.id}</span>
                <span class="estado-badge ${reserva.estado}">${formatearEstado(reserva.estado)}</span>
            </div>
            <div class="reserva-card-body">
                <div class="reserva-card-field">
                    <span class="reserva-card-label">Cliente:</span>
                    <span class="reserva-card-value">${reserva.nombreCliente}</span>
                </div>
                <div class="reserva-card-field">
                    <span class="reserva-card-label">Teléfono:</span>
                    <span class="reserva-card-value">${reserva.telefonoCliente}</span>
                </div>
                <div class="reserva-card-field">
                    <span class="reserva-card-label">Experiencia:</span>
                    <span class="reserva-card-value">${reserva.nombreExperiencia}</span>
                </div>
                <div class="reserva-card-field">
                    <span class="reserva-card-label">Fecha:</span>
                    <span class="reserva-card-value">${fecha} ${horaEvento}</span>
                </div>
                <div class="reserva-card-field">
                    <span class="reserva-card-label">Total:</span>
                    <span class="reserva-card-value">$${reserva.precioTotal.toLocaleString()}</span>
                </div>
                <div class="reserva-card-field">
                    <span class="reserva-card-label">Pago:</span>
                    <span class="reserva-card-value">
                        <span class="pago-badge ${reserva.estadoPago}">${formatearEstadoPago(reserva.estadoPago)}</span>
                    </span>
                </div>
            </div>
            <div class="reserva-card-actions">
                <button class="btn-action btn-ver" onclick="verDetalle(${reserva.id})">👁️ Ver</button>
                ${reserva.estado !== 'CANCELADA_CLIENTE' && reserva.estado !== 'CANCELADA_ADMIN' ? 
                    `<button class="btn-action btn-estado" onclick="cambiarEstado(${reserva.id})">📝 Estado</button>
                     <button class="btn-action btn-cancelar" onclick="confirmarCancelacion(${reserva.id})">❌ Cancelar</button>` 
                    : ''}
            </div>
        `;
        container.appendChild(card);
    });
}

// Detectar cambios de tamaño de ventana
window.addEventListener('resize', () => {
    if (reservasFiltradas && reservasFiltradas.length > 0) {
        renderizarReservasResponsive();
    }
});

// Al cargar reservas, usar modo responsive
const renderizarReservasOriginal = renderizarReservas;
renderizarReservas = function(reservas) {
    if (window.innerWidth <= 480) {
        const container = document.querySelector('.reservas-table-container');
        container.classList.add('mobile-cards');
        renderizarReservasCards(reservas);
    } else {
        renderizarReservasOriginal(reservas);
    }
};
