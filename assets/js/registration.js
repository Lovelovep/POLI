// ==================== РЕГИСТРАЦИЯ ====================

document.addEventListener('DOMContentLoaded', function() {
    
    // Маска для телефона (оставляем для удобства ввода)
    const phoneInput = document.getElementById('phone');
    
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = value.substring(1);
            }
            
            let formatted = '+7';
            
            if (value.length > 0) {
                formatted += ' (' + value.substring(0, 3);
            }
            if (value.length >= 3) {
                formatted += ') ' + value.substring(3, 6);
            }
            if (value.length >= 6) {
                formatted += '-' + value.substring(6, 8);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(8, 10);
            }
            
            e.target.value = formatted;
        }
    });

});

// Обработка отправки формы — ПРОСТО ПЕРЕБРАСЫВАЕТ НА ГЛАВНУЮ
function handleRegister(e) {
    e.preventDefault(); // Отменяем стандартное поведение формы
    
    window.location.href = './profile.html';
    
    return false;
}