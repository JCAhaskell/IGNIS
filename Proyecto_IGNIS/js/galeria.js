// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DATOS DE GALERÍA
// ============================================================================

// JavaScript para la página de Galería

// Array con información de las imágenes de la galería
const imagenes = [
    {
        titulo: 'Viñedos al amanecer',
        descripcion: 'Nuestros viñedos capturan la primera luz del día, momento ideal para la fotosíntesis de nuestras uvas.',
        url: 'img/vinedo-amanecer.svg',
        categoria: 'viñedos'
    },
    {
        titulo: 'Barricas de roble',
        descripcion: 'Nuestros vinos maduran en barricas de roble francés y americano, adquiriendo complejidad y carácter.',
        url: 'img/barricas.svg',
        categoria: 'bodega'
    },
    {
        titulo: 'Sala de catas',
        descripcion: 'Espacio diseñado para apreciar los matices de nuestros vinos en un ambiente acogedor y profesional.',
        url: 'img/sala-catas.svg',
        categoria: 'instalaciones'
    },
    {
        titulo: 'Proceso de vendimia',
        descripcion: 'La recolección manual garantiza que solo las mejores uvas lleguen a nuestros vinos.',
        url: 'img/vendimia.svg',
        categoria: 'producción'
    },
    {
        titulo: 'Laboratorio enológico',
        descripcion: 'Donde ciencia y tradición se unen para crear vinos de calidad excepcional.',
        url: 'img/laboratorio.svg',
        categoria: 'producción'
    },
    {
        titulo: 'Eventos especiales',
        descripcion: 'Celebraciones y catas privadas en nuestras instalaciones para los amantes del buen vino.',
        url: 'img/eventos.svg',
        categoria: 'eventos'
    }
];

// ============================================================================
// BLOQUE 2: FUNCIONES DE CREACIÓN DE GALERÍA
// ============================================================================

// Función para crear elementos de la galería dinámicamente
function crearGaleria() {
    const galeriaContainer = document.querySelector('.gallery');
    
    // Limpiar contenedor
    galeriaContainer.innerHTML = '';
    
    // Crear elementos para cada imagen
    imagenes.forEach((imagen, index) => {
        // Crear elemento de galería
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.categoria = imagen.categoria;
        
        // Crear contenido del elemento
        const contenido = `
            <div class="gallery-img-container">
                <img src="${imagen.url}" alt="${imagen.titulo}" class="img-fluid gallery-img" 
                     onerror="this.src='img/logo.png'; this.style.padding='20px';">
            </div>
            <h3>${imagen.titulo}</h3>
            <p>${imagen.descripcion}</p>
            <button class="btn-ver-mas" data-index="${index}">Ver más</button>
        `;
        
        item.innerHTML = contenido;
        
        // Agregar al contenedor
        galeriaContainer.appendChild(item);
    });
    
    // Agregar eventos a los botones
    document.querySelectorAll('.btn-ver-mas').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            mostrarDetalleImagen(index);
        });
    });
}

// ============================================================================
// BLOQUE 3: FUNCIONES DE MODALES Y DETALLES
// ============================================================================

// Función para mostrar detalle de imagen en modal
function mostrarDetalleImagen(index) {
    const imagen = imagenes[index];
    
    // Crear contenido del modal
    const contenido = `
        <div class="modal-imagen-container">
            <img src="${imagen.url}" alt="${imagen.titulo}" class="img-fluid modal-imagen"
                 onerror="this.src='img/logo.png'; this.style.padding='20px';">
        </div>
        <div class="modal-imagen-info">
            <h3>${imagen.titulo}</h3>
            <p>${imagen.descripcion}</p>
            <p><strong>Categoría:</strong> ${imagen.categoria}</p>
        </div>
    `;
    
    // Botones para el modal
    const botones = [
        {
            texto: 'Anterior',
            clase: 'btn-anterior',
            accion: () => {
                const nuevoIndex = (index - 1 + imagenes.length) % imagenes.length;
                document.body.removeChild(document.querySelector('.modal-overlay'));
                mostrarDetalleImagen(nuevoIndex);
            }
        },
        {
            texto: 'Siguiente',
            clase: 'btn-siguiente',
            accion: () => {
                const nuevoIndex = (index + 1) % imagenes.length;
                document.body.removeChild(document.querySelector('.modal-overlay'));
                mostrarDetalleImagen(nuevoIndex);
            }
        }
    ];
    
    // Crear modal
    crearModal('Detalle de imagen', contenido, botones);
}

// ============================================================================
// BLOQUE 4: FUNCIONES DE FILTRADO Y CATEGORIZACIÓN
// ============================================================================

// Función para filtrar imágenes por categoría
function filtrarImagenes(categoria) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (categoria === 'todas' || item.dataset.categoria === categoria) {
            item.style.display = 'block';
            // Animación de aparición
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
        } else {
            // Animación de desaparición
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Función para crear filtros de categoría
function crearFiltros() {
    // Obtener categorías únicas
    const categorias = ['todas', ...new Set(imagenes.map(img => img.categoria))];
    
    // Crear contenedor de filtros
    const filtrosContainer = document.createElement('div');
    filtrosContainer.className = 'filtros-container';
    
    // Agregar título para los filtros
    const titulo = document.createElement('h3');
    titulo.textContent = 'Filtrar por categoría';
    filtrosContainer.appendChild(titulo);
    
    // Crear botones de filtro
    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-filtro';
    
    categorias.forEach(categoria => {
        const boton = document.createElement('button');
        boton.className = 'btn-filtro';
        boton.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
        boton.dataset.categoria = categoria;
        
        // Evento de clic
        boton.addEventListener('click', function() {
            // Quitar clase activa de todos los botones
            document.querySelectorAll('.btn-filtro').forEach(btn => {
                btn.classList.remove('activo');
            });
            
            // Agregar clase activa al botón actual
            this.classList.add('activo');
            
            // Filtrar imágenes
            filtrarImagenes(this.dataset.categoria);
        });
        
        botonesContainer.appendChild(boton);
    });
    
    filtrosContainer.appendChild(botonesContainer);
    
    // Insertar antes de la galería
    const galeria = document.querySelector('.gallery');
    galeria.parentNode.insertBefore(filtrosContainer, galeria);
    
    // Activar filtro 'todas' por defecto
    document.querySelector('.btn-filtro[data-categoria="todas"]').classList.add('activo');
}

// ============================================================================
// BLOQUE 5: FUNCIONES DE PRESENTACIÓN DE DIAPOSITIVAS
// ============================================================================

// Función para crear botón de presentación de diapositivas
function crearBotonPresentacion() {
    const boton = document.createElement('button');
    boton.className = 'btn-presentacion';
    boton.innerHTML = 'Iniciar presentación';
    
    // Evento de clic
    boton.addEventListener('click', iniciarPresentacion);
    
    // Insertar después de la galería
    const galeria = document.querySelector('.gallery');
    galeria.parentNode.insertBefore(boton, galeria.nextSibling);
}

// Función para iniciar presentación de diapositivas
function iniciarPresentacion() {
    let indiceActual = 0;
    let intervalo;
    
    // Crear modal para presentación
    const contenido = `
        <div class="presentacion-container">
            <img src="${imagenes[0].url}" alt="${imagenes[0].titulo}" class="img-fluid presentacion-img"
                 onerror="this.src='img/logo.png'; this.style.padding='20px';">
            <h3 class="presentacion-titulo">${imagenes[0].titulo}</h3>
            <p class="presentacion-descripcion">${imagenes[0].descripcion}</p>
        </div>
    `;
    
    const botones = [
        {
            texto: 'Pausar',
            clase: 'btn-pausar',
            accion: function() {
                if (this.textContent === 'Pausar') {
                    clearInterval(intervalo);
                    this.textContent = 'Reanudar';
                } else {
                    iniciarIntervalo();
                    this.textContent = 'Pausar';
                }
            }
        }
    ];
    
    const modal = crearModal('Presentación de imágenes', contenido, botones);
    
    // Función para cambiar imagen
    function cambiarImagen() {
        indiceActual = (indiceActual + 1) % imagenes.length;
        const imagen = imagenes[indiceActual];
        
        const imgElement = modal.querySelector('.presentacion-img');
        const tituloElement = modal.querySelector('.presentacion-titulo');
        const descripcionElement = modal.querySelector('.presentacion-descripcion');
        
        // Animación de transición
        imgElement.style.opacity = '0';
        tituloElement.style.opacity = '0';
        descripcionElement.style.opacity = '0';
        
        setTimeout(() => {
            imgElement.src = imagen.url;
            imgElement.alt = imagen.titulo;
            tituloElement.textContent = imagen.titulo;
            descripcionElement.textContent = imagen.descripcion;
            
            imgElement.style.opacity = '1';
            tituloElement.style.opacity = '1';
            descripcionElement.style.opacity = '1';
        }, 500);
    }
    
    // Función para iniciar intervalo
    function iniciarIntervalo() {
        intervalo = setInterval(cambiarImagen, 3000);
    }
    
    // Iniciar intervalo
    iniciarIntervalo();
    
    // Detener intervalo al cerrar modal
    modal.querySelector('.modal-cerrar').addEventListener('click', () => {
        clearInterval(intervalo);
    });
}

// ============================================================================
// BLOQUE 6: INICIALIZACIÓN Y EVENTOS
// ============================================================================

// Función para mostrar contenido y verificar si hay usuario logueado
function mostrarContenidoYVerificarUsuario() {
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
    
    // Inicializar funcionalidades de la galería
    inicializarGaleria();
}

// Función para inicializar la galería
function inicializarGaleria() {
    // Crear galería dinámica
    crearGaleria();
    
    // Crear filtros de categoría
    crearFiltros();
    
    // Crear botón de presentación
    crearBotonPresentacion();
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar contenido y verificar usuario
    mostrarContenidoYVerificarUsuario();
});

// ============================================================================
// BLOQUE 7: FUNCIONES DE NAVEGACIÓN Y AUTENTICACIÓN
// ============================================================================

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        const gestor = new GestorUsuarios();
        gestor.cerrarSesion();
        window.location.href = 'index.html';
    }
}

// Función para alternar menú móvil
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (navMenu && menuToggle && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// Función para verificar autenticación


// Función para obtener usuario actual
function obtenerUsuarioActual() {
    const gestor = new GestorUsuarios();
    return gestor.obtenerUsuarioActual();
}