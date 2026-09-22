// ==================== ОФОРМЛЕНИЕ ЗАКАЗА ====================

document.addEventListener('DOMContentLoaded', function() {
    
    // === ВЫБОР ГОРОДА ===
    const cityDropdown = document.getElementById('cityDropdown');
    const citySelected = document.getElementById('citySelected');
    const cityList = document.getElementById('cityList');
    const cityOptions = document.querySelectorAll('.city-option');
    
    // Открыть/закрыть список городов
    citySelected.addEventListener('click', function() {
        cityDropdown.classList.toggle('open');
    });
    
    // Выбор города
    cityOptions.forEach(option => {
        option.addEventListener('click', function() {
            const cityName = this.dataset.city;
            
            // Обновить активный город
            cityOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Обновить отображаемый город
            citySelected.childNodes[0].textContent = cityName + ' ';
            
            // Закрыть список
            cityDropdown.classList.remove('open');
        });
    });
    
    // Закрыть список при клике вне его
    document.addEventListener('click', function(e) {
        if (!cityDropdown.contains(e.target)) {
            cityDropdown.classList.remove('open');
        }
    });
    
    // === ВЫБОР СПОСОБА ДОСТАВКИ ===
    const deliveryCourier = document.getElementById('deliveryCourier');
    const deliveryPickup = document.getElementById('deliveryPickup');
    const addressForm = document.getElementById('addressForm');
    const pickupForm = document.getElementById('pickupForm');
    
    deliveryCourier.addEventListener('click', function() {
        deliveryCourier.classList.add('active');
        deliveryPickup.classList.remove('active');
        addressForm.style.display = 'block';
        pickupForm.style.display = 'none';
    });
    
    deliveryPickup.addEventListener('click', function() {
        deliveryPickup.classList.add('active');
        deliveryCourier.classList.remove('active');
        addressForm.style.display = 'none';
        pickupForm.style.display = 'block';
    });
    
    // === ВЫБОР СПОСОБА ОПЛАТЫ ===
    const paymentOnline = document.getElementById('paymentOnline');
    const paymentCash = document.getElementById('paymentCash');
    
    paymentOnline.addEventListener('click', function() {
        paymentOnline.classList.add('active');
        paymentCash.classList.remove('active');
    });
    
    paymentCash.addEventListener('click', function() {
        paymentCash.classList.add('active');
        paymentOnline.classList.remove('active');
    });
    
    // Сохраняем ссылки для глобального доступа
    window.deliveryCourier = deliveryCourier;
    window.deliveryPickup = deliveryPickup;
    window.paymentOnline = paymentOnline;
    window.paymentCash = paymentCash;
});

// === ПЕРЕХОД МЕЖДУ ШАГАМИ ===
function goToStep(stepNumber) {
    // Скрыть все секции
    document.querySelectorAll('.checkout-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Показать нужную секцию
    document.getElementById('step' + stepNumber).classList.add('active');
    
    // Обновить номера шагов
    document.querySelectorAll('.step-number').forEach((num, index) => {
        if (index + 1 <= stepNumber) {
            num.classList.add('active');
        } else {
            num.classList.remove('active');
        }
    });
    
    // Прокрутка вверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// === ГЕНЕРАЦИЯ КОДА ===
let generatedCodeValue = '';

function generateCode() {
    const codeGroup = document.getElementById('codeGroup');
    const generatedCode = document.getElementById('generatedCode');
    const getCodeBtn = document.getElementById('getCodeBtn');
    
    // Генерация случайного 4-значного кода
    generatedCodeValue = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Показать поле ввода кода
    codeGroup.style.display = 'block';
    generatedCode.textContent = generatedCodeValue;
    
    // Изменить текст кнопки
    getCodeBtn.textContent = 'КОД ОТПРАВЛЕН';
    getCodeBtn.style.background = '#28a745';
    
    // Автоматически ввести код в поле
    document.getElementById('codeInput').value = generatedCodeValue;
    
    // Через 3 секунды скрыть подсказку с кодом
    setTimeout(() => {
        generatedCode.textContent = '';
    }, 3000);
}

// === ОФОРМЛЕНИЕ ЗАКАЗА ===
function placeOrder() {
    // Генерация номера заказа
    const orderNumber = Math.floor(10000 + Math.random() * 90000);
    document.getElementById('orderNumber').textContent = orderNumber;
    
    // Показать модальное окно
    const successOverlay = document.getElementById('successOverlay');
    successOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна при клике на фон
document.getElementById('successOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Переход на главную при клике на кнопку в модальном окне
document.querySelector('.btn-to-main').addEventListener('click', function(e) {
    // Можно добавить очистку корзины здесь
    localStorage.removeItem('cart');
});