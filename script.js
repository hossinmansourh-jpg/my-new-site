document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langToggle');
    const themeBtn = document.getElementById('themeToggle');
    const englishDiv = document.getElementById('english');
    const arabicDiv = document.getElementById('arabic');
    let currentLang = 'en';
    let currentTheme = 'day';

    // Language toggle
    langBtn.addEventListener('click', () => {
        if (currentLang === 'en') {
            englishDiv.style.display = 'none';
            arabicDiv.style.display = 'block';
            langBtn.textContent = 'EN';
            currentLang = 'ar';
        } else {
            arabicDiv.style.display = 'none';
            englishDiv.style.display = 'block';
            langBtn.textContent = 'AR';
            currentLang = 'en';
        }
    });

    // Theme toggle
    themeBtn.addEventListener('click', () => {
        const body = document.body;
        if (currentTheme === 'day') {
            body.classList.remove('day');
            body.classList.add('night');
            themeBtn.textContent = '☀️';
            currentTheme = 'night';
        } else {
            body.classList.remove('night');
            body.classList.add('day');
            themeBtn.textContent = '🌙';
            currentTheme = 'day';
        }
    });
});