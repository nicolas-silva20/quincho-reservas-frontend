// Verificar si ya hay sesión activa
document.addEventListener('DOMContentLoaded', async () => {
    const sesionValida = await verificarSesion();
    
    if (sesionValida) {
        // Ya está logueado, redirigir al dashboard
        window.location.href = 'admin-dashboard.html';
    }
});

// Manejar submit del formulario
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    const btnLogin = document.getElementById('btn-login');
    const btnText = btnLogin.querySelector('.btn-text');
    const btnLoading = btnLogin.querySelector('.btn-loading');
    
    // Limpiar mensaje de error
    errorMessage.style.display = 'none';
    
    // Validaciones básicas
    if (!username || !password) {
        mostrarError('Por favor complete todos los campos');
        return;
    }
    
    // Deshabilitar botón
    btnLogin.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    
    try {
        // Llamar al backend
        const response = await loginAdmin(username, password);
        
        if (response && response.success && response.data && response.data.token) {
            // Guardar token
            guardarToken(response.data.token);
            
            // Redirigir al dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            mostrarError('Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error en login:', error);
        mostrarError(error.message || 'Error al iniciar sesión. Intente nuevamente.');
    } finally {
        // Rehabilitar botón
        btnLogin.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
});

// Función para mostrar errores
function mostrarError(mensaje) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = mensaje;
    errorMessage.style.display = 'block';
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
}

// Permitir login con Enter
document.getElementById('password').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('login-form').dispatchEvent(new Event('submit'));
    }
});
