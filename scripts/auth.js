// ===================================
// GESTIÓN DE SESIÓN DE ADMINISTRADOR
// ===================================

// Guardar token en localStorage
function guardarToken(token) {
    localStorage.setItem('adminToken', token);
}

// Obtener token del localStorage
function obtenerToken() {
    return localStorage.getItem('adminToken');
}

// Eliminar token (logout)
function eliminarToken() {
    localStorage.removeItem('adminToken');
}

// Verificar si hay sesión activa
function haySesionActiva() {
    const token = obtenerToken();
    return token !== null && token !== '';
}

// Verificar si el token es válido
async function verificarSesion() {
    const token = obtenerToken();
    
    if (!token) {
        return false;
    }
    
    try {
        // validarToken retorna ApiResponseDTO con data: boolean
        const response = await validarToken(token);
        return response && response.success && response.data === true;
    } catch (error) {
        console.error('Error al validar token:', error);
        eliminarToken();
        return false;
    }
}

// Proteger rutas de administrador
async function protegerRutaAdmin() {
    const sesionValida = await verificarSesion();
    
    if (!sesionValida) {
        // Redirigir al login
        window.location.href = 'admin-login.html';
        return false;
    }
    
    return true;
}

// Logout
function logout() {
    eliminarToken();
    window.location.href = 'index.html';
}
