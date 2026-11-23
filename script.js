/* ==========================================================================
   OVERTIME PIZZA SPORTHOUSE — script.js
   Funcionalidad real: menú, personalización, carrito, sucursales y pedido.
   ========================================================================== */

document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. DATOS: PIZZAS
     Reemplaza "img" por la ruta real de cada foto en /assets.
     Cada ingrediente tiene un "extra" = Bs. que se suma por cada unidad
     ADICIONAL a la cantidad base (1). Quitarlo no descuenta dinero.
  --------------------------------------------------------------------- */
  const EXTRA_POR_INCREMENTO = 3; // Bs. 3 por cada incremento — cámbialo aquí si cambia el precio
  const FIGMA_ASSETS = 'assets/';

  const TAMANOS = [
    { id: 'p6', label: '6 porciones', price: 56 },
    { id: 'p8', label: '8 porciones', price: 70 },
    { id: 'grande', label: 'Grande', price: 82 },
    // Precio inicial de la Pizza Interminable: varía entre Bs. 160 y Bs. 170.
    // Se deja Bs. 160 como valor inicial editable.
    { id: 'interminable', label: 'Interminable', price: 160 },
  ];

  const PIZZAS = [
    {
      id: 'venna',
      nombre: 'Venna',
      img: `${FIGMA_ASSETS}promo-venna.png`,
      ingredientes: ['Salsa de tomate', 'Mozzarella', 'Chorizo Vienna', 'Choclitos'],
    },
    {
      id: 'aldos-hawaiana',
      nombre: "Aldo's Hawaiana",
      img: `${FIGMA_ASSETS}promo-hawaiana.png`,
      ingredientes: ['Salsa alfredo', 'Mozzarella', 'Jamón', 'Piña'],
    },
    {
      id: 'hawaiana',
      nombre: 'Hawaiana',
      img: `${FIGMA_ASSETS}promo-hawaiana.png`,
      ingredientes: ['Salsa de tomate', 'Mozzarella', 'Jamón', 'Piña'],
    },
    {
      id: 'morron',
      nombre: 'Morrón',
      img: `${FIGMA_ASSETS}promo-venna.png`,
      ingredientes: ['Salsa de tomate', 'Mozzarella', 'Calabresa', 'Pimentón verde'],
    },
    {
      id: 'alfredo',
      nombre: 'Alfredo',
      img: `${FIGMA_ASSETS}hero-overtime.png`,
      ingredientes: ['Salsa alfredo', 'Mozzarella', 'Champiñones', 'Espinaca'],
    },
    {
      id: 'diavola',
      nombre: 'Diavola',
      img: `${FIGMA_ASSETS}promo-barbacoa.png`,
      ingredientes: ['Picante (opcional)', 'Salsa de tomate', 'Mozzarella', 'Salame'],
    },
    {
      id: 'jamon-champinones',
      nombre: 'Jamón / Champiñones',
      img: `${FIGMA_ASSETS}promo-hawaiana.png`,
      ingredientes: ['Salsa de tomate', 'Jamón', 'Mozzarella', 'Champiñones'],
    },
    {
      id: 'calabresa',
      nombre: 'Calabresa',
      img: `${FIGMA_ASSETS}promo-venna.png`,
      ingredientes: ['Salsa de tomate', 'Mozzarella', 'Cebolla', 'Tomate', 'Aceitunas verdes', 'Calabresa'],
    },
    {
      id: 'tres-cerditos',
      nombre: 'Tres Cerditos',
      img: `${FIGMA_ASSETS}pizza-tres-cerditos.png`,
      ingredientes: ['Salsa de tomate', 'Mozzarella', 'Calabresa', 'Salame', 'Tocino picado'],
    },
    {
      id: 'barbacoa',
      nombre: 'Barbacoa',
      img: `${FIGMA_ASSETS}promo-barbacoa.png`,
      ingredientes: ['Salsa de tomate', 'Mozzarella', 'Carne de res con barbacoa'],
    },
    {
      id: 'criolla',
      nombre: 'Criolla',
      img: `${FIGMA_ASSETS}promo-barbacoa.png`,
      ingredientes: ['Salsa de tomate', 'Mozzarella', 'Pimentón', 'Cebolla', 'Aceituna negra', 'Lomito', 'Locoto (opcional)'],
    },
    {
      id: 'overtime',
      nombre: 'Overtime Especialidad de la Casa',
      img: `${FIGMA_ASSETS}pizza-overtime.png`,
      ingredientes: ['Picante opcional', 'Salsa de tomate', 'Mozzarella', 'Carne de res', 'Tocino', 'Cilantro'],
    },
  ];

  /* ---------------------------------------------------------------------
     2. DATOS: SUCURSALES
  --------------------------------------------------------------------- */
  const SUCURSALES = [
    {
      id: 'zenon-salinas',
      nombre: 'Overtime Zenon Salinas',
      zona: 'Zona Norte',
      direccion: 'A una cuadra del Huper Mall, en las calles Zenon Salinas entre Av. Melchor Urquidi y Miguel de Aguirre.',
      horario: 'Lunes 17:10 a 21:50',
      telefonos: ['4799193'],
      activa: true,
    },
    {
      id: 'zona-sarco',
      nombre: 'Overtime Zona Sarco',
      zona: 'Zona Oeste',
      direccion: 'Av. Melchor Pérez y América, media cuadra al sud, acera oeste.',
      horario: 'Lunes 17:10 a 21:50',
      telefonos: ['4020449', '4069598'],
      activa: true,
    },
    {
      id: 'del-prado',
      nombre: 'Overtime del Prado',
      zona: '',
      direccion: 'Av. Ballivián entre Chuquisaca y La Paz.',
      horario: 'Lunes 17:10 a 21:50',
      telefonos: ['4660535'],
      activa: true,
    },
    {
      id: 'av-chapare',
      nombre: 'Overtime Av. Chapare',
      zona: 'Zona Castillo',
      direccion: 'Av. Chapare, detrás del Hipermaxi.',
      horario: 'Lunes 17:10 a 21:50',
      telefonos: ['4289583', '75900752'],
      activa: true,
    },
    {
      id: 'pacata',
      nombre: 'Overtime Pacata',
      zona: '',
      direccion: 'Av. Circunvalación y Pedro Álvarez, a dos cuadras al este del Bateón.',
      horario: 'Lunes 17:10 a 21:50',
      telefonos: ['4265437', '62674158'],
      activa: true,
    },
    {
      id: 'tiquipaya',
      nombre: 'Overtime Zona Tiquipaya',
      zona: '',
      direccion: 'Av. Circunvalación casi Av. Chilimarca.',
      horario: 'Lunes 17:10 a 21:50',
      telefonos: ['4289585'],
      activa: true,
    },
    {
      id: 'camion',
      nombre: 'Camión Overtime',
      zona: '',
      direccion: 'Ubicación variable.',
      horario: 'FUERA DE SERVICIO HASTA NUEVO AVISO',
      telefonos: [],
      activa: false,
    },
  ];

  /* ---------------------------------------------------------------------
     3. ESTADO GLOBAL
  --------------------------------------------------------------------- */
  let cart = [];              // items agregados al pedido
  let selectedBranch = null;  // sucursal elegida
  let modalState = null;      // estado temporal del modal de personalización

  /* ---------------------------------------------------------------------
     4. NAVBAR: scroll, hamburguesa, smooth scroll
  --------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(navLinks.classList.contains('active')));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------------------------------------------------------------
     5. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  const bottomNavLinks = [...document.querySelectorAll('.bottom-nav__link')];
  const navSectionObserver = new IntersectionObserver((entries) => {
    const visibleSection = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visibleSection) return;
    bottomNavLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${visibleSection.target.id}`;
      link.classList.toggle('bottom-nav__link--active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15, 0.5] });
  ['inicio', 'menu', 'sucursales', 'pedidos'].forEach(id => {
    const section = document.getElementById(id);
    if (section) navSectionObserver.observe(section);
  });

  /* ---------------------------------------------------------------------
     6. RENDER: TARJETAS DE MENÚ
  --------------------------------------------------------------------- */
  const menuGrid = document.getElementById('menuGrid');
  const featuredGrid = document.getElementById('featuredGrid');

  function precioBase() { return TAMANOS[0].price; }

  function createPizzaCard(pizza) {
    const card = document.createElement('article');
    card.className = 'pizza-card reveal';
    card.innerHTML = `
      <div class="pizza-card__media">
        <img src="${pizza.img}" alt="Pizza ${pizza.nombre}" loading="lazy" decoding="async">
      </div>
      <div class="pizza-card__body">
        <h3 class="pizza-card__name">${pizza.nombre}</h3>
        <p class="pizza-card__ingredients">${pizza.ingredientes.join(', ')}</p>
        <span class="pizza-card__price">Desde Bs. ${precioBase()} <small>(6 porciones)</small></span>
        <div class="pizza-card__actions">
          <button class="btn btn--outline-gold" data-action="customize" data-id="${pizza.id}">Personalizar</button>
          <button class="btn btn--gold" data-action="quick-add" data-id="${pizza.id}">Agregar al pedido</button>
        </div>
      </div>
    `;
    return card;
  }

  PIZZAS.forEach(pizza => {
    const card = createPizzaCard(pizza);
    menuGrid.appendChild(card);
    revealObserver.observe(card);
  });

  [
    { id: 'overtime', tag: 'CASA' },
    { id: 'tres-cerditos', tag: 'TOP 1' },
  ].forEach(featured => {
    const pizza = PIZZAS.find(item => item.id === featured.id);
    const card = document.createElement('article');
    card.className = 'featured-card reveal';
    card.innerHTML = `
      <div class="featured-card__media">
        <img src="${pizza.img}" alt="Pizza ${pizza.nombre}" loading="lazy" decoding="async">
        <span class="featured-card__tag">${featured.tag}</span>
      </div>
      <div class="featured-card__body">
        <h3>${pizza.nombre.toUpperCase()}</h3>
        <p>${pizza.ingredientes.join(', ')}</p>
        <span class="featured-card__price">Bs. ${precioBase()}</span>
        <button type="button" class="btn btn--gold btn--sm" data-action="customize" data-id="${pizza.id}">PERSONALIZAR</button>
      </div>
    `;
    featuredGrid.appendChild(card);
    revealObserver.observe(card);
  });

  function handlePizzaActions(e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const pizza = PIZZAS.find(p => p.id === btn.dataset.id);
    if (!pizza) return;

    if (btn.dataset.action === 'customize') {
      openCustomizeModal(pizza);
    } else if (btn.dataset.action === 'quick-add') {
      addPizzaToCart(pizza);
    }
  }

  menuGrid.addEventListener('click', handlePizzaActions);
  featuredGrid.addEventListener('click', handlePizzaActions);

  document.getElementById('promosGrid').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-pizza-order]');
    if (!btn) return;
    const pizza = PIZZAS.find(item => item.id === btn.dataset.pizzaOrder);
    if (!pizza) return;
    openCustomizeModal(pizza, {
      name: btn.dataset.promoName,
      sizeLabel: btn.dataset.promoSize,
      price: Number(btn.dataset.promoPrice),
    });
  });

  function addPizzaToCart(pizza) {
    cart.push(buildDefaultItem(pizza));
    updateCartUI();
    pulseCartBtn();
  }

  function buildDefaultItem(pizza) {
    return {
      uid: `${pizza.id}-${Date.now()}`,
      pizzaId: pizza.id,
      nombre: pizza.nombre,
      img: pizza.img,
      tamanoId: TAMANOS[0].id,
      tamanoLabel: TAMANOS[0].label,
      precioTamano: TAMANOS[0].price,
      ingredientes: pizza.ingredientes.map(nombre => ({ nombre, cantidad: 1, base: true })),
      ingredientesOriginales: [...pizza.ingredientes],
      promo: null,
      cantidad: 1,
      unitTotal: TAMANOS[0].price,
      total: TAMANOS[0].price,
    };
  }

  /* ---------------------------------------------------------------------
     7. MODAL DE PERSONALIZACIÓN
  --------------------------------------------------------------------- */
  const customizeModal = document.getElementById('customizeModal');
  const modalPizzaImg = document.getElementById('modalPizzaImg');
  const modalPizzaName = document.getElementById('modalPizzaName');
  const modalPizzaDesc = document.getElementById('modalPizzaDesc');
  const sizeOptionsEl = document.getElementById('sizeOptions');
  const ingredientListEl = document.getElementById('ingredientList');
  const modalTotalEl = document.getElementById('modalTotal');
  const modalTotalLabel = document.getElementById('modalTotalLabel');
  const modalClose = document.getElementById('modalClose');
  const addToCartBtn = document.getElementById('addToCartBtn');
  let modalReturnFocus = null;

  function openCustomizeModal(pizza, promo, editingItem) {
    modalReturnFocus = document.activeElement;
    modalState = {
      pizza,
      tamanoId: editingItem ? editingItem.tamanoId : TAMANOS[0].id,
      ingredientes: editingItem
        ? editingItem.ingredientes.map(ingredient => ({ ...ingredient }))
        : pizza.ingredientes.map(nombre => ({ nombre, cantidad: 1, base: true })),
      ingredientesOriginales: editingItem ? [...editingItem.ingredientesOriginales] : [...pizza.ingredientes],
      promo: editingItem ? editingItem.promo : (promo || null),
      editingUid: editingItem ? editingItem.uid : null,
      cantidad: editingItem ? editingItem.cantidad : 1,
    };

    modalPizzaImg.src = pizza.img;
    modalPizzaImg.alt = `Pizza ${pizza.nombre}`;
    modalPizzaName.textContent = pizza.nombre.toUpperCase();
    modalPizzaDesc.textContent = pizza.ingredientes.join(', ');
    modalTotalLabel.textContent = modalState.cantidad > 1 ? 'TOTAL DE TODAS LAS UNIDADES:' : 'TOTAL DE ESTA PIZZA:';
    addToCartBtn.textContent = editingItem ? 'GUARDAR CAMBIOS' : 'AGREGAR AL PEDIDO';

    renderSizeOptions();
    renderIngredientList();
    updateModalTotal();

    customizeModal.classList.add('active');
    customizeModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeCustomizeModal() {
    customizeModal.classList.remove('active');
    customizeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = cartOverlay.classList.contains('active') || summaryModal.classList.contains('active') ? 'hidden' : '';
    modalState = null;
    if (modalReturnFocus && modalReturnFocus.isConnected) modalReturnFocus.focus();
  }

  modalClose.addEventListener('click', closeCustomizeModal);
  customizeModal.addEventListener('click', (e) => {
    if (e.target === customizeModal) closeCustomizeModal();
  });

  function renderSizeOptions() {
    sizeOptionsEl.innerHTML = '';
    if (modalState.promo) {
      const promoSize = document.createElement('div');
      promoSize.className = 'size-option selected';
      promoSize.innerHTML = `<span>${modalState.promo.name} · ${modalState.promo.sizeLabel}</span><span>Bs. ${modalState.promo.price}</span>`;
      sizeOptionsEl.appendChild(promoSize);
      return;
    }
    TAMANOS.forEach(t => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'size-option' + (t.id === modalState.tamanoId ? ' selected' : '');
      button.dataset.id = t.id;
      button.setAttribute('aria-pressed', String(t.id === modalState.tamanoId));
      button.innerHTML = `<span>${t.label}</span><span>Bs. ${t.price}</span>`;
      button.addEventListener('click', () => {
        modalState.tamanoId = t.id;
        renderSizeOptions();
        updateModalTotal();
      });
      sizeOptionsEl.appendChild(button);
    });
  }

  function renderIngredientList() {
    ingredientListEl.innerHTML = '';
    modalState.ingredientes.forEach((ing, idx) => {
      const row = document.createElement('div');
      row.className = 'ingredient-row';
      const extra = ing.cantidad > 1 ? (ing.cantidad - 1) * EXTRA_POR_INCREMENTO : 0;
      row.innerHTML = `
        <span class="ingredient-row__name">${ing.nombre}${extra > 0 ? `<span class="ingredient-row__extra">+ Bs. ${extra}</span>` : ''}</span>
        <div class="qty-control">
          <button type="button" data-idx="${idx}" data-dir="-1" aria-label="Quitar ${ing.nombre}" ${ing.cantidad === 0 ? 'disabled' : ''}>−</button>
          <span aria-live="polite">${ing.cantidad}</span>
          <button type="button" data-idx="${idx}" data-dir="1" aria-label="Agregar ${ing.nombre}">+</button>
        </div>
      `;
      ingredientListEl.appendChild(row);
    });
  }

  ingredientListEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-idx]');
    if (!btn || !modalState) return;
    const idx = parseInt(btn.dataset.idx, 10);
    const dir = parseInt(btn.dataset.dir, 10);
    const ing = modalState.ingredientes[idx];
    ing.cantidad = Math.max(0, ing.cantidad + dir); // 0 = ingrediente quitado
    renderIngredientList();
    updateModalTotal();
  });

  function calcularTotalPersonalizado(tamanoId, ingredientes) {
    const tamano = TAMANOS.find(t => t.id === tamanoId);
    let total = modalState.promo ? modalState.promo.price : tamano.price;
    ingredientes.forEach(ing => {
      if (ing.cantidad > 1) {
        total += (ing.cantidad - 1) * EXTRA_POR_INCREMENTO;
      }
      // Quitar ingrediente (cantidad 0) no descuenta nada del precio base.
    });
    return total;
  }

  function updateModalTotal() {
    const total = calcularTotalPersonalizado(modalState.tamanoId, modalState.ingredientes) * modalState.cantidad;
    modalTotalEl.textContent = `Bs. ${total}`;
  }

  addToCartBtn.addEventListener('click', () => {
    if (!modalState) return;
    const tamano = TAMANOS.find(t => t.id === modalState.tamanoId);
    const ingredientesFinales = modalState.ingredientes.filter(i => i.cantidad > 0);
    const unitTotal = calcularTotalPersonalizado(modalState.tamanoId, modalState.ingredientes);
    const total = unitTotal * modalState.cantidad;
    const item = {
      uid: modalState.editingUid || `${modalState.pizza.id}-${Date.now()}`,
      pizzaId: modalState.pizza.id,
      nombre: modalState.pizza.nombre,
      img: modalState.pizza.img,
      tamanoId: modalState.promo ? 'promo' : tamano.id,
      tamanoLabel: modalState.promo ? modalState.promo.sizeLabel : tamano.label,
      precioTamano: modalState.promo ? modalState.promo.price : tamano.price,
      ingredientes: ingredientesFinales,
      ingredientesOriginales: [...modalState.ingredientesOriginales],
      promo: modalState.promo,
      cantidad: modalState.cantidad,
      unitTotal,
      total,
    };

    if (modalState.editingUid) {
      const itemIndex = cart.findIndex(cartItem => cartItem.uid === modalState.editingUid);
      if (itemIndex !== -1) cart[itemIndex] = item;
    } else {
      cart.push(item);
    }

    updateCartUI();
    pulseCartBtn();
    closeCustomizeModal();
    openCartPanel();
  });

  /* ---------------------------------------------------------------------
     8. SUCURSALES: render en sección "Pedidos"
  --------------------------------------------------------------------- */
  const branchSelectEl = document.getElementById('branchSelect');

  SUCURSALES.forEach(s => {
    const opt = document.createElement('label');
    opt.className = 'branch-option' + (!s.activa ? ' disabled' : '');
    opt.innerHTML = `
      <input type="radio" name="sucursal" value="${s.id}" ${!s.activa ? 'disabled' : ''}>
      <span>
        <strong>${s.nombre}</strong>${s.zona ? ` — ${s.zona}` : ''}
        ${!s.activa ? ' <em>(fuera de servicio)</em>' : ''}
      </span>
    `;
    if (s.activa) {
      opt.querySelector('input').addEventListener('change', (event) => {
        if (!event.target.checked) return;
        selectedBranch = s;
        document.querySelectorAll('.branch-option').forEach(el => el.classList.remove('selected'));
        opt.classList.add('selected');
        document.getElementById('orderStatus').textContent = '';
        updateCartUI();
      });
    }
    branchSelectEl.appendChild(opt);
  });

  /* ---------------------------------------------------------------------
     9. SUCURSALES: render en sección "Nuestras Sucursales"
  --------------------------------------------------------------------- */
  const branchesGrid = document.getElementById('branchesGrid');

  SUCURSALES.forEach(s => {
    const card = document.createElement('article');
    card.className = 'branch-card reveal' + (!s.activa ? ' branch-card--closed' : '');

    const telefonosHtml = s.telefonos.map(tel =>
      `<a href="tel:${tel}" class="btn btn--outline-gold" aria-label="Llamar a ${s.nombre} al ${tel}">LLAMAR ${s.telefonos.length > 1 ? tel : ''}</a>`
    ).join('');
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.nombre}, ${s.direccion}, Cochabamba, Bolivia`)}`;

    card.innerHTML = `
      ${s.zona ? `<span class="branch-card__zone">${s.zona}</span>` : ''}
      <h3 class="branch-card__name">${s.nombre}</h3>
      <p class="branch-card__address">${s.direccion}</p>
      ${s.activa
        ? `<p class="branch-card__hours"><span>Horario:</span> ${s.horario}</p>`
        : `<span class="branch-card__badge">${s.horario}</span>`
      }
      ${s.activa ? `
      <div class="branch-card__actions">
        ${telefonosHtml}
        <a href="${mapUrl}" class="btn btn--gold" target="_blank" rel="noopener noreferrer">VER UBICACIÓN</a>
      </div>` : ''}
    `;
    branchesGrid.appendChild(card);
    revealObserver.observe(card);
  });

  /* ---------------------------------------------------------------------
     10. CARRITO: UI y lógica
  --------------------------------------------------------------------- */
  const cartCountEl = document.getElementById('cartCount');
  const cartToggle = document.getElementById('cartToggle');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartPanel = document.getElementById('cartPanel');
  const cartClose = document.getElementById('cartClose');
  const cartPanelBody = document.getElementById('cartPanelBody');
  const cartPanelEmpty = document.getElementById('cartPanelEmpty');
  const cartPanelTotal = document.getElementById('cartPanelTotal');
  const cartPanelBranch = document.getElementById('cartPanelBranch');

  const orderItemsEmpty = document.getElementById('orderItemsEmpty');
  const orderItemsList = document.getElementById('orderItemsList');
  const orderTotalEl = document.getElementById('orderTotal');

  function cartTotal() {
    return cart.reduce((sum, item) => sum + item.total, 0);
  }

  function itemDescription(item) {
    const removidos = item.ingredientesOriginales
      ? item.ingredientesOriginales.filter(o => !item.ingredientes.find(i => i.nombre === o))
      : [];
    const extras = item.ingredientes
      .filter(i => i.cantidad > 1)
      .map(i => `${i.nombre} x${i.cantidad} (+Bs. ${(i.cantidad - 1) * EXTRA_POR_INCREMENTO})`);
    const normales = item.ingredientes.filter(i => i.cantidad === 1).map(i => i.nombre);
    const parts = [...extras, ...normales, ...removidos.map(nombre => `Sin ${nombre}`)];
    return parts.length ? parts.join(', ') : 'Sin ingredientes';
  }

  function createOrderRow(item) {
    const row = document.createElement('div');
    row.className = 'order-item';

    const info = document.createElement('div');
    info.className = 'order-item__info';
    const name = document.createElement('h4');
    name.textContent = item.nombre;
    const details = document.createElement('p');
    details.textContent = `${item.tamanoLabel} · ${itemDescription(item)}`;
    const quantity = document.createElement('div');
    quantity.className = 'order-item__quantity';
    const decrease = document.createElement('button');
    decrease.type = 'button';
    decrease.dataset.uid = item.uid;
    decrease.dataset.quantityDir = '-1';
    decrease.disabled = item.cantidad <= 1;
    decrease.textContent = '−';
    decrease.setAttribute('aria-label', `Quitar una ${item.nombre}`);
    const quantityValue = document.createElement('span');
    quantityValue.textContent = String(item.cantidad);
    quantityValue.setAttribute('aria-live', 'polite');
    const increase = document.createElement('button');
    increase.type = 'button';
    increase.dataset.uid = item.uid;
    increase.dataset.quantityDir = '1';
    increase.textContent = '+';
    increase.setAttribute('aria-label', `Agregar una ${item.nombre}`);
    quantity.append(decrease, quantityValue, increase);
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'order-item__edit';
    edit.dataset.uid = item.uid;
    edit.textContent = 'Editar';
    edit.setAttribute('aria-label', `Editar ${item.nombre}`);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'order-item__remove';
    remove.dataset.uid = item.uid;
    remove.textContent = 'Quitar';
    remove.setAttribute('aria-label', `Quitar ${item.nombre} del pedido`);
    info.append(name, details, quantity, edit, remove);

    const price = document.createElement('div');
    price.className = 'order-item__price';
    price.textContent = `Bs. ${item.total}`;
    row.append(info, price);
    return row;
  }

  function renderCartAndOrders() {
    const hasItems = cart.length > 0;

    // Sección Pedidos
    orderItemsEmpty.style.display = hasItems ? 'none' : 'block';
    orderItemsList.style.display = hasItems ? 'flex' : 'none';
    orderItemsList.innerHTML = '';

    // Panel lateral
    cartPanelEmpty.style.display = hasItems ? 'none' : 'block';
    cartPanelBody.innerHTML = '';
    if (!hasItems) cartPanelBody.appendChild(cartPanelEmpty);

    cart.forEach(item => {
      orderItemsList.appendChild(createOrderRow(item));
      cartPanelBody.appendChild(createOrderRow(item));
    });

    const total = cartTotal();
    orderTotalEl.textContent = `Bs. ${total}`;
    cartPanelTotal.textContent = `Bs. ${total}`;
    const quantity = cart.reduce((total, item) => total + item.cantidad, 0);
    cartCountEl.textContent = quantity;
    cartToggle.setAttribute('aria-label', `Ver mi pedido, ${quantity} ${quantity === 1 ? 'pizza' : 'pizzas'}`);

    cartPanelBranch.textContent = `Sucursal: ${selectedBranch ? selectedBranch.nombre : 'Sin seleccionar'}`;
  }

  function updateCartUI() {
    renderCartAndOrders();
  }

  document.addEventListener('click', (e) => {
    const quantityBtn = e.target.closest('button[data-quantity-dir]');
    if (quantityBtn) {
      const item = cart.find(cartItem => cartItem.uid === quantityBtn.dataset.uid);
      if (!item) return;
      item.cantidad = Math.max(1, item.cantidad + Number(quantityBtn.dataset.quantityDir));
      item.total = item.unitTotal * item.cantidad;
      updateCartUI();
      orderStatus.textContent = `Cantidad actualizada: ${item.cantidad} ${item.cantidad === 1 ? 'pizza' : 'pizzas'}.`;
      return;
    }

    const removeBtn = e.target.closest('.order-item__remove');
    if (removeBtn) {
      cart = cart.filter(item => item.uid !== removeBtn.dataset.uid);
      updateCartUI();
      document.getElementById('orderStatus').textContent = 'Pizza quitada del pedido.';
      return;
    }

    const editBtn = e.target.closest('.order-item__edit');
    if (editBtn) {
      const item = cart.find(cartItem => cartItem.uid === editBtn.dataset.uid);
      const pizza = item && PIZZAS.find(p => p.id === item.pizzaId);
      if (item && pizza) openCustomizeModal(pizza, null, item);
    }
  });

  function pulseCartBtn() {
    cartToggle.style.transform = 'scale(1.25)';
    setTimeout(() => { cartToggle.style.transform = ''; }, 220);
  }

  function openCartPanel() {
    cartOverlay.classList.add('active');
    cartOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    cartPanel.focus();
  }
  function closeCartPanel() {
    cartOverlay.classList.remove('active');
    cartOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = customizeModal.classList.contains('active') || summaryModal.classList.contains('active') ? 'hidden' : '';
    cartToggle.focus();
  }

  cartToggle.addEventListener('click', openCartPanel);
  cartClose.addEventListener('click', closeCartPanel);
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) closeCartPanel();
  });

  /* ---------------------------------------------------------------------
     11. FINALIZAR PEDIDO / RESUMEN / WHATSAPP
  --------------------------------------------------------------------- */
  const checkoutBtn = document.getElementById('checkoutBtn');
  const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
  const summaryModal = document.getElementById('summaryModal');
  const summaryClose = document.getElementById('summaryClose');
  const summaryContent = document.getElementById('summaryContent');
  const summaryTotal = document.getElementById('summaryTotal');
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');
  const orderStatus = document.getElementById('orderStatus');
  let summaryReturnFocus = null;

  function openSummary() {
    if (cart.length === 0) {
      orderStatus.textContent = 'Agrega una pizza al pedido antes de continuar.';
      document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (!selectedBranch) {
      orderStatus.textContent = 'Selecciona una sucursal para continuar.';
      branchSelectEl.querySelector('input:not(:disabled)').focus();
      return;
    }

    summaryContent.innerHTML = '';
    cart.forEach(item => {
      const block = document.createElement('div');
      block.className = 'summary-block';
      const name = document.createElement('h4');
      name.textContent = item.nombre;
      const size = document.createElement('p');
      size.textContent = `Tamaño: ${item.tamanoLabel}`;
      const ingredients = document.createElement('p');
      ingredients.textContent = `Ingredientes: ${itemDescription(item)}`;
      const quantity = document.createElement('p');
      quantity.textContent = `Cantidad: ${item.cantidad}`;
      const price = document.createElement('p');
      price.textContent = `Precio: Bs. ${item.total}`;
      block.append(name, size, quantity, ingredients, price);
      summaryContent.appendChild(block);
    });

    const branchBlock = document.createElement('div');
    branchBlock.className = 'summary-block';
    const branchTitle = document.createElement('h4');
    branchTitle.textContent = 'Sucursal';
    const branchName = document.createElement('p');
    branchName.textContent = selectedBranch.nombre;
    branchBlock.append(branchTitle, branchName);
    summaryContent.appendChild(branchBlock);

    summaryTotal.textContent = `Bs. ${cartTotal()}`;

    summaryReturnFocus = document.activeElement;
    summaryModal.classList.add('active');
    summaryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    summaryClose.focus();
  }

  function closeSummary() {
    summaryModal.classList.remove('active');
    summaryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = cartOverlay.classList.contains('active') ? 'hidden' : '';
    if (summaryReturnFocus && summaryReturnFocus.isConnected) summaryReturnFocus.focus();
  }

  checkoutBtn.addEventListener('click', openSummary);
  cartCheckoutBtn.addEventListener('click', () => {
    closeCartPanel();
    openSummary();
  });
  summaryClose.addEventListener('click', closeSummary);
  summaryModal.addEventListener('click', (e) => {
    if (e.target === summaryModal) closeSummary();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (summaryModal.classList.contains('active')) closeSummary();
      else if (customizeModal.classList.contains('active')) closeCustomizeModal();
      else if (cartOverlay.classList.contains('active')) closeCartPanel();
      return;
    }

    if (event.key !== 'Tab') return;
    const activeDialog = summaryModal.classList.contains('active')
      ? summaryModal
      : (customizeModal.classList.contains('active') ? customizeModal : (cartOverlay.classList.contains('active') ? cartPanel : null));
    if (!activeDialog) return;
    const focusable = [...activeDialog.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), [tabindex]:not([tabindex="-1"])')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || !activeDialog.contains(document.activeElement))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || !activeDialog.contains(document.activeElement))) {
      event.preventDefault();
      first.focus();
    }
  });

  const WHATSAPP_NUMERO = '59179961575';

  function generarMensajeWhatsApp() {
    let msg = 'Hola Overtime, quiero realizar el siguiente pedido:\n\n';
    cart.forEach((item, i) => {
      const desc = itemDescription(item);
      msg += `${i + 1}. ${item.nombre} — ${item.tamanoLabel} × ${item.cantidad}\n   Ingredientes: ${desc}\n   Precio: Bs. ${item.total}\n\n`;
    });
    msg += `Sucursal: ${selectedBranch ? selectedBranch.nombre : ''}\n`;
    msg += `TOTAL: Bs. ${cartTotal()}`;
    return msg;
  }

  confirmOrderBtn.addEventListener('click', () => {
    const mensaje = generarMensajeWhatsApp();
    const whatsappWindow = window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`, '_blank');
    if (!whatsappWindow) {
      orderStatus.textContent = 'No se pudo abrir WhatsApp. Permite ventanas emergentes y vuelve a intentarlo.';
      return;
    }
    whatsappWindow.opener = null;

    cart = [];
    selectedBranch = null;
    orderStatus.textContent = 'Pedido preparado en WhatsApp. Revísalo y envíalo para confirmar.';
    branchSelectEl.querySelectorAll('input').forEach(input => { input.checked = false; });
    document.querySelectorAll('.branch-option').forEach(el => el.classList.remove('selected'));
    updateCartUI();
    closeSummary();
  });

  /* ---------------------------------------------------------------------
     12. FOOTER: año actual
  --------------------------------------------------------------------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     13. ESTADO INICIAL
  --------------------------------------------------------------------- */
  updateCartUI();
});