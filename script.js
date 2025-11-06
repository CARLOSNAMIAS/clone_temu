
/**
 * @file script.js
 * @description Archivo principal de JavaScript para la aplicación de una sola página clon de Temu.
 * Maneja el renderizado de productos, la gestión del carrito, el cambio de vistas y la aplicación de parches de seguridad.
 *
 * @summary
 * Este script ha sido refactorizado para seguir las mejores prácticas de seguridad y desarrollo:
 * 1.  **'use strict'**: Habilitado para un código más limpio y seguro.
 * 2.  **IIFE (Immediately Invoked Function Expression)**: Todo el código está envuelto en una IIFE para evitar la contaminación del
 *     alcance global, protegiendo variables sensibles como `cart` y `allProducts`.
 * 3.  **Prevención de XSS (Cross-Site Scripting)**: Se ha eliminado el uso de `innerHTML` para contenido dinámico. En su lugar,
 *     se utilizan `document.createElement` y `textContent` para construir el DOM de forma segura.
 * 4.  **Validación de Entradas**: Las funciones que modifican el estado (ej. `addToCart`, `changeQty`) ahora validan sus entradas
 *     para prevenir manipulaciones y errores inesperados.
 * 5.  **Comentarios Educativos**: Los comentarios han sido mejorados para explicar no solo el *qué*, sino también el *porqué* de
 *     ciertas implementaciones, especialmente en lo que respecta a la seguridad.
 */

// Envolvemos todo el script en una IIFE para crear un ámbito privado y proteger nuestras variables.
(function () {
    'use strict';

    // ===================================================================
    // 1. DATOS Y GESTIÓN DEL ESTADO
    // ===================================================================

    /**
     * @const {Array<Object>} allProducts
     * @description Un array de objetos de productos disponibles para la compra.
     * @security En una aplicación real, estos datos deberían ser obtenidos desde un servidor a través de una API segura.
     *           Nunca confíes en los datos del producto definidos en el lado del cliente para transacciones.
     */
    const allProducts = [
        {
            id: 1,
            name: "Altavoces Inalámbricos Portátiles",
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
            price: 89344,
            oldPrice: 268598,
            rating: 5,
            sales: "14K+",
            badge: "Mejor Calificado",
            brand: "XIAOMI",
            hasVideo: false
        },

        
        {
            id: 2,
            name: "Palanca de Freno y Embrague CNC",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
            price: 32666,
            oldPrice: 56559,
            rating: 4.5,
            sales: "1.2K+",
            badge: "Solo hay 75",
            hasVideo: true
        },
        {
            id: 3,
            name: "Bombilla LED individual",
            image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
            price: 42052,
            oldPrice: 79541,
            rating: 4,
            sales: "149",
            badge: "BLACK FRIDAY",
            badgeType: "bf",
            hasVideo: false
        },
        {
            id: 4,
            name: "Soporte de montaje de pared",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
            price: 5934,
            oldPrice: 17323,
            rating: 5,
            sales: "32",
            badge: "Solo hay 18",
            badgeType: "bf",
            hasVideo: false
        },
        {
            id: 5,
            name: "Foco LED Exterior Impermeable",
            image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&h=400&fit=crop",
            price: 10812,
            oldPrice: 17236,
            rating: 4.5,
            sales: "856",
            badge: "Mejor Calificado",
            hasVideo: false
        },
        {
            id: 6,
            name: "Kit de Herramientas Profesional",
            image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop",
            price: 67890,
            oldPrice: 98765,
            rating: 5,
            sales: "2.3K+",
            badge: "BLACK FRIDAY",
            badgeType: "bf",
            hasVideo: true
        },
        {
            id: 10,
            name: "Auriculares Bluetooth con Cancelación de Ruido",
            image: "https://picsum.photos/seed/Auriculares/400/400",
            price: 159900,
            oldPrice: 299900,
            rating: 4.8,
            sales: "25K+",
            badge: "Más Vendido",
            brand: "Sony",
            hasVideo: true
        },
        {
            id: 14,
            name: "Cámara de Seguridad WiFi 1080p",
            image: "https://picsum.photos/seed/Camara/400/400",
            price: 95000,
            oldPrice: 150000,
            rating: 4.5,
            sales: "8K+",
            badge: "Solo hay 50",
            hasVideo: true
        },
        {
            id: 11,
            name: "Reloj Inteligente Deportivo",
            image: "https://picsum.photos/seed/Reloj/400/400",
            price: 210500,
            oldPrice: 350000,
            rating: 4.7,
            sales: "18K+",
            badge: "Oferta Flash",
            badgeType: "bf",
            hasVideo: true
        },
        {
            id: 12,
            name: "Teclado Mecánico RGB para Gaming",
            image: "https://picsum.photos/seed/Teclado/400/400",
            price: 180000,
            oldPrice: 250000,
            rating: 4.9,
            sales: "12K+",
            badge: "BLACK FRIDAY",
            badgeType: "bf",
            hasVideo: false
        },
        {
            id: 13,
            name: "Mouse Inalámbrico Ergonómico",
            image: "https://picsum.photos/seed/Mouse/400/400",
            price: 75000,
            oldPrice: 120000,
            rating: 4.6,
            sales: "20K+",
            badge: "Mejor Calificado",
            brand: "Logitech",
            hasVideo: false
        },
        {
            id: 14,
            name: "Cámara de Seguridad WiFi 1080p",
            image: "https://picsum.photos/seed/Camara/400/400",
            price: 95000,
            oldPrice: 150000,
            rating: 4.5,
            sales: "8K+",
            badge: "Solo hay 50",
            hasVideo: true
        },
        {
            id: 15,
            name: "Mochila Antirrobo para Portátil",
            image: "https://picsum.photos/seed/Mochila/400/400",
            price: 120000,
            oldPrice: 200000,
            rating: 4.8,
            sales: "15K+",
            badge: "Mejor Calificado",
            hasVideo: false
        },
        {
            id: 16,
            name: "Botella de Agua Inteligente",
            image: "https://picsum.photos/seed/Botella/400/400",
            price: 60000,
            oldPrice: 100000,
            rating: 4.4,
            sales: "5K+",
            badge: "Oferta",
            badgeType: "bf",
            hasVideo: false
        },
        {
            id: 14,
            name: "Cámara de Seguridad WiFi 1080p",
            image: "https://picsum.photos/seed/Camara/400/400",
            price: 95000,
            oldPrice: 150000,
            rating: 4.5,
            sales: "8K+",
            badge: "Solo hay 50",
            hasVideo: true
        },
        {
            id: 17,
            name: "Cargador Inalámbrico Rápido 3 en 1",
            image: "https://picsum.photos/seed/Cargador/400/400",
            price: 85000,
            oldPrice: 140000,
            rating: 4.7,
            sales: "10K+",
            badge: "BLACK FRIDAY",
            badgeType: "bf",
            hasVideo: true
        },
        {
            id: 18,
            name: "Mini Proyector Portátil Full HD",
            image: "https://picsum.photos/seed/Proyector/400/400",
            price: 350000,
            oldPrice: 500000,
            rating: 4.6,
            sales: "7K+",
            badge: "Mejor Calificado",
            hasVideo: true
        },
        {
            id: 15,
            name: "Mochila Antirrobo para Portátil",
            image: "https://picsum.photos/seed/Mochila/400/400",
            price: 120000,
            oldPrice: 200000,
            rating: 4.8,
            sales: "15K+",
            badge: "Mejor Calificado",
            hasVideo: false
        },
        {
            id: 19,
            name: "Freidora de Aire Digital 5.5L",
            image: "https://picsum.photos/seed/Freidora/400/400",
            price: 280000,
            oldPrice: 450000,
            rating: 4.9,
            sales: "30K+",
            badge: "Más Vendido",
            brand: "Philips",
            hasVideo: false
        },
        {
            id: 1,
            name: "Altavoces Inalámbricos Portátiles",
            image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
            price: 89344,
            oldPrice: 268598,
            rating: 5,
            sales: "14K+",
            badge: "Mejor Calificado",
            brand: "XIAOMI",
            hasVideo: false
        }
    ];

    /**
     * @const {Array<Object>} initialCartItems
     * @description Un array de objetos de productos para pre-poblar el carrito para demostración.
     */
    const initialCartItems = [
        {
            id: 7,
            name: "Adaptador de Audio USB-C a 3.5mm",
            image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
            variant: "Interfaz Roja/1 pieza",
            price: 5108,
            oldPrice: 11544,
            badge: "Black Friday",
            badgeType: "bf",
            stock: "Red head 1pcs",
            quantity: 1
        },
        {
            id: 8,
            name: "Plantillas Autoadhesivas Gruesas para el talón",
            image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
            variant: "1 par de negro",
            price: 4016,
            oldPrice: 50406,
            badge: "Mega oferta",
            badgeType: "mega",
            quantity: 1
        },
        {
            id: 9,
            name: "Heyword Brand 1pc H4 BA20D P15d",
            image: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&h=400&fit=crop",
            variant: "H4",
            price: 10895,
            oldPrice: 15497,
            badge: "BLACK FRIDAY",
            badgeType: "bf",
            stock: "solo 163 disponibles",
            quantity: 1
        }
    ];

    /**
     * @let {Array<Object>} cart
     * @description El estado principal del carrito de compras. Inicializado con artículos de demostración.
     * @security Al estar dentro de una IIFE, esta variable no es accesible directamente desde la consola del navegador.
     */
    let cart = [...initialCartItems];

    /**
     * @let {Array<number>} selectedItems
     * @description Un array de índices correspondientes a los artículos en el array `cart` que están seleccionados.
     */
    let selectedItems = cart.map((_, index) => index); // Seleccionar todos los artículos iniciales por defecto

    // ===================================================================
    // 2. FUNCIONES DE UTILIDAD
    // ===================================================================

    /**
     * Formatea un número a la moneda de Peso Colombiano (COP).
     * @param {number} price - El precio a formatear.
     * @returns {string} El precio formateado como string (ej. "$5.108").
     */
    function formatPrice(price) {
        // Se asegura de que el precio sea un número antes de formatearlo.
        if (typeof price !== 'number') {
            console.error("formatPrice esperaba un número, pero recibió:", price);
            return '$0';
        }
        return '$' + price.toLocaleString('es-CO');
    }

    /**
     * Muestra una notificación temporal en la parte superior de la pantalla.
     * @param {string} message - El mensaje a mostrar.
     */
    function showNotification(message) {
        // Elimina cualquier notificación existente para evitar duplicados.
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message; // Usar textContent es más seguro que innerHTML.
        document.body.appendChild(notification);

        // Anima la salida y elimina la notificación después de un tiempo.
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    /**
     * Crea un icono de Font Awesome de forma segura.
     * @param {Array<string>} classes - Un array de clases para el icono (ej. ['fas', 'fa-star']).
     * @returns {HTMLElement} El elemento <i> del icono.
     */
    function createIcon(classes) {
        const icon = document.createElement('i');
        icon.classList.add(...classes);
        return icon;
    }


    // ===================================================================
    // 3. FUNCIONES DE RENDERIZADO DE VISTAS (A PRUEBA DE XSS)
    // ===================================================================

    /**
     * Renderiza la cuadrícula de productos en el DOM.
     * Esta función construye elementos del DOM programáticamente para prevenir vulnerabilidades XSS.
     */
    function renderProducts() {
        const grid = document.getElementById('productGrid');
        if (!grid) return;
        grid.innerHTML = ''; // Limpia los productos existentes.

        allProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const imageContainer = document.createElement('div');
            imageContainer.style.position = 'relative';
            const image = document.createElement('img');
            image.src = product.image;
            image.alt = product.name;
            image.className = 'product-image';
            imageContainer.appendChild(image);

            if (product.hasVideo) {
                const videoIcon = document.createElement('div');
                videoIcon.className = 'product-video-icon';
                videoIcon.appendChild(createIcon(['fas', 'fa-play'])); // Creación segura de icono
                imageContainer.appendChild(videoIcon);
            }
            card.appendChild(imageContainer);

            const info = document.createElement('div');
            info.className = 'product-info';

            if (product.brand) {
                const brand = document.createElement('div');
                brand.className = 'brand';
                brand.textContent = `Marca: ${product.brand}`;
                info.appendChild(brand);
            }

            if (product.badge) {
                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'badge-container';
                const badge = document.createElement('span');
                badge.className = `badge ${product.badgeType === 'bf' ? 'badge-bf' : 'badge-stock'}`;
                badge.textContent = product.badge;
                badgeContainer.appendChild(badge);
                info.appendChild(badgeContainer);
            }

            const title = document.createElement('div');
            title.className = 'product-title';
            title.textContent = product.name;
            info.appendChild(title);

            const rating = document.createElement('div');
            rating.className = 'rating';
            const stars = document.createElement('span');
            stars.className = 'stars';
            
            // Creación segura de estrellas
            const fullStars = Math.floor(product.rating);
            const halfStar = product.rating % 1 !== 0;
            for (let i = 0; i < fullStars; i++) {
                stars.appendChild(createIcon(['fas', 'fa-star', 'star-filled']));
            }
            if (halfStar) {
                stars.appendChild(createIcon(['fas', 'fa-star-half-alt', 'star-filled']));
            }
            rating.appendChild(stars);

            rating.appendChild(createIcon(['fas', 'fa-fire', 'fire-icon']));

            const sales = document.createElement('span');
            sales.className = 'sales';
            sales.textContent = `${product.sales} ventas`;
            rating.appendChild(sales);
            info.appendChild(rating);

            const priceContainer = document.createElement('div');
            priceContainer.className = 'price-container';
            const currentPrice = document.createElement('span');
            currentPrice.className = 'current-price';
            currentPrice.textContent = formatPrice(product.price);
            priceContainer.appendChild(currentPrice);
            const oldPrice = document.createElement('span');
            oldPrice.className = 'old-price';
            oldPrice.textContent = formatPrice(product.oldPrice);
            priceContainer.appendChild(oldPrice);
            info.appendChild(priceContainer);

            const addToCartBtn = document.createElement('button');
            addToCartBtn.className = 'add-to-cart';
            addToCartBtn.title = 'Añadir al carrito';
            addToCartBtn.onclick = () => addToCart(product.id);
            addToCartBtn.appendChild(createIcon(['fas', 'fa-shopping-cart'])); // Creación segura de icono
            info.appendChild(addToCartBtn);

            card.appendChild(info);
            grid.appendChild(card);
        });
    }

    /**
     * Renderiza los artículos en el carrito de compras en el DOM.
     * Construye el DOM de forma segura para evitar XSS.
     */
    function renderCartItems() {
        const container = document.getElementById('cartItemsList');
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        if (!container || !selectAllCheckbox) return;
        
        container.innerHTML = ''; // Limpiar artículos existentes

        if (cart.length === 0) {
            const emptyCartDiv = document.createElement('div');
            emptyCartDiv.className = 'empty-cart';
            emptyCartDiv.appendChild(createIcon(['fas', 'fa-shopping-cart']));
            const emptyText = document.createElement('p');
            emptyText.textContent = 'Tu carrito está vacío';
            emptyCartDiv.appendChild(emptyText);
            container.appendChild(emptyCartDiv);
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                // Checkbox
                const itemCheckboxContainer = document.createElement('div');
                itemCheckboxContainer.className = 'item-checkbox';
                const checkbox = document.createElement('div');
                checkbox.className = `checkbox ${selectedItems.includes(index) ? 'checked' : ''}`;
                checkbox.onclick = () => toggleItem(index);
                checkbox.appendChild(createIcon(['fas', 'fa-check']));
                itemCheckboxContainer.appendChild(checkbox);
                cartItem.appendChild(itemCheckboxContainer);

                // Imagen
                const imageContainer = document.createElement('div');
                imageContainer.style.position = 'relative';
                const image = document.createElement('img');
                image.src = item.image;
                image.alt = item.name;
                image.className = 'item-image';
                imageContainer.appendChild(image);
                if (item.stock) {
                    const stockBadge = document.createElement('div');
                    stockBadge.className = 'stock-badge';
                    stockBadge.textContent = item.stock;
                    imageContainer.appendChild(stockBadge);
                }
                cartItem.appendChild(imageContainer);

                // Detalles
                const itemDetails = document.createElement('div');
                itemDetails.className = 'item-details';
                
                const title = document.createElement('div');
                title.className = 'item-title';
                title.textContent = item.name;
                itemDetails.appendChild(title);

                const variant = document.createElement('div');
                variant.className = 'item-variant';
                variant.textContent = item.variant;
                const variantIcon = createIcon(['fas', 'fa-chevron-down']);
                variantIcon.style.fontSize = '10px';
                variant.appendChild(variantIcon);
                itemDetails.appendChild(variant);

                if (item.badge) {
                    const badge = document.createElement('div');
                    badge.className = `item-label ${item.badgeType}`;
                    badge.textContent = item.badge;
                    itemDetails.appendChild(badge);
                }

                // Fila de precios
                const priceRow = document.createElement('div');
                priceRow.className = 'item-price-row';
                const itemPrice = document.createElement('div');
                itemPrice.className = 'item-price';
                const currentPrice = document.createElement('span');
                currentPrice.className = 'current-price';
                currentPrice.textContent = formatPrice(item.price);
                itemPrice.appendChild(currentPrice);
                const oldPrice = document.createElement('span');
                oldPrice.className = 'old-price';
                oldPrice.textContent = formatPrice(item.oldPrice);
                itemPrice.appendChild(oldPrice);
                priceRow.appendChild(itemPrice);

                // Selector de cantidad
                const quantitySelector = document.createElement('div');
                quantitySelector.className = 'quantity-selector';
                const minusBtn = document.createElement('button');
                minusBtn.className = 'qty-btn';
                minusBtn.textContent = '−';
                minusBtn.onclick = () => changeQty(index, -1);
                quantitySelector.appendChild(minusBtn);

                const qtyDisplay = document.createElement('div');
                qtyDisplay.className = 'qty-display';
                qtyDisplay.textContent = item.quantity;
                quantitySelector.appendChild(qtyDisplay);

                const plusBtn = document.createElement('button');
                plusBtn.className = 'qty-btn';
                plusBtn.textContent = '+';
                plusBtn.onclick = () => changeQty(index, 1);
                quantitySelector.appendChild(plusBtn);
                
                const downIcon = createIcon(['fas', 'fa-chevron-down']);
                downIcon.style.padding = '0 8px';
                downIcon.style.fontSize = '10px';
                downIcon.style.color = '#999';
                quantitySelector.appendChild(downIcon);

                priceRow.appendChild(quantitySelector);
                itemDetails.appendChild(priceRow);
                cartItem.appendChild(itemDetails);

                // Botón de eliminar
                const deleteBtn = document.createElement('div');
                deleteBtn.className = 'delete-btn';
                deleteBtn.onclick = () => removeItem(index);
                deleteBtn.appendChild(createIcon(['fas', 'fa-trash-alt']));
                cartItem.appendChild(deleteBtn);

                container.appendChild(cartItem);
            });
        }

        // Actualizar el estado del checkbox "Seleccionar todos"
        if (selectedItems.length === cart.length && cart.length > 0) {
            selectAllCheckbox.classList.add('checked');
        } else {
            selectAllCheckbox.classList.remove('checked');
        }

        updateTotals();
        updateCartCounts();
    }


    // ===================================================================
    // 4. LÓGICA Y ACCIONES DEL CARRITO
    // ===================================================================

    /**
     * Añade un producto al carrito o incrementa su cantidad si ya existe.
     * @param {number} productId - El ID del producto a añadir.
     * @security Se valida que el ID del producto sea válido y exista.
     */
    function addToCart(productId) {
        // Validación de entrada
        if (typeof productId !== 'number') {
            console.error("ID de producto inválido:", productId);
            return;
        }
        
        const product = allProducts.find(p => p.id === productId);
        if (!product) {
            console.error("Producto no encontrado con ID:", productId);
            return;
        }

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            // Usar spread syntax para no mutar el objeto original `allProducts`
            cart.push({...product, quantity: 1, variant: 'Estándar'});
        }

        updateCartCounts();
        showNotification('Producto añadido al carrito');
        renderCartItems(); 
    }

    /**
     * Añade todos los productos de la lista principal al carrito si aún no están allí.
     */
    function addAllToCart() {
        allProducts.forEach(product => {
            const existingItem = cart.find(item => item.id === product.id);
            if (!existingItem) {
                cart.push({...product, quantity: 1, variant: 'Estándar'});
            }
        });
        updateCartCounts();
        showNotification('Todos los productos añadidos al carrito');
        renderCartItems();
    }

    /**
     * Alterna el estado de selección de todos los artículos en el carrito.
     */
    function toggleSelectAll() {
        if (selectedItems.length === cart.length) {
            selectedItems = []; // Deseleccionar todos
        } else {
            selectedItems = cart.map((_, i) => i); // Seleccionar todos
        }
        renderCartItems();
    }

    /**
     * Alterna el estado de selección de un solo artículo en el carrito.
     * @param {number} index - El índice del artículo en el array del carrito.
     */
    function toggleItem(index) {
        const pos = selectedItems.indexOf(index);
        if (pos > -1) {
            selectedItems.splice(pos, 1); // Quitar si ya está seleccionado
        } else {
            selectedItems.push(index); // Añadir si no está seleccionado
        }
        renderCartItems();
    }

    /**
     * Cambia la cantidad de un artículo del carrito.
     * @param {number} index - El índice del artículo en el array del carrito.
     * @param {number} change - La cantidad a cambiar (ej. 1 o -1).
     * @security Valida que el índice y la cantidad sean números válidos.
     */
    function changeQty(index, change) {
        // Validación de entradas
        if (typeof index !== 'number' || index < 0 || index >= cart.length) {
            console.error("Índice de carrito inválido:", index);
            return;
        }
        if (typeof change !== 'number') {
            console.error("El cambio de cantidad debe ser un número:", change);
            return;
        }

        const item = cart[index];
        const currentQuantity = parseInt(item.quantity, 10) || 1;
        const newQuantity = currentQuantity + change;

        if (newQuantity < 1) {
            removeItem(index); // Eliminar artículo si la cantidad es menor a 1
        } else {
            item.quantity = newQuantity;
            renderCartItems();
        }
    }

    /**
     * Elimina un artículo del carrito en un índice específico.
     * @param {number} index - El índice del artículo a eliminar.
     */
    function removeItem(index) {
        cart.splice(index, 1);
        // Ajustar el array de `selectedItems` para reflejar la eliminación
        selectedItems = selectedItems.filter(i => i !== index).map(i => i > index ? i - 1 : i);
        renderCartItems();
    }

    /**
     * Actualiza los precios totales y subtotales que se muestran en la barra de pago.
     * @security El cálculo se basa en los datos del carrito local, no en el DOM.
     */
    function updateTotals() {
        let total = 0;
        let oldTotal = 0;
        
        selectedItems.forEach(index => {
            const item = cart[index];
            if(item) { // Asegurarse de que el artículo exista
                total += item.price * item.quantity;
                oldTotal += item.oldPrice * item.quantity;
            }
        });

        document.getElementById('totalCurrent').textContent = formatPrice(total);
        document.getElementById('totalOld').textContent = formatPrice(oldTotal);
        document.getElementById('checkoutCount').textContent = selectedItems.length;
        
        const discount = oldTotal > 0 ? ((1 - total / oldTotal) * 100).toFixed(1) : 0;
        const discountLabel = document.querySelector('#cartCheckoutBar .discount-label');
        if(discountLabel) {
            discountLabel.textContent = `-${discount}% tiempo limitado`;
        }
    }

    // ===================================================================
    // 5. GESTIÓN DE UI Y VISTAS
    // ===================================================================

    /**
     * Actualiza los contadores del carrito en la interfaz de usuario.
     */
    function updateCartCounts() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('topCartCount').textContent = totalItems;
        document.getElementById('cartItemCount').textContent = cart.length;

        // Actualizar también el contador del nuevo carrito flotante
        const floatingCartBadge = document.getElementById('floatingCartBadge');
        if (floatingCartBadge) {
            floatingCartBadge.textContent = totalItems;
        }
    }

    /**
     * Alterna la visibilidad entre la vista de productos y la vista del carrito.
     */
    function toggleView() {
        const cartView = document.getElementById('cartView');
        const productsView = document.getElementById('productsView');
        const backBtn = document.querySelector('.back-btn');
        const productsBottomBar = document.getElementById('productsBottomBar');
        const cartCheckoutBar = document.getElementById('cartCheckoutBar');
        
        const isCartVisible = cartView.style.display !== 'none';

        if (isCartVisible) {
            // Cambiar a la Vista de Productos
            cartView.style.display = 'none';
            productsView.style.display = 'block';
            backBtn.style.display = 'none';
            productsBottomBar.style.display = 'block';
            cartCheckoutBar.style.display = 'none';
        } else {
            // Cambiar a la Vista de Carrito
            cartView.style.display = 'block';
            productsView.style.display = 'none';
            backBtn.style.display = 'block';
            productsBottomBar.style.display = 'none';
            cartCheckoutBar.style.display = 'block';
            renderCartItems(); // Re-renderizar el carrito para asegurar que esté actualizado
        }
    }

    /**
     * Inicializa la funcionalidad de arrastrar para el carrito flotante.
     * Distingue entre un clic (para abrir el carrito) y un arrastre (para moverlo).
     */
    function initDraggableCart() {
        const floatingCart = document.getElementById('floatingCart');
        if (!floatingCart) return;

        let isDragging = false;
        let hasMoved = false;
        let offsetX, offsetY;

        // Función para manejar el inicio del arrastre (mouse y touch)
        function dragStart(e) {
            isDragging = true;
            hasMoved = false;
            floatingCart.querySelector('.floating-cart-icon').classList.add('grabbing');

            const rect = floatingCart.getBoundingClientRect();
            // Determinar las coordenadas del evento (mouse o touch)
            const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;

            offsetX = clientX - rect.left;
            offsetY = clientY - rect.top;

            // Prevenir la selección de texto mientras se arrastra
            document.body.style.userSelect = 'none';
        }

        // Función para manejar el movimiento (mouse y touch)
        function dragMove(e) {
            if (!isDragging) return;

            e.preventDefault(); // Prevenir el scroll en dispositivos táctiles
            hasMoved = true;

            const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
            const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

            let newX = clientX - offsetX;
            let newY = clientY - offsetY;

            // Limitar el movimiento dentro de la ventana visible
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const elemWidth = floatingCart.offsetWidth;
            const elemHeight = floatingCart.offsetHeight;

            newX = Math.max(0, Math.min(newX, viewportWidth - elemWidth));
            newY = Math.max(0, Math.min(newY, viewportHeight - elemHeight));

            floatingCart.style.left = `${newX}px`;
            floatingCart.style.top = `${newY}px`;
            // Eliminar las propiedades 'bottom' y 'right' para que 'top' y 'left' tomen el control
            floatingCart.style.bottom = 'auto';
            floatingCart.style.right = 'auto';
        }

        // Función para manejar el final del arrastre (mouse y touch)
        function dragEnd() {
            isDragging = false;
            floatingCart.querySelector('.floating-cart-icon').classList.remove('grabbing');
            document.body.style.userSelect = 'auto';

            // Si no se movió, se considera un clic
            if (!hasMoved) {
                const cartView = document.getElementById('cartView');
                const isCartVisible = cartView && cartView.style.display !== 'none';
                
                // Solo abrir la vista del carrito si no está ya visible.
                // Si ya está visible, el clic no hace nada.
                if (!isCartVisible) {
                    toggleView();
                }
            }
        }

        // Asignar los eventos
        floatingCart.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);

        floatingCart.addEventListener('touchstart', dragStart, { passive: false });
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('touchend', dragEnd);
    }

    /**
     * Simula el proceso de pago.
     * @security Recalcula el total de forma segura desde los datos del carrito antes de mostrar la notificación.
     *           En una aplicación real, este es el punto donde se debe enviar la información a un servidor seguro.
     */
    function checkout() {
        if (selectedItems.length === 0) {
            showNotification('Selecciona al menos un producto para hacer el pedido');
            return;
        }
        
        // Recalcular el total de forma segura desde los datos del carrito
        let total = 0;
        const itemsToCheckout = selectedItems.map(index => {
            const item = cart[index];
            total += item.price * item.quantity;
            return { id: item.id, quantity: item.quantity, price: item.price };
        });

        showNotification(`¡Pedido procesado! Total: ${formatPrice(total)}`);

        // **Punto Crítico de Seguridad**: En una aplicación real, aquí es donde enviarías
        // los `itemsToCheckout` a tu backend para una validación y procesamiento seguros.
        // El servidor NUNCA debe confiar en el `total` calculado en el cliente.
        /*
        fetch('/api/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: itemsToCheckout })
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
        })
        .catch(error => {
            console.error('Error en el checkout:', error);
            showNotification('Hubo un error al procesar tu pedido.');
        });
        */
    }

    /**
     * Cierra el banner promocional superior.
     */
    function closeBanner() {
        const banner = document.getElementById('appBanner');
        if (banner) {
            banner.style.display = 'none';
        }
    }

    // ===================================================================
    // 6. INICIALIZACIÓN Y EXPOSICIÓN DE FUNCIONES
    // ===================================================================
    
    /**
     * Expone funciones al ámbito global para que puedan ser llamadas desde el HTML (onclick).
     * @security Es una práctica necesaria para este tipo de arquitectura simple, pero en frameworks
     *           modernos (React, Vue, Angular), esto se maneja con un sistema de eventos más seguro.
     */
    function exposeFunctionsToGlobal() {
        window.toggleView = toggleView;
        window.closeBanner = closeBanner;
        window.showNotification = showNotification;
        window.toggleSelectAll = toggleSelectAll;
        window.addAllToCart = addAllToCart;
        window.checkout = checkout;
        // Las funciones que necesitan parámetros (como addToCart, toggleItem, etc.)
        // se asignan directamente en el renderizado y no necesitan ser globales.
    }

    /**
     * Configura la aplicación cuando el DOM está completamente cargado.
     */
    document.addEventListener('DOMContentLoaded', () => {
        exposeFunctionsToGlobal();
        renderProducts();
        renderCartItems();
        initDraggableCart(); // Activar el carrito arrastrable
    });

})(); // Fin de la IIFE