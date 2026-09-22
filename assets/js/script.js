document.addEventListener('DOMContentLoaded', () => {
    
    const catalogBtn = document.getElementById('catalogBtn');
    const catalogDropdown = document.getElementById('catalogDropdown');
    const closeCatalogDropdown = document.getElementById('closeCatalogDropdown');
    
    if (catalogBtn && catalogDropdown) {
        catalogBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            catalogDropdown.classList.toggle('active');
        });

        if (closeCatalogDropdown) {
            closeCatalogDropdown.addEventListener('click', () => {
                catalogDropdown.classList.remove('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (!catalogDropdown.contains(e.target) && !catalogBtn.contains(e.target)) {
                catalogDropdown.classList.remove('active');
            }
        });
    }
    
    const loginLink = document.querySelector('.login'); 
    const loginOverlay = document.getElementById('loginOverlay');
    const loginClose = document.getElementById('loginClose');
    const modalLoginBtn = document.getElementById('modalLoginBtn');

    if (loginLink && loginOverlay) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            loginOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (loginClose && loginOverlay) {
        loginClose.addEventListener('click', () => {
            loginOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (loginOverlay) {
        loginOverlay.addEventListener('click', (e) => {
            if (e.target === loginOverlay) {
                loginOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        const modalContent = loginOverlay.querySelector('.login-modal');
        if (modalContent) {
            modalContent.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    if (modalLoginBtn) {
        modalLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            window.location.href = './profile.html';
        });
    }
});