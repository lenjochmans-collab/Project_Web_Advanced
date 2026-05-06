/**
 * Main entry point for Movie Database Application
 * Imports all modules en initialiseert de applicatie
 */

import { initTheme } from './theme.js';
import { initUI, displayMovies, loadMovies } from './ui.js';
import { initFilters } from './filters.js';
import { initSearch } from './search.js';
import { initFavorites, setUIFunctions } from './favorites.js';

/**
 * Initialiseert alle modules
 */
function init() {
    console.log('🎬 Movie Database applicatie starten...');

    // Thema initialiseren
    initTheme();

    // Favorieten laden en UI functions doorgeven
    initFavorites();
    setUIFunctions(displayMovies, loadMovies);

    // UI initialiseren
    initUI();

    // Filters initialiseren
    initFilters();

    // Zoekfunctie initialiseren
    initSearch();

    console.log('✅ Applicatie gestart!');
}

// Start applicatie als DOM geladen is
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
