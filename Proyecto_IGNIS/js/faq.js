// ============================================================================
// BLOQUE 1: CONFIGURACIÓN Y DATOS DE FAQ
// ============================================================================

// JavaScript para la página de FAQ (Preguntas Frecuentes)

// Array con las preguntas frecuentes - solo 6 preguntas (4 visibles + 2 ocultas)
const preguntas = [
    // Preguntas visibles principales (4)
    {
        id: 1,
        pregunta: '¿Cuáles son los horarios de visita a la bodega?',
        respuesta: 'Nuestra bodega está abierta para visitas de lunes a sábado de 10:00 a 18:00 horas. Los domingos abrimos de 10:00 a 14:00 horas. Para grupos grandes, recomendamos reservar con anticipación a través de nuestro formulario de contacto.',
        categoria: 'bodega',
        destacada: true,
        visible: true
    },
    {
        id: 2,
        pregunta: '¿Cómo puedo comprar vinos directamente de la bodega?',
        respuesta: 'Puede comprar nuestros vinos directamente en nuestra tienda física o a través de nuestra tienda online. Realizamos envíos a todo el país y ofrecemos descuentos especiales para compras al por mayor.',
        categoria: 'compras',
        destacada: true,
        visible: true
    },
    {
        id: 3,
        pregunta: '¿Ofrecen catas de vino para grupos?',
        respuesta: 'Sí, ofrecemos diferentes experiencias de cata para grupos. Tenemos la cata básica que incluye 3 vinos, la cata premium con 5 vinos y maridaje, y la cata exclusiva que incluye visita a los viñedos, 7 vinos y almuerzo gourmet. Puede reservar a través de nuestro formulario de contacto.',
        categoria: 'bodega',
        destacada: false,
        visible: true
    },
    {
        id: 4,
        pregunta: '¿Qué variedades de vinos producen?',
        respuesta: 'Producimos una amplia gama de variedades: Cabernet Sauvignon, Merlot, Pinot Noir, Syrah, Chardonnay, Sauvignon Blanc, Riesling, y vinos de mezcla. También elaboramos vinos espumosos método tradicional y vinos dulces de cosecha tardía.',
        categoria: 'vinos',
        destacada: false,
        visible: true
    },
    // Preguntas ocultas que solo aparecen con palabras clave específicas (2)
    {
        id: 5,
        pregunta: '¿Qué equipamiento técnico tiene la bodega para la elaboración?',
        respuesta: 'Nuestra bodega cuenta con tecnología de última generación: tanques de acero inoxidable con control de temperatura, prensas neumáticas, sistema de fermentación controlada, barricas de roble francés y americano, y laboratorio de análisis enológico para garantizar la máxima calidad.',
        categoria: 'bodega',
        destacada: false,
        visible: false,
        palabrasClave: ['equipamiento', 'tecnología', 'tanques', 'laboratorio', 'técnico']
    },
    {
        id: 6,
        pregunta: '¿Tienen servicios premium para empresas corporativas?',
        respuesta: 'Sí, tenemos un servicio especializado para empresas que incluye: selección personalizada de vinos según presupuesto, etiquetado corporativo, embalajes especiales, descuentos por volumen, entrega programada y asesoramiento enológico para eventos corporativos.',
        categoria: 'compras',
        destacada: false,
        visible: false,
        palabrasClave: ['premium', 'empresas', 'corporativo', 'etiquetado', 'volumen']
    }
];

// ============================================================================
// BLOQUE 2: CONSTANTES Y CONFIGURACIÓN DE VALIDACIÓN
// ============================================================================

// Constantes para la validación de formularios
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
const MENSAJE_ERROR_EMAIL = 'Por favor, introduce un email válido';
const MENSAJE_ERROR_NOMBRE = 'Por favor, introduce un nombre válido (solo letras)';
const MENSAJE_ERROR_PREGUNTA = 'Por favor, introduce una pregunta (mínimo 10 caracteres)';
const MENSAJE_ERROR_CATEGORIA = 'Por favor, selecciona una categoría';

// Opciones para el selector de asunto
const OPCIONES_CATEGORIA = [
    { valor: '', texto: 'Selecciona una categoría' },
    { valor: 'vinos', texto: 'Vinos' },
    { valor: 'bodega', texto: 'Bodega' },
    { valor: 'compras', texto: 'Compras' },
    { valor: 'club', texto: 'Club de vinos' },
    { valor: 'otros', texto: 'Otros' }
];

// ============================================================================
// BLOQUE 3: INICIALIZACIÓN Y CONFIGURACIÓN PRINCIPAL
// ============================================================================

// Función para inicializar la página de FAQ
function inicializarPaginaFAQ() {
    // Crear sección de preguntas destacadas
    crearSeccionDestacadas();
    
    // Crear sección de búsqueda
    crearBuscadorFAQ();
    
    // Crear acordeón de preguntas frecuentes
    crearAcordeonFAQ();
    
    // Crear botón para sugerir pregunta
    crearBotonSugerirPregunta();
    
    // Mostrar mensaje de bienvenida con prompt
    mostrarMensajeBienvenida();
}

// Función para mostrar mensaje de bienvenida con prompt
function mostrarMensajeBienvenida() {
    // Usar setTimeout para dar tiempo a que la página se cargue completamente
    setTimeout(() => {
        const nombreUsuario = prompt('¡Bienvenido/a a nuestra sección de Preguntas Frecuentes! ¿Cuál es tu nombre?');
        
        if (nombreUsuario !== null && nombreUsuario.trim() !== '') {
            // Usar confirm para preguntar si desea recibir notificaciones
            const recibirNotificaciones = confirm(`Hola ${nombreUsuario}, ¿te gustaría recibir notificaciones sobre nuevas preguntas y respuestas?`);
            
            if (recibirNotificaciones) {
                alert(`¡Gracias ${nombreUsuario}! Te mantendremos informado sobre las actualizaciones en nuestra sección de FAQ.`);
                // Aquí se podría implementar la lógica para guardar la preferencia del usuario
            } else {
                alert(`Entendido ${nombreUsuario}. Puedes cambiar esta preferencia en cualquier momento.`);
            }
        }
    }, 1000);
}

// ============================================================================
// BLOQUE 4: FUNCIONES DE INTERFAZ Y COMPONENTES
// ============================================================================

// Función para crear sección de preguntas destacadas
function crearSeccionDestacadas() {
    // Filtrar preguntas destacadas y visibles
    const preguntasDestacadas = preguntas.filter(pregunta => pregunta.destacada && pregunta.visible);
    
    // Si no hay preguntas destacadas, no crear la sección
    if (preguntasDestacadas.length === 0) {
        return;
    }
    
    // Buscar el contenedor existente o usar el contenedor del DOM
    let contenedor = document.getElementById('faq-destacadas');
    
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'faq-destacadas';
        contenedor.className = 'faq-destacadas';
        
        // Insertar en el contenedor principal
        const containerDiv = document.querySelector('main .container');
        if (containerDiv) {
            const introText = containerDiv.querySelector('.intro-text');
            if (introText && introText.nextSibling) {
                containerDiv.insertBefore(contenedor, introText.nextSibling);
            } else {
                containerDiv.appendChild(contenedor);
            }
        }
    } else {
        // Limpiar contenedor existente
        contenedor.innerHTML = '';
    }
    
    // Crear título
    const titulo = document.createElement('h2');
    titulo.textContent = 'Preguntas más frecuentes';
    contenedor.appendChild(titulo);
    
    // Crear lista de preguntas destacadas
    const lista = document.createElement('div');
    lista.className = 'faq-destacadas-lista';
    
    // Usar un bucle for para recorrer las preguntas destacadas
    for (let i = 0; i < preguntasDestacadas.length; i++) {
        const pregunta = preguntasDestacadas[i];
        
        // Crear elemento de pregunta destacada
        const item = document.createElement('div');
        item.className = 'faq-destacada-item';
        item.dataset.id = pregunta.id;
        
        // Crear contenido del item
        item.innerHTML = `
            <div class="faq-destacada-icono">

            </div>
            <div class="faq-destacada-contenido">
                <h3>${pregunta.pregunta}</h3>
                <span class="faq-destacada-categoria">${pregunta.categoria}</span>
            </div>
        `;
        
        // Agregar evento de clic
        item.addEventListener('click', function() {
            // Buscar la pregunta en el acordeón y hacer scroll hasta ella
            const faqItem = document.querySelector(`.faq-item[data-id="${pregunta.id}"]`);
            
            if (faqItem) {
                // Hacer scroll hasta la pregunta
                faqItem.scrollIntoView({ behavior: 'smooth' });
                
                // Simular clic en la pregunta después de un breve retraso
                setTimeout(() => {
                    faqItem.querySelector('.faq-question').click();
                }, 500);
            }
        });
        
        lista.appendChild(item);
    }
    
    contenedor.appendChild(lista);
}

// Función para crear el acordeón de preguntas frecuentes
function crearAcordeonFAQ() {
    // Obtener el contenedor de preguntas del DOM
    let contenedor = document.getElementById('faq-container');
    
    if (!contenedor) {
        // Si no existe, buscarlo por clase
        contenedor = document.querySelector('.faq-container');
    }
    
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'faq-container';
        contenedor.className = 'faq-container';
        
        // Insertar el contenedor en la página
        const containerDiv = document.querySelector('main .container');
        if (containerDiv) {
            containerDiv.appendChild(contenedor);
        }
    } else {
        // Limpiar contenedor existente
        contenedor.innerHTML = '';
    }
    
    // Filtrar solo preguntas visibles
    const preguntasVisibles = preguntas.filter(pregunta => pregunta.visible);
    
    // Verificar si hay preguntas visibles
    if (preguntasVisibles.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.className = 'faq-no-preguntas';
        mensaje.textContent = 'No hay preguntas disponibles en este momento.';
        contenedor.appendChild(mensaje);
        return;
    }
    
    // Crear elementos para cada pregunta visible usando un bucle for
    for (let i = 0; i < preguntasVisibles.length; i++) {
        const item = preguntasVisibles[i];
        
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.dataset.id = item.id;
        faqItem.dataset.categoria = item.categoria;
        
        // Crear elemento de pregunta
        const pregunta = document.createElement('div');
        pregunta.className = 'faq-question';
        
        // Usar operador ternario para decidir si mostrar un icono de destacado
        const iconoDestacado = item.destacada ? '⭐ ' : '';
        pregunta.innerHTML = `${iconoDestacado}${item.pregunta}`;
        
        // Crear elemento de respuesta
        const respuesta = document.createElement('div');
        respuesta.className = 'faq-answer';
        
        // Crear párrafo para la respuesta
        const parrafo = document.createElement('p');
        parrafo.textContent = item.respuesta;
        respuesta.appendChild(parrafo);
        
        // Crear etiqueta de categoría
        const etiquetaCategoria = document.createElement('span');
        etiquetaCategoria.className = 'faq-categoria';
        etiquetaCategoria.textContent = item.categoria;
        respuesta.appendChild(etiquetaCategoria);
        
        // Agregar evento de clic a la pregunta para abrir modal
        pregunta.addEventListener('click', function() {
            abrirModalRespuesta(item);
        });
        
        // Agregar elementos al item
        faqItem.appendChild(pregunta);
        faqItem.appendChild(respuesta);
        
        // Agregar item al contenedor
        contenedor.appendChild(faqItem);
    }
}

// Función para crear la barra de búsqueda
function crearBuscadorFAQ() {
    // Buscar el contenedor existente o crear uno nuevo
    let contenedor = document.getElementById('faq-buscador-container');
    
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'faq-buscador-container';
        contenedor.className = 'faq-buscador';
        
        // Insertar en el contenedor principal
        const containerDiv = document.querySelector('main .container');
        if (containerDiv) {
            containerDiv.appendChild(contenedor);
        }
    } else {
        // Limpiar contenedor existente
        contenedor.innerHTML = '';
        contenedor.className = 'faq-buscador';
    }
    
    // Crear input de búsqueda
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Buscar preguntas...';
    input.className = 'faq-buscador-input';
    
    // Crear botón de búsqueda
    const boton = document.createElement('button');
    boton.className = 'faq-buscador-boton';
    boton.innerHTML = 'Buscar';
    
    // Crear contenedor para resultados (sugerencias)
    const resultados = document.createElement('div');
    resultados.className = 'faq-buscador-resultados';
    resultados.style.display = 'none';
    
    // Agregar evento de entrada al input usando una función anónima
    input.addEventListener('input', function() {
        const busqueda = this.value.toLowerCase().trim();
        
        // Usar operador lógico para verificar si hay texto de búsqueda
        if (busqueda && busqueda.length >= 2) {
            // Mostrar resultados de búsqueda (sugerencias)
            mostrarResultadosBusqueda(busqueda, resultados);
        } else {
            // Si no hay texto de búsqueda, ocultar resultados
            resultados.style.display = 'none';
        }
    });
    
    // Agregar evento de clic al botón usando una función anónima
    boton.addEventListener('click', function() {
        const busqueda = input.value.toLowerCase().trim();
        
        // Usar operador lógico para verificar si hay texto de búsqueda
        if (busqueda && busqueda.length >= 2) {
            mostrarResultadosBusqueda(busqueda, resultados);
        }
    });
    
    // Agregar evento de tecla al input
    input.addEventListener('keydown', function(event) {
        // Usar estructura condicional para verificar si se presionó Enter
        if (event.key === 'Enter') {
            const busqueda = this.value.toLowerCase().trim();
            
            if (busqueda && busqueda.length >= 2) {
                mostrarResultadosBusqueda(busqueda, resultados);
            }
        }
    });
    
    // Agregar evento para ocultar sugerencias al hacer clic fuera
    document.addEventListener('click', function(event) {
        // Verificar si el clic fue fuera del contenedor de búsqueda
        if (!contenedor.contains(event.target)) {
            resultados.style.display = 'none';
        }
    });
    
    // Agregar elementos al contenedor
    contenedor.appendChild(input);
    contenedor.appendChild(boton);
    contenedor.appendChild(resultados);
    
    // Crear contenedor para mostrar la pregunta y respuesta seleccionada después del buscador
    let preguntaSeleccionada = document.getElementById('faq-pregunta-seleccionada');
    if (!preguntaSeleccionada) {
        preguntaSeleccionada = document.createElement('div');
        preguntaSeleccionada.id = 'faq-pregunta-seleccionada';
        preguntaSeleccionada.className = 'faq-pregunta-seleccionada';
        preguntaSeleccionada.style.display = 'none';
        
        // Insertar después del contenedor del buscador
        const containerDiv = document.querySelector('main .container');
        if (containerDiv) {
            // Buscar el elemento después del cual insertar
            const buscadorContainer = document.getElementById('faq-buscador-container');
            if (buscadorContainer && buscadorContainer.nextSibling) {
                containerDiv.insertBefore(preguntaSeleccionada, buscadorContainer.nextSibling);
            } else {
                containerDiv.appendChild(preguntaSeleccionada);
            }
        }
    }
}

// ============================================================================
// BLOQUE 5: FUNCIONES DE MODALES Y VENTANAS
// ============================================================================

// Función para abrir modal con la respuesta completa
function abrirModalRespuesta(preguntaData) {
    // Crear overlay del modal
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    // Crear contenedor del modal
    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
        background: white;
        border-radius: 12px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    // Crear botón de cerrar
    const btnCerrar = document.createElement('button');
    btnCerrar.innerHTML = '&times;';
    btnCerrar.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 30px;
        cursor: pointer;
        color: #666;
        line-height: 1;
    `;
    
    // Crear título de la pregunta
    const titulo = document.createElement('h2');
    titulo.textContent = preguntaData.pregunta;
    titulo.style.cssText = `
        margin: 0 0 20px 0;
        color: #8B4513;
        font-size: 24px;
        line-height: 1.3;
        padding-right: 40px;
    `;
    
    // Crear contenido de la respuesta
    const respuesta = document.createElement('p');
    respuesta.textContent = preguntaData.respuesta;
    respuesta.style.cssText = `
        margin: 0 0 20px 0;
        line-height: 1.6;
        font-size: 16px;
        color: #333;
    `;
    
    // Crear etiqueta de categoría
    const categoria = document.createElement('span');
    categoria.textContent = preguntaData.categoria.toUpperCase();
    categoria.style.cssText = `
        display: inline-block;
        background: #8B4513;
        color: white;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: bold;
    `;
    
    // Agregar elementos al modal
    modal.appendChild(btnCerrar);
    modal.appendChild(titulo);
    modal.appendChild(respuesta);
    modal.appendChild(categoria);
    
    // Agregar modal al overlay
    overlay.appendChild(modal);
    
    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Función para cerrar modal
    function cerrarModal() {
        overlay.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
        }, 300);
    }
    
    // Eventos para cerrar modal
    btnCerrar.addEventListener('click', cerrarModal);
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            cerrarModal();
        }
    });
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            cerrarModal();
        }
    });
    
    // Agregar modal al documento
    document.body.appendChild(overlay);
}

// ============================================================================
// BLOQUE 6: FUNCIONES DE BÚSQUEDA Y FILTRADO
// ============================================================================

// Función para mostrar resultados de búsqueda
function mostrarResultadosBusqueda(busqueda, contenedor) {
    // Limpiar contenedor
    contenedor.innerHTML = '';
    
    // Filtrar preguntas que coinciden con la búsqueda
    const coincidencias = preguntas.filter(pregunta => {
        // Para preguntas visibles, buscar en pregunta y respuesta
        if (pregunta.visible) {
            return pregunta.pregunta.toLowerCase().includes(busqueda) || 
                   pregunta.respuesta.toLowerCase().includes(busqueda);
        }
        
        // Para preguntas ocultas, verificar si la búsqueda coincide con palabras clave
        if (!pregunta.visible && pregunta.palabrasClave) {
            return pregunta.palabrasClave.some(palabra => 
                palabra.toLowerCase().includes(busqueda) || 
                busqueda.includes(palabra.toLowerCase())
            );
        }
        
        return false;
    });
    
    // Crear título de resultados
    const titulo = document.createElement('h3');
    
    // Usar estructura switch para mostrar diferentes mensajes según el número de resultados
    switch (true) {
        case coincidencias.length === 0:
            titulo.textContent = 'No se encontraron resultados';
            break;
        case coincidencias.length === 1:
            titulo.textContent = 'Se encontró 1 resultado';
            break;
        default:
            titulo.textContent = `Se encontraron ${coincidencias.length} resultados`;
    }
    
    contenedor.appendChild(titulo);
    
    // Crear lista de resultados
    if (coincidencias.length > 0) {
        const lista = document.createElement('ul');
        
        // Usar bucle for para recorrer las coincidencias
        for (let i = 0; i < coincidencias.length; i++) {
            const pregunta = coincidencias[i];
            
            const item = document.createElement('li');
            item.innerHTML = resaltarCoincidencias(pregunta.pregunta, busqueda);
            item.style.cursor = 'pointer';
            
            // Agregar evento de clic al item
            item.addEventListener('click', function() {
                // Mostrar la pregunta y respuesta debajo de la barra de búsqueda
                mostrarPreguntaSeleccionada(pregunta);
                
                // Ocultar las sugerencias
                contenedor.style.display = 'none';
            });
            
            lista.appendChild(item);
        }
        
        contenedor.appendChild(lista);
    }
    
    // Mostrar contenedor
    contenedor.style.display = 'block';
}

// Función para mostrar la pregunta seleccionada debajo de la barra de búsqueda
function mostrarPreguntaSeleccionada(preguntaData) {
    // Buscar el contenedor de pregunta seleccionada
    const contenedor = document.getElementById('faq-pregunta-seleccionada');
    
    if (!contenedor) return;
    
    // Limpiar contenido anterior
    contenedor.innerHTML = '';
    
    // Crear elemento de pregunta
    const preguntaElem = document.createElement('div');
    preguntaElem.className = 'pregunta-seleccionada-titulo';
    preguntaElem.innerHTML = `<h3>${preguntaData.pregunta}</h3>`;
    
    // Crear elemento de respuesta
    const respuestaElem = document.createElement('div');
    respuestaElem.className = 'pregunta-seleccionada-respuesta';
    respuestaElem.innerHTML = `<p>${preguntaData.respuesta}</p>`;
    
    // Crear etiqueta de categoría
    const categoriaElem = document.createElement('span');
    categoriaElem.className = 'pregunta-seleccionada-categoria';
    categoriaElem.textContent = preguntaData.categoria.toUpperCase();
    
    // Crear botón para cerrar
    const btnCerrar = document.createElement('button');
    btnCerrar.className = 'btn-cerrar-seleccionada';
    btnCerrar.innerHTML = '&times;';
    btnCerrar.addEventListener('click', function() {
        contenedor.style.display = 'none';
    });
    
    // Agregar elementos al contenedor
    contenedor.appendChild(btnCerrar);
    contenedor.appendChild(preguntaElem);
    contenedor.appendChild(respuestaElem);
    contenedor.appendChild(categoriaElem);
    
    // Mostrar el contenedor
    contenedor.style.display = 'block';
    
    // Hacer scroll suave hasta la pregunta seleccionada
    contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================================================
// BLOQUE 7: FUNCIONES AUXILIARES Y UTILIDADES
// ============================================================================

// Función para resaltar coincidencias de búsqueda
function resaltarCoincidencias(texto, busqueda) {
    // Si no hay texto de búsqueda, devolver el texto original
    if (!busqueda) return texto;
    
    // Escapar caracteres especiales en la búsqueda
    const busquedaEscapada = busqueda.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Crear expresión regular para buscar coincidencias
    const regex = new RegExp(`(${busquedaEscapada})`, 'gi');
    
    // Reemplazar coincidencias con texto resaltado
    return texto.replace(regex, '<span class="resaltado">$1</span>');
}



// ============================================================================
// BLOQUE 8: FUNCIONES DE FORMULARIOS Y SUGERENCIAS
// ============================================================================

// Función para crear botón de sugerir pregunta
function crearBotonSugerirPregunta() {
    // Buscar el contenedor existente o crear uno nuevo
    let contenedor = document.getElementById('faq-sugerir-container');
    
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'faq-sugerir-container';
        
        // Insertar en el contenedor principal
        const containerDiv = document.querySelector('main .container');
        if (containerDiv) {
            containerDiv.appendChild(contenedor);
        }
    } else {
        // Limpiar contenedor existente
        contenedor.innerHTML = '';
    }
    
    const boton = document.createElement('button');
    boton.className = 'btn-sugerir-pregunta';
    boton.innerHTML = 'Sugerir una pregunta';
    
    // Evento de clic en el botón
    boton.addEventListener('click', mostrarFormularioSugerencia);
    
    contenedor.appendChild(boton);
}

// Función para mostrar formulario de sugerencia
function mostrarFormularioSugerencia() {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Crear contenido del modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Crear encabezado del modal
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Sugerir una pregunta';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'close-modal';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(closeBtn);
    
    // Crear formulario
    const form = document.createElement('form');
    form.className = 'form-sugerencia';
    form.id = 'formSugerencia';
    
    // Campo de nombre
    const nombreGroup = document.createElement('div');
    nombreGroup.className = 'form-group';
    
    const nombreLabel = document.createElement('label');
    nombreLabel.textContent = 'Nombre:';
    nombreLabel.setAttribute('for', 'nombre');
    
    const nombreInput = document.createElement('input');
    nombreInput.type = 'text';
    nombreInput.id = 'nombre';
    nombreInput.name = 'nombre';
    nombreInput.required = true;
    
    // Mensaje de error para nombre
    const nombreError = document.createElement('span');
    nombreError.className = 'error-message';
    nombreError.id = 'nombre-error';
    
    nombreGroup.appendChild(nombreLabel);
    nombreGroup.appendChild(nombreInput);
    nombreGroup.appendChild(nombreError);
    
    // Campo de email
    const emailGroup = document.createElement('div');
    emailGroup.className = 'form-group';
    
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    emailLabel.setAttribute('for', 'email');
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true;
    
    // Mensaje de error para email
    const emailError = document.createElement('span');
    emailError.className = 'error-message';
    emailError.id = 'email-error';
    
    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);
    emailGroup.appendChild(emailError);
    
    // Campo de categoría
    const categoriaGroup = document.createElement('div');
    categoriaGroup.className = 'form-group';
    
    const categoriaLabel = document.createElement('label');
    categoriaLabel.textContent = 'Categoría:';
    categoriaLabel.setAttribute('for', 'categoria');
    
    const categoriaSelect = document.createElement('select');
    categoriaSelect.id = 'categoria';
    categoriaSelect.name = 'categoria';
    categoriaSelect.required = true;
    
    // Opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Selecciona una categoría';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    categoriaSelect.appendChild(defaultOption);
    
    // Agregar opciones de categoría desde OPCIONES_CATEGORIA
    for (let i = 0; i < OPCIONES_CATEGORIA.length; i++) {
        const opcion = document.createElement('option');
        opcion.value = OPCIONES_CATEGORIA[i].valor;
        opcion.textContent = OPCIONES_CATEGORIA[i].texto;
        categoriaSelect.appendChild(opcion);
    }
    
    // Mensaje de error para categoría
    const categoriaError = document.createElement('span');
    categoriaError.className = 'error-message';
    categoriaError.id = 'categoria-error';
    
    categoriaGroup.appendChild(categoriaLabel);
    categoriaGroup.appendChild(categoriaSelect);
    categoriaGroup.appendChild(categoriaError);
    
    // Campo de pregunta
    const preguntaGroup = document.createElement('div');
    preguntaGroup.className = 'form-group';
    
    const preguntaLabel = document.createElement('label');
    preguntaLabel.textContent = 'Tu pregunta:';
    preguntaLabel.setAttribute('for', 'pregunta');
    
    const preguntaTextarea = document.createElement('textarea');
    preguntaTextarea.id = 'pregunta';
    preguntaTextarea.name = 'pregunta';
    preguntaTextarea.rows = 4;
    preguntaTextarea.required = true;
    
    // Mensaje de error para pregunta
    const preguntaError = document.createElement('span');
    preguntaError.className = 'error-message';
    preguntaError.id = 'pregunta-error';
    
    preguntaGroup.appendChild(preguntaLabel);
    preguntaGroup.appendChild(preguntaTextarea);
    preguntaGroup.appendChild(preguntaError);
    
    // Botón de enviar
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.className = 'btn-enviar';
    submitBtn.textContent = 'Enviar sugerencia';
    
    // Agregar campos al formulario
    form.appendChild(nombreGroup);
    form.appendChild(emailGroup);
    form.appendChild(categoriaGroup);
    form.appendChild(preguntaGroup);
    form.appendChild(submitBtn);
    
    // Agregar validación en tiempo real
    nombreInput.addEventListener('input', function() {
        validarCampo(this, REGEX_NOMBRE, MENSAJE_ERROR_NOMBRE);
    });
    
    emailInput.addEventListener('input', function() {
        validarCampo(this, REGEX_EMAIL, MENSAJE_ERROR_EMAIL);
    });
    
    categoriaSelect.addEventListener('change', function() {
        validarCampo(this, null, MENSAJE_ERROR_CATEGORIA);
    });
    
    preguntaTextarea.addEventListener('input', function() {
        if (this.value.length < 10) {
            document.getElementById('pregunta-error').textContent = MENSAJE_ERROR_PREGUNTA;
            this.classList.add('invalid');
            return false;
        } else {
            document.getElementById('pregunta-error').textContent = '';
            this.classList.remove('invalid');
            return true;
        }
    });
    
    // Función para validar un campo
    function validarCampo(campo, regex, mensajeError) {
        const errorElement = document.getElementById(`${campo.id}-error`);
        
        // Si es un select, validar que tenga un valor seleccionado
        if (campo.tagName === 'SELECT') {
            if (campo.value === '') {
                errorElement.textContent = mensajeError;
                campo.classList.add('invalid');
                return false;
            } else {
                errorElement.textContent = '';
                campo.classList.remove('invalid');
                return true;
            }
        }
        
        // Para inputs y textareas, validar con regex
        if (!regex.test(campo.value)) {
            errorElement.textContent = mensajeError;
            campo.classList.add('invalid');
            return false;
        } else {
            errorElement.textContent = '';
            campo.classList.remove('invalid');
            return true;
        }
    }
    
    // Función para validar todo el formulario
    function validarFormulario() {
        let esValido = true;
        
        // Validar cada campo
        if (!validarCampo(nombreInput, REGEX_NOMBRE, MENSAJE_ERROR_NOMBRE)) {
            esValido = false;
        }
        
        if (!validarCampo(emailInput, REGEX_EMAIL, MENSAJE_ERROR_EMAIL)) {
            esValido = false;
        }
        
        if (!validarCampo(categoriaSelect, null, MENSAJE_ERROR_CATEGORIA)) {
            esValido = false;
        }
        
        if (preguntaTextarea.value.length < 10) {
            document.getElementById('pregunta-error').textContent = MENSAJE_ERROR_PREGUNTA;
            preguntaTextarea.classList.add('invalid');
            esValido = false;
        }
        
        return esValido;
    }
    
    // Agregar evento de envío al formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulario antes de enviar
        if (!validarFormulario()) {
            // Mostrar mensaje de error general
            alert('Por favor, corrige los errores en el formulario antes de enviar.');
            return;
        }
        
        // Crear nueva pregunta con los datos del formulario
        const nuevaPregunta = {
            id: preguntas.length + 1,
            pregunta: preguntaTextarea.value,
            respuesta: 'Gracias por tu pregunta. Nuestro equipo está trabajando en una respuesta.',
            categoria: categoriaSelect.value,
            destacada: false
        };
        
        // Usar confirm para preguntar si desea ver la pregunta agregada
        const verPregunta = confirm('¡Gracias por tu sugerencia! ¿Deseas ver cómo quedará tu pregunta en nuestra sección de FAQ?');
        
        if (verPregunta) {
            // Agregar la nueva pregunta al array
            preguntas.push(nuevaPregunta);
            
            // Recrear el acordeón de preguntas
            crearAcordeonFAQ();
            
            // Cerrar el modal
            document.body.removeChild(modal);
            
            // Buscar la pregunta en el acordeón y hacer scroll hasta ella
            setTimeout(() => {
                const faqItem = document.querySelector(`.faq-item[data-id="${nuevaPregunta.id}"]`);
                
                if (faqItem) {
                    // Hacer scroll hasta la pregunta
                    faqItem.scrollIntoView({ behavior: 'smooth' });
                    
                    // Simular clic en la pregunta después de un breve retraso
                    setTimeout(() => {
                        faqItem.querySelector('.faq-question').click();
                    }, 500);
                }
            }, 100);
        } else {
            // Mostrar mensaje de éxito
            modalContent.innerHTML = '';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
✓
                <h3>¡Gracias por tu sugerencia!</h3>
                <p>Hemos recibido tu pregunta y la revisaremos pronto.</p>
                <button class="btn-cerrar">Cerrar</button>
            `;
            
            successMessage.querySelector('.btn-cerrar').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            modalContent.appendChild(successMessage);
        }
    });
    
    // Agregar elementos al modal
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(form);
    modal.appendChild(modalContent);
    
    // Agregar modal al body
    document.body.appendChild(modal);
    
    // Enfocar el primer campo
    nombreInput.focus();
}

// ============================================================================
// BLOQUE 9: INICIALIZACIÓN Y EXPORTACIÓN
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
    
    // Inicializar la página de FAQ con todas las funcionalidades
    inicializarPaginaFAQ();
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar contenido y verificar usuario
    mostrarContenidoYVerificarUsuario();
});

// ============================================================================
// BLOQUE 10: FUNCIONES DE AUTENTICACIÓN
// ============================================================================

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        const gestor = new GestorUsuarios();
        gestor.cerrarSesion();
        window.location.href = 'index.html';
    }
}

// Función para verificar si hay usuario logueado (opcional)
function verificarUsuarioLogueado() {
    const gestor = new GestorUsuarios();
    return gestor.verificarSesionActiva();
}

// Función para obtener usuario actual
function obtenerUsuarioActual() {
    const gestor = new GestorUsuarios();
    return gestor.obtenerUsuarioActual();
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
    const navMenu = document.getElementById('navMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
    }
});

// FUNCIONES DE NAVEGACIÓN Y AUTENTICACIÓN
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
}

// Exportar funciones para uso en otros archivos si es necesario
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        inicializarPaginaFAQ,
        crearAcordeonFAQ,
        crearBuscadorFAQ,
        crearBotonSugerirPregunta,
        mostrarFormularioSugerencia
    };
}