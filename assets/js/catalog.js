// ФИЛЬТРАЦИЯ ТОВАРОВ
document.addEventListener('DOMContentLoaded', function() {
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    const resetFilters = document.getElementById('resetFilters');
    const productsCount = document.getElementById('productsCount');
    
    // Функция фильтрации
    function filterProducts() {
        const selectedGenders = Array.from(document.querySelectorAll('input[name="gender"]:checked'))
            .map(cb => cb.value);
        const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
            .map(cb => cb.value);
        const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked'))
            .map(cb => cb.value);
        
        const minPrice = minPriceInput ? parseFloat(minPriceInput.value) || 0 : 0;
        const maxPrice = maxPriceInput ? parseFloat(maxPriceInput.value) || Infinity : Infinity;
        
        const products = document.querySelectorAll('.product-card');
        let visibleCount = 0;
        
        products.forEach(product => {
            const price = parseFloat(product.dataset.price);
            const gender = product.dataset.gender;
            const category = product.dataset.category;
            
            const matchesPrice = price >= minPrice && price <= maxPrice;
            const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(gender) || gender === 'unisex';
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
            
            if (matchesPrice && matchesGender && matchesCategory) {
                product.closest('.product-card-link').style.display = 'block';
                visibleCount++;
            } else {
                product.closest('.product-card-link').style.display = 'none';
            }
        });
        
        if (productsCount) {
            productsCount.textContent = visibleCount;
        }
    }
    
    // Обработчики
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    if (minPriceInput) minPriceInput.addEventListener('input', filterProducts);
    if (maxPriceInput) maxPriceInput.addEventListener('input', filterProducts);
    
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            checkboxes.forEach(cb => cb.checked = false);
            if (minPriceInput) minPriceInput.value = '';
            if (maxPriceInput) maxPriceInput.value = '';
            filterProducts();
        });
    }
    
    // Инициализация
    filterProducts();
    
    // Кнопки "В корзину"
    document.querySelectorAll('.btn-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Товар добавлен в корзину!');
        });
    });
    
    // Избранное
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#ff3333';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '#ccc';
            }
        });
    });
});