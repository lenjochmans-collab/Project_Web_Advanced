import '../css/style.css';
import { initTheme } from './theme.js';
import { initUI, displayMovies, loadMovies } from './ui.js';
import { initFilters } from './filters.js';
import { initSearch } from './search.js';
import { initFavorites, setUIFunctions } from './favorites.js';

function init() {
    console.log('🎬 Movie Database applicatie starten...');
    initTheme();
    initFavorites();
    setUIFunctions(displayMovies, loadMovies);
    initUI();
    initFilters();
    initSearch();
    console.log('✅ Applicatie gestart!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
