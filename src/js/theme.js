/**
 * Theme Module
 * Verzorgt dark/light mode
 */

const THEME_KEY = 'movieDatabase_theme';

/**
 * Initialiseert theme module
 */
export function initTheme() {
    console.log('Theme initialiseren...');

    const themeBtn = document.getElementById('themeToggle');
    
    // Load saved theme
    loadTheme();

    // Event listener
    themeBtn.addEventListener('click', toggleTheme);
}

/**
 * Laadt opgeslagen thema
 */
function loadTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = saved ? saved === 'dark' : prefersDark;

    if (isDark) {
        enableDarkMode();
    } else {
        enableLightMode();
    }
}

/**
 * Schakelt thema uit
 */
function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        enableLightMode();
    } else {
        enableDarkMode();
    }
}

/**
 * Activeer dark mode
 */
function enableDarkMode() {
    document.body.classList.add('dark-mode');
    document.getElementById('themeToggle').textContent = '☀️';
    localStorage.setItem(THEME_KEY, 'dark');
    console.log('Dark mode ingeschakeld');
}

/**
 * Activeer light mode
 */
function enableLightMode() {
    document.body.classList.remove('dark-mode');
    document.getElementById('themeToggle').textContent = '🌙';
    localStorage.setItem(THEME_KEY, 'light');
    console.log('Light mode ingeschakeld');
}

export { toggleTheme, loadTheme };
