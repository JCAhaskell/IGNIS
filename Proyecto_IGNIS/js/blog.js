// ============================================================================
// BLOQUE 1: INICIALIZACIÓN ESPECÍFICA
// ============================================================================

// ============================================================================
// FUNCIONALIDAD DE FILTROS DE BLOG
// ============================================================================
function inicializarFiltrosBlog() {
    const filtrosBlog = document.querySelectorAll('.filtro-blog');
    const articulosBlog = document.querySelectorAll('.blog-card');
    
    filtrosBlog.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover clase activa de todos los filtros
            filtrosBlog.forEach(f => f.classList.remove('activo'));
            // Agregar clase activa al filtro clickeado
            this.classList.add('activo');
            
            const categoriaSeleccionada = this.textContent.toLowerCase();
            
            articulosBlog.forEach(articulo => {
                const categoria = articulo.querySelector('.blog-categoria');
                if (categoriaSeleccionada === 'todos' || 
                    (categoria && categoria.textContent.toLowerCase() === categoriaSeleccionada)) {
                    articulo.style.display = 'block';
                } else {
                    articulo.style.display = 'none';
                }
            });
        });
    });
}

function inicializarBotonesLeerMas() {
    // Funcionalidad de botones "Leer más"
    const botonesLeerMas = document.querySelectorAll('.btn-leer-mas');
    botonesLeerMas.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const articulo = this.closest('.blog-card');
            const titulo = articulo.querySelector('h3').textContent;
            alert(`Abriendo artículo: "${titulo}". Esta funcionalidad se implementará próximamente.`);
        });
    });
}

function inicializarPaginacion() {
    // Funcionalidad de paginación
    const botonesPaginacion = document.querySelectorAll('.blog-paginacion a');
    botonesPaginacion.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            // Remover clase activa de todos los botones
            botonesPaginacion.forEach(b => b.classList.remove('activa'));
            // Agregar clase activa al botón clickeado (si no es el de siguiente)
            if (!this.classList.contains('pagina-siguiente')) {
                this.classList.add('activa');
            }
            
            const pagina = this.textContent;
            if (pagina === '→') {
                alert('Cargando página siguiente...');
            } else {
                alert(`Cargando página ${pagina}...`);
            }
        });
    });
}

function inicializarNewsletter() {
    // Funcionalidad del newsletter
    const formularioNewsletter = document.querySelector('.newsletter-form');
    if (formularioNewsletter) {
        formularioNewsletter.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert(`¡Gracias por suscribirte! Hemos registrado el email: ${email}`);
                this.reset();
            } else {
                alert('Por favor, ingresa un email válido.');
            }
        });
    }
}

// Función de inicialización específica del blog
function inicializarBlog() {
    inicializarFiltrosBlog();
    inicializarBotonesLeerMas();
    inicializarPaginacion();
    inicializarNewsletter();
    console.log('Blog inicializado');
}

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN
// ============================================================================

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Usar función común para mostrar contenido y verificar usuario
    window.CommonAuth.mostrarContenidoYVerificarUsuario(inicializarBlog);
});