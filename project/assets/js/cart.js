// ==================== КОРЗИНА ====================

document.addEventListener('DOMContentLoaded', function() {
    
    // Элементы
    const checkboxes = document.querySelectorAll('.item-select');
    const totalItemsEl = document.getElementById('totalItems');
    const itemsPriceEl = document.getElementById('itemsPrice');
    const discountPriceEl = document.getElementById('discountPrice');
    const totalPriceEl = document.getElementById('totalPrice');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const cartCountEl = document.getElementById('cartCount');
    const clearCartBtn = document.getElementById('clearCart');
    const emptyCartEl = document.getElementById('emptyCart');
    const cartItemsEl = document.querySelector('.cart-items');
    
    // Функция форматирования цены
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
    }
    
    // Подсчет итогов
    function calculateTotals() {
        let totalItems = 0;
        let itemsPrice = 0;
        let discountPrice = 0;
        let checkedItems = 0;
        
        checkboxes.forEach(checkbox => {
            const item = checkbox.closest('.cart-item');
            const price = parseInt(item.dataset.price);
            const discount = parseInt(item.dataset.discount) || 0;
            
            if (checkbox.checked) {
                checkedItems++;
                itemsPrice += price;
                discountPrice += discount;
                totalItems++;
                item.classList.remove('unchecked');
            } else {
                item.classList.add('unchecked');
            }
        });
        
        const totalPrice = itemsPrice - discountPrice;
        
        // Обновление отображения
        totalItemsEl.textContent = totalItems;
        itemsPriceEl.textContent = formatPrice(itemsPrice);
        discountPriceEl.textContent = '-' + formatPrice(discountPrice);
        totalPriceEl.textContent = formatPrice(totalPrice);
        
        // Обновление счетчика товаров
        const totalCartItems = checkboxes.length;
        if (totalCartItems === 1) {
            cartCountEl.textContent = totalCartItems + ' товар';
        } else if (totalCartItems < 5) {
            cartCountEl.textContent = totalCartItems + ' товара';
        } else {
            cartCountEl.textContent = totalCartItems + ' товаров';
        }
        
        // Активация/деактивация кнопки оплаты
        checkoutBtn.disabled = checkedItems === 0;
        
        // Показ пустой корзины
        if (totalCartItems === 0) {
            cartItemsEl.style.display = 'none';
            emptyCartEl.style.display = 'block';
        }
    }
    
    // Обработчики для чекбоксов
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            calculateTotals();
        });
    });
    
    // Очистка корзины
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите очистить корзину?')) {
                checkboxes.forEach(checkbox => {
                    const item = checkbox.closest('.cart-item');
                    item.remove();
                });
                calculateTotals();
            }
        });
    }
    
    // Кнопка оплаты
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const checkedItems = document.querySelectorAll('.item-select:checked');
        });
    }
    
    // Инициализация при загрузке
    calculateTotals();
    
    // Добавление в корзину с других страниц
    // (этот код будет работать при переходе с главной или страницы товара)
    const urlParams = new URLSearchParams(window.location.search);
    const newItem = urlParams.get('add');
    
    if (newItem) {
        // Здесь можно добавить логику добавления товара из URL параметров
        console.log('Добавлен товар:', newItem);
    }
});