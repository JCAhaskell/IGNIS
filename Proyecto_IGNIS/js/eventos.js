// ============================================================================
// BLOQUE 1: INICIALIZACIÓN ESPECÍFICA
// ============================================================================

// Función de inicialización específica de eventos
function inicializarEventos() {
    // Aquí se pueden agregar funcionalidades específicas de eventos
    console.log('Eventos inicializados');
}

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN
// ============================================================================

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Usar función común para mostrar contenido y verificar usuario
    window.CommonAuth.mostrarContenidoYVerificarUsuario(inicializarEventos);
});