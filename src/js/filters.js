/**
 * Filters Module
 * Verzorgt filter functionaliteit
 */

import { getFilteredMovies, getGenres } from './api.js';
import { displayMovies } from './ui.js';

/**
 * Initialiseert filter module
 */
export function initFilters() {
    console.log('Filters initialiseren...');

    // Event listeners
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    // Rating slider
    const ratingFilter = document.getElementById('ratingFilter');
    const ratingValue = document.getElementById('ratingValue');
    ratingFilter.addEventListener('input', (e) => {
        ratingValue.textContent = e.target.value;
    });

    // Load genres
    loadGenres();
}

/**
 * Laadt genres in dropdown
 */
async function loadGenres() {
    try {
        const genres = await getGenres();
        // Genres zijn al hardcoded in HTML, maar dit kan gebruikt worden voor dynamisch laden
        console.log('Genres geladen:', genres);
    } catch (error) {
        console.error('Fout bij laden genres:', error);
    }
}

/**
 * Appliceert geselecteerde filters
 */
async function applyFilters() {
    console.log('Filters toepassen...');

    const filters = {
        withGenres: document.getElementById('genreFilter').value,
        primaryReleaseYear: document.getElementById('yearFilter').value,
        voteAverageGte: document.getElementById('ratingFilter').value,
        sortBy: document.getElementById('sortFilter').value.split('_').join('.'),
        page: 1
    };

    // Verwijder lege waarden
    Object.keys(filters).forEach(key => {
        if (filters[key] === '') {
            delete filters[key];
        }
    });

    console.log('Toegepaste filters:', filters);

    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Films filteren...</div>';

    try {
        const movies = await getFilteredMovies(filters);
        displayMovies(movies);
    } catch (error) {
        console.error('Fout bij filteren:', error);
        container.innerHTML = '<div class="empty-state">Fout bij filteren films.</div>';
    }
}

/**
 * Reset alle filters naar standaardwaarden
 */
function resetFilters() {
    console.log('Filters reset...');

    document.getElementById('genreFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('ratingFilter').value = '0';
    document.getElementById('ratingValue').textContent = '0';
    document.getElementById('sortFilter').value = 'popularity';

    // Laad populaire films opnieuw
    const { loadMovies } = require('./ui.js');
    loadMovies();
}

export { applyFilters, resetFilters };
