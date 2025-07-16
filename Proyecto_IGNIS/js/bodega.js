// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DATOS DE LA BODEGA
// ============================================================================

// JavaScript para la página de Bodega

// ============================================================================
// FUNCIONES DE FORMULARIOS DE RESERVA
// ============================================================================
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
    const titulo = tipoServicio === 'visitas-guiadas' ? 'Reservar Visita Guiada' : 'Reservar Cata y Eventos';
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
    
    const precio = tipoServicio === 'visitas-guiadas' ? 'S/ 25' : 'S/ 45';
    const imagen = tipoServicio === 'visitas-guiadas' ? 'img/vinoTinto.png' : 'img/vinoBlanco.png';
    const descripcion = tipoServicio === 'visitas-guiadas' ? 'Recorrido completo por nuestras instalaciones con degustación incluida.' : 'Cata dirigida de nuestros mejores vinos con maridaje de quesos artesanales.';
    
    contenidoModal.innerHTML = `
        <!-- Formato de tarjeta de vino -->
        <div class="vino-card" style="margin-bottom: 30px; cursor: default; transform: none; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
            <div class="vino-imagen-container">
                <img src="${imagen}" alt="${titulo}" class="vino-imagen">
            </div>
            <div class="vino-info">
                <h3>${titulo}</h3>
                <p class="vino-tipo">${tipoServicio === 'visitas-guiadas' ? 'Experiencia Guiada' : 'Cata Premium'}</p>
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
            // Mostrar mensaje de confirmación del navegador
            alert('Solicitud recibida');
            // Cerrar el modal después del mensaje
            cerrarModal();
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

function cerrarModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}



// Array con las imágenes de la galería de la bodega
const imagenesGaleria = {
    exterior: {
        src: 'img/exterior.png',
        titulo: 'Exterior de la Bodega',
        descripcion: 'Vista exterior de nuestra bodega ubicada en el corazón de los viñedos arequipeños. Un edificio que combina arquitectura tradicional con instalaciones modernas para la elaboración de vinos de alta calidad.'
    },
    barricas: {
        src: 'img/barricas.png',
        titulo: 'Sala de Barricas',
        descripcion: 'Nuestra sala de barricas donde el vino reposa y adquiere sus características únicas. Utilizamos barricas de roble francés y americano para lograr el equilibrio perfecto entre tradición e innovación.'
    },
    fermentacion: {
        src: 'img/fermentacion.png',
        titulo: 'Tanques de Fermentación',
        descripcion: 'Modernos tanques de acero inoxidable con control de temperatura donde se lleva a cabo el proceso de fermentación. La tecnología de punta garantiza la calidad y consistencia de nuestros vinos.'
    },
    laboratorio: {
        src: 'img/laboratorio.png',
        titulo: 'Laboratorio de Análisis',
        descripcion: 'Nuestro laboratorio equipado con la última tecnología para el análisis y control de calidad. Cada lote es cuidadosamente monitoreado para asegurar los más altos estándares.'
    },
    cata: {
        src: 'img/cata.png',
        titulo: 'Sala de Cata',
        descripcion: 'Elegante sala de cata donde nuestros enólogos evalúan cada vino. Un espacio diseñado para apreciar todos los matices y características de nuestras creaciones vinícolas.'
    },
    vinedos: {
        src: 'img/viñedos.png',
        titulo: 'Nuestros Viñedos',
        descripcion: 'Extensos viñedos bajo el sol arequipeño donde cultivamos nuestras uvas con métodos sostenibles. El terroir único de la región aporta características especiales a nuestros vinos.'
    }
};

// ============================================================================
// BLOQUE 2: DATOS DEL PROCESO DE ELABORACIÓN
// ============================================================================

// Array con las etapas del proceso de elaboración del vino
const etapasElaboracion = [
    {
        id: 'vendimia',
        titulo: 'Vendimia',
        descripcion: 'La vendimia es la recolección de la uva. Se realiza cuando la uva ha alcanzado el punto óptimo de maduración, con el equilibrio perfecto entre azúcares y acidez.',
        imagen: 'img/vendimia.png',
        datos: [
            'Periodo: Febrero - Abril',
            'Método: Selección manual',
            'Temperatura ideal: 20-25°C'
        ]
    },
    {
        id: 'despalillado',
        titulo: 'Despalillado y Estrujado',
        descripcion: 'Proceso en el que se separan los granos de uva del raspón (parte leñosa del racimo) y se rompe ligeramente la piel de la uva para liberar el jugo.',
        imagen: 'img/despalillado.png',
        datos: [
            'Equipo: Despalilladora-estrujadora',
            'Tiempo: 1-2 horas por lote',
            'Temperatura controlada: 10-15°C'
        ]
    },
    {
        id: 'fermentacion',
        titulo: 'Fermentación',
        descripcion: 'Proceso bioquímico en el que las levaduras transforman los azúcares de la uva en alcohol etílico y dióxido de carbono. Es la fase más importante en la elaboración del vino.',
        imagen: 'img/fermentacion.png',
        datos: [
            'Duración: 7-14 días',
            'Temperatura: 25-30°C para tintos, 15-18°C para blancos',
            'Control: Medición diaria de densidad y temperatura'
        ]
    },
    {
        id: 'prensado',
        titulo: 'Prensado',
        descripcion: 'Extracción del vino de los orujos (restos sólidos de la uva) mediante presión. Se obtiene el vino prensa, que puede mezclarse o no con el vino yema (el obtenido sin presión).',
        imagen: 'img/prensado.png',
        datos: [
            'Equipo: Prensa neumática',
            'Presión: 0.5-2 bar',
            'Rendimiento: 70-80% del peso inicial'
        ]
    },
    {
        id: 'crianza',
        titulo: 'Crianza en Barrica',
        descripcion: 'Periodo durante el cual el vino permanece en barricas de roble, donde se produce una microoxigenación que permite su evolución y la adquisición de aromas y sabores característicos.',
        imagen: 'img/barricas.png',
        datos: [
            'Duración: 6-24 meses',
            'Tipo de roble: Francés y americano',
            'Condiciones: Humedad 75-85%, temperatura 12-16°C'
        ]
    },
    {
        id: 'embotellado',
        titulo: 'Embotellado',
        descripcion: 'Fase final del proceso en la que el vino se introduce en botellas, se tapa con corcho y se etiqueta. Algunas variedades continúan su evolución en botella.',
        imagen: 'img/embotellado.png',
        datos: [
            'Filtración previa: 0.45 micras',
            'Temperatura: 15-20°C',
            'Oxígeno disuelto: <1mg/L'
        ]
    }
];

// ============================================================================
// BLOQUE 3: FUNCIONES DEL PROCESO DE ELABORACIÓN
// ============================================================================

// Función para crear la visualización del proceso de elaboración
function crearProcesoElaboracion() {
    const main = document.querySelector('main');
    
    // Crear contenedor del proceso
    const contenedor = document.createElement('div');
    contenedor.className = 'proceso-elaboracion';
    
    // Crear título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Proceso de Elaboración';
    contenedor.appendChild(titulo);
    
    // Crear descripción
    const descripcion = document.createElement('p');
    descripcion.className = 'proceso-descripcion';
    descripcion.textContent = 'Descubre cada etapa de nuestro meticuloso proceso de elaboración, donde tradición e innovación se combinan para crear vinos excepcionales.';
    contenedor.appendChild(descripcion);
    
    // Crear navegación de etapas
    const navegacion = document.createElement('div');
    navegacion.className = 'proceso-navegacion';
    
    etapasElaboracion.forEach((etapa, index) => {
        const boton = document.createElement('button');
        boton.className = 'btn-etapa';
        boton.dataset.etapa = etapa.id;
        boton.innerHTML = `
            <span class="numero-etapa">${index + 1}</span>
            <span class="titulo-etapa">${etapa.titulo}</span>
        `;
        
        navegacion.appendChild(boton);
    });
    
    contenedor.appendChild(navegacion);
    
    // Crear contenedor de visualización
    const visualizacion = document.createElement('div');
    visualizacion.className = 'proceso-visualizacion';
    visualizacion.id = 'proceso-visualizacion';
    contenedor.appendChild(visualizacion);
    
    // Agregar contenedor a la página
    const existingProceso = document.querySelector('.proceso-elaboracion');
    if (existingProceso) {
        main.replaceChild(contenedor, existingProceso);
    } else {
        // Buscar un lugar adecuado para insertar
        const h2 = main.querySelector('h2');
        if (h2) {
            // Insertar después del primer h2
            h2.parentNode.insertBefore(contenedor, h2.nextSibling);
        } else {
            // Insertar al final
            main.appendChild(contenedor);
        }
    }
    
    // Mostrar primera etapa por defecto
    document.querySelector('.btn-etapa').classList.add('activo');
    mostrarEtapa(etapasElaboracion[0].id);
}

// Función para mostrar una etapa específica
function mostrarEtapa(etapaId) {
    const etapa = etapasElaboracion.find(e => e.id === etapaId);
    const visualizacion = document.getElementById('proceso-visualizacion');
    
    // Crear contenido de la etapa con marco de imagen similar a la galería
    visualizacion.innerHTML = `
        <div class="marco-imagen-proceso">
            <img id="imagen-proceso" src="${etapa.imagen}" alt="${etapa.titulo}" 
                 onerror="this.src='img/logo.png'; this.style.padding='20px';" />
            <div class="descripcion-imagen-proceso">
                <h4 id="titulo-proceso">${etapa.titulo}</h4>
                <p id="texto-proceso">${etapa.descripcion}</p>
                <div class="etapa-datos">
                    <h5>Datos técnicos:</h5>
                    <ul>
                        ${etapa.datos.map(dato => `<li>${dato}</li>`).join('')}
                    </ul>
                </div>
                <button class="btn-ver-detalle" data-etapa="${etapa.id}">Ver en detalle</button>
            </div>
        </div>
    `;
    
    // Agregar evento al botón de detalle
    const botonDetalle = visualizacion.querySelector('.btn-ver-detalle');
    botonDetalle.addEventListener('click', function() {
        mostrarDetalleEtapa(this.dataset.etapa);
    });
    
    // Animación de aparición
    visualizacion.style.opacity = '0';
    visualizacion.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        visualizacion.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        visualizacion.style.opacity = '1';
        visualizacion.style.transform = 'translateY(0)';
    }, 50);
}

// Función para mostrar detalle de una etapa
function mostrarDetalleEtapa(etapaId) {
    const etapa = etapasElaboracion.find(e => e.id === etapaId);
    
    // Crear contenido del modal
    const contenido = `
        <div class="etapa-detalle">
            <div class="etapa-detalle-imagen">
                <img src="${etapa.imagen}" alt="${etapa.titulo}" class="img-fluid"
                     onerror="this.src='img/logo.png'; this.style.padding='20px';">
            </div>
            <div class="etapa-detalle-info">
                <h3>${etapa.titulo}</h3>
                <div class="etapa-detalle-descripcion">
                    <h4>Descripción del proceso</h4>
                    <p>${etapa.descripcion}</p>
                    <p>${generarDescripcionAdicional(etapa.id)}</p>
                </div>
                <div class="etapa-detalle-datos">
                    <h4>Datos técnicos</h4>
                    <ul>
                        ${etapa.datos.map(dato => `<li>${dato}</li>`).join('')}
                    </ul>
                </div>
                <div class="etapa-detalle-calidad">
                    <h4>Control de calidad</h4>
                    <p>${generarControlCalidad(etapa.id)}</p>
                </div>
            </div>
        </div>
    `;
    
    // Crear modal
    crearModal(`Proceso de Elaboración: ${etapa.titulo}`, contenido);
}

// Función para generar descripción adicional según la etapa
function generarDescripcionAdicional(etapaId) {
    switch(etapaId) {
        case 'vendimia':
            return 'En IGNIS, la vendimia se realiza de forma manual y selectiva, eligiendo racimo a racimo para garantizar que solo las uvas en su punto óptimo de maduración sean utilizadas. Nuestros enólogos realizan análisis diarios en las semanas previas para determinar el momento exacto de la recolección, considerando factores como el nivel de azúcares, acidez, pH y madurez fenólica.';
        case 'despalillado':
            return 'Utilizamos despalilladoras de última generación que permiten separar los granos sin dañar las semillas, evitando así la extracción de taninos verdes que podrían aportar amargor al vino. El estrujado posterior es suave, rompiendo ligeramente la piel para liberar el jugo sin triturar las pepitas.';
        case 'fermentacion':
            return 'La fermentación se realiza en depósitos de acero inoxidable con control de temperatura. Utilizamos tanto levaduras autóctonas (presentes naturalmente en la piel de la uva) como levaduras seleccionadas, dependiendo del tipo de vino. Durante este proceso, realizamos remontados diarios para favorecer la extracción de color y aromas.';
        case 'prensado':
            return 'El prensado se realiza con prensas neumáticas que permiten un control preciso de la presión, extrayendo el jugo de forma suave y progresiva. Separamos las diferentes fracciones de prensado, utilizando solo las de mayor calidad para nuestros vinos premium.';
        case 'crianza':
            return 'Nuestras barricas son seleccionadas de los mejores toneleros de Francia y América, con diferentes niveles de tostado según el tipo de vino. La bodega subterránea mantiene condiciones constantes de temperatura y humedad, ideales para una crianza lenta y equilibrada. Realizamos trasiegos periódicos para clarificar el vino de forma natural.';
        case 'embotellado':
            return 'Antes del embotellado, el vino pasa por un proceso de clarificación y filtración suave que respeta sus características organolépticas. Utilizamos corchos de la más alta calidad, sometidos a rigurosos controles para evitar problemas de TCA (tricloroanisol). Las botellas reposan en nuestra cava entre 3 y 24 meses antes de salir al mercado, dependiendo del tipo de vino.';
        default:
            return '';
    }
}

// Función para generar texto de control de calidad según la etapa
function generarControlCalidad(etapaId) {
    switch(etapaId) {
        case 'vendimia':
            return 'Análisis pre-vendimia de madurez tecnológica y fenólica. Selección manual en viñedo y segunda selección en mesa de selección. Control de temperatura de la uva recién vendimiada.';
        case 'despalillado':
            return 'Inspección visual del despalillado para garantizar la ausencia de raspones. Control de la intensidad del estrujado según variedad y tipo de vino a elaborar.';
        case 'fermentacion':
            return 'Monitoreo constante de temperatura, densidad y análisis microbiológicos. Control diario de la evolución de azúcares, acidez y pH. Análisis sensorial para determinar el momento óptimo de descube.';
        case 'prensado':
            return 'Análisis de las diferentes fracciones de prensado. Control de turbidez y sólidos en suspensión. Degustación de cada fracción para determinar su destino.';
        case 'crianza':
            return 'Control mensual de la evolución del vino en barrica. Análisis de compuestos fenólicos y oxígeno disuelto. Cata periódica para determinar el tiempo óptimo de crianza.';
        case 'embotellado':
            return 'Control microbiológico pre-embotellado. Análisis de oxígeno disuelto. Inspección de calidad de corchos y botellas. Seguimiento post-embotellado con catas periódicas de botellas testigo.';
        default:
            return '';
    }
}

// ============================================================================
// BLOQUE 4: FUNCIONES DEL TOUR VIRTUAL
// ============================================================================

// Función para crear tour virtual
function crearTourVirtual() {
    const main = document.querySelector('main');
    
    // Crear contenedor del tour
    const contenedor = document.createElement('div');
    contenedor.className = 'tour-virtual';
    
    // Crear título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Tour Virtual por Nuestra Bodega';
    contenedor.appendChild(titulo);
    
    // Crear descripción
    const descripcion = document.createElement('p');
    descripcion.textContent = 'Explora nuestras instalaciones desde la comodidad de tu hogar con este recorrido interactivo por las diferentes áreas de nuestra bodega.';
    contenedor.appendChild(descripcion);
    
    // Crear visor del tour
    const visor = document.createElement('div');
    visor.className = 'tour-visor';
    visor.innerHTML = `
        <div class="tour-placeholder">
            🍷
            <p>Tour Virtual</p>
            <span>Haz clic para iniciar</span>
        </div>
    `;
    
    // Evento de clic en el visor
    visor.addEventListener('click', iniciarTourVirtual);
    
    contenedor.appendChild(visor);
    
    // No agregar información adicional de servicios individuales
    
    // Agregar contenedor a la página
    const existingTour = document.querySelector('.tour-virtual');
    if (existingTour) {
        main.replaceChild(contenedor, existingTour);
    } else {
        main.appendChild(contenedor);
    }
}

// Función para iniciar tour virtual
function iniciarTourVirtual() {
    // Áreas de la bodega para el tour
    const areasBodega = [
        {
            nombre: 'Recepción de Uva',
            descripcion: 'Área donde se recibe la uva recién vendimiada. Contamos con mesas de selección refrigeradas para mantener la calidad de la fruta.',
            imagen: 'img/recepcion.jpg'
        },
        {
            nombre: 'Sala de Fermentación',
            descripcion: 'Equipada con depósitos de acero inoxidable con control de temperatura para garantizar una fermentación óptima.',
            imagen: 'img/sala_fermentacion.jpg'
        },
        {
            nombre: 'Sala de Barricas',
            descripcion: 'Nuestra cava subterránea alberga más de 500 barricas de roble francés y americano en condiciones ideales de temperatura y humedad.',
            imagen: 'img/sala_barricas.jpg'
        },
        {
            nombre: 'Línea de Embotellado',
            descripcion: 'Tecnología de última generación que garantiza un embotellado en condiciones de máxima higiene y mínima oxidación.',
            imagen: 'img/embotellado_linea.jpg'
        },
        {
            nombre: 'Sala de Cata',
            descripcion: 'Espacio diseñado para la degustación profesional de nuestros vinos, con iluminación natural y todas las condiciones necesarias.',
            imagen: 'img/sala_cata.jpg'
        }
    ];
    
    // Crear contenido del modal
    const contenido = `
        <div class="tour-virtual-modal">
            <div class="tour-controles">
                <button class="btn-prev" disabled>‹</button>
                <span class="tour-contador">1/${areasBodega.length}</span>
                <button class="btn-next">›</button>
            </div>
            <div class="tour-slides">
                ${areasBodega.map((area, index) => `
                    <div class="tour-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                        <div class="tour-slide-imagen">
                            <img src="${area.imagen}" alt="${area.nombre}" 
                                 onerror="this.src='img/logo.png'; this.style.padding='20px';">
                        </div>
                        <div class="tour-slide-info">
                            <h3>${area.nombre}</h3>
                            <p>${area.descripcion}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Crear modal
    const modal = crearModal('Tour Virtual por IGNIS', contenido);
    
    // Configurar navegación del tour
    let slideActual = 0;
    const totalSlides = areasBodega.length;
    
    const btnPrev = modal.querySelector('.btn-prev');
    const btnNext = modal.querySelector('.btn-next');
    const contador = modal.querySelector('.tour-contador');
    
    btnPrev.addEventListener('click', () => {
        if (slideActual > 0) {
            cambiarSlide(slideActual - 1);
        }
    });
    
    btnNext.addEventListener('click', () => {
        if (slideActual < totalSlides - 1) {
            cambiarSlide(slideActual + 1);
        }
    });
    
    function cambiarSlide(nuevoSlide) {
        // Ocultar slide actual
        const slideAnterior = modal.querySelector(`.tour-slide[data-index="${slideActual}"]`);
        slideAnterior.classList.remove('active');
        
        // Mostrar nuevo slide
        const slide = modal.querySelector(`.tour-slide[data-index="${nuevoSlide}"]`);
        slide.classList.add('active');
        
        // Actualizar contador
        slideActual = nuevoSlide;
        contador.textContent = `${slideActual + 1}/${totalSlides}`;
        
        // Actualizar estado de botones
        btnPrev.disabled = slideActual === 0;
        btnNext.disabled = slideActual === totalSlides - 1;
    }
}

// ============================================================================
// BLOQUE 5: FUNCIONES DE RESERVAS Y FORMULARIOS
// ============================================================================

// Función para mostrar formulario de reserva
function mostrarFormularioReserva() {
    // Crear contenido del modal
    const contenido = `
        <div class="formulario-reserva">
            <p>Complete el siguiente formulario para reservar una visita a nuestra bodega. Le confirmaremos la disponibilidad a la mayor brevedad.</p>
            <form id="form-reserva">
                <div class="form-group">
                    <label for="nombre">Nombre completo <span class="required">*</span></label>
                    <input type="text" id="nombre" name="nombre" required placeholder="Ingrese su nombre completo">
                    <div class="error-message" id="error-nombre"></div>
                </div>
                <div class="form-group">
                    <label for="email">Correo electrónico <span class="required">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="Ingrese su correo electrónico">
                    <div class="error-message" id="error-email"></div>
                </div>
                <div class="form-group">
                    <label for="telefono">Teléfono <span class="required">*</span></label>
                    <input type="tel" id="telefono" name="telefono" required placeholder="Ingrese su número de teléfono">
                    <div class="error-message" id="error-telefono"></div>
                </div>
                <div class="form-group">
                    <label for="fecha">Fecha preferida <span class="required">*</span></label>
                    <input type="date" id="fecha" name="fecha" required min="${getFechaMinima()}">
                    <div class="error-message" id="error-fecha"></div>
                </div>
                <div class="form-group">
                    <label for="hora">Hora preferida <span class="required">*</span></label>
                    <select id="hora" name="hora" required>
                        <option value="">Seleccione una hora</option>
                        <option value="10:00">10:00</option>
                        <option value="11:30">11:30</option>
                        <option value="13:00">13:00</option>
                        <option value="16:00">16:00</option>
                        <option value="17:30">17:30</option>
                    </select>
                    <div class="error-message" id="error-hora"></div>
                </div>
                <div class="form-group">
                    <label for="personas">Número de personas <span class="required">*</span></label>
                    <select id="personas" name="personas" required>
                        <option value="">Seleccione número de personas</option>
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                        <option value="5">5 personas</option>
                        <option value="6-10">6-10 personas</option>
                        <option value="+10">Más de 10 personas (grupo)</option>
                    </select>
                    <div class="error-message" id="error-personas"></div>
                </div>
                <div class="form-group">
                    <label for="tipo-visita">Tipo de visita <span class="required">*</span></label>
                    <select id="tipo-visita" name="tipo-visita" required>
                        <option value="">Seleccione tipo de visita</option>
                        <option value="estandar">Visita estándar (1h, incluye degustación de 2 vinos)</option>
                        <option value="premium">Visita premium (1.5h, incluye degustación de 4 vinos)</option>
                        <option value="exclusiva">Visita exclusiva (2h, incluye degustación de 6 vinos y maridaje)</option>
                    </select>
                    <div class="error-message" id="error-tipo-visita"></div>
                </div>
                <div class="form-group">
                    <label for="comentarios">Comentarios adicionales</label>
                    <textarea id="comentarios" name="comentarios" rows="3" placeholder="Indique cualquier información adicional o necesidades especiales"></textarea>
                </div>
                <button type="submit" class="btn-enviar">Solicitar reserva</button>
            </form>
        </div>
    `;
    
    // Crear modal
    const modal = crearModal('Reserva de Visita', contenido);
    
    // Configurar validación del formulario
    const formulario = modal.querySelector('#form-reserva');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (validarFormularioReserva()) {
            // Simular envío
            const nombre = document.getElementById('nombre').value;
            const fecha = document.getElementById('fecha').value;
            const hora = document.getElementById('hora').value;
            const tipoVisita = document.getElementById('tipo-visita');
            const tipoVisitaTexto = tipoVisita.options[tipoVisita.selectedIndex].text;
            
            // Crear mensaje de confirmación
            const mensaje = `¿Desea confirmar la siguiente reserva?\n\nNombre: ${nombre}\nFecha: ${fecha}\nHora: ${hora}\nTipo de visita: ${tipoVisitaTexto}`;
            
            // Confirmar reserva
            if (confirm(mensaje)) {
                // Mostrar confirmación
                mostrarConfirmacionReserva();
                
                // Cerrar modal actual
                const modalActual = document.querySelector('.modal');
                if (modalActual) {
                    document.body.removeChild(modalActual);
                }
            }
        }
    });
}

// Función para validar formulario de reserva
function validarFormularioReserva() {
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const fecha = document.getElementById('fecha');
    const hora = document.getElementById('hora');
    const personas = document.getElementById('personas');
    const tipoVisita = document.getElementById('tipo-visita');
    
    let formValido = true;
    
    // Validar nombre
    if (!nombre.value.trim() || nombre.value.trim().length < 2) {
        mostrarError(nombre, 'Por favor, ingrese un nombre válido');
        formValido = false;
    } else {
        ocultarError(nombre);
    }
    
    // Validar email
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regexEmail.test(email.value)) {
        mostrarError(email, 'Por favor, ingrese un correo electrónico válido');
        formValido = false;
    } else {
        ocultarError(email);
    }
    
    // Validar teléfono
    const regexTelefono = /^[0-9]{9}$/;
    if (!regexTelefono.test(telefono.value)) {
        mostrarError(telefono, 'Por favor, ingrese un número de teléfono válido (9 dígitos)');
        formValido = false;
    } else {
        ocultarError(telefono);
    }
    
    // Validar fecha
    if (!fecha.value) {
        mostrarError(fecha, 'Por favor, seleccione una fecha');
        formValido = false;
    } else {
        const fechaSeleccionada = new Date(fecha.value);
        const fechaMinima = new Date(getFechaMinima());
        
        if (fechaSeleccionada < fechaMinima) {
            mostrarError(fecha, 'La fecha debe ser futura');
            formValido = false;
        } else {
            ocultarError(fecha);
        }
    }
    
    // Validar hora
    if (!hora.value) {
        mostrarError(hora, 'Por favor, seleccione una hora');
        formValido = false;
    } else {
        ocultarError(hora);
    }
    
    // Validar personas
    if (!personas.value) {
        mostrarError(personas, 'Por favor, seleccione el número de personas');
        formValido = false;
    } else {
        ocultarError(personas);
    }
    
    // Validar tipo de visita
    if (!tipoVisita.value) {
        mostrarError(tipoVisita, 'Por favor, seleccione el tipo de visita');
        formValido = false;
    } else {
        ocultarError(tipoVisita);
    }
    
    return formValido;
}

// Función para mostrar error en un campo
function mostrarError(campo, mensaje) {
    const errorElement = document.getElementById(`error-${campo.id}`);
    errorElement.textContent = mensaje;
    errorElement.style.display = 'block';
    campo.classList.add('invalid');
}

// Función para ocultar error en un campo
function ocultarError(campo) {
    const errorElement = document.getElementById(`error-${campo.id}`);
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    campo.classList.remove('invalid');
}

// Función para obtener fecha mínima (hoy + 1 día)
function getFechaMinima() {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    return hoy.toISOString().split('T')[0];
}

// Función para mostrar confirmación de reserva
function mostrarConfirmacionReserva() {
    // Crear contenido del modal
    const contenido = `
        <div class="confirmacion-reserva">
            ✓
            <h3>¡Solicitud de reserva enviada!</h3>
            <p>Hemos recibido su solicitud de reserva. En breve recibirá un correo electrónico con la confirmación de su visita.</p>
            <p>Si no recibe la confirmación en 24 horas, por favor contacte con nosotros por teléfono.</p>
        </div>
    `;
    
    // Crear modal
    crearModal('Reserva Confirmada', contenido);
}

// ============================================================================
// BLOQUE 6: FUNCIONES DE EVENTOS Y CURSOS
// ============================================================================

// Función para mostrar calendario de eventos
function mostrarCalendarioEventos() {
    // Eventos próximos
    const eventos = [
        {
            fecha: '15 de Junio, 2023',
            titulo: 'Cata de Vinos Reserva',
            descripcion: 'Degustación guiada de nuestra línea de vinos Reserva, con explicación de las características de cada variedad.',
            hora: '18:00',
            precio: '$25 por persona',
            disponibilidad: 'Plazas disponibles'
        },
        {
            fecha: '22 de Junio, 2023',
            titulo: 'Maridaje Vino y Quesos',
            descripcion: 'Experiencia gastronómica donde aprenderás a combinar diferentes tipos de vinos con una selección de quesos locales e internacionales.',
            hora: '19:00',
            precio: '$35 por persona',
            disponibilidad: 'Últimas plazas'
        },
        {
            fecha: '8 de Julio, 2023',
            titulo: 'Taller de Iniciación a la Cata',
            descripcion: 'Aprende las técnicas básicas de cata y los fundamentos para apreciar y describir un vino correctamente.',
            hora: '11:00',
            precio: '$30 por persona',
            disponibilidad: 'Plazas disponibles'
        },
        {
            fecha: '20 de Julio, 2023',
            titulo: 'Cena Maridaje con el Enólogo',
            descripcion: 'Cena exclusiva con nuestro enólogo jefe, quien explicará las características de cada vino y su maridaje con los platos preparados por nuestro chef.',
            hora: '20:30',
            precio: '$75 por persona',
            disponibilidad: 'Plazas limitadas'
        }
    ];
    
    // Crear contenido del modal
    const contenido = `
        <div class="calendario-eventos">
            <p>Consulta nuestros próximos eventos y reserva tu plaza para vivir experiencias únicas en torno al mundo del vino.</p>
            <div class="eventos-lista">
                ${eventos.map(evento => `
                    <div class="evento-item">
                        <div class="evento-fecha">${evento.fecha}</div>
                        <div class="evento-contenido">
                            <h3>${evento.titulo}</h3>
                            <p>${evento.descripcion}</p>
                            <div class="evento-detalles">
                                <span>🕒 ${evento.hora}</span>
                                <span>💰 ${evento.precio}</span>
                                <span>👥 ${evento.disponibilidad}</span>
                            </div>
                            <button class="btn-reservar-evento">Reservar plaza</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="eventos-info">
                <p>Para más información sobre eventos privados o corporativos, contacte con nosotros en <strong>eventos@ignis.com</strong></p>
            </div>
        </div>
    `;
    
    // Crear modal
    const modal = crearModal('Calendario de Eventos', contenido);
    
    // Configurar botones de reserva
    const botonesReserva = modal.querySelectorAll('.btn-reservar-evento');
    botonesReserva.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            // Cerrar modal actual
            const modalActual = document.querySelector('.modal');
            if (modalActual) {
                document.body.removeChild(modalActual);
            }
            
            // Mostrar formulario de reserva para el evento
            mostrarFormularioReservaEvento(eventos[index]);
        });
    });
}

// Función para mostrar formulario de reserva de evento
function mostrarFormularioReservaEvento(evento) {
    // Crear contenido del modal
    const contenido = `
        <div class="formulario-reserva-evento">
            <div class="evento-seleccionado">
                <h3>${evento.titulo}</h3>
                <p><strong>Fecha:</strong> ${evento.fecha} a las ${evento.hora}</p>
                <p><strong>Precio:</strong> ${evento.precio}</p>
            </div>
            <form id="form-reserva-evento">
                <div class="form-group">
                    <label for="nombre">Nombre completo <span class="required">*</span></label>
                    <input type="text" id="nombre" name="nombre" required placeholder="Ingrese su nombre completo">
                    <div class="error-message" id="error-nombre"></div>
                </div>
                <div class="form-group">
                    <label for="email">Correo electrónico <span class="required">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="Ingrese su correo electrónico">
                    <div class="error-message" id="error-email"></div>
                </div>
                <div class="form-group">
                    <label for="telefono">Teléfono <span class="required">*</span></label>
                    <input type="tel" id="telefono" name="telefono" required placeholder="Ingrese su número de teléfono">
                    <div class="error-message" id="error-telefono"></div>
                </div>
                <div class="form-group">
                    <label for="asistentes">Número de asistentes <span class="required">*</span></label>
                    <select id="asistentes" name="asistentes" required>
                        <option value="">Seleccione número de asistentes</option>
                        <option value="1">1 persona</option>
                        <option value="2">2 personas</option>
                        <option value="3">3 personas</option>
                        <option value="4">4 personas</option>
                        <option value="5">5 personas</option>
                        <option value="6">6 personas</option>
                    </select>
                    <div class="error-message" id="error-asistentes"></div>
                </div>
                <div class="form-group">
                    <label for="comentarios">Comentarios adicionales</label>
                    <textarea id="comentarios" name="comentarios" rows="3" placeholder="Indique cualquier información adicional o necesidades especiales"></textarea>
                </div>
                <button type="submit" class="btn-enviar">Reservar plaza</button>
            </form>
        </div>
    `;
    
    // Crear modal
    const modal = crearModal(`Reserva: ${evento.titulo}`, contenido);
    
    // Configurar validación del formulario
    const formulario = modal.querySelector('#form-reserva-evento');
    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validación simple
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const asistentes = document.getElementById('asistentes');
        
        let formValido = true;
        
        if (!nombre.value.trim()) {
            mostrarError(nombre, 'Por favor, ingrese su nombre');
            formValido = false;
        } else {
            ocultarError(nombre);
        }
        
        if (!email.value.trim() || !email.value.includes('@')) {
            mostrarError(email, 'Por favor, ingrese un email válido');
            formValido = false;
        } else {
            ocultarError(email);
        }
        
        if (!telefono.value.trim() || telefono.value.length !== 9) {
            mostrarError(telefono, 'Por favor, ingrese un teléfono válido (9 dígitos)');
            formValido = false;
        } else {
            ocultarError(telefono);
        }
        
        if (!asistentes.value) {
            mostrarError(asistentes, 'Por favor, seleccione el número de asistentes');
            formValido = false;
        } else {
            ocultarError(asistentes);
        }
        
        if (formValido) {
            // Simular envío
            alert(`Reserva para ${asistentes.value} persona(s) para el evento "${evento.titulo}" realizada con éxito. Recibirá un correo de confirmación en breve.`);
            
            // Cerrar modal
            const modalActual = document.querySelector('.modal');
            if (modalActual) {
                document.body.removeChild(modalActual);
            }
        }
    });
}

// Función para mostrar información de cursos
function mostrarInfoCursos() {
    // Cursos disponibles
    const cursos = [
        {
            titulo: 'Iniciación a la Cata de Vinos',
            descripcion: 'Curso básico para aprender los fundamentos de la cata de vinos, incluyendo análisis visual, olfativo y gustativo.',
            duracion: '4 horas (1 sesión)',
            precio: '$45 por persona',
            proximas_fechas: ['12 de Junio', '26 de Junio', '10 de Julio']
        },
        {
            titulo: 'Maridaje Vino y Gastronomía',
            descripcion: 'Aprende los principios básicos del maridaje y cómo combinar diferentes tipos de vinos con distintos platos y sabores.',
            duracion: '6 horas (2 sesiones)',
            precio: '$75 por persona',
            proximas_fechas: ['15-16 de Junio', '29-30 de Junio', '13-14 de Julio']
        },
        {
            titulo: 'Curso Avanzado de Cata',
            descripcion: 'Para entusiastas con conocimientos previos. Profundiza en las técnicas de cata y aprende a identificar variedades, regiones y añadas.',
            duracion: '12 horas (4 sesiones)',
            precio: '$150 por persona',
            proximas_fechas: ['5-26 de Julio (miércoles)', '4-25 de Agosto (viernes)']
        },
        {
            titulo: 'El Mundo de los Vinos Espumosos',
            descripcion: 'Curso especializado en vinos espumosos: métodos de elaboración, regiones productoras y técnicas de cata específicas.',
            duracion: '3 horas (1 sesión)',
            precio: '$55 por persona',
            proximas_fechas: ['23 de Junio', '21 de Julio', '18 de Agosto']
        }
    ];
    
    // Crear contenido del modal
    const contenido = `
        <div class="info-cursos">
            <p>Descubre nuestros cursos de cata y formación vinícola, impartidos por profesionales del sector con años de experiencia.</p>
            <div class="cursos-lista">
                ${cursos.map(curso => `
                    <div class="curso-item">
                        <h3>${curso.titulo}</h3>
                        <p>${curso.descripcion}</p>
                        <div class="curso-detalles">
                            <div class="detalle-item">
                                🕒
                                <span><strong>Duración:</strong> ${curso.duracion}</span>
                            </div>
                            <div class="detalle-item">
                                💰
                                <span><strong>Precio:</strong> ${curso.precio}</span>
                            </div>
                            <div class="detalle-item">
                                📅
                                <span><strong>Próximas fechas:</strong></span>
                                <ul>
                                    ${curso.proximas_fechas.map(fecha => `<li>${fecha}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        <button class="btn-info-curso">Más información</button>
                    </div>
                `).join('')}
            </div>
            <div class="cursos-info-adicional">
                <h3>Información adicional</h3>
                <ul>
                    <li>Todos los cursos incluyen material didáctico y degustación de vinos.</li>
                    <li>Se entrega certificado de asistencia.</li>
                    <li>Grupos reducidos (máximo 12 personas).</li>
                    <li>Disponibilidad de cursos privados para empresas y grupos.</li>
                </ul>
                <p>Para más información o inscripciones, contacte con nosotros en <strong>formacion@ignis.com</strong></p>
            </div>
        </div>
    `;
    
    // Crear modal
    const modal = crearModal('Cursos de Cata', contenido);
    
    // Configurar botones de más información
    const botonesInfo = modal.querySelectorAll('.btn-info-curso');
    botonesInfo.forEach((boton, index) => {
        boton.addEventListener('click', function() {
            alert(`Para inscribirte en el curso "${cursos[index].titulo}", por favor contacta con nosotros por teléfono o email indicando la fecha que prefieres. Te enviaremos toda la información detallada y el proceso de inscripción.`);
        });
    });
}

// ============================================================================
// BLOQUE 7: COMPONENTES DE INTERFAZ (MODALES)
// ============================================================================

// Función para crear modal genérico
function crearModal(titulo, contenido) {
    // Crear contenedor del modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Crear contenido del modal
    modal.innerHTML = `
        <div class="modal-contenido">
            <div class="modal-header">
                <h2>${titulo}</h2>
                <button class="btn-cerrar">&times;</button>
            </div>
            <div class="modal-body">
                ${contenido}
            </div>
        </div>
    `;
    
    // Agregar evento de cierre
    const btnCerrar = modal.querySelector('.btn-cerrar');
    btnCerrar.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Agregar evento de cierre al hacer clic fuera del contenido
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Agregar al body
    document.body.appendChild(modal);
    
    // Mostrar modal con animación
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    return modal;
}

// ============================================================================
// BLOQUE 8: INICIALIZACIÓN Y EVENTOS
// ============================================================================

// Función para inicializar la galería de imágenes
function inicializarGaleria() {
    const botones = document.querySelectorAll('.btn-galeria');
    const imagen = document.getElementById('imagen-bodega');
    const titulo = document.getElementById('titulo-imagen');
    const descripcion = document.getElementById('texto-imagen');
    
    // Agregar eventos a los botones
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            botones.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('active');
            
            // Obtener la imagen seleccionada
            const imagenSeleccionada = this.dataset.imagen;
            const datosImagen = imagenesGaleria[imagenSeleccionada];
            
            // Actualizar el contenido con animación
            imagen.style.opacity = '0';
            titulo.style.opacity = '0';
            descripcion.style.opacity = '0';
            
            setTimeout(() => {
                imagen.src = datosImagen.src;
                imagen.alt = datosImagen.titulo;
                titulo.textContent = datosImagen.titulo;
                descripcion.textContent = datosImagen.descripcion;
                
                // Restaurar opacidad
                imagen.style.transition = 'opacity 0.5s ease';
                titulo.style.transition = 'opacity 0.5s ease';
                descripcion.style.transition = 'opacity 0.5s ease';
                
                imagen.style.opacity = '1';
                titulo.style.opacity = '1';
                descripcion.style.opacity = '1';
            }, 300);
        });
    });
}

// Función para inicializar el proceso de elaboración
function inicializarProcesoElaboracion() {
    const botones = document.querySelectorAll('.btn-etapa');
    
    // Agregar eventos a los botones
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            // Remover clase activa de todos los botones
            botones.forEach(btn => btn.classList.remove('activo'));
            
            // Agregar clase activa al botón clickeado
            this.classList.add('activo');
            
            // Obtener la etapa seleccionada
            const etapaSeleccionada = this.dataset.etapa;
            
            // Mostrar etapa con animación
            mostrarEtapa(etapaSeleccionada);
        });
    });
}

// ============================================================================
// BLOQUE 9: FUNCIONES DE AUTENTICACIÓN
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

// ============================================================================
// BLOQUE 10: VERIFICACIÓN DE AUTENTICACIÓN Y INICIALIZACIÓN
// ============================================================================

// Función para mostrar contenido y verificar si hay usuario logueado
// Función de inicialización específica de bodega
function inicializarBodega() {
    inicializarPaginaBodega();
}

// ============================================================================
// BLOQUE: INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Usar función común para mostrar contenido y verificar usuario
    window.CommonAuth.mostrarContenidoYVerificarUsuario(inicializarBodega);
});

// Función para inicializar todas las funcionalidades de la página
function inicializarPaginaBodega() {
    // Inicializar galería de imágenes
    inicializarGaleria();
    
    // Proceso de elaboración eliminado por solicitud del usuario
    
    // Crear tour virtual
    // crearTourVirtual(); // Eliminado para que la página termine con el mapa
    
    // Agregar eventos de clic a las tarjetas de servicios
    const tarjetasServicios = document.querySelectorAll('.servicio-card');
    tarjetasServicios.forEach(tarjeta => {
        tarjeta.style.cursor = 'pointer';
        tarjeta.addEventListener('click', function() {
            const tipoServicio = this.dataset.servicio;
            mostrarFormularioReserva(tipoServicio);
        });
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar contenido y verificar usuario
    mostrarContenidoYVerificarUsuario();
});