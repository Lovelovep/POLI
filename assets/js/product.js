// ==========================================
// СКРИПТ СТРАНИЦЫ ТОВАРА
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // === ГАЛЕРЕЯ ТОВАРА ===
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    const thumbnailsList = document.getElementById('thumbnailsList');
    const thumbUp = document.querySelector('.thumb-up');
    const thumbDown = document.querySelector('.thumb-down');
    
    // Обработчик клика по превью
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Убираем активный класс со всех превью
            thumbnails.forEach(t => t.classList.remove('active'));
            // Добавляем активный класс нажатому превью
            this.classList.add('active');
            
            // Получаем путь к БОЛЬШОЙ качественной картинке
            const mainImageSrc = this.getAttribute('data-main');
            
            // Меняем главное изображение на HD версию
            if (mainImageSrc) {
                mainImage.src = mainImageSrc;
            }
        });
    });
    
    // Прокрутка превью вверх/вниз
    if (thumbUp && thumbDown && thumbnailsList) {
        thumbUp.addEventListener('click', function() {
            thumbnailsList.scrollTop -= 100;
        });
        
        thumbDown.addEventListener('click', function() {
            thumbnailsList.scrollTop += 100;
        });
    }
    
    // === ВЫБОР РАЗМЕРА ===
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // === ХАРАКТЕРИСТИКИ ===
    const showAllCharacteristics = document.getElementById('showAllCharacteristics');
    const characteristicsList = document.getElementById('characteristicsList');
    
    if (showAllCharacteristics && characteristicsList) {
        showAllCharacteristics.addEventListener('click', function() {
            characteristicsList.classList.toggle('expanded');
            
            if (characteristicsList.classList.contains('expanded')) {
                this.textContent = 'Скрыть характеристики';
            } else {
                this.textContent = 'Все характеристики';
            }
        });
    }
    
    // === КАТАЛОГ ===
    const catalogBtn = document.getElementById('catalogBtn');
    const catalogDropdown = document.getElementById('catalogDropdown');
    const closeCatalogDropdown = document.getElementById('closeCatalogDropdown');
    
    if (catalogBtn && catalogDropdown) {
        catalogBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            catalogDropdown.classList.toggle('active');
        });
        
        if (closeCatalogDropdown) {
            closeCatalogDropdown.addEventListener('click', function() {
                catalogDropdown.classList.remove('active');
            });
        }
        
        document.addEventListener('click', function(e) {
            if (!catalogDropdown.contains(e.target) && e.target !== catalogBtn) {
                catalogDropdown.classList.remove('active');
            }
        });
    }
    
    // === МОДАЛЬНОЕ ОКНО ВХОДА ===
    const loginLink = document.getElementById('loginLink');
    const loginOverlay = document.getElementById('loginOverlay');
    const loginClose = document.getElementById('loginClose');
    
    if (loginLink && loginOverlay) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (loginClose && loginOverlay) {
        loginClose.addEventListener('click', function() {
            loginOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (loginOverlay) {
        loginOverlay.addEventListener('click', function(e) {
            if (e.target === loginOverlay) {
                loginOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // === КНОПКИ ДЕЙСТВИЙ ===
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    const addToFavoritesBtn = document.querySelector('.btn-add-to-favorites');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const activeSize = document.querySelector('.size-btn.active');
            if (!activeSize) {
                alert('Пожалуйста, выберите размер');
                return;
            }
        });
    }
    
    if (addToFavoritesBtn) {
        addToFavoritesBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.background = '#ffe0e0';
                this.style.color = '#ff3333';
                alert('Добавлено в избранное!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = '#f0f4ff';
                this.style.color = '#0022ff';
            }
        });
    }
    
    // === ЗАГРУЗКА ОТЗЫВОВ ===
    const loadMoreReviews = document.querySelector('.load-more-reviews');
    
    if (loadMoreReviews) {
        loadMoreReviews.addEventListener('click', function() {
            alert('Загрузка всех отзывов...');
        });
    }
});