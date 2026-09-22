// ==================== АДМИН-ПАНЕЛЬ ====================

document.addEventListener('DOMContentLoaded', function() {
    
    // Установка текущей даты
    const dateEl = document.getElementById('adminDate');
    if(dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('ru-RU', options);
    }

    // === ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ===
    const navLinks = document.querySelectorAll('.admin-nav a:not(.logout-link)');
    const tabs = document.querySelectorAll('.admin-tab');
    
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

    // === УПРАВЛЕНИЕ ТОВАРАМИ ===
    
    // Поиск и фильтрация товаров
    window.filterProducts = function() {
        const searchTerm = document.getElementById('productSearch').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const brandFilter = document.getElementById('brandFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        
        const rows = document.querySelectorAll('#productsTableBody tr');
        
        rows.forEach(row => {
            const name = row.cells[2].textContent.toLowerCase();
            const article = row.cells[3].textContent.toLowerCase();
            const category = row.dataset.category;
            const brand = row.dataset.brand;
            const status = row.dataset.status;
            
            const matchesSearch = name.includes(searchTerm) || article.includes(searchTerm);
            const matchesCategory = !categoryFilter || category === categoryFilter;
            const matchesBrand = !brandFilter || brand === brandFilter;
            const matchesStatus = !statusFilter || status === statusFilter;
            
            if (matchesSearch && matchesCategory && matchesBrand && matchesStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };

    // Чекбокс "Выбрать все"
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.product-checkbox');
            checkboxes.forEach(cb => cb.checked = this.checked);
        });
    }

    // === МОДАЛЬНОЕ ОКНО ТОВАРА ===
    
    // Открытие модального окна для добавления
    window.openAddProductModal = function() {
        document.getElementById('modalTitle').textContent = 'Добавить товар';
        document.getElementById('productId').value = '';
        document.getElementById('productForm').reset();
        document.getElementById('productModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Открытие модального окна для редактирования
    window.editProduct = function(id) {
        const row = document.querySelector(`#productsTableBody tr:nth-child(${id})`);
        if (!row) return;
        
        document.getElementById('modalTitle').textContent = 'Редактировать товар';
        document.getElementById('productId').value = id;
        document.getElementById('productName').value = row.cells[2].textContent;
        document.getElementById('productArticle').value = row.cells[3].textContent;
        document.getElementById('productCategory').value = row.dataset.category;
        document.getElementById('productBrand').value = row.dataset.brand;
        document.getElementById('productPrice').value = row.cells[6].textContent.replace(' ₽', '').replace(' ', '');
        document.getElementById('productStatus').value = row.dataset.status;
        
        document.getElementById('productModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Закрытие модального окна
    window.closeProductModal = function() {
        document.getElementById('productModal').classList.remove('active');
        document.body.style.overflow = '';
    };

    // Закрытие по клику вне модального окна
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });

    // Сохранение товара (добавление/редактирование)
    window.saveProduct = function(e) {
        e.preventDefault();
        
        const id = document.getElementById('productId').value;
        const name = document.getElementById('productName').value;
        const article = document.getElementById('productArticle').value;
        const category = document.getElementById('productCategory').value;
        const brand = document.getElementById('productBrand').value;
        const price = document.getElementById('productPrice').value;
        const status = document.getElementById('productStatus').value;
        
        if (id) {
            // Редактирование существующего товара
            const row = document.querySelector(`#productsTableBody tr:nth-child(${id})`);
            if (row) {
                row.cells[2].textContent = name;
                row.cells[3].textContent = article;
                row.cells[4].textContent = getCategoryName(category);
                row.cells[5].textContent = getBrandName(brand);
                row.cells[6].textContent = formatPrice(price);
                row.dataset.category = category;
                row.dataset.brand = brand;
                row.dataset.status = status;
                
                const statusBadge = row.querySelector('.status-badge');
                statusBadge.textContent = status === 'active' ? 'Активен' : 'Неактивен';
                statusBadge.className = `status-badge ${status}`;
            }
            alert('Товар успешно обновлён!');
        } else {
            // Добавление нового товара
            addProductToTable(name, article, category, brand, price, status);
            alert('Товар успешно добавлен!');
        }
        
        closeProductModal();
        filterProducts(); // Обновить фильтр после сохранения
    };

    // Удаление товара
    window.deleteProduct = function(id) {
        if (confirm('Вы уверены, что хотите удалить этот товар?')) {
            const row = document.querySelector(`#productsTableBody tr:nth-child(${id})`);
            if (row) {
                row.remove();
                alert('Товар удалён!');
            }
        }
    };

    // Вспомогательные функции
    function getCategoryName(code) {
        const categories = { shoes: 'Обувь', clothing: 'Одежда', accessories: 'Аксессуары' };
        return categories[code] || code;
    }

    function getBrandName(code) {
        const brands = { nike: 'Nike', adidas: 'Adidas', demix: 'Demix', puma: 'Puma' };
        return brands[code] || code;
    }

    function formatPrice(value) {
        return parseInt(value).toLocaleString('ru-RU') + ' ₽';
    }

    function addProductToTable(name, article, category, brand, price, status) {
        const tbody = document.getElementById('productsTableBody');
        const row = document.createElement('tr');
        row.dataset.category = category;
        row.dataset.brand = brand;
        row.dataset.status = status;
        
        row.innerHTML = `
            <td><input type="checkbox" class="product-checkbox"></td>
            <td><img src="./assets/img/placeholder.png" class="product-thumb" alt="Товар"></td>
            <td>${name}</td>
            <td>${article}</td>
            <td>${getCategoryName(category)}</td>
            <td>${getBrandName(brand)}</td>
            <td>${formatPrice(price)}</td>
            <td><span class="status-badge ${status}">${status === 'active' ? 'Активен' : 'Неактивен'}</span></td>
            <td>
                <button class="btn-action edit" onclick="editProduct(${tbody.children.length + 1})"><i class="fas fa-edit"></i></button>
                <button class="btn-action delete" onclick="deleteProduct(${tbody.children.length + 1})"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tbody.appendChild(row);
    }

    // === ИМИТАЦИЯ ДРУГИХ ДЕЙСТВИЙ ===
    
    // Просмотр заказа
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Открытие карточки заказа...');
        });
    });

    // Экспорт
    const exportBtn = document.querySelector('.btn-export');
    if(exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('Выгрузка отчёта в CSV...');
        });
    }

    // Быстрые действия
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const action = this.querySelector('h3').textContent;
            alert(`Действие: ${action}`);
        });
    });
});