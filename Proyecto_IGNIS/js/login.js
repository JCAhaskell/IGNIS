// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DOCUMENTACIÓN
// ============================================================================

/**
 * Login - Lógica del formulario de autenticación
 * Maneja el formulario de login y redirección
 */

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN Y VERIFICACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Solo verificar redirección si estamos en la página de login
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        // Verificar si ya está logueado
        if (window.gestorUsuarios && window.gestorUsuarios.verificarSesion()) {
            // Si ya está logueado, redirigir al inicio
            window.location.href = 'inicio.html';
            return;
        }
    }
    
    // Si no estamos en la página de login, no hacer nada
    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        return;
    }
    
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // ============================================================================
    // BLOQUE 3: PROCESAMIENTO DEL FORMULARIO
    // ============================================================================

    // Manejar envío del formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Limpiar mensajes anteriores
        ocultarMensajes();
        
        // Validaciones básicas
        if (!email || !password) {
            mostrarError('Por favor, completa todos los campos.');
            return;
        }
        
        if (!validarEmail(email)) {
            mostrarError('Por favor, ingresa un email válido.');
            return;
        }
        
        // Intentar autenticar
        try {
            const usuario = window.gestorUsuarios.autenticar(email, password);
            
            if (usuario) {
                mostrarExito(`¡Bienvenido, ${usuario.nombre}!`);
                
                // Redirigir después de un breve delay
                setTimeout(() => {
                    window.location.href = 'inicio.html';
                }, 1500);
                
            } else {
                mostrarError('Email o contraseña incorrectos.');
                // Limpiar el campo de contraseña por seguridad
                passwordInput.value = '';
            }
        } catch (error) {
            mostrarError('Error al iniciar sesión. Inténtalo de nuevo.');
            console.error('Error de autenticación:', error);
        }
    });
    
    // ============================================================================
    // BLOQUE 4: FUNCIONES DE INTERFAZ Y MENSAJES
    // ============================================================================

    // Funciones auxiliares
    function mostrarError(mensaje) {
        errorMessage.textContent = mensaje;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
    
    function mostrarExito(mensaje) {
        successMessage.textContent = mensaje;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }
    
    function ocultarMensajes() {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    }
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // ============================================================================
    // BLOQUE 5: EVENTOS DE TECLADO Y NAVEGACIÓN
    // ============================================================================

    // Manejar Enter en los campos
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
    
    // ============================================================================
    // BLOQUE 6: HERRAMIENTAS DE DESARROLLO
    // ============================================================================

    // Herramientas de desarrollo deshabilitadas
    // Los usuarios deben registrarse manualmente
});

// ============================================================================
// BLOQUE 7: FUNCIONES GLOBALES Y UTILIDADES
// ============================================================================

// Función global para logout (puede ser llamada desde otras páginas)
function cerrarSesion() {
    if (window.gestorUsuarios) {
        window.gestorUsuarios.cerrarSesion();
    }
    window.location.href = 'index.html';
}

// Función para verificar autenticación en otras páginas
function verificarAutenticacion() {
    if (!window.gestorUsuarios || !window.gestorUsuarios.verificarSesion()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Función para obtener usuario actual
function obtenerUsuarioLogueado() {
    return window.gestorUsuarios ? window.gestorUsuarios.obtenerUsuarioActual() : null;
}