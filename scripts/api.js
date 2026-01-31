// ===================================
// CONFIGURACIÓN DE LA API
// ===================================

// Detectar automáticamente el entorno (desarrollo local vs producción)
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:8080/api'
    : 'https://quincho-reservas-backend-production.up.railway.app/api';

// ===================================
// FUNCIÓN HELPER PARA PETICIONES
// ===================================

async function apiRequest(endpoint, options = {}) {
    try {
        // Agregar Authorization header si requiresAuth es true
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (options.requiresAuth) {
            const token = obtenerToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Error en la petición');
        }
        
        // Retornar el objeto completo ApiResponseDTO
        return result;
    } catch (error) {
        console.error('Error en API:', error);
        throw error;
    }
}

// ===================================
// EXPERIENCIAS
// ===================================

async function obtenerExperiencias() {
    return await apiRequest('/experiencias');
}

async function obtenerExperienciaPorId(id) {
    return await apiRequest(`/experiencias/${id}`);
}

async function obtenerItemsExperiencia(experienciaId) {
    return await apiRequest(`/experiencias/${experienciaId}/items`);
}

// ===================================
// DISPONIBILIDAD
// ===================================

async function verificarDisponibilidadAPI(fecha, hora) {
    return await apiRequest(`/disponibilidad/verificar?fecha=${fecha}&hora=${hora}`);
}

// ===================================
// RESERVAS
// ===================================

async function crearReserva(reservaData) {
    return await apiRequest('/reservas', {
        method: 'POST',
        body: JSON.stringify(reservaData)
    });
}

async function obtenerReserva(id) {
    return await apiRequest(`/reservas/${id}`);
}

async function cancelarReservaAPI(id) {
    return await apiRequest(`/reservas/${id}/cancelar`, {
        method: 'DELETE'
    });
}

// ===================================
// RESEÑAS
// ===================================

async function obtenerResenasDestacadas() {
    return await apiRequest('/resenas/destacadas');
}

async function obtenerTodasLasResenas() {
    return await apiRequest('/resenas');
}

async function crearResena(datos) {
    return await apiRequest('/resenas/crear', {
        method: 'POST',
        body: JSON.stringify(datos)
    });
}

async function obtenerTodasLasResenasAdmin() {
    return await apiRequest('/resenas/admin/todas', {
        method: 'GET',
        requiresAuth: true
    });
}

async function aprobarResena(id) {
    return await apiRequest(`/resenas/admin/${id}/aprobar`, {
        method: 'PUT',
        requiresAuth: true
    });
}

async function rechazarResena(id) {
    return await apiRequest(`/resenas/admin/${id}/rechazar`, {
        method: 'PUT',
        requiresAuth: true
    });
}

async function eliminarResena(id) {
    return await apiRequest(`/resenas/admin/${id}`, {
        method: 'DELETE',
        requiresAuth: true
    });
}

// ===================================
// LISTA DE ESPERA
// ===================================

async function agregarAListaEspera(datos) {
    console.log('📋 Agregando a lista de espera:', datos);
    const response = await apiRequest('/lista-espera', {
        method: 'POST',
        body: JSON.stringify(datos),
        requiresAuth: false // Lista de espera es público
    });
    console.log('✅ Respuesta lista de espera:', response);
    return response;
}

async function obtenerListaEspera() {
    return await apiRequest('/lista-espera', {
        method: 'GET',
        requiresAuth: true
    });
}

async function marcarNotificado(id) {
    return await apiRequest(`/lista-espera/${id}/notificar`, {
        method: 'PUT',
        requiresAuth: true
    });
}

async function eliminarEntradaListaEspera(id) {
    return await apiRequest(`/lista-espera/${id}`, {
        method: 'DELETE',
        requiresAuth: true
    });
}

// ===================================
// AUTENTICACIÓN - ADMIN
// ===================================

async function loginAdmin(username, password) {
    return await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });
}

async function validarToken(token) {
    return await apiRequest('/auth/validate', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

// ===================================
// ADMIN - GESTIÓN DE RESERVAS
// ===================================

async function obtenerTodasLasReservasAdmin() {
    return await apiRequest('/admin/reservas', {
        method: 'GET',
        requiresAuth: true
    });
}

async function cancelarReservaAdmin(id) {
    return await apiRequest(`/admin/reservas/${id}/cancelar`, {
        method: 'DELETE',
        requiresAuth: true
    });
}

async function actualizarEstadoReserva(id, nuevoEstado) {
    return await apiRequest(`/admin/reservas/${id}/estado`, {
        method: 'PUT',
        body: JSON.stringify({ estado: nuevoEstado }),
        requiresAuth: true
    });
}

async function actualizarEstadoPagoReserva(id, nuevoEstadoPago) {
    return await apiRequest(`/admin/reservas/${id}/estado-pago`, {
        method: 'PUT',
        body: JSON.stringify({ estadoPago: nuevoEstadoPago }),
        requiresAuth: true
    });
}

// ===================================
// ENCUESTAS DE SATISFACCIÓN
// ===================================

async function crearEncuesta(encuestaData) {
    return await apiRequest('/encuestas/crear', {
        method: 'POST',
        body: JSON.stringify(encuestaData)
    });
}

async function obtenerTodasLasEncuestas() {
    return await apiRequest('/encuestas/todas', {
        method: 'GET',
        requiresAuth: true
    });
}

async function obtenerEstadisticasEncuestas() {
    return await apiRequest('/encuestas/estadisticas', {
        method: 'GET',
        requiresAuth: true
    });
}
