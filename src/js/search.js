/**
 * Search Module
 * Verzorgt zoekfunctionaliteit
 */

import { searchMovies } from './api.js';
import { displayMovies } from './ui.js';

let searchTimeout;

/**
 * Initialiseert search module
 */
export function initSearch() {
    console.log('Search initialiseren...');

    const searchInput = document.getElementById('searchInput');

    // Event listeners
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}

/**
 * Handelt search input af met debounce
 */
function handleSearch(e) {
    const query = e.target.value.trim();

    // Debounce: wacht 500ms na het stoppen van typen
    clearTimeout(searchTimeout);

    if (query.length < 2) {
        // Geen zoekopdracht als minder dan 2 karakters
        return;
    }

    searchTimeout = setTimeout(() => {
        performSearch(query);
    }, 500);
}

/**
 * Voert zoekopdracht uit
 * @param {string} query - Zoekterm
 */
async function performSearch(query) {
    if (!query.trim()) return;

    console.log('Zoeken naar:', query);

    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Zoeken naar films...</div>';

    try {
        const movies = await searchMovies(query);
        displayMovies(movies);
    } catch (error) {
        console.error('Fout bij zoeken:', error);
        container.innerHTML = '<div class="empty-state">Fout bij zoeken films.</div>';
    }
}

export { performSearch };
