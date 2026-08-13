import { searchMovies } from './api.js';
import { displayMovies, loadMovies } from './ui.js';

let searchTimeout;
let searchQuery = '';

export function initSearch() {
    console.log('Search initialiseren...');
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch(searchInput.value);
    });
}

function handleSearch(e) {
    const query = e.target.value.trim();
    clearTimeout(searchTimeout);
    if (query.length < 2) return;
    searchTimeout = setTimeout(() => performSearch(query), 500);
}

async function performSearch(query) {
    if (!query.trim()) return;
    console.log('Zoeken naar:', query);
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Zoeken naar films...</div>';
    try {
        const { setSearchQuery } = await import('./ui.js');
        searchQuery = query;
        await setSearchQuery(query);
    } catch (error) {
        console.error('Fout bij zoeken:', error);
        container.innerHTML = '<div class="empty-state">Fout bij zoeken films.</div>';
    }
}

export { performSearch };
