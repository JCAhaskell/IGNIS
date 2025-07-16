// ============================================================================
// TERCERA ENTREGA - PUNTO M: ESTRUCTURAS DE CONTROL Y MANIPULACIÓN DOM
// Implementación de if/else, for, while, addEventListener, querySelector
// ============================================================================
// ============================================================================
// BLOQUE 1: CLASE PRINCIPAL DE TIENDA
// ============================================================================

// Sistema de tienda con autenticación
class TiendaPrueba {
    constructor() {
        this.gestorUsuarios = new GestorUsuarios();
        this.init();
    }

    init() {
        // Verificar autenticación al cargar la página
        this.verificarAutenticacion();
        
        // Configurar eventos del formulario
        this.configurarEventos();
    }

    // ============================================================================
    // BLOQUE 2: AUTENTICACIÓN Y VERIFICACIÓN
    // ============================================================================

    verificarAutenticacion() {
        const loadingMessage = document.getElementById('loadingMessage');
        const mainContent = document.getElementById('mainContent');
        const userInfo = document.getElementById('userInfo');
        const userWelcome = document.getElementById('userWelcome');

        // Simular un pequeño delay para mostrar el loading
        setTimeout(() => {
            if (!this.gestorUsuarios.verificarSesionActiva()) {
                // Redirigir al login si no está autenticado
                window.location.href = 'index.html';
                return;
            }

            // Usuario autenticado, mostrar contenido
            const usuario = this.gestorUsuarios.obtenerUsuarioActual();
            
            loadingMessage.style.display = 'none';
            mainContent.style.display = 'block';
            userInfo.style.display = 'block';
            
            userWelcome.textContent = `Bienvenido, ${usuario.tipo}`;
            
            // Pre-llenar el formulario con datos del usuario
            this.prellenarFormulario(usuario);
        }, 1000);
    }

    // ============================================================================
    // BLOQUE 3: CONFIGURACIÓN DE FORMULARIOS
    // ============================================================================

    prellenarFormulario(usuario) {
        const nombreInput = document.getElementById('nombre');
        const emailInput = document.getElementById('email');
        
        if (nombreInput) nombreInput.value = usuario.nombre;
        if (emailInput) {
            emailInput.value = usuario.email;
            emailInput.readOnly = true; // No permitir cambiar el email
        }
    }

    configurarEventos() {
        const form = document.getElementById('pedidoForm');
        if (form) {
            form.addEventListener('submit', (e) => this.procesarPedido(e));
        }
    }

    // ============================================================================
    // BLOQUE 4: PROCESAMIENTO DE PEDIDOS
    // ============================================================================

    procesarPedido(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const pedido = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            tipoVino: formData.get('tipoVino'),
            cantidad: parseInt(formData.get('cantidad')),
            fecha: new Date().toISOString(),
            usuario: this.gestorUsuarios.obtenerUsuarioActual().email
        };

        // Validar datos
        if (!this.validarPedido(pedido)) {
            return;
        }

        // Guardar pedido
        this.guardarPedido(pedido);
        
        // Mostrar confirmación
        this.mostrarConfirmacion(pedido);
        
        // Limpiar formulario (excepto datos del usuario)
        this.limpiarFormulario();
    }

    // ============================================================================
    // BLOQUE 5: VALIDACIÓN DE DATOS
    // ============================================================================

    validarPedido(pedido) {
        if (!pedido.nombre.trim()) {
            alert('Por favor, ingresa tu nombre completo.');
            return false;
        }
        
        if (!pedido.email.trim() || !this.validarEmail(pedido.email)) {
            alert('Por favor, ingresa un email válido.');
            return false;
        }
        
        if (!pedido.tipoVino) {
            alert('Por favor, selecciona un tipo de vino.');
            return false;
        }
        
        if (!pedido.cantidad || pedido.cantidad < 1 || pedido.cantidad > 50) {
            alert('Por favor, ingresa una cantidad válida (1-50).');
            return false;
        }
        
        return true;
    }

    validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // ============================================================================
    // BLOQUE 6: GESTIÓN DE DATOS Y ALMACENAMIENTO
    // ============================================================================

    guardarPedido(pedido) {
        // Obtener pedidos existentes
        let pedidos = JSON.parse(localStorage.getItem('pedidos_ignis') || '[]');
        
        // Agregar nuevo pedido
        pedido.id = Date.now().toString();
        pedidos.push(pedido);
        
        // Guardar en localStorage
        localStorage.setItem('pedidos_ignis', JSON.stringify(pedidos));
        
        console.log('Pedido guardado:', pedido);
    }

    // ============================================================================
    // BLOQUE 7: INTERFAZ Y FEEDBACK AL USUARIO
    // ============================================================================

    mostrarConfirmacion(pedido) {
        const mensaje = `¡Pedido realizado con éxito!\n\n` +
                       `Detalles del pedido:\n` +
                       `- Cliente: ${pedido.nombre}\n` +
                       `- Email: ${pedido.email}\n` +
                       `- Vino: ${this.obtenerNombreVino(pedido.tipoVino)}\n` +
                       `- Cantidad: ${pedido.cantidad} botella(s)\n\n` +
                       `Nos pondremos en contacto contigo pronto para confirmar tu pedido.`;
        
        alert(mensaje);
    }

    // ============================================================================
    // BLOQUE 8: MÉTODOS AUXILIARES Y UTILIDADES
    // ============================================================================

    obtenerNombreVino(tipo) {
        const nombres = {
            'tinto': 'Vino Tinto',
            'blanco': 'Vino Blanco',
            'rosado': 'Vino Rosado',
            'espumoso': 'Vino Espumoso',
            'dulce': 'Vino Dulce'
        };
        return nombres[tipo] || tipo;
    }

    limpiarFormulario() {
        const tipoVino = document.getElementById('tipoVino');
        const cantidad = document.getElementById('cantidad');
        
        if (tipoVino) tipoVino.value = '';
        if (cantidad) cantidad.value = '';
    }

    // Método para obtener historial de pedidos del usuario actual
    obtenerHistorialPedidos() {
        const usuario = this.gestorUsuarios.obtenerUsuarioActual();
        if (!usuario) return [];
        
        const pedidos = JSON.parse(localStorage.getItem('pedidos_ignis') || '[]');
        return pedidos.filter(pedido => pedido.usuario === usuario.email);
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

// Inicializar la tienda cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new TiendaPrueba();
});

// Exportar para uso en otros módulos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiendaPrueba;
}