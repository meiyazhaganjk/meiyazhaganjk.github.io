document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark / Light Theme Toggle
    const themeToggleBtn = document.getElementById('themeToggle');
    const rootElement = document.documentElement;
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    const savedTheme = localStorage.getItem('theme') || 'light';
    rootElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = rootElement.getAttribute('data-theme');
            const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

            rootElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            updateThemeIcon(nextTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fa-regular fa-sun';
        } else {
            themeIcon.className = 'fa-regular fa-moon';
        }
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // 3. Publications Real-Time Search & Category Filter
    const searchInput = document.getElementById('pubSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const pubCards = document.querySelectorAll('.pub-card');

    if (pubCards.length > 0) {
        let activeCategory = 'all';

        function filterPublications() {
            const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

            pubCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
                const titleText = card.querySelector('.pub-title') ? card.querySelector('.pub-title').textContent.toLowerCase() : '';
                const authorsText = card.querySelector('.pub-authors') ? card.querySelector('.pub-authors').textContent.toLowerCase() : '';
                const journalText = card.querySelector('.pub-journal') ? card.querySelector('.pub-journal').textContent.toLowerCase() : '';
                
                const fullCardText = `${titleText} ${authorsText} ${journalText}`;

                const matchesCategory = (activeCategory === 'all' || category === activeCategory);
                const matchesSearch = query === '' || fullCardText.includes(query);

                if (matchesCategory && matchesSearch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Attach search listeners
        if (searchInput) {
            searchInput.addEventListener('input', filterPublications);
            searchInput.addEventListener('keyup', filterPublications);
            searchInput.addEventListener('search', filterPublications);
        }

        // Attach category button listeners
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-filter') || 'all';
                filterPublications();
            });
        });
    }
});