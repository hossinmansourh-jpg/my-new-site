/**
 * Translation data for supported languages.
 * Keys correspond to data-translate attributes in HTML.
 */
const translations = {
    en: {
        title: "Language Switcher Demo",
        welcome: "Welcome to the language switcher example.",
        instruction: "Click the button above to toggle between English and Arabic.",
        toggleBtn: "العربية"
    },
    ar: {
        title: "عرض التبديل بين اللغات",
        welcome: "مرحبًا بك في مثال التبديل بين اللغات.",
        instruction: "انقر الزر أعلاه للتبديل بين الإنجليزية والعربية.",
        toggleBtn: "English"
    }
};

/**
 * Current language state, defaulting to English.
 */
let currentLang = 'en';

/**
 * Update DOM elements with translations for the current language.
 */
function applyTranslations() {
    // Update text for all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // Update button label
    const langToggleBtn = document.getElementById('langToggle');
    langToggleBtn.textContent = translations[currentLang].toggleBtn;

    // Set lang attribute & text direction
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

/**
 * Toggle between available languages.
 */
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyTranslations();
}

// Attach event listener to the toggle button
document.getElementById('langToggle').addEventListener('click', toggleLanguage);

// Initialize with default language on page load
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
});