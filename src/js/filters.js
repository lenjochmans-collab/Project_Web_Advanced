import { getFilteredMovies, getGenres } from './api.js';
import { displayMovies, loadMovies } from './ui.js';

export function initFilters() {
    console.log('Filters initialiseren...');
    document.getElementById('applyFilters').addEventListener('click', applyFilters);
    document.getElementById('resetFilters').addEventListener('click', resetFilters);
    const ratingFilter = document.getElementById('ratingFilter');
    const ratingValue = document.getElementById('ratingValue');
    ratingFilter.addEventListener('input', (e) => {
        ratingValue.textContent = e.target.value;
    });
    loadGenres();
}

async function loadGenres() {
    try {
        const genres = await getGenres();
        console.log('Genres geladen:', genres);
    } catch (error) {
        console.error('Fout bij laden genres:', error);
    }
}

async function applyFilters() {
    console.log('Filters toepassen...');
    const typeFilterEl = document.getElementById('typeFilter');
    const genreFilter = document.getElementById('genreFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    const ratingFilter = parseFloat(document.getElementById('ratingFilter').value) || 0;
    const sortFilter = document.getElementById('sortFilter').value;
    const languageFilter = document.getElementById('languageFilter').value;
    const filters = {
        withGenres: genreFilter || undefined,
        primaryReleaseYear: yearFilter || undefined,
        voteAverageGte: ratingFilter > 0 ? ratingFilter : undefined,
        sortBy: sortFilter || 'popularity',
        withOriginalLanguage: languageFilter || undefined,
        page: 1
    };
    Object.keys(filters).forEach(key => {
        if (filters[key] === undefined || filters[key] === '') delete filters[key];
    });
    console.log('Toegepaste filters:', filters);
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Films filteren...</div>';
    try {
        const { setFilters } = await import('./ui.js');
        await setFilters(filters);
    } catch (error) {
        console.error('Fout bij filteren:', error);
        container.innerHTML = '<div class="empty-state">Fout bij filteren films.</div>';
    }
}

function resetFilters() {
    console.log('Filters reset...');
    const typeFilterEl = document.getElementById('typeFilter');
    const genreFilter = document.getElementById('genreFilter');
    const yearFilter = document.getElementById('yearFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const ratingValue = document.getElementById('ratingValue');
    const sortFilter = document.getElementById('sortFilter');
    const languageFilter = document.getElementById('languageFilter');
    if (genreFilter) genreFilter.value = '';
    if (yearFilter) yearFilter.value = '';
    if (ratingFilter) ratingFilter.value = '0';
    if (ratingValue) ratingValue.textContent = '0';
    if (sortFilter) sortFilter.value = 'popularity';
    if (languageFilter) languageFilter.value = '';
    loadMovies();
}

export { applyFilters, resetFilters };
