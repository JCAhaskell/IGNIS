// ============================================================================
// BLOQUE 1: CONFIGURACIÓN GLOBAL Y CONSTANTES
// ============================================================================

// Archivo principal de JavaScript para IGNIS

// Constantes y variables globales
const NOMBRE_BODEGA = 'IGNIS - BODEGA SELECTA';
const FUNDACION = 1950;
const DESCUENTO_ESTANDAR = 15; // Porcentaje de descuento estándar

// Array de productos (vinos)
const vinos = [
    { id: 1, nombre: 'Tinto Reserva', año: 2020, precio: 120, stock: 50, tipo: 'tinto' },
    { id: 2, nombre: 'Blanco Barrica', año: 2021, precio: 95, stock: 30, tipo: 'blanco' },
    { id: 3, nombre: 'Rosado de Lacrima', año: 2022, precio: 85, stock: 40, tipo: 'rosado' },
    { id: 4, nombre: 'Espumoso Brut Nature', año: 2019, precio: 150, stock: 25, tipo: 'espumoso' },
    { id: 5, nombre: 'Dulce Moscatel', año: 2021, precio: 110, stock: 35, tipo: 'dulce' }
];

// ============================================================================
// BLOQUE 2: FUNCIONES DE UTILIDAD Y CÁLCULOS
// ============================================================================

// Función para calcular descuento
function calcularDescuento(precio, porcentaje = DESCUENTO_ESTANDAR) {
    return precio - (precio * porcentaje / 100);
}

// ============================================================================
// BLOQUE 3: VALIDACIÓN DE FORMULARIOS
// ============================================================================

// Función para validar formulario
function validarFormulario(formulario) {
    let camposRequeridos = formulario.querySelectorAll('[required]');
    let valido = true;
    
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            mostrarError(campo, 'Este campo es obligatorio');
            valido = false;
        } else {
            limpiarError(campo);
        }
    });
    
    return valido;
}

// Función para mostrar error en formulario
function mostrarError(campo, mensaje) {
    // Eliminar mensaje de error previo si existe
    limpiarError(campo);
    
    // Crear elemento para el mensaje de error
    const mensajeError = document.createElement('div');
    mensajeError.className = 'error-mensaje';
    mensajeError.textContent = mensaje;
    mensajeError.style.color = 'red';
    mensajeError.style.fontSize = '0.8rem';
    mensajeError.style.marginTop = '5px';
    
    // Insertar mensaje después del campo
    campo.parentNode.insertBefore(mensajeError, campo.nextSibling);
    
    // Resaltar campo con error
    campo.style.borderColor = 'red';
}

// Función para limpiar error en formulario
function limpiarError(campo) {
    const mensajeError = campo.parentNode.querySelector('.error-mensaje');
    if (mensajeError) {
        mensajeError.remove();
    }
    campo.style.borderColor = '';
}

// ============================================================================
// BLOQUE 4: COMPONENTES DE INTERFAZ (MODALES)
// ============================================================================

// Función para crear ventana modal
function crearModal(titulo, contenido, botones = []) {
    // Crear elementos del modal
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    const modalContenedor = document.createElement('div');
    modalContenedor.className = 'modal-contenedor';
    
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitulo = document.createElement('h3');
    modalTitulo.textContent = titulo;
    
    const cerrarBtn = document.createElement('button');
    cerrarBtn.innerHTML = '&times;';
    cerrarBtn.className = 'modal-cerrar';
    cerrarBtn.onclick = () => document.body.removeChild(modalOverlay);
    
    const modalCuerpo = document.createElement('div');
    modalCuerpo.className = 'modal-cuerpo';
    modalCuerpo.innerHTML = contenido;
    
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer';
    
    // Agregar botones si existen
    botones.forEach(boton => {
        const btn = document.createElement('button');
        btn.textContent = boton.texto;
        btn.className = boton.clase || 'modal-btn';
        btn.onclick = boton.accion;
        modalFooter.appendChild(btn);
    });
    
    // Construir modal
    modalHeader.appendChild(modalTitulo);
    modalHeader.appendChild(cerrarBtn);
    
    modalContenedor.appendChild(modalHeader);
    modalContenedor.appendChild(modalCuerpo);
    modalContenedor.appendChild(modalFooter);
    
    modalOverlay.appendChild(modalContenedor);
    
    // Agregar modal al body
    document.body.appendChild(modalOverlay);
    
    // Devolver referencia al modal
    return modalOverlay;
}

// ============================================================================
// BLOQUE 5: NAVEGACIÓN Y MENÚS
// ============================================================================

// Función para manejar el menú móvil
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Función para configurar el menú desplegable (unificada)
function configurarMenuDesplegable() {
    const menuBtn = document.querySelector('.menu-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    if (!menuBtn || !dropdownContent) return;
    
    // Asegurar z-index máximo para el menú flotante
    if (dropdownMenu) {
        dropdownMenu.style.zIndex = '2147483647'; // Valor máximo de z-index
        dropdownMenu.style.position = 'fixed';
    }
    
    if (dropdownContent) {
        dropdownContent.style.zIndex = '2147483646'; // Segundo valor más alto
        dropdownContent.style.position = 'fixed';
        dropdownContent.style.pointerEvents = 'auto';
    }
    
    // Evento para abrir/cerrar el menú
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Forzar posicionamiento flotante al abrir
        if (dropdownContent.classList.contains('show')) {
            // Agregar animación de salida
            dropdownContent.classList.add('hide');
            dropdownContent.classList.remove('show');
            setTimeout(() => {
                dropdownContent.classList.remove('hide');
                dropdownContent.style.display = 'none';
            }, 600);
        } else {
            // Asegurar que esté por encima de todo
            dropdownContent.style.zIndex = '2147483646';
            dropdownContent.style.position = 'fixed';
            dropdownContent.style.display = 'block';
            dropdownContent.classList.remove('hide');
            dropdownContent.classList.add('show');
        }
    });
    
    // Cerrar el menú al hacer clic fuera con delay
    document.addEventListener('click', (e) => {
        if (!dropdownMenu.contains(e.target) && dropdownContent.classList.contains('show')) {
            // Agregar animación de salida
            dropdownContent.classList.add('hide');
            dropdownContent.classList.remove('show');
            setTimeout(() => {
                dropdownContent.classList.remove('hide');
                dropdownContent.style.display = 'none';
            }, 600);
        }
    });
    
    // Cerrar el menú al hacer clic en un enlace con delay
    const menuLinks = dropdownContent.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (dropdownContent.classList.contains('show')) {
                // Agregar animación de salida
                dropdownContent.classList.add('hide');
                dropdownContent.classList.remove('show');
                setTimeout(() => {
                    dropdownContent.classList.remove('hide');
                    dropdownContent.style.display = 'none';
                }, 600);
            }
        });
    });
    
    // Prevenir que el scroll afecte el menú
    window.addEventListener('scroll', () => {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.style.position = 'fixed';
            dropdownContent.style.zIndex = '2147483646';
        }
    });
}

// ============================================================================
// BLOQUE 6: NOTIFICACIONES Y FEEDBACK
// ============================================================================

// Función para mostrar notificación
function mostrarNotificacion(mensaje, tipo = 'info', duracion = 3000) {
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    notificacion.textContent = mensaje;
    
    // Estilos para la notificación
    notificacion.style.position = 'fixed';
    notificacion.style.bottom = '20px';
    notificacion.style.right = '20px';
    notificacion.style.padding = '10px 20px';
    notificacion.style.borderRadius = '5px';
    notificacion.style.zIndex = '1000';
    notificacion.style.opacity = '0';
    notificacion.style.transition = 'opacity 0.3s ease';
    
    // Estilos según tipo
    switch(tipo) {
        case 'exito':
            notificacion.style.backgroundColor = '#4CAF50';
            notificacion.style.color = 'white';
            break;
        case 'error':
            notificacion.style.backgroundColor = '#F44336';
            notificacion.style.color = 'white';
            break;
        case 'advertencia':
            notificacion.style.backgroundColor = '#FF9800';
            notificacion.style.color = 'white';
            break;
        default: // info
            notificacion.style.backgroundColor = '#2196F3';
            notificacion.style.color = 'white';
    }
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Mostrar con animación
    setTimeout(() => {
        notificacion.style.opacity = '1';
    }, 10);
    
    // Ocultar después de la duración
    setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, duracion);
}

// ============================================================================
// BLOQUE 7: INICIALIZACIÓN Y EVENTOS
// ============================================================================

// Inicializar funcionalidades cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año en el footer
    actualizarFooter();
    
    // Configurar menú desplegable
    configurarMenuDesplegable();
    
    // Configurar formularios si existen
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validarFormulario(this)) {
                e.preventDefault();
            }
        });
    });
});

// ============================================================================
// BLOQUE 8: FUNCIONES DE AUTENTICACIÓN
// ============================================================================

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        window.gestorUsuarios.cerrarSesion();
        window.location.href = 'index.html';
    }
}

// Función para verificar autenticación
function verificarAutenticacion() {
    if (!window.gestorUsuarios.verificarSesionActiva()) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Función para obtener usuario actual
function obtenerUsuarioActual() {
    return window.gestorUsuarios.obtenerUsuarioActual();
}

// Función para alternar menú móvil
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && menuToggle && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Inicializar gestor de usuarios cuando esté disponible
if (typeof GestorUsuarios !== 'undefined') {
    window.gestorUsuarios = new GestorUsuarios();
}