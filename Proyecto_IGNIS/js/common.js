// ============================================================================
// ARCHIVO COMÚN - FUNCIONES COMPARTIDAS
// ============================================================================

// Funciones de autenticación compartidas
window.CommonAuth = {
    // Cerrar sesión con confirmación
    cerrarSesion() {
        if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            const gestor = new GestorUsuarios();
            gestor.cerrarSesion();
            window.location.href = 'index.html';
        }
    },

    // Verificar si hay sesión activa
    verificarAutenticacion() {
        const gestor = new GestorUsuarios();
        return gestor.verificarSesionActiva();
    },

    // Obtener datos del usuario actual
    obtenerUsuarioActual() {
        const gestor = new GestorUsuarios();
        return gestor.obtenerUsuarioActual();
    },

    // Mostrar contenido y verificar usuario (función genérica)
    mostrarContenidoYVerificarUsuario(inicializarCallback) {
        const gestor = new GestorUsuarios();
        const mainContent = document.getElementById('mainContent');
        const userInfo = document.getElementById('userInfo');
        const userWelcome = document.getElementById('userWelcome');
        
        // Mostrar contenido siempre
        if (mainContent) {
            mainContent.style.display = 'block';
        }
        
        // Verificar si hay sesión activa para mostrar info del usuario
        if (gestor.verificarSesionActiva()) {
            const usuario = gestor.obtenerUsuarioActual();
            
            if (userInfo) {
                userInfo.style.display = 'block';
            }
            
            if (userWelcome && usuario) {
                userWelcome.textContent = `Bienvenido, ${usuario.nombre}`;
            }
        }
        
        // Ejecutar callback de inicialización si se proporciona
        if (typeof inicializarCallback === 'function') {
            inicializarCallback();
        }
    }
};

// Hacer funciones disponibles globalmente
window.cerrarSesion = window.CommonAuth.cerrarSesion;
window.verificarAutenticacion = window.CommonAuth.verificarAutenticacion;
window.obtenerUsuarioActual = window.CommonAuth.obtenerUsuarioActual;