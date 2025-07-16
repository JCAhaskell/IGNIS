// ============================================================================
// ARCHIVO: inicio.js
// DESCRIPCIÓN: Scripts específicos para la página de inicio
// ============================================================================

// ============================================================================
// BLOQUE 1: DATOS DE VINOS PARA EL CARRUSEL
// ============================================================================

// Importar datos de vinos desde vinos.js (se cargará automáticamente)
const vinosCarrusel = [
    {
        id: 'tinto-reserva',
        nombre: 'Tinto Reserva',
        tipo: 'tinto',
        imagen: 'img/vinoTinto.png'
    },
    {
        id: 'blanco-barrica',
        nombre: 'Blanco Barrica',
        tipo: 'blanco',
        imagen: 'img/vinoBlanco.png'
    },
    {
        id: 'rosado-lacrima',
        nombre: 'Rosado de Lacrima',
        tipo: 'rosado',
        imagen: 'img/vinoRosado.png'
    },
    {
        id: 'espumoso-brut',
        nombre: 'Espumoso Brut Nature',
        tipo: 'espumoso',
        imagen: 'img/vinoEspumoso.png'
    },
    {
        id: 'dulce-moscatel',
        nombre: 'Dulce Moscatel',
        tipo: 'dulce',
        imagen: 'img/vinoDulce.png'
    }
];

// ============================================================================
// BLOQUE 2: FUNCIONES DE AUTENTICACIÓN
// ============================================================================

/**
 * Inicializa la página de inicio verificando la autenticación
 */
function inicializarPaginaInicio() {
    const userInfo = document.getElementById('userInfo');
    const userWelcome = document.getElementById('userWelcome');
    
    try {
        // Verificar que gestorUsuarios esté disponible
        if (!window.gestorUsuarios || typeof window.gestorUsuarios.verificarSesionActiva !== 'function') {
            console.error('GestorUsuarios no está disponible');
            window.location.href = 'index.html';
            return;
        }
        
        // Verificación inmediata sin delay
        if (!window.gestorUsuarios.verificarSesionActiva()) {
            window.location.href = 'index.html';
            return;
        }
        
        const usuario = window.gestorUsuarios.obtenerUsuarioActual();
        
        if (!usuario) {
            window.location.href = 'index.html';
            return;
        }
        
        // Mostrar información del usuario
        if (userInfo) userInfo.style.display = 'block';
        if (userWelcome) userWelcome.textContent = `Bienvenido, ${usuario.tipo}`;
        
        // Mejorar carrusel con datos dinámicos
        inicializarCarruselVinos();
    } catch (error) {
        console.error('Error al inicializar página de inicio:', error);
        window.location.href = 'index.html';
    }
}

/**
 * Cierra la sesión del usuario actual
 */
function cerrarSesion() {
    try {
        // Verificar que gestorUsuarios esté disponible
        if (window.gestorUsuarios && typeof window.gestorUsuarios.cerrarSesion === 'function') {
            window.gestorUsuarios.cerrarSesion();
        } else {
            // Fallback: limpiar localStorage directamente
            localStorage.removeItem('ignis_sesion');
            localStorage.removeItem('ignis_usuario_logueado');
        }
        
        // Redirigir al login
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Fallback: limpiar localStorage y redirigir
        localStorage.removeItem('ignis_sesion');
        localStorage.removeItem('ignis_usuario_logueado');
        window.location.href = 'index.html';
    }
}

// ============================================================================
// BLOQUE 3: FUNCIONES DE NAVEGACIÓN
// ============================================================================

/**
 * Alterna la visibilidad del menú móvil
 */
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

/**
 * Cierra el menú móvil al hacer clic fuera de él
 */
function configurarCierreMenuMovil() {
    document.addEventListener('click', function(event) {
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ============================================================================
// BLOQUE 4: FUNCIONES DEL CARRUSEL DE VINOS
// ============================================================================

/**
 * Inicializa el carrusel de vinos con datos reales
 */
function inicializarCarruselVinos() {
    const carouselTrack = document.querySelector('.carousel-track');
    
    if (!carouselTrack) {
        console.warn('No se encontró el contenedor del carrusel');
        return;
    }
    
    // Mantener contenido inicial y agregar más slides dinámicamente
    const fragment = document.createDocumentFragment();
    
    // Agregar slides adicionales con datos reales
    vinosCarrusel.forEach(vino => {
        const slide = crearSlideVino(vino);
        fragment.appendChild(slide);
    });
    
    // Duplicar slides para efecto continuo
    vinosCarrusel.forEach(vino => {
        const slide = crearSlideVino(vino);
        fragment.appendChild(slide);
    });
    
    // Agregar slides dinámicos al final del contenido existente
    carouselTrack.appendChild(fragment);
    
    // Configurar animación del carrusel inmediatamente
    requestAnimationFrame(() => {
        configurarAnimacionCarrusel();
    });
}

// Crea un slide individual para el carrusel
function crearSlideVino(vino) {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.dataset.vinoId = vino.id;
    
    slide.innerHTML = `
        <img src="${vino.imagen}" alt="${vino.nombre}" class="img-fluid"
             onerror="this.src='img/logo.png'; this.style.padding='20px';">
        <h3>${vino.nombre}</h3>
        <p class="vino-tipo-carrusel">${vino.tipo.charAt(0).toUpperCase() + vino.tipo.slice(1)}</p>
    `;
    
    // Agregar efecto hover sin redirección
    slide.addEventListener('mouseenter', () => {
        slide.style.transform = 'scale(1.05)';
        slide.style.transition = 'transform 0.3s ease';
        slide.style.cursor = 'default';
    });
    
    slide.addEventListener('mouseleave', () => {
        slide.style.transform = 'scale(1)';
    });
    
    return slide;
}

/**
 * Configura la animación automática del carrusel
 */
function configurarAnimacionCarrusel() {
    const carouselTrack = document.querySelector('.carousel-track');
    
    if (!carouselTrack) return;
    
    let currentPosition = 0;
    const slideWidth = 250; // Ancho aproximado de cada slide
    const totalSlides = vinosCarrusel.length;
    const speed = 1; // Velocidad de movimiento
    
    // Pausar animación al hacer hover
    let animationPaused = false;
    
    carouselTrack.addEventListener('mouseenter', () => {
        animationPaused = true;
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        animationPaused = false;
    });
    
    function animarCarruselConPausa() {
        if (!animationPaused) {
            currentPosition -= speed;
            
            if (Math.abs(currentPosition) >= slideWidth * totalSlides) {
                currentPosition = 0;
            }
            
            carouselTrack.style.transform = `translateX(${currentPosition}px)`;
        }
        
        requestAnimationFrame(animarCarruselConPausa);
    }
    
    // Iniciar animación
    animarCarruselConPausa();
}

// ============================================================================
// BLOQUE 5: INICIALIZACIÓN Y EVENTOS
// ============================================================================

/**
 * Inicializa todos los componentes de la página cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que gestorUsuarios esté disponible antes de inicializar
    if (window.gestorUsuarios) {
        inicializarPaginaInicio();
    } else {
        // Esperar un poco más si gestorUsuarios no está listo
        setTimeout(() => {
            if (window.gestorUsuarios) {
                inicializarPaginaInicio();
            } else {
                console.error('GestorUsuarios no se pudo cargar');
                window.location.href = 'index.html';
            }
        }, 100);
    }
    
    // Configurar cierre de menú móvil
    configurarCierreMenuMovil();
});

/**
 * Función global para inicialización manual si es necesario
 */
window.inicializarInicio = inicializarPaginaInicio;

// ============================================================================
// BLOQUE 6: FUNCIONES GLOBALES (para compatibilidad con HTML)
// ============================================================================

// Hacer funciones disponibles globalmente para los eventos onclick en HTML
window.cerrarSesion = cerrarSesion;
window.toggleMenu = toggleMenu;