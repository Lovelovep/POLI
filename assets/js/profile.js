// ==================== ЛИЧНЫЙ КАБИНЕТ ====================

document.addEventListener('DOMContentLoaded', function() {
    
    // Переключение вкладок
    const navLinks = document.querySelectorAll('.profile-nav a:not(.logout-link)');
    const tabs = document.querySelectorAll('.profile-tab');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Скрываем все вкладки
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Показываем нужную вкладку
            const tabId = this.getAttribute('data-tab');
            document.getElementById('tab-' + tabId).classList.add('active');
        });
    });
    
    // Удаление из избранного
    document.querySelectorAll('.btn-remove-fav').forEach(btn => {
        btn.addEventListener('click', function() {
            if(confirm('Удалить товар из избранного?')) {
                this.closest('.favorite-item').remove();
                updateFavoritesCount();
            }
        });
    });
    
    // Обновление счетчика избранного
    function updateFavoritesCount() {
        const count = document.querySelectorAll('.favorite-item').length;
        const counter = document.querySelector('.items-count');
        if(counter) {
            counter.textContent = count + ' ' + getWordForm(count, ['товар', 'товара', 'товаров']);
        }
    }
    
    // Склонение слов
    function getWordForm(number, forms) {
        const cases = [2, 0, 1, 1, 1, 2];
        return forms[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
    }
});

// Редактирование данных
function toggleEdit() {
    const details = document.getElementById('userDetails');
    const form = document.getElementById('editForm');
    
    if(form.style.display === 'none') {
        details.style.display = 'none';
        form.style.display = 'block';
    } else {
        details.style.display = 'block';
        form.style.display = 'none';
    }
}

function saveChanges() {
    alert('Данные успешно сохранены!');
    toggleEdit();
}

function cancelEdit() {
    toggleEdit();
}