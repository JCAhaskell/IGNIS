// ============================================================================
// TERCERA ENTREGA - PUNTO L: TIPOS DE DATOS, VARIABLES, ARRAYS Y OPERADORES
// Implementación completa de conceptos JavaScript fundamentales
// ============================================================================
// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DOCUMENTACIÓN
// ============================================================================

// Archivo JavaScript específico para la página de inicio (index.html)

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN PRINCIPAL
// ============================================================================

// Función para inicializar la página de inicio
function inicializarPaginaInicio() {
    console.log('Inicializando página de inicio...');
    
    // Configurar la ruleta de vinos
    configurarRuletaVinos();
    
    // Configurar el espacio para el video
    configurarEspacioVideo();
}



// ============================================================================
// BLOQUE 3: CONFIGURACIÓN DE COMPONENTES INTERACTIVOS
// ============================================================================

// Función para configurar la ruleta de vinos
function configurarRuletaVinos() {
    const carouselTrack = document.querySelector('.carousel-track');
    
    if (!carouselTrack) return;
    
    // Pausar la animación al pasar el mouse
    carouselTrack.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });
    
    // Reanudar la animación al quitar el mouse
    carouselTrack.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
    
    // Agregar interactividad a los slides
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            const vinoNombre = slide.querySelector('h3').textContent;
            mostrarDetallesVino(vinoNombre);
        });
    });
}

// ============================================================================
// BLOQUE 4: FUNCIONES DE MODALES Y DETALLES
// ============================================================================

// Función para mostrar detalles de un vino
function mostrarDetallesVino(nombreVino) {
    // Buscar información del vino en el array de vinos (definido en main.js)
    let vinoInfo = null;
    
    // Verificar si el array de vinos está disponible (desde main.js)
    if (typeof vinos !== 'undefined') {
        vinoInfo = vinos.find(vino => vino.nombre.includes(nombreVino));
    }
    
    // Crear contenido para el modal
    let contenido = '';
    
    if (vinoInfo) {
        contenido = `
            <div class="vino-detalle">
                <h3>${vinoInfo.nombre}</h3>
                <p><strong>Año:</strong> ${vinoInfo.año}</p>
                <p><strong>Tipo:</strong> ${vinoInfo.tipo.charAt(0).toUpperCase() + vinoInfo.tipo.slice(1)}</p>
                <p><strong>Precio:</strong> S/${vinoInfo.precio.toFixed(2)}</p>
                <p><strong>Stock:</strong> ${vinoInfo.stock} botellas</p>
            </div>
        `;
    } else {
        contenido = `
            <div class="vino-detalle">
                <h3>${nombreVino}</h3>
                <p>Descubre este excepcional vino en nuestra tienda.</p>
                <p>Para más detalles, visita nuestra sección de Vinos.</p>
            </div>
        `;
    }
    
    // Mostrar modal con detalles del vino (usando la función de main.js)
    if (typeof crearModal === 'function') {
        crearModal(
            `Detalles de ${nombreVino}`,
            contenido,
            [
                {
                    texto: 'Ver en Tienda',
                    clase: 'btn-primario',
                    accion: () => window.location.href = 'tienda.html'
                },
                {
                    texto: 'Cerrar',
                    clase: 'btn-secundario',
                    accion: (modal) => document.body.removeChild(modal)
                }
            ]
        );
    } else {
        // Si la función crearModal no está disponible, usar alert
        alert(`Detalles de ${nombreVino}\nVisita nuestra sección de Vinos para más información.`);
    }
}

// ============================================================================
// BLOQUE 5: CONFIGURACIÓN DE MULTIMEDIA
// ============================================================================

// Función para configurar el espacio del video
function configurarEspacioVideo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const videoElement = document.querySelector('.video');
    
    if (!videoPlaceholder || !videoElement) return;
    
    // Agregar evento para mostrar controles al pasar el mouse
    videoPlaceholder.addEventListener('mouseenter', () => {
        videoElement.setAttribute('controls', '');
    });
    
    // Mostrar notificación cuando el video termine
    videoElement.addEventListener('ended', () => {
        if (typeof mostrarNotificacion === 'function') {
            mostrarNotificacion('¡Gracias por ver nuestro video!', 'success');
        }
    });
}

// ============================================================================
// BLOQUE 6: INICIALIZACIÓN Y EVENTOS
// ============================================================================

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar gestor de usuarios
    window.gestorUsuarios = new GestorUsuarios();
    
    inicializarPaginaInicio();
});

// ============================================================================
// BLOQUE 7: FUNCIONES DE AUTENTICACIÓN
// ============================================================================

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        window.gestorUsuarios.cerrarSesion();
        window.location.href = 'index.html';
    }
}

// Función para verificar autenticación


// Función para obtener usuario actual
function obtenerUsuarioActual() {
    return window.gestorUsuarios.obtenerUsuarioActual();
}