// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DOCUMENTACIÓN
// ============================================================================
// REGISTRO - Lógica del formulario de registro de usuarios

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN Y VERIFICACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya está logueado
    if (window.gestorUsuarios && window.gestorUsuarios.verificarSesion()) {
        // Si ya está logueado, redirigir al inicio
        window.location.href = 'inicio.html';
        return;
    }
    
    // Elementos del DOM
    const registroForm = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmarPasswordInput = document.getElementById('confirmarPassword');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
// ============================================================================
// BLOQUE 3: PROCESAMIENTO DEL FORMULARIO
// ============================================================================
    
    // Manejar envío del formulario
    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = nombreInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmarPassword = confirmarPasswordInput.value;
        
        // Limpiar mensajes anteriores
        ocultarMensajes();
        
        // Validaciones
        if (!nombre || !email || !password || !confirmarPassword) {
            mostrarError('Por favor, completa todos los campos.');
            return;
        }
        
        if (!validarEmail(email)) {
            mostrarError('Por favor, ingresa un email válido.');
            return;
        }
        
        if (password.length < 6) {
            mostrarError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        
        if (password !== confirmarPassword) {
            mostrarError('Las contraseñas no coinciden.');
            return;
        }
        
        // Intentar registrar
        try {
            const nuevoUsuario = window.gestorUsuarios.registrar({
                nombre: nombre,
                email: email,
                password: password
            });
            
            if (nuevoUsuario) {
                mostrarExito('¡Cuenta creada exitosamente! Redirigiendo al login...');
                
                // Redirigir al login después de un breve delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                
            }
        } catch (error) {
            mostrarError(error.message || 'Error al crear la cuenta. Inténtalo de nuevo.');
            console.error('Error de registro:', error);
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
// BLOQUE 5: EVENTOS DE VALIDACIÓN Y NAVEGACIÓN
// ============================================================================
    
    // Validación en tiempo real de contraseñas
    confirmarPasswordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const confirmarPassword = confirmarPasswordInput.value;
        
        if (confirmarPassword && password !== confirmarPassword) {
            confirmarPasswordInput.setCustomValidity('Las contraseñas no coinciden');
        } else {
            confirmarPasswordInput.setCustomValidity('');
        }
    });
    
    // Manejar Enter en los campos
    nombreInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            emailInput.focus();
        }
    });
    
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            confirmarPasswordInput.focus();
        }
    });
    
    confirmarPasswordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            registroForm.dispatchEvent(new Event('submit'));
        }
    });
});