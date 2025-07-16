// ============================================================================
// BLOQUE 1: CLASE PRINCIPAL DE GESTIÓN DE USUARIOS
// ============================================================================

/**
 * Gestor de Usuarios - Sistema de Autenticación
 * Maneja login, logout y gestión de sesiones
 */

/* ========================================
   TERCERA ENTREGA - PUNTO K: OPERACIONES CRUD
   Gestión completa de usuarios con localStorage
   ======================================== */
class GestorUsuarios {
    constructor() {
        this.usuarios = this.cargarUsuarios();
        this.inicializarUsuariosPrueba();
    }
    
    // ============================================================================
    // BLOQUE 2: GESTIÓN DE DATOS Y ALMACENAMIENTO
    // ============================================================================

    /**
     * Carga usuarios desde localStorage
     */
    cargarUsuarios() {
        const usuarios = localStorage.getItem('ignis_usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }
    
    /**
     * Guarda usuarios en localStorage
     */
    guardarUsuarios() {
        localStorage.setItem('ignis_usuarios', JSON.stringify(this.usuarios));
    }
    
    /**
     * Inicializa usuarios básicos del sistema
     */
    inicializarUsuariosPrueba() {
        // Verificar si necesitamos recrear usuarios
        const necesitaReinicializar = this.usuarios.length === 0 || 
            !this.usuarios.find(u => u.email === 'admin@ignis.com') ||
            !this.usuarios.find(u => u.email === 'usuario@ignis.com');
            
        if (necesitaReinicializar) {
            console.log('Inicializando usuarios del sistema...');
            
            const usuariosIniciales = [
                {
                    id: 1,
                    email: 'admin@ignis.com',
                    password: 'admin123',
                    nombre: 'Administrador',
                    tipo: 'admin',
                    fechaRegistro: new Date().toISOString()
                },
                {
                    id: 2,
                    email: 'usuario@ignis.com',
                    password: 'usuario123',
                    nombre: 'Usuario Normal',
                    tipo: 'cliente',
                    fechaRegistro: new Date().toISOString()
                }
            ];
            
            // Limpiar usuarios existentes y agregar los nuevos
            this.usuarios = usuariosIniciales;
            this.guardarUsuarios();
            
            console.log('Usuarios inicializados:', this.usuarios.map(u => u.email));
        } else {
            console.log('Usuarios ya existentes:', this.usuarios.map(u => u.email));
        }
    }
    
    // ============================================================================
    // BLOQUE 3: AUTENTICACIÓN
    // ============================================================================

    // Autentica un usuario
    autenticar(email, password) {
        console.log('Intentando autenticar:', email);
        console.log('Usuarios disponibles:', this.usuarios.map(u => ({ email: u.email, tipo: u.tipo })));
        
        // Verificar que tenemos usuarios cargados
        if (!this.usuarios || this.usuarios.length === 0) {
            console.error('No hay usuarios cargados en el sistema');
            this.inicializarUsuariosPrueba();
        }
        
        const usuario = this.usuarios.find(u => {
            const emailCoincide = u.email.toLowerCase() === email.toLowerCase();
            const passwordCoincide = u.password === password;
            
            console.log(`Verificando usuario ${u.email}: email=${emailCoincide}, password=${passwordCoincide}`);
            
            return emailCoincide && passwordCoincide;
        });
        
        if (usuario) {
            console.log('Usuario autenticado exitosamente:', usuario.email);
            
            // Crear sesión
            const sesion = {
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    tipo: usuario.tipo
                },
                fechaLogin: new Date().toISOString(),
                activa: true
            };
            
            try {
                localStorage.setItem('ignis_sesion', JSON.stringify(sesion));
                localStorage.setItem('ignis_usuario_logueado', 'true');
                console.log('Sesión creada correctamente');
            } catch (error) {
                console.error('Error al guardar sesión en localStorage:', error);
            }
            
            return usuario;
        } else {
            console.log('Autenticación fallida para:', email);
        }
        
        return null;
    }
    
    // ============================================================================
    // BLOQUE 4: GESTIÓN DE SESIONES
    // ============================================================================

    // Verifica si hay una sesión activa
    verificarSesion() {
        return this.verificarSesionActiva();
    }
    
    // Verifica si hay una sesión activa (método optimizado)
    verificarSesionActiva() {
        const logueado = localStorage.getItem('ignis_usuario_logueado');
        
        // Verificación rápida primero
        if (logueado !== 'true') {
            return false;
        }
        
        const sesion = localStorage.getItem('ignis_sesion');
        if (!sesion) {
            this.cerrarSesion();
            return false;
        }
        
        try {
            const datosSesion = JSON.parse(sesion);
            
            // Verificar que el usuario de la sesión existe en la base de datos
            const usuarioExiste = this.usuarios.find(u => 
                u.id === datosSesion.usuario.id && 
                u.email === datosSesion.usuario.email
            );
            
            if (!usuarioExiste) {
                // El usuario ya no existe, cerrar sesión
                this.cerrarSesion();
                return false;
            }
            
            // Verificar que la sesión no sea muy antigua (24 horas)
            const fechaLogin = new Date(datosSesion.fechaLogin);
            const ahora = new Date();
            const diferencia = ahora - fechaLogin;
            const horasTranscurridas = diferencia / (1000 * 60 * 60);
            
            if (horasTranscurridas < 24) {
                return true;
            } else {
                // Sesión expirada
                this.cerrarSesion();
                return false;
            }
        } catch (error) {
            // Error al parsear la sesión, limpiar
            this.cerrarSesion();
            return false;
        }
    }
    
    // Obtiene los datos del usuario actual
    obtenerUsuarioActual() {
        const sesion = localStorage.getItem('ignis_sesion');
        if (sesion) {
            const datosSesion = JSON.parse(sesion);
            return datosSesion.usuario;
        }
        return null;
    }
    
    // Cierra la sesión actual
    cerrarSesion() {
        localStorage.removeItem('ignis_sesion');
        localStorage.removeItem('ignis_usuario_logueado');
    }
    
    // ============================================================================
    // BLOQUE 5: UTILIDADES Y FUNCIONES AUXILIARES
    // ============================================================================

    // Cambia la contraseña de un usuario
    cambiarPassword(email, nuevaPassword) {
        const usuario = this.usuarios.find(u => u.email === email);
        if (usuario) {
            usuario.password = nuevaPassword;
            this.guardarUsuarios();
            return true;
        }
        return false;
    }
    
    // Obtiene todos los usuarios (solo para admin)
    obtenerTodosLosUsuarios() {
        const usuarioActual = this.obtenerUsuarioActual();
        if (usuarioActual && usuarioActual.tipo === 'admin') {
            return this.usuarios.map(u => ({
                id: u.id,
                email: u.email,
                nombre: u.nombre,
                tipo: u.tipo,
                fechaRegistro: u.fechaRegistro
            }));
        }
        return [];
    }
    
    // ============================================================================
    // BLOQUE 6: FUNCIONES DE DIAGNÓSTICO Y REPARACIÓN
    // ============================================================================
    
    /**
     * Función de diagnóstico del sistema
     */
    diagnosticar() {
        console.log('=== DIAGNÓSTICO DEL SISTEMA IGNIS ===');
        console.log('Usuarios en memoria:', this.usuarios.length);
        console.log('Usuarios:', this.usuarios.map(u => ({ email: u.email, tipo: u.tipo })));
        
        const sesionActiva = localStorage.getItem('ignis_usuario_logueado');
        const datosSession = localStorage.getItem('ignis_sesion');
        
        console.log('Sesión activa:', sesionActiva);
        console.log('Datos de sesión:', datosSession);
        
        if (datosSession) {
            try {
                const sesion = JSON.parse(datosSession);
                console.log('Usuario logueado:', sesion.usuario);
            } catch (e) {
                console.error('Error al parsear sesión:', e);
            }
        }
        
        console.log('=== FIN DIAGNÓSTICO ===');
    }
    
    /**
     * Función para reparar el sistema de usuarios
     */
    repararSistema() {
        console.log('=== REPARANDO SISTEMA ===');
        
        // Limpiar localStorage
        localStorage.removeItem('ignis_usuarios');
        localStorage.removeItem('ignis_sesion');
        localStorage.removeItem('ignis_usuario_logueado');
        
        // Reinicializar usuarios
        this.usuarios = [];
        this.inicializarUsuariosPrueba();
        
        console.log('Sistema reparado. Usuarios disponibles:');
        console.log('- admin@ignis.com / admin123');
        console.log('- usuario@ignis.com / usuario123');
        console.log('=== REPARACIÓN COMPLETA ===');
    }
}

// ============================================================================
// BLOQUE 7: INICIALIZACIÓN GLOBAL
// ============================================================================

// Crear instancia global
window.gestorUsuarios = new GestorUsuarios();

// Hacer funciones de diagnóstico disponibles globalmente
window.diagnosticarIGNIS = () => window.gestorUsuarios.diagnosticar();
window.repararIGNIS = () => window.gestorUsuarios.repararSistema();

// Mensaje de ayuda para desarrolladores
console.log('🔥 SISTEMA IGNIS CARGADO 🔥');
console.log('Funciones de diagnóstico disponibles:');
console.log('- diagnosticarIGNIS() - Muestra el estado del sistema');
console.log('- repararIGNIS() - Repara y reinicia el sistema de usuarios');
console.log('Usuarios por defecto:');
console.log('- admin@ignis.com / admin123 (Administrador)');
console.log('- usuario@ignis.com / usuario123 (Cliente)');