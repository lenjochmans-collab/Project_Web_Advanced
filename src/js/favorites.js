/**
 * Favorites Module
 * Verzorgt opslag van favoriete films met LocalStorage
 */

const STORAGE_KEY = 'movieDatabase_favorites';

/**
 * Initialiseert favorites module
 */
export function initFavorites() {
    console.log('Favorites initialiseren...');

    // Event listeners
    document.getElementById('viewFavoritesBtn').addEventListener('click', viewFavorites);
    document.getElementById('clearFavoritesBtn').addEventListener('click', clearFavorites);

    // Load en display favorieten
    displayFavoritesList();
}

/**
 * Voegt film toe aan favorieten
 * @param {Object} movie - Film object
 */
export function addFavorite(movie) {
    const favorites = getFavorites();

    if (!favorites.find(fav => fav.id === movie.id)) {
        favorites.push({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
            release_date: movie.release_date
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        console.log('Film toegevoegd aan favorieten:', movie.title);
        displayFavoritesList();
    }
}

/**
 * Verwijdert film uit favorieten
 * @param {number} movieId - ID van de film
 */
export function removeFavorite(movieId) {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav.id !== movieId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    console.log('Film verwijderd uit favorieten');
    displayFavoritesList();
}

/**
 * Haalt alle favorieten op
 * @returns {Array} Array van favoriete films
 */
export function getFavorites() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

/**
 * Controleert of film favoriet is
 * @param {number} movieId - ID van de film
 * @returns {boolean} True als favoriet, false anders
 */
export function isFavorite(movieId) {
    return getFavorites().some(fav => fav.id === movieId);
}

/**
 * Toont favorieten lijst in sidebar
 */
function displayFavoritesList() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Geen favorieten nog.</p>';
        return;
    }

    favoritesList.innerHTML = favorites.map(movie => `
        <div class="favorite-item">
            <span>${movie.title}</span>
            <button class="remove-favorite" data-id="${movie.id}">✕</button>
        </div>
    `).join('');

    // Event listeners voor verwijderen
    document.querySelectorAll('.remove-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeFavorite(parseInt(e.target.dataset.id));
        });
    });
}

/**
 * Toont alleen favoriete films
 */
async function viewFavorites() {
    console.log('Favorieten weergeven...');

    const favorites = getFavorites();

    if (favorites.length === 0) {
        alert('Je hebt nog geen favoriete films!');
        return;
    }

    // Import displayMovies van ui.js
    const { displayMovies } = await import('./ui.js');
    displayMovies(favorites);
}

/**
 * Wist alle favorieten
 */
function clearFavorites() {
    if (confirm('Weet je zeker dat je alle favorieten wilt verwijderen?')) {
        localStorage.removeItem(STORAGE_KEY);
        console.log('Alle favorieten gewist');
        displayFavoritesList();
        
        // Refresh huidige weergave
        const { loadMovies } = require('./ui.js');
        loadMovies();
    }
}

export { displayFavoritesList, viewFavorites, clearFavorites };
