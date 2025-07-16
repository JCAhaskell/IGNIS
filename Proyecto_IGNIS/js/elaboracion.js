// ============================================================================
// BLOQUE 1: INICIALIZACIÓN ESPECÍFICA
// ============================================================================

// ============================================================================
// BLOQUE 2: DATOS DE GALERÍA INTERACTIVA
// ============================================================================

// Configuración de imágenes de elaboración
const imagenesElaboracion = {
    vendimia: {
        src: 'img/vinoTinto2.png',
        titulo: 'Vendimia',
        descripcion: 'Selección manual de racimos en el punto óptimo de maduración para garantizar la máxima calidad.'
    },
    despalillado: {
        src: 'img/vinoBlanco2.png',
        titulo: 'Despalillado y Estrujado',
        descripcion: 'Separación de granos del raspón y estrujado suave para liberar el mosto sin dañar las semillas.'
    },
    fermentacion: {
        src: 'img/vinoRosado.png',
        titulo: 'Fermentación',
        descripcion: 'Transformación del mosto en vino mediante fermentación controlada en cubas de acero inoxidable.'
    },
    crianza: {
        src: 'img/vinoEspumoso.png',
        titulo: 'Crianza',
        descripcion: 'Envejecimiento en barricas de roble francés y americano para desarrollar complejidad y estructura.'
    },
    embotellado: {
        src: 'img/vinoDulce.png',
        titulo: 'Embotellado y Afinamiento',
        descripcion: 'Embotellado en atmósfera inerte y afinamiento final en botella para alcanzar la máxima expresión.'
    },
    laboratorio: {
        src: 'img/vinoTinto.png',
        titulo: 'Control de Calidad',
        descripcion: 'Análisis riguroso en cada etapa para garantizar los más altos estándares de calidad.'
    }
};

// ============================================================================
// BLOQUE 3: FUNCIONES DE GALERÍA
// ============================================================================

// Función para cambiar imagen de elaboración
function cambiarImagenElaboracion(tipo) {
    const imagen = document.getElementById('imagen-bodega');
    const titulo = document.getElementById('titulo-imagen');
    const texto = document.getElementById('texto-imagen');
    
    if (imagenesElaboracion[tipo]) {
        imagen.src = imagenesElaboracion[tipo].src;
        titulo.textContent = imagenesElaboracion[tipo].titulo;
        texto.textContent = imagenesElaboracion[tipo].descripcion;
    }
}

// ============================================================================
// BLOQUE 4: FUNCIONES DE FORMULARIOS DE RESERVA
// ============================================================================

// Función para mostrar formulario de reserva
function mostrarFormularioReserva(tipoServicio) {
    // Crear overlay del modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Crear header del modal
    const header = document.createElement('div');
    header.className = 'modal-header';
    
    const tituloElement = document.createElement('h2');
    const titulo = tipoServicio === 'visitas-guiadas' ? 'Reservar Visita al Proceso' : 'Reservar Taller de Elaboración';
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
    const contenidoModal = document.createElement('div');
    contenidoModal.className = 'modal-contenido';
    
    const precio = tipoServicio === 'visitas-guiadas' ? 'S/ 65' : 'S/ 120';
    const imagen = tipoServicio === 'visitas-guiadas' ? 'img/vinoTinto.png' : 'img/vinoBlanco.png';
    const descripcion = tipoServicio === 'visitas-guiadas' ? 'Experiencia completa del proceso de elaboración con degustación incluida.' : 'Taller práctico donde crearás tu propio blend personalizado.';
    
    contenidoModal.innerHTML = `
        <!-- Formato de tarjeta de vino -->
        <div class="vino-card" style="margin-bottom: 30px; cursor: default; transform: none; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
            <div class="vino-imagen-container">
                <img src="${imagen}" alt="${titulo}" class="vino-imagen">
            </div>
            <div class="vino-info">
                <h3>${titulo}</h3>
                <p class="vino-tipo">${tipoServicio === 'visitas-guiadas' ? 'Experiencia Guiada' : 'Taller Práctico'}</p>
                <p class="vino-precio">${precio}</p>
                <p class="vino-descripcion">${descripcion}</p>
            </div>
        </div>
        
        <form id="formulario-reserva">
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Nombre completo *</label>
                <input type="text" id="nombre" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Email *</label>
                <input type="email" id="email" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Teléfono *</label>
                <input type="tel" id="telefono" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Fecha preferida *</label>
                <input type="date" id="fecha" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Número de personas *</label>
                <select id="personas" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
                    <option value="">Seleccionar...</option>
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6">6 personas</option>
                    <option value="7">7 personas</option>
                    <option value="8">8 personas</option>
                    <option value="9">9 personas</option>
                    <option value="10">10 personas</option>
                    <option value="11">11 personas</option>
                    <option value="12">12 personas</option>
                </select>
            </div>
            
            <div style="margin-bottom: 20px;">
                <label style="display: block; margin-bottom: 5px; font-weight: bold;">Comentarios adicionales</label>
                <textarea id="comentarios" rows="3" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; resize: vertical;"></textarea>
            </div>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                <strong>Precio: ${precio} por persona</strong>
            </div>
            
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button type="button" onclick="cerrarModal()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Cancelar</button>
                <button type="submit" style="padding: 10px 20px; background: #8B0000; color: white; border: none; border-radius: 5px; cursor: pointer;">Reservar</button>
            </div>
        </form>
    `;
    
    // Ensamblar modal
    modal.appendChild(header);
    modal.appendChild(contenidoModal);
    overlay.appendChild(modal);
    
    // Agregar al DOM
    document.body.appendChild(overlay);
    
    // Configurar fecha mínima (hoy)
    const fechaInput = document.getElementById('fecha');
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.min = hoy;
    
    // Manejar envío del formulario
    document.getElementById('formulario-reserva').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const fecha = document.getElementById('fecha').value;
        const personas = document.getElementById('personas').value;
        
        if (nombre && email && telefono && fecha && personas) {
            // Mostrar mensaje de confirmación
            contenidoModal.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="color: #28a745; font-size: 3rem; margin-bottom: 20px;">✓</div>
                    <h2 style="color: var(--color-primario); margin-bottom: 20px;">¡Reserva Confirmada!</h2>
                    <p style="color: #666; margin-bottom: 30px;">Su reserva para ${titulo} ha sido recibida y está pendiente de confirmación.</p>
                    <button onclick="cerrarModal()" style="background: linear-gradient(135deg, var(--color-primario), #600018); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-size: 1rem; cursor: pointer;">Cerrar</button>
                </div>
            `;
        } else {
            alert('Por favor, complete todos los campos obligatorios.');
        }
    });
    
    // Cerrar modal al hacer clic en el overlay
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

// Función para cerrar modal
function cerrarModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

// Función de inicialización específica de elaboración
function inicializarElaboracion() {
    // Agregar eventos de clic a los botones de galería
    const botonesGaleria = document.querySelectorAll('.btn-galeria');
    botonesGaleria.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase active de todos los botones
            botonesGaleria.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            // Cambiar imagen
            const tipo = this.dataset.imagen;
            cambiarImagenElaboracion(tipo);
        });
    });
    
    // Agregar eventos de clic a las tarjetas de servicios
    const tarjetasServicios = document.querySelectorAll('.servicio-card');
    tarjetasServicios.forEach(tarjeta => {
        tarjeta.style.cursor = 'pointer';
        tarjeta.addEventListener('click', function() {
            const tipoServicio = this.dataset.servicio;
            mostrarFormularioReserva(tipoServicio);
        });
    });
    
    console.log('Elaboración inicializada');
}

// ============================================================================
// BLOQUE 2: INICIALIZACIÓN
// ============================================================================

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Usar función común para mostrar contenido y verificar usuario
    window.CommonAuth.mostrarContenidoYVerificarUsuario(inicializarElaboracion);
});