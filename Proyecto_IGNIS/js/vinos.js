// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DATOS DE VINOS
// ============================================================================

// JavaScript para la página de Vinos

// Array con los vinos de la bodega basado en la tabla original
const catalogoVinos = [
    {
        id: 'tinto-reserva',
        nombre: 'Tinto Reserva',
        tipo: 'tinto',
        variedad: 'Cabernet y Malbec',
        añada: 2020,
        descripcion: 'Cosecha 2020. Elaborado con uvas Cabernet y Malbec en Arequipa. Envejecido 12 meses en barricas de roble francés. Notas intensas de frutos negros, chocolate amargo y un final especiado.',
        maridaje: ['Carnes rojas', 'Cordero', 'Quesos curados'],
        precio: 120,
        imagen: 'img/vinoTinto.png',
        destacado: false,
        stock: 24,
        crianza: '12 meses en barricas de roble francés',
        alcohol: 14.5,
        temperatura: '16-18°C',
        premios: []
    },
    {
        id: 'blanco-barrica',
        nombre: 'Blanco Barrica',
        tipo: 'blanco',
        variedad: 'Chardonnay y Sauvignon Blanc',
        añada: 2021,
        descripcion: 'Cosecha 2021. Blend de Chardonnay y Sauvignon Blanc. Fermentado en barricas de roble americano durante 6 meses. Aromas a piña caramelizada, vainilla y un toque mineral. Textura cremosa y acidez vibrante.',
        maridaje: ['Pescados', 'Mariscos', 'Pastas con salsas suaves'],
        precio: 95,
        imagen: 'img/vinoBlanco.png',
        destacado: false,
        stock: 30,
        crianza: '6 meses en barricas de roble americano',
        alcohol: 13.5,
        temperatura: '8-10°C',
        premios: []
    },
    {
        id: 'rosado-lacrima',
        nombre: 'Rosado de Lacrima',
        tipo: 'rosado',
        variedad: 'Lacrima di Morro',
        añada: 2022,
        descripcion: 'Cosecha 2022. Elaborado con uvas Lacrima di Morro. Fermentación en acero inoxidable. Color salmón brillante. Aromas a fresas silvestres, pomelo rosado y flores blancas. Ideal para aperitivos.',
        maridaje: ['Ensaladas', 'Arroces', 'Carnes blancas'],
        precio: 85,
        imagen: 'img/vinoRosado.png',
        destacado: false,
        stock: 25,
        crianza: 'Sin crianza en barrica',
        alcohol: 12.5,
        temperatura: '6-8°C',
        premios: []
    },
    {
        id: 'espumoso-brut',
        nombre: 'Espumoso Brut Nature',
        tipo: 'espumoso',
        variedad: 'Pinot Noir y Chardonnay',
        añada: 2021,
        descripcion: 'Cosecha 2021. Método tradicional. Blend de Pinot Noir y Chardonnay. Sin azúcar agregada (Brut Nature). Burbujas finas y persistentes. Notas a pan tostado, manzana verde y almendras.',
        maridaje: ['Aperitivos', 'Mariscos', 'Postres'],
        precio: 150,
        imagen: 'img/vinoEspumoso.png',
        destacado: false,
        stock: 18,
        crianza: '18 meses en rima',
        alcohol: 12.0,
        temperatura: '6-8°C',
        premios: []
    },
    {
        id: 'dulce-moscatel',
        nombre: 'Dulce Moscatel',
        tipo: 'dulce',
        variedad: 'Moscatel de Alejandría',
        añada: 2019,
        descripcion: 'Cosecha 2019. Uvas Moscatel de Alejandría sobremadura. Envejecido 24 meses en barricas de roble. Aromas a miel, albaricoque seco y flores de azahar. Perfecto con postres.',
        maridaje: ['Postres', 'Quesos azules', 'Foie gras'],
        precio: 110,
        imagen: 'img/vinoDulce.png',
        destacado: false,
        stock: 15,
        crianza: '24 meses en barricas de roble',
        alcohol: 15.0,
        temperatura: '8-10°C',
        premios: []
    }
];

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN Y CONFIGURACIÓN
// ============================================================================

// Función para inicializar la página de vinos
function inicializarVinos() {
    // Configurar eventos de clic en las imágenes de vinos
    configurarEventosVinos();
    console.log('Página de Vinos cargada');
}

// ============================================================================
// BLOQUE 3: INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Usar función común para mostrar contenido y verificar usuario
    window.CommonAuth.mostrarContenidoYVerificarUsuario(inicializarVinos);
});

// Función para configurar eventos de los vinos
function configurarEventosVinos() {
    const vinosCards = document.querySelectorAll('.vino-card');
    
    vinosCards.forEach(card => {
        // Efecto hover
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.cursor = 'pointer';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        });
        
        // Evento click
        card.addEventListener('click', function() {
            const vinoId = this.dataset.vino;
            mostrarDetalleVino(vinoId);
        });
    });
}









// ============================================================================
// BLOQUE 3: FUNCIONES DE MODALES Y DETALLES
// ============================================================================

// Función para mostrar detalle de un vino
function mostrarDetalleVino(vinoId) {
    // Cerrar cualquier modal existente antes de abrir uno nuevo
    const modalExistente = document.querySelector('.modal-overlay');
    if (modalExistente) {
        document.body.removeChild(modalExistente);
    }
    
    const vino = catalogoVinos.find(v => v.id === vinoId);
    
    // Crear contenido del modal
    const contenido = `
        <div class="vino-detalle">
            <div class="vino-detalle-imagen">
                <img src="${vino.imagen}" alt="${vino.nombre}" class="img-fluid"
                     onerror="this.src='img/logo.png'; this.style.padding='20px';">
                ${vino.destacado ? '<span class="vino-destacado grande">Destacado</span>' : ''}
            </div>
            <div class="vino-detalle-info">
                <h3>${vino.nombre}</h3>
                <div class="vino-detalle-meta">
                    <span class="vino-tipo ${vino.tipo}">${vino.tipo}</span>
                    <span class="vino-variedad">${vino.variedad}</span>
                    <span class="vino-añada">${vino.añada}</span>
                </div>
                <div class="vino-detalle-precio">S/ ${vino.precio}</div>
                <div class="vino-detalle-descripcion">
                    <h4>Descripción</h4>
                    <p>${vino.descripcion}</p>
                </div>
                <div class="vino-detalle-caracteristicas">
                    <div class="caracteristica">
                        <div>
                            <h5>Crianza</h5>
                            <p>${vino.crianza}</p>
                        </div>
                    </div>
                    <div class="caracteristica">
                        <div>
                            <h5>Alcohol</h5>
                            <p>${vino.alcohol}% vol.</p>
                        </div>
                    </div>
                    <div class="caracteristica">
                        <div>
                            <h5>Temperatura de servicio</h5>
                            <p>${vino.temperatura}</p>
                        </div>
                    </div>
                </div>
                <div class="vino-detalle-maridaje">
                    <h4>Maridaje recomendado</h4>
                    <ul>
                        ${vino.maridaje.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                ${vino.premios.length > 0 ? `
                    <div class="vino-detalle-premios">
                        <h4>Premios y reconocimientos</h4>
                        <ul>
                            ${vino.premios.map(premio => `<li>${premio}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                <div class="vino-detalle-info-adicional">
                    <div class="vino-disponibilidad">
                        <span class="${vino.stock > 0 ? 'disponible' : 'agotado'}">
                            ${vino.stock > 0 ? `✓ Disponible en bodega` : '✗ Temporalmente agotado'}
                        </span>
                    </div>
                    <div class="vino-contacto">
                        <p><strong>Para consultas y pedidos:</strong></p>
                        <p>📞 Teléfono: +51 999 888 777</p>
                        <p>📧 Email: ventas@ignis.com</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Crear modal
    const modal = crearModal(vino.nombre, contenido);
    
    // El modal ahora solo muestra información, sin funcionalidad de compra
}





// ============================================================================
// BLOQUE 4: UTILIDADES Y FUNCIONES AUXILIARES
// ============================================================================

// Función para crear modal genérico
function crearModal(titulo, contenido) {
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Crear header del modal
    const header = document.createElement('div');
    header.className = 'modal-header';
    
    const tituloElement = document.createElement('h2');
    tituloElement.textContent = titulo;
    
    const btnCerrar = document.createElement('button');
    btnCerrar.className = 'modal-cerrar';
    btnCerrar.innerHTML = '&times;';
    btnCerrar.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    header.appendChild(tituloElement);
    header.appendChild(btnCerrar);
    
    // Crear contenido del modal
    const contenidoElement = document.createElement('div');
    contenidoElement.className = 'modal-contenido';
    contenidoElement.innerHTML = contenido;
    
    // Ensamblar modal
    modal.appendChild(header);
    modal.appendChild(contenidoElement);
    overlay.appendChild(modal);
    
    // Agregar al DOM
    document.body.appendChild(overlay);
    
    // Cerrar modal al hacer clic en el overlay
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    return overlay;
}

// ============================================================================
// BLOQUE 5: INICIALIZACIÓN Y EVENTOS
// ============================================================================



// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar contenido y verificar usuario
    mostrarContenidoYVerificarUsuario();
});

// ============================================================================
// BLOQUE 6: FUNCIONES DE AUTENTICACIÓN
// ============================================================================

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        const gestor = new GestorUsuarios();
        gestor.cerrarSesion();
        window.location.href = 'index.html';
    }
}

// Función para verificar autenticación


// Función para obtener usuario actual
function obtenerUsuarioActual() {
    const gestor = new GestorUsuarios();
    return gestor.obtenerUsuarioActual();
}