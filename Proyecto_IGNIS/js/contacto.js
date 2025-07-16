// ============================================================================
// BLOQUE 1: CLASE PRINCIPAL DE CONTACTO
// ============================================================================

// Sistema de contacto con autenticación
class ContactoPrueba {
    constructor() {
        this.gestorUsuarios = new GestorUsuarios();
        this.init();
    }

    init() {
        // Mostrar contenido y verificar usuario
        this.mostrarContenidoYVerificarUsuario();
        
        // Configurar eventos del formulario
        this.configurarEventos();
    }

    // ============================================================================
    // BLOQUE 2: VERIFICACIÓN DE AUTENTICACIÓN Y GESTIÓN DE SESIÓN
    // ============================================================================

    mostrarContenidoYVerificarUsuario() {
        const loadingMessage = document.getElementById('loadingMessage');
        const mainContent = document.getElementById('mainContent');
        const userInfo = document.getElementById('userInfo');
        const userWelcome = document.getElementById('userWelcome');

        // Simular un pequeño delay para mostrar el loading
        setTimeout(() => {
            // Siempre mostrar el contenido principal
            loadingMessage.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Solo mostrar información del usuario si hay una sesión activa
            if (this.gestorUsuarios.verificarSesionActiva()) {
                const usuario = this.gestorUsuarios.obtenerUsuarioActual();
                userInfo.style.display = 'block';
                userWelcome.textContent = `Bienvenido, ${usuario.tipo}`;
                
                // Pre-llenar el formulario con datos del usuario
                this.prellenarFormulario(usuario);
            }
        }, 800);
    }

    prellenarFormulario(usuario) {
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        const telefonoInput = document.getElementById('telefono');
        
        if (nombreInput) nombreInput.value = usuario.nombre;
        if (emailInput) {
            emailInput.value = usuario.email;
            emailInput.readOnly = true; // No permitir cambiar el email
        }
        if (telefonoInput && usuario.telefono) {
            telefonoInput.value = usuario.telefono;
        }
    }

    // ============================================================================
    // BLOQUE 3: CONFIGURACIÓN DE EVENTOS
    // ============================================================================

    configurarEventos() {
        const form = document.getElementById('contactoForm');
        if (form) {
            form.addEventListener('submit', (e) => this.procesarContacto(e));
        }
        
        // Evento para cambio de asunto
        const asuntoSelect = document.getElementById('asunto');
        if (asuntoSelect) {
            asuntoSelect.addEventListener('change', (e) => this.cambiarPlaceholderMensaje(e.target.value));
        }
    }

    cambiarPlaceholderMensaje(asunto) {
        const mensajeTextarea = document.getElementById('mensaje');
        if (!mensajeTextarea) return;
        
        const placeholders = {
            'consulta-general': 'Cuéntanos tu consulta general sobre nuestros vinos y servicios...',
            'tours-catas': 'Describe qué tipo de tour o cata te interesa, fechas preferidas y número de personas...',
            'compra-vinos': 'Especifica qué vinos te interesan, cantidades y si necesitas envío...',
            'eventos-privados': 'Describe tu evento: tipo, fecha, número de invitados y servicios requeridos...',
            'distribucion': 'Proporciona información sobre tu empresa y región de interés para distribución...',
            'prensa-medios': 'Describe tu medio de comunicación y el tipo de información que necesitas...',
            'otro': 'Describe tu consulta o solicitud específica...'
        };
        
        mensajeTextarea.placeholder = placeholders[asunto] || 'Cuéntanos en qué podemos ayudarte...';
    }

    // ============================================================================
    // BLOQUE 4: PROCESAMIENTO DE FORMULARIOS
    // ============================================================================

    procesarContacto(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const contacto = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            telefono: formData.get('telefono') || '',
            asunto: formData.get('asunto'),
            mensaje: formData.get('mensaje'),
            newsletter: formData.get('newsletter') === 'on',
            fecha: new Date().toISOString(),
            usuario: this.gestorUsuarios.obtenerUsuarioActual().email,
            estado: 'pendiente'
        };

        // Validar datos
        if (!this.validarContacto(contacto)) {
            return;
        }

        // Guardar mensaje de contacto
        this.guardarContacto(contacto);
        
        // Mostrar confirmación
        this.mostrarConfirmacion(contacto);
        
        // Limpiar formulario (excepto datos del usuario)
        this.limpiarFormulario();
    }

    // ============================================================================
    // BLOQUE 5: VALIDACIÓN DE DATOS
    // ============================================================================

    validarContacto(contacto) {
        if (!contacto.nombre.trim()) {
            alert('Por favor, ingresa tu nombre completo.');
            document.getElementById('nombre').focus();
            return false;
        }
        
        if (!contacto.email.trim() || !this.validarEmail(contacto.email)) {
            alert('Por favor, ingresa un email válido.');
            document.getElementById('email').focus();
            return false;
        }
        
        if (!contacto.asunto) {
            alert('Por favor, selecciona un asunto.');
            document.getElementById('asunto').focus();
            return false;
        }
        
        if (!contacto.mensaje.trim() || contacto.mensaje.trim().length < 10) {
            alert('Por favor, ingresa un mensaje de al menos 10 caracteres.');
            document.getElementById('mensaje').focus();
            return false;
        }
        
        // Validar teléfono si se proporciona
        if (contacto.telefono && !this.validarTelefono(contacto.telefono)) {
            alert('Por favor, ingresa un número de teléfono válido.');
            document.getElementById('telefono').focus();
            return false;
        }
        
        return true;
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    validarTelefono(telefono) {
        // Permitir números con o sin formato
        const regex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return regex.test(telefono.trim());
    }

    // ============================================================================
    // BLOQUE 6: GESTIÓN DE DATOS Y ALMACENAMIENTO
    // ============================================================================

    guardarContacto(contacto) {
        // Obtener mensajes existentes
        let mensajes = JSON.parse(localStorage.getItem('mensajes_contacto_ignis') || '[]');
        
        // Agregar nuevo mensaje
        contacto.id = Date.now().toString();
        mensajes.push(contacto);
        
        // Guardar en localStorage
        localStorage.setItem('mensajes_contacto_ignis', JSON.stringify(mensajes));
        
        console.log('Mensaje de contacto guardado:', contacto);
        
        // Actualizar información del usuario si proporcionó teléfono
        if (contacto.telefono) {
            this.actualizarTelefonoUsuario(contacto.telefono);
        }
    }

    actualizarTelefonoUsuario(telefono) {
        const usuario = this.gestorUsuarios.obtenerUsuarioActual();
        if (usuario && !usuario.telefono) {
            usuario.telefono = telefono;
            
            // Actualizar en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios_ignis') || '[]');
            const index = usuarios.findIndex(u => u.email === usuario.email);
            if (index !== -1) {
                usuarios[index] = usuario;
                localStorage.setItem('usuarios_ignis', JSON.stringify(usuarios));
                localStorage.setItem('sesion_actual_ignis', JSON.stringify(usuario));
            }
        }
    }

    // ============================================================================
    // BLOQUE 7: INTERFAZ Y FEEDBACK AL USUARIO
    // ============================================================================

    mostrarConfirmacion(contacto) {
        const asuntoTexto = this.obtenerTextoAsunto(contacto.asunto);
        
        const mensaje = `¡Mensaje enviado con éxito!\n\n` +
                       `Detalles del mensaje:\n` +
                       `- Nombre: ${contacto.nombre}\n` +
                       `- Email: ${contacto.email}\n` +
                       `- Asunto: ${asuntoTexto}\n` +
                       `- Fecha: ${new Date(contacto.fecha).toLocaleString()}\n\n` +
                       `Nos pondremos en contacto contigo en las próximas 24-48 horas.\n\n` +
                       `¡Gracias por contactar con IGNIS!`;
        
        alert(mensaje);
    }

    obtenerTextoAsunto(asunto) {
        const asuntos = {
            'consulta-general': 'Consulta General',
            'tours-catas': 'Tours y Catas',
            'compra-vinos': 'Compra de Vinos',
            'eventos-privados': 'Eventos Privados',
            'distribucion': 'Distribución',
            'prensa-medios': 'Prensa y Medios',
            'otro': 'Otro'
        };
        return asuntos[asunto] || asunto;
    }

    limpiarFormulario() {
        const asunto = document.getElementById('asunto');
        const mensaje = document.getElementById('mensaje');
        const newsletter = document.getElementById('newsletter');
        
        if (asunto) asunto.value = '';
        if (mensaje) {
            mensaje.value = '';
            mensaje.placeholder = 'Cuéntanos en qué podemos ayudarte...';
        }
        if (newsletter) newsletter.checked = true; // Mantener newsletter marcado por defecto
    }

    // ============================================================================
    // BLOQUE 8: MÉTODOS AUXILIARES Y UTILIDADES
    // ============================================================================

    // Método para obtener historial de mensajes del usuario actual
    obtenerHistorialMensajes() {
        const usuario = this.gestorUsuarios.obtenerUsuarioActual();
        if (!usuario) return [];
        
        const mensajes = JSON.parse(localStorage.getItem('mensajes_contacto_ignis') || '[]');
        return mensajes.filter(mensaje => mensaje.usuario === usuario.email);
    }

    // Método para mostrar estadísticas de contacto (para admin)
    mostrarEstadisticas() {
        const mensajes = JSON.parse(localStorage.getItem('mensajes_contacto_ignis') || '[]');
        const usuario = this.gestorUsuarios.obtenerUsuarioActual();
        
        if (usuario && usuario.rol === 'admin') {
            console.log('Estadísticas de contacto:', {
                total: mensajes.length,
                pendientes: mensajes.filter(m => m.estado === 'pendiente').length,
                resueltos: mensajes.filter(m => m.estado === 'resuelto').length,
                porAsunto: this.agruparPorAsunto(mensajes)
            });
        }
    }

    agruparPorAsunto(mensajes) {
        return mensajes.reduce((acc, mensaje) => {
            acc[mensaje.asunto] = (acc[mensaje.asunto] || 0) + 1;
            return acc;
        }, {});
    }
}

// ============================================================================
// BLOQUE 9: FUNCIONES GLOBALES Y UTILIDADES
// ============================================================================

// Función global para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        const gestor = new GestorUsuarios();
        gestor.cerrarSesion();
        window.location.href = 'index.html';
    }
}

// Función global para verificar autenticación


// Función global para obtener usuario actual
function obtenerUsuarioActual() {
    const gestor = new GestorUsuarios();
    return gestor.obtenerUsuarioActual();
}

// ============================================================================
// BLOQUE 10: INICIALIZACIÓN Y EXPORTACIÓN
// ============================================================================

// Inicializar el contacto cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new ContactoPrueba();
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactoPrueba;
}