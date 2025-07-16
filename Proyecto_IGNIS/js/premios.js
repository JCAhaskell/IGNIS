// ============================================================================
// BLOQUE 1: INICIALIZACIÓN ESPECÍFICA
// ============================================================================

// Función de inicialización específica de premios
function inicializarPremios() {
    // Aquí se pueden agregar funcionalidades específicas de premios
    console.log('Premios inicializada');
    
    // Inicializar filtros de premios
    inicializarFiltrosPremios();
}

// ============================================================================
// BLOQUE 2: FUNCIONALIDAD DE FILTROS
// ============================================================================

// Funcionalidad para filtros de premios
function inicializarFiltrosPremios() {
    const filtrosBotones = document.querySelectorAll('.filtro-premio');
    const premiosAnios = document.querySelectorAll('.premios-anio');
    
    filtrosBotones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            filtrosBotones.forEach(btn => btn.classList.remove('activo'));
            // Agregar clase activa al botón clickeado
            this.classList.add('activo');
            
            const filtro = this.textContent.trim();
            
            premiosAnios.forEach(anio => {
                const tituloAnio = anio.querySelector('.anio-titulo').textContent;
                
                if (filtro === 'Todos') {
                    anio.style.display = 'block';
                } else if (filtro === 'Anteriores') {
                    if (!['2024', '2023', '2022'].includes(tituloAnio)) {
                        anio.style.display = 'block';
                    } else {
                        anio.style.display = 'none';
                    }
                } else {
                    if (tituloAnio === filtro) {
                        anio.style.display = 'block';
                    } else {
                        anio.style.display = 'none';
                    }
                }
            });
        });
    });
}

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN
// ============================================================================

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Usar función común para mostrar contenido y verificar usuario
    window.CommonAuth.mostrarContenidoYVerificarUsuario(inicializarPremios);
});