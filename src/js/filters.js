/**
 * Filters Module
 * Verzorgt filter functionaliteit
 */

import { getFilteredMovies, getGenres } from './api.js';
import { displayMovies, loadMovies } from './ui.js';

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

    const typeFilter = document.getElementById('typeFilter').value;
    const genreFilter = document.getElementById('genreFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    const ratingFilter = parseFloat(document.getElementById('ratingFilter').value) || 0;
    const sortFilter = document.getElementById('sortFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;

    const filters = {
        type: typeFilter || undefined,
        withGenres: genreFilter || undefined,
        primaryReleaseYear: yearFilter || undefined,
        voteAverageGte: ratingFilter > 0 ? ratingFilter : undefined,
        sortBy: sortFilter || 'popularity',
        withOriginalLanguage: languageFilter || undefined,
        page: 1
    };

    // Verwijder undefined waarden
    Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') {
            delete filters[key];
        }
    });

    console.log('Toegepaste filters:', filters);

    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Films filteren...</div>';

    try {
        // Dynamisch import om circular dependency te voorkomen
        const { setFilters } = await import('./ui.js');
        await setFilters(filters);
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

    document.getElementById('typeFilter').value = '';
    document.getElementById('genreFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('ratingFilter').value = '0';
    document.getElementById('ratingValue').textContent = '0';
    document.getElementById('sortFilter').value = 'popularity';
    document.getElementById('languageFilter').value = '';

    // Laad populaire films opnieuw
    loadMovies();
}

export { applyFilters, resetFilters };
