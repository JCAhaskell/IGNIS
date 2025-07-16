// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DOCUMENTACIÓN
// ============================================================================
// HISTORIA.JS - Funciones para la página de Historia

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN ESPECÍFICA
// ============================================================================

// Función de inicialización específica de historia
function inicializarHistoria() {
    // Aquí se pueden agregar funcionalidades específicas de la página de historia
    console.log('Página de Historia cargada');
}

// ============================================================================
// BLOQUE 3: INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Usar función común para mostrar contenido y verificar usuario
    window.CommonAuth.mostrarContenidoYVerificarUsuario(inicializarHistoria);
});