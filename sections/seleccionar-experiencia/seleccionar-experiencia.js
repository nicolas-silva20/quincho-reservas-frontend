// Tabla de precios según día y horario
const tablaPreciosHorarios = {
    'martes-miercoles': {
        '12:00-19:00': 280000,
        '19:00-01:00': null // No disponible
    },
    'jueves': {
        '12:00-19:00': 300000,
        '19:00-01:00': 340000
    },
    'viernes': {
        '12:00-19:00': 340000,
        '19:00-01:00': 380000
    },
    'sabado-domingo': {
        '12:00-19:00': 400000,
        '19:00-01:00': 400000
    }
};

// Datos de las experiencias
const experienciasData = {
    estandar: {
        nombre: "ESTÁNDAR",
        precioFijo: false, // Ahora es dinámico
        items: [
            { nombre: "Cocina", incluido: true },
            { nombre: "Churrasquera (Interior)", incluido: true },
            { nombre: "Horno de barro", incluido: true },
            { nombre: "Parrilla (fogonero)", incluido: true },
            { 
                nombre: "Vajilla Completa", 
                incluido: true,
                desplegable: true,
                subitems: ["Vasos", "Jarras", "Pocillo con plato de café", "Platos (hondos, planos, postre - vidrio)", "Cubiertos (cuchillos, tenedores, cucharas, cucharas postre)"]
            },
            { 
                nombre: "Utensilios de Cocina", 
                incluido: true,
                desplegable: true,
                subitems: ["Ensaladeras (grandes y chicas)", "Bandejas para picada", "Tabla de asador", "Pava", "Licuadora", "Minipimer"]
            },
            { 
                nombre: "Especiero Completo", 
                incluido: true,
                desplegable: true,
                subitems: ["Sal", "Pimienta", "Orégano", "Ají", "Sal parrillera", "Aceite girasol", "Aceite oliva", "Aceto", "Vinagre manzana"]
            },
            { 
                nombre: "Mobiliario", 
                incluido: true,
                desplegable: true,
                subitems: ["Mesas", "Sillas", "Barra", "Banquetas"]
            },
            { nombre: "Piscina con solarium y cascada", incluido: true },
            { nombre: "Ducha", incluido: true },
            { nombre: "Reposeras-cama", incluido: true },
            { nombre: "Sillones relax", incluido: true },
            { nombre: "Heladera-freezer", incluido: true },
            { nombre: "Freezer", incluido: true },
            { 
                nombre: "Elementos de Mesa", 
                incluido: true,
                desplegable: true,
                subitems: ["Hieleras con pinzas", "Braseros para mesa", "Servilleteros con servilletas"]
            },
            { 
                nombre: "Elementos de Servicio", 
                incluido: true,
                desplegable: true,
                subitems: ["Papel higiénico", "Toalla de baño", "Fósforos", "Cafetera"]
            }
        ]
    },
    personalizada: {
        nombre: "PERSONALIZADA",
        precioFijo: false,
        items: [
            { nombre: "Cocina", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Churrasquera (Interior)", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Horno de barro", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Parrilla (fogonero)", incluido: true, costo: 0, obligatorio: true },
            { 
                nombre: "Vajilla Completa", 
                incluido: true,
                costo: 0,
                obligatorio: true,
                desplegable: true,
                subitems: ["Vasos", "Jarras", "Pocillo con plato de café", "Platos (hondos, planos, postre - vidrio)", "Cubiertos (cuchillos, tenedores, cucharas, cucharas postre)"]
            },
            { 
                nombre: "Utensilios de Cocina", 
                incluido: true,
                costo: 0,
                obligatorio: true,
                desplegable: true,
                subitems: ["Ensaladeras (grandes y chicas)", "Bandejas para picada", "Tabla de asador", "Pava", "Licuadora", "Minipimer"]
            },
            { 
                nombre: "Especiero Completo", 
                incluido: true,
                costo: 0,
                obligatorio: true,
                desplegable: true,
                subitems: ["Sal", "Pimienta", "Orégano", "Ají", "Sal parrillera", "Aceite girasol", "Aceite oliva", "Aceto", "Vinagre manzana"]
            },
            { 
                nombre: "Mobiliario", 
                incluido: true,
                costo: 0,
                obligatorio: true,
                desplegable: true,
                subitems: ["Mesas", "Sillas", "Barra", "Banquetas"]
            },
            { nombre: "Piscina con solarium y cascada", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Ducha", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Reposeras-cama", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Sillones relax", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Heladera-freezer", incluido: true, costo: 0, obligatorio: true },
            { nombre: "Freezer", incluido: true, costo: 0, obligatorio: true },
            { 
                nombre: "Elementos de Mesa", 
                incluido: true,
                costo: 0,
                obligatorio: true,
                desplegable: true,
                subitems: ["Hieleras con pinzas", "Braseros para mesa", "Servilleteros con servilletas"]
            },
            { 
                nombre: "Elementos de Servicio", 
                incluido: true,
                costo: 0,
                obligatorio: true,
                desplegable: true,
                subitems: ["Papel higiénico", "Toalla de baño", "Fósforos", "Cafetera"]
            },
            { 
                nombre: "Bebidas Alcohólicas", 
                incluido: false,
                esExtra: true,
                desplegable: true,
                subitems: [
                    { nombre: "Vino servido de cava", precio: 15000, cantidad: 0 },
                    { nombre: "Barril cerveza artesanal", precio: 25000, cantidad: 0 },
                    { nombre: "Fernet (750ml)", precio: 8000, cantidad: 0 },
                    { nombre: "Campari (750ml)", precio: 12000, cantidad: 0 },
                    { nombre: "Smirnoff (750ml)", precio: 10000, cantidad: 0 },
                    { nombre: "Rosé (750ml)", precio: 9000, cantidad: 0 }
                ]
            },
            { 
                nombre: "Equipamiento Bar", 
                incluido: false,
                esExtra: true,
                desplegable: true,
                subitems: [
                    { nombre: "Copas de cristal (juego x12)", precio: 3000, cantidad: 0 },
                    { nombre: "Choperas cerveceras", precio: 8000, cantidad: 0 },
                    { nombre: "Hielo (bolsa 5kg)", precio: 2000, cantidad: 0 }
                ]
            },
            { 
                nombre: "Bebidas sin Alcohol", 
                incluido: false,
                esExtra: true,
                desplegable: true,
                subitems: [
                    { nombre: "Coca-Cola (2.25L)", precio: 3500, cantidad: 0 },
                    { nombre: "Fanta (2.25L)", precio: 3000, cantidad: 0 },
                    { nombre: "Sprite (2.25L)", precio: 3000, cantidad: 0 },
                    { nombre: "Schweppes pomelo (1.5L)", precio: 2500, cantidad: 0 }
                ]
            },
            { 
                nombre: "Decoración", 
                incluido: false,
                esExtra: true,
                desplegable: true,
                subitems: [
                    { nombre: "Mantel blanco", precio: 5000, cantidad: 0 },
                    { nombre: "Mantel negro", precio: 5000, cantidad: 0 },
                    { nombre: "Funda para silla (unidad)", precio: 1000, cantidad: 0 }
                ]
            }
        ]
    }
};

let experienciaSeleccionada = null;
let precioBase = 0;
let precioExtras = 0;
let fechaSeleccionada = null;
let horaSeleccionada = null;

// Renderizar sección
function renderSeleccionarExperiencia() {
    const section = document.querySelector('.seleccionar-experiencia-section');
    const nombreCliente = sessionStorage.getItem('clienteNombre') || 'Cliente';
    
    section.innerHTML = `
        <div class="experiencia-container">
            <div class="experiencia-header">
                <button class="experiencia-back-btn" onclick="volverAReservar()">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M15 8H1M1 8L8 15M1 8L8 1" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Volver
                </button>
                <h1 class="experiencia-title">SELECCIONÁ TU EXPERIENCIA</h1>
                <p class="experiencia-subtitle">Elegí el paquete que mejor se adapte a tu evento</p>
            </div>
            
            ${renderTablaPreciosHorarios()}
            
            <div class="experiencias-grid-wrapper">
                <div class="experiencias-scroll-indicator-top"></div>
                <div class="experiencias-grid" id="experiencias-grid">
                    ${Object.entries(experienciasData).map(([key, exp]) => {
                        const disabled = key === 'personalizada' || key === 'promocion';
                        return renderExperienciaCard(key, exp, disabled);
                    }).join('')}
                </div>
            </div>
            
            <div class="verificar-container">\n                <button class="btn-verificar" id="btn-verificar" onclick="mostrarDisponibilidad()" disabled>
                    Verificar Disponibilidad
                </button>
            </div>
            
            <div class="disponibilidad-section" id="disponibilidad-section">
                <div class="disponibilidad-grid">
                    <div class="date-picker-container">
                        <label for="fecha-reserva">FECHA DEL EVENTO</label>
                        <input type="date" id="fecha-reserva" class="date-input" onchange="verificarDisponibilidad()">
                    </div>
                    <div class="time-picker-container">
                        <label for="hora-reserva">TURNO</label>
                        <select id="hora-reserva" class="time-select" onchange="verificarDisponibilidad()">
                            <option value="">Seleccionar turno</option>
                            <option value="12:00">Tarde (12:00 - 19:00)</option>
                            <option value="19:00">Noche (19:00 - 01:00)</option>
                        </select>
                    </div>
                </div>
                
                <div class="disponibilidad-mensaje" id="mensaje-disponibilidad"></div>
            </div>
        </div>
    `;
    
    // Establecer fecha mínima (hoy)
    const fechaInput = document.getElementById('fecha-reserva');
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.setAttribute('min', hoy);
    }
    
    // Sincronizar indicador de scroll del carrusel (solo en móvil)
    if (window.innerWidth <= 480) {
        const grid = document.getElementById('experiencias-grid');
        const indicator = document.querySelector('.experiencias-scroll-indicator-top');
        
        if (grid && indicator) {
            grid.addEventListener('scroll', () => {
                const scrollPercent = grid.scrollLeft / (grid.scrollWidth - grid.clientWidth);
                const indicatorWidth = indicator.offsetWidth;
                const thumbWidth = indicatorWidth * 0.5; // 50% del ancho
                const maxTranslate = indicatorWidth - thumbWidth;
                
                indicator.style.setProperty('--scroll-position', `${scrollPercent * maxTranslate}px`);
            });
        }
    }
}

// Renderizar tabla de precios por horarios
function renderTablaPreciosHorarios() {
    return `
        <div class="tabla-precios-container">
            <h2 class="tabla-precios-title">TARIFAS POR DÍA Y HORARIO</h2>
            <div class="tabla-precios-wrapper">
                <table class="tabla-precios-horarios">
                    <thead>
                        <tr>
                            <th>HORARIO</th>
                            <th>MARTES Y MIÉRCOLES</th>
                            <th>JUEVES</th>
                            <th>VIERNES</th>
                            <th>SÁBADOS Y DOMINGOS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="horario-label">De 12:00 a 19:00</td>
                            <td class="precio-cell">$280.000</td>
                            <td class="precio-cell">$300.000</td>
                            <td class="precio-cell">$340.000</td>
                            <td class="precio-cell">$400.000</td>
                        </tr>
                        <tr>
                            <td class="horario-label">De 19:00 a 01:00</td>
                            <td class="precio-cell no-disponible">-</td>
                            <td class="precio-cell">$340.000</td>
                            <td class="precio-cell">$380.000</td>
                            <td class="precio-cell">$400.000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="tabla-precios-scroll-hint">← Deslizá para ver más →</p>
            <p class="tabla-precios-nota">* Los precios son base. Los extras de la experiencia personalizada se suman al precio del horario seleccionado.</p>
        </div>
    `;
}

// Calcular precio base según fecha y hora
function calcularPrecioBase(fecha, hora) {
    if (!fecha || !hora) return 0;
    
    const fechaObj = new Date(fecha + 'T12:00:00');
    const diaSemana = fechaObj.getDay(); // 0=Domingo, 1=Lunes, ..., 6=Sábado
    
    let categoriasDia = '';
    if (diaSemana === 2 || diaSemana === 3) { // Martes o Miércoles
        categoriasDia = 'martes-miercoles';
    } else if (diaSemana === 4) { // Jueves
        categoriasDia = 'jueves';
    } else if (diaSemana === 5) { // Viernes
        categoriasDia = 'viernes';
    } else if (diaSemana === 0 || diaSemana === 6) { // Sábado o Domingo
        categoriasDia = 'sabado-domingo';
    } else { // Lunes (cerrado o usar precio default)
        return 0;
    }
    
    const horarioKey = hora === '12:00' ? '12:00-19:00' : '19:00-01:00';
    const precio = tablaPreciosHorarios[categoriasDia]?.[horarioKey];
    
    return precio || 0;
}

// Renderizar card de experiencia
function renderExperienciaCard(key, exp, disabled = false) {
    return `
        <div class="experiencia-card ${disabled ? 'disabled' : ''}" 
             id="card-${key}" 
             data-disabled="${disabled}"
             onclick="seleccionarExperiencia('${key}')">
            ${disabled ? '<div class="experiencia-badge">Próximamente</div>' : ''}
            <div class="experiencia-card-header">
                <h3 class="experiencia-card-title">${exp.nombre}</h3>
                ${key === 'personalizada' && !disabled ? '<p class="precio-nota-extra">El precio de los extras se sumará al precio base según la fecha seleccionada</p>' : ''}
            </div>
            <ul class="experiencia-items">
                ${exp.items.map((item, index) => renderItem(item, key, index)).join('')}
            </ul>
        </div>
    `;
}

// Renderizar item individual
function renderItem(item, expKey, index) {
    const isPersonalizada = expKey === 'personalizada';
    const isObligatorio = item.obligatorio || false;
    const clickable = isPersonalizada && item.esExtra;
    const hasDesplegable = item.desplegable && item.subitems && item.subitems.length > 0;
    const isExtra = item.esExtra || false;
    
    let itemHTML = `
        <li class="experiencia-item ${hasDesplegable ? 'desplegable' : ''} ${item.incluido && isExtra ? 'expanded' : ''}" 
            id="item-${index}">
            <div class="item-main ${clickable ? 'clickable' : ''}" 
                ${clickable ? `onclick="toggleItemPersonalizado(event, ${index})"` : ''}>
                <span class="item-icon ${item.incluido ? 'included' : 'not-included'}">
                    ${item.incluido ? '✓' : '✗'}
                </span>
                <span class="item-nombre">${item.nombre}</span>
                ${isObligatorio ? '<span class="item-obligatorio">(Incluido)</span>' : ''}
                ${hasDesplegable && !isExtra ? '<span class="toggle-arrow">▼</span>' : ''}
            </div>`;
    
    // Para items incluidos no-extras, mostrar subitems simples
    if (hasDesplegable && !isExtra) {
        itemHTML += `
            <ul class="subitems-list">
                ${item.subitems.map(subitem => `<li class="subitem">• ${subitem}</li>`).join('')}
            </ul>`;
    }
    
    // Para items extras, mostrar selector de cantidades cuando está incluido
    if (isExtra && hasDesplegable && item.incluido) {
        itemHTML += `
            <div class="extras-selector" id="extras-${index}">
                <h4 class="extras-title">Seleccioná los items y cantidades:</h4>
                <div class="extras-grid">
                    ${item.subitems.map((subitem, subIndex) => `
                        <div class="extra-item-row">
                            <span class="extra-item-nombre">${subitem.nombre}</span>
                            <span class="extra-item-precio">$${subitem.precio.toLocaleString('es-AR')}</span>
                            <div class="cantidad-selector">
                                <button type="button" class="btn-cantidad" onclick="cambiarCantidad(event, ${index}, ${subIndex}, -1)">-</button>
                                <input type="number" 
                                       min="0" 
                                       value="${subitem.cantidad}" 
                                       class="input-cantidad" 
                                       id="cantidad-${index}-${subIndex}"
                                       onchange="actualizarCantidad(event, ${index}, ${subIndex})"
                                       onclick="event.stopPropagation()">
                                <button type="button" class="btn-cantidad" onclick="cambiarCantidad(event, ${index}, ${subIndex}, 1)">+</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }
    
    itemHTML += `</li>`;
    
    return itemHTML;
}

// Toggle item en experiencia personalizada
function toggleItemPersonalizado(event, index) {
    event.stopPropagation();
    
    const item = experienciasData.personalizada.items[index];
    if (item.obligatorio) return;
    
    item.incluido = !item.incluido;
    
    // Si se desmarca, resetear cantidades
    if (!item.incluido && item.esExtra) {
        item.subitems.forEach(subitem => {
            subitem.cantidad = 0;
        });
    }
    
    // Recalcular precio extras
    calcularPrecioExtras();
    
    // Re-renderizar solo la card personalizada
    const card = document.getElementById('card-personalizada');
    card.outerHTML = renderExperienciaCard('personalizada', experienciasData.personalizada, true);
    
    // Mantener selección si estaba seleccionada
    if (experienciaSeleccionada === 'personalizada') {
        document.getElementById('card-personalizada').classList.add('selected');
    }
}

// Cambiar cantidad con botones +/-
function cambiarCantidad(event, itemIndex, subitemIndex, delta) {
    event.stopPropagation();
    
    const item = experienciasData.personalizada.items[itemIndex];
    const subitem = item.subitems[subitemIndex];
    
    const nuevaCantidad = Math.max(0, subitem.cantidad + delta);
    subitem.cantidad = nuevaCantidad;
    
    // Actualizar input visual
    const input = document.getElementById(`cantidad-${itemIndex}-${subitemIndex}`);
    if (input) input.value = nuevaCantidad;
    
    // Recalcular precio
    calcularPrecioExtras();
}

// Actualizar cantidad desde input
function actualizarCantidad(event, itemIndex, subitemIndex) {
    event.stopPropagation();
    
    const item = experienciasData.personalizada.items[itemIndex];
    const subitem = item.subitems[subitemIndex];
    const input = document.getElementById(`cantidad-${itemIndex}-${subitemIndex}`);
    
    const nuevaCantidad = Math.max(0, parseInt(input.value) || 0);
    subitem.cantidad = nuevaCantidad;
    input.value = nuevaCantidad;
    
    // Recalcular precio
    calcularPrecioExtras();
}

// Calcular precio total de extras
function calcularPrecioExtras() {
    precioExtras = 0;
    experienciasData.personalizada.items.forEach(item => {
        if (item.incluido && item.esExtra && item.subitems) {
            item.subitems.forEach(subitem => {
                precioExtras += (subitem.precio * subitem.cantidad);
            });
        }
    });
    return precioExtras;
}

// Seleccionar experiencia
function seleccionarExperiencia(tipo) {
    // Verificar si la experiencia está deshabilitada
    const card = document.getElementById(`card-${tipo}`);
    if (card && card.dataset.disabled === 'true') {
        return; // No hacer nada si está deshabilitada
    }
    
    experienciaSeleccionada = tipo;
    
    // Actualizar UI
    document.querySelectorAll('.experiencia-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.getElementById(`card-${tipo}`).classList.add('selected');
    
    // Habilitar botón
    document.getElementById('btn-verificar').disabled = false;
    
    // Ocultar sección de disponibilidad si estaba visible
    document.getElementById('disponibilidad-section').classList.remove('active');
    document.getElementById('mensaje-disponibilidad').classList.remove('active');
}

// Mostrar sección de disponibilidad
function mostrarDisponibilidad() {
    const section = document.getElementById('disponibilidad-section');
    section.classList.add('active');
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Verificar disponibilidad (CON BACKEND)
async function verificarDisponibilidad() {
    const fecha = document.getElementById('fecha-reserva').value;
    const hora = document.getElementById('hora-reserva').value;
    const mensajeDiv = document.getElementById('mensaje-disponibilidad');
    
    if (!fecha || !hora) {
        mensajeDiv.classList.remove('active');
        return;
    }
    
    try {
        // Llamar al backend real - ahora devuelve ApiResponseDTO
        const response = await verificarDisponibilidadAPI(fecha, hora);
        
        mensajeDiv.classList.add('active');
        
        if (response && response.success && response.data && response.data.disponible) {
            mostrarFormularioConfirmacion();
        } else {
            mostrarNoDisponible();
        }
    } catch (error) {
        console.error('Error al verificar disponibilidad:', error);
        notifyError('Error al verificar disponibilidad. Por favor intente nuevamente.');
    }
}

// Mostrar formulario de confirmación
function mostrarFormularioConfirmacion() {
    const mensajeDiv = document.getElementById('mensaje-disponibilidad');
    const fecha = document.getElementById('fecha-reserva').value;
    const hora = document.getElementById('hora-reserva').value;
    
    // Calcular precio base según fecha y hora
    precioBase = calcularPrecioBase(fecha, hora);
    const precioTotal = precioBase + precioExtras;
    const depositoGarantia = 130000;
    const totalConDeposito = precioTotal + depositoGarantia;
    
    const experiencia = experienciasData[experienciaSeleccionada];
    
    mensajeDiv.className = 'disponibilidad-mensaje active mensaje-disponible';
    mensajeDiv.innerHTML = `
        <div class="mensaje-icon">✓</div>
        <h3 class="mensaje-title">¡Excelente! Fecha Disponible</h3>
        
        <div class="resumen-reserva">
            <h4>Resumen de tu Reserva</h4>
            <div class="resumen-item">
                <span>Experiencia:</span>
                <strong>${experiencia.nombre}</strong>
            </div>
            <div class="resumen-item">
                <span>Precio base:</span>
                <strong>$${precioBase.toLocaleString('es-AR')}</strong>
            </div>
            ${precioExtras > 0 ? `
            <div class="resumen-item">
                <span>Extras seleccionados:</span>
                <strong>+$${precioExtras.toLocaleString('es-AR')}</strong>
            </div>
            ` : ''}
            <div class="resumen-item">
                <span>Depósito en garantía:</span>
                <strong>$${depositoGarantia.toLocaleString('es-AR')}</strong>
            </div>
            <div class="resumen-total">
                <span>Total a abonar:</span>
                <strong>$${totalConDeposito.toLocaleString('es-AR')}</strong>
            </div>
        </div>
        
        <div class="terminos-condiciones">
            <h4>Términos y Condiciones</h4>
            <div class="terminos-scroll">
                <ol class="terminos-lista">
                    <li>
                        <strong>Capacidad máxima:</strong> El recinto tiene una capacidad máxima de 20 personas, 
                        con posibilidad de extender hasta 25 personas con previo aviso y aprobación. 
                        Superar este límite constituye una violación de las normas de seguridad y puede resultar 
                        en la cancelación inmediata del evento sin derecho a reembolso.
                    </li>
                    <li>
                        <strong>Depósito en garantía:</strong> Se requiere un depósito de $${depositoGarantia.toLocaleString('es-AR')} 
                        que será devuelto de forma inmediata una vez corroborado el estado de las instalaciones y elementos, siempre y cuando 
                        las instalaciones sean entregadas en las mismas condiciones en que fueron recibidas. Este depósito 
                        cubre posibles daños materiales, roturas o pérdida de elementos del quincho.
                    </li>
                    <li>
                        <strong>Inspección previa obligatoria:</strong> Es obligatorio realizar una visita de inspección 
                        al predio dentro de las 48 horas posteriores a la confirmación de esta reserva. Durante esta visita 
                        se realizará el pago correspondiente mediante seña del 50% o cancelación total del alquiler.
                    </li>
                    <li>
                        <strong>Horarios permitidos:</strong> El quincho opera en 2 turnos:<br>
                        - Turno Tarde: 12:00 a 19:00 horas<br>
                        - Turno Noche: 19:00 a 01:00 horas<br>
                        Solo se puede reservar un turno por día. Martes y Miércoles únicamente turno tarde disponible.
                        El ingreso se hará efectivo en el horario seleccionado y la entrega debe realizarse puntualmente 
                        al finalizar el tiempo contratado. El exceso de horario tendrá un cargo adicional de $30.000 por hora.
                    </li>
                    <li>
                        <strong>Estado de las instalaciones:</strong> El cliente se compromete a hacer uso responsable 
                        de todas las instalaciones y equipamiento. Cualquier daño, rotura o pérdida será deducido del 
                        depósito en garantía. Si los daños superan el monto del depósito, el cliente se compromete a 
                        abonar la diferencia.
                    </li>
                    <li>
                        <strong>Limpieza:</strong> Se solicita dejar el espacio en condiciones básicas de orden. 
                        La basura debe ser depositada en los contenedores provistos. No se exige limpieza profunda, 
                        pero el desorden excesivo o la falta de retiro de residuos puede implicar un cargo adicional de $5.000.
                    </li>
                    <li>
                        <strong>Política de cancelación:</strong> Las cancelaciones realizadas con más de 48 horas de 
                        anticipación no tendrán cargo. Con menos de 48 horas, la seña no será devuelta. 
                        En caso de cancelación por parte de El Umbral, se reembolsará el 100% del monto abonado.
                    </li>
                    <li>
                        <strong>Normas de convivencia:</strong> Se debe respetar el nivel de ruido especialmente después 
                        de las 23:00 horas para no molestar a los vecinos. El incumplimiento de esta norma puede resultar 
                        en la finalización anticipada del evento sin derecho a reembolso.
                    </li>
                    <li>
                        <strong>Seguridad de menores:</strong> Si entre los asistentes hay menores de 6 años, se debe abonar 
                        un adicional de $30.000 para contratar un guardavidas/bañero certificado por seguridad. Es obligatorio 
                        informar la presencia de menores al momento de la reserva.
                    </li>
                </ol>
            </div>
            <label class="terminos-checkbox" id="terminos-checkbox-label">
                <input type="checkbox" id="acepto-terminos" onchange="validarFormulario()" disabled>
                <span>He leído y acepto los términos y condiciones mencionados</span>
            </label>
        </div>
        
        <div class="contacto-form">
            <h4>Datos de Contacto para Coordinación</h4>
            <p class="contacto-descripcion">
                Nuestro equipo se comunicará contigo en el horario indicado para coordinar 
                tu visita al predio y el pago correspondiente.
            </p>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="telefono-contacto">Teléfono de Contacto*</label>
                    <input 
                        type="tel" 
                        id="telefono-contacto" 
                        class="form-input" 
                        placeholder="+54 9 11 xxxx-xxxx"
                        onchange="validarFormulario()"
                        required
                    >
                </div>
                <div class="form-group">
                    <label for="horario-contacto">Horario Preferido de Contacto*</label>
                    <select 
                        id="horario-contacto" 
                        class="form-input" 
                        onchange="validarFormulario()"
                        required
                    >
                        <option value="">Seleccionar horario</option>
                        <option value="09:00-12:00">Mañana (09:00 - 12:00)</option>
                        <option value="12:00-15:00">Mediodía (12:00 - 15:00)</option>
                        <option value="15:00-18:00">Tarde (15:00 - 18:00)</option>
                        <option value="18:00-21:00">Noche (18:00 - 21:00)</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div class="mensaje-opciones">
            <button class="btn-opcion primary" id="btn-confirmar-final" onclick="confirmarReservaFinal()" disabled>
                Confirmar Reserva
            </button>
        </div>
    `;
    
    // Configurar detección de scroll para habilitar checkbox
    setTimeout(() => {
        const terminosScroll = document.querySelector('.terminos-scroll');
        const checkbox = document.getElementById('acepto-terminos');
        const checkboxLabel = document.getElementById('terminos-checkbox-label');
        
        if (terminosScroll && checkbox && checkboxLabel) {
            // Agregar indicador visual de que debe hacer scroll
            checkboxLabel.style.opacity = '0.5';
            checkboxLabel.style.cursor = 'not-allowed';
            
            terminosScroll.addEventListener('scroll', function() {
                // Verificar si llegó al final (con margen de 10px por precisión)
                const scrolledToBottom = terminosScroll.scrollHeight - terminosScroll.scrollTop <= terminosScroll.clientHeight + 10;
                
                if (scrolledToBottom) {
                    checkbox.disabled = false;
                    checkboxLabel.style.opacity = '1';
                    checkboxLabel.style.cursor = 'pointer';
                    
                    // Agregar una pequeña notificación visual
                    checkboxLabel.style.animation = 'pulse 0.5s ease';
                }
            });
        }
    }, 100);
}

// Mostrar mensaje de no disponible
function mostrarNoDisponible() {
    const mensajeDiv = document.getElementById('mensaje-disponibilidad');
    mensajeDiv.className = 'disponibilidad-mensaje active mensaje-no-disponible';
    mensajeDiv.innerHTML = `
        <div class="mensaje-icon">✗</div>
        <p class="mensaje-text">Lo sentimos, esta fecha y horario no están disponibles</p>
        <p class="mensaje-subtext">
            Te ofrecemos ponerte en lista de espera por si se libera esta fecha y horario. 
            Te notificaremos por WhatsApp o llamada telefónica si se produce una cancelación.
        </p>
        <div class="mensaje-opciones">
            <button class="btn-opcion" onclick="ponerEnCola()">
                Ponerme en Lista de Espera
            </button>
            <button class="btn-opcion primary" onclick="elegirOtraFecha()">
                Elegir Otra Fecha
            </button>
        </div>
    `;
}

// Validar formulario de confirmación
function validarFormulario() {
    const terminosAceptados = document.getElementById('acepto-terminos')?.checked || false;
    const telefono = document.getElementById('telefono-contacto')?.value || '';
    const horario = document.getElementById('horario-contacto')?.value || '';
    const btnConfirmar = document.getElementById('btn-confirmar-final');
    
    if (btnConfirmar) {
        btnConfirmar.disabled = !(terminosAceptados && telefono && horario);
    }
}

// Confirmar reserva final (CON BACKEND)
async function confirmarReservaFinal() {
    const fecha = document.getElementById('fecha-reserva').value;
    const hora = document.getElementById('hora-reserva').value;
    const telefono = document.getElementById('telefono-contacto').value;
    const horarioContacto = document.getElementById('horario-contacto').value;
    const nombre = sessionStorage.getItem('clienteNombre');
    
    // Precio total calculado previamente
    const precioTotal = precioBase + precioExtras;
    const experiencia = experienciasData[experienciaSeleccionada];
    
    // Preparar detalles de extras para personalizada
    let detallesExtras = null;
    if (experienciaSeleccionada === 'personalizada') {
        detallesExtras = [];
        experienciasData.personalizada.items.forEach(item => {
            if (item.incluido && item.esExtra && item.subitems) {
                item.subitems.forEach(subitem => {
                    if (subitem.cantidad > 0) {
                        detallesExtras.push({
                            nombre: subitem.nombre,
                            cantidad: subitem.cantidad,
                            precioUnitario: subitem.precio,
                            subtotal: subitem.precio * subitem.cantidad
                        });
                    }
                });
            }
        });
    }
    
    // Preparar datos para enviar al backend
    const reservaData = {
        nombreCliente: nombre,
        telefono: telefono,
        email: null,
        experienciaId: obtenerIdExperiencia(experienciaSeleccionada),
        fechaEvento: fecha,
        horaInicio: hora,
        horarioContacto: horarioContacto,
        terminosAceptados: true,
        precioBase: precioBase,
        precioExtras: precioExtras,
        precioTotal: precioTotal,
        observaciones: detallesExtras && detallesExtras.length > 0 
            ? JSON.stringify({ extras: detallesExtras }) 
            : null
    };
    
    try {
        // Llamar al backend para crear la reserva
        const response = await crearReserva(reservaData);
        
        // Verificar que la respuesta sea exitosa
        if (!response || !response.success || !response.data) {
            throw new Error(response?.message || 'Error al crear la reserva');
        }
        
        const data = response.data;
        const experiencia = experienciasData[experienciaSeleccionada];
        
        // Crear mensaje formateado con HTML
        const mensajeHTML = `
            <div style="text-align: left; line-height: 1.8;">
                <h3 style="color: #d4a574; text-align: center; margin-bottom: 1.5rem;">✅ ¡Reserva Confirmada!</h3>
                
                <div style="background: rgba(212, 165, 116, 0.1); padding: 1.5rem; border-radius: 10px; margin-bottom: 1rem;">
                    <p style="margin: 0.5rem 0;"><strong style="color: #d4a574;">Número de reserva:</strong> #${data.id}</p>
                    <p style="margin: 0.5rem 0;"><strong style="color: #d4a574;">Cliente:</strong> ${data.nombreCliente || nombre}</p>
                    <p style="margin: 0.5rem 0;"><strong style="color: #d4a574;">Teléfono:</strong> ${telefono}</p>
                    <p style="margin: 0.5rem 0;"><strong style="color: #d4a574;">Experiencia:</strong> ${experiencia?.nombre || 'Experiencia seleccionada'}</p>
                    <p style="margin: 0.5rem 0;"><strong style="color: #d4a574;">Fecha:</strong> ${new Date(fecha).toLocaleDateString('es-AR', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}</p>
                    <p style="margin: 0.5rem 0;"><strong style="color: #d4a574;">Hora:</strong> ${hora}</p>
                    <p style="margin: 0.5rem 0;"><strong style="color: #d4a574;">Total:</strong> <span style="font-size: 1.2rem; color: #4caf50;">$${(precioTotal + 130000).toLocaleString('es-AR')}</span></p>
                </div>
                
                <div style="background: rgba(76, 175, 80, 0.1); padding: 1rem; border-radius: 10px; border-left: 4px solid #4caf50;">
                    <p style="margin: 0; color: rgba(255,255,255,0.9);">
                        📞 Nos comunicaremos por WhatsApp o llamada telefónica en el horario <strong>${horarioContacto}</strong> para coordinar los detalles de tu visita.
                    </p>
                </div>
            </div>
        `;
        
        // Usar la función mostrarNotificacion directamente con HTML
        mostrarNotificacion(mensajeHTML, 'success');
        
        setTimeout(() => {
            volverAReservar();
        }, 500);
    } catch (error) {
        console.error('Error al crear reserva:', error);
        notifyError('Error al crear la reserva. Por favor intente nuevamente o contacte al administrador.');
    }
}

// Helper para obtener ID de experiencia del backend
function obtenerIdExperiencia(tipo) {
    const mapeo = {
        'estandar': 1,
        'personalizada': 2,
        'promocion': 3
    };
    return mapeo[tipo];
}

// Poner en lista de espera (CON BACKEND)
async function ponerEnCola() {
    const fecha = document.getElementById('fecha-reserva').value;
    const hora = document.getElementById('hora-reserva').value;
    const nombre = sessionStorage.getItem('clienteNombre');
    
    if (!experienciaSeleccionada) {
        notifyWarning('Error: No se ha seleccionado una experiencia');
        return;
    }
    
    // Pedir teléfono si no lo tiene
    const telefono = await notifyPrompt(
        '¿Cuál es tu número de teléfono para contactarte?',
        '+5491112345678',
        ''
    );
    
    if (!telefono) {
        return; // Usuario canceló
    }
    
    try {
        // Esperar 400ms para que el overlay de notifyPrompt se cierre completamente
        await new Promise(resolve => setTimeout(resolve, 400));
        
        // Convertir hora de "HH:mm" a "HH:mm:ss" para el backend
        const horaConSegundos = hora.includes(':') && hora.split(':').length === 2 
            ? `${hora}:00` 
            : hora;
        
        const datosListaEspera = {
            nombreCliente: nombre,
            telefono: telefono,
            email: null,
            experienciaId: obtenerIdExperiencia(experienciaSeleccionada),
            fechaDeseada: fecha,
            horaDeseada: horaConSegundos
        };
        
        console.log('Enviando a lista de espera:', datosListaEspera);
        
        await agregarAListaEspera(datosListaEspera);
        
        const mensajeHTML = `✅ ¡En Lista de Espera!

📅 Fecha deseada: ${new Date(fecha).toLocaleDateString('es-AR', {day: 'numeric', month: 'long', year: 'numeric'})}
⏰ Hora deseada: ${hora}
📱 Teléfono: ${telefono}

📞 Te contactaremos por WhatsApp o llamada telefónica si esta fecha se libera.

Gracias por tu paciencia.`;
        
        notifySuccess(mensajeHTML);
    } catch (error) {
        console.error('Error al agregar a lista de espera:', error);
        notifyError('Error al agregar a lista de espera: ' + (error.message || 'Por favor intente nuevamente.'));
    }
}

// Elegir otra fecha
function elegirOtraFecha() {
    document.getElementById('fecha-reserva').value = '';
    document.getElementById('hora-reserva').value = '';
    document.getElementById('mensaje-disponibilidad').classList.remove('active');
    
    document.getElementById('fecha-reserva').focus();
}

// Volver a la sección de reservar
function volverAReservar() {
    document.querySelector('.seleccionar-experiencia-section').style.display = 'none';
    document.querySelector('.landing-section').style.display = 'flex';
    document.querySelector('.que-ofrecemos-section').style.display = 'flex';
    document.querySelector('.reservar-section').style.display = 'flex';
    document.querySelector('.resenas-section').style.display = 'flex';
    document.getElementById('footer').style.display = 'block';
    
    // Resetear estado
    experienciaSeleccionada = null;
    precioPersonalizado = experienciasData.personalizada.precioBase;
    
    // Limpiar sessionStorage
    sessionStorage.removeItem('clienteNombre');
    
    // Limpiar formularios
    const formReservar = document.getElementById('reservar-form');
    if (formReservar) {
        formReservar.reset();
    }
    
    // Re-renderizar la sección para limpiar todos los campos
    renderSeleccionarExperiencia();
    
    // Scroll a la landing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Inicializar
document.addEventListener('DOMContentLoaded', renderSeleccionarExperiencia);