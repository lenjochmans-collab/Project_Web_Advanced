/**
 * Favorites Module
 * Handles favorite movies storage with LocalStorage
 */

const STORAGE_KEY = 'movieDatabase_favorites';
let displayMoviesFunc = null;
let loadMoviesFunc = null;
let viewingFavorites = false;

/**
 * Initialize favorites module
 */
export function initFavorites() {
    console.log('Initializing favorites...');

    // Event listener for star button
    const favBtn = document.getElementById('favoritesBtn');
    if (favBtn) {
        favBtn.addEventListener('click', toggleFavoritesView);
    }
}

/**
 * Set UI functions (to avoid circular imports)
 */
export function setUIFunctions(displayMovies, loadMovies) {
    displayMoviesFunc = displayMovies;
    loadMoviesFunc = loadMovies;
}

/**
 * Toggle favorites view
 */
function toggleFavoritesView() {
    const favBtn = document.getElementById('favoritesBtn');
    
    if (viewingFavorites) {
        // Return to normal view
        viewingFavorites = false;
        favBtn?.classList.remove('active');
        if (loadMoviesFunc) {
            loadMoviesFunc();
        }
    } else {
        // Show favorites
        viewingFavorites = true;
        favBtn?.classList.add('active');
        displayFavorites();
    }
}

/**
 * Display favorites
 */
function displayFavorites() {
    const favorites = getFavorites();
    
    if (displayMoviesFunc) {
        if (favorites.length === 0) {
            const container = document.getElementById('moviesContainer');
            if (container) {
                container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">No favorite movies yet. Add some by clicking the heart icon on movie cards.</div>';
            }
        } else {
            displayMoviesFunc(favorites);
        }
    }
}

/**
 * Add movie to favorites
 * @param {Object} movie - Movie object
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
        console.log('Movie added to favorites:', movie.title);
    }
}

/**
 * Remove movie from favorites
 * @param {number} movieId - Movie ID
 */
export function removeFavorite(movieId) {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav.id !== movieId);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    console.log('Movie removed from favorites');
    
    // If currently viewing favorites, refresh display
    if (viewingFavorites) {
        displayFavorites();
    }
}

/**
 * Get all favorites
 * @returns {Array} Array of favorite movies
 */
export function getFavorites() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

/**
 * Check if movie is favorite
 * @param {number} movieId - Movie ID
 * @returns {boolean} True if favorite, false otherwise
 */
export function isFavorite(movieId) {
    return getFavorites().some(fav => fav.id === movieId);
}

/**
 * Check if currently viewing favorites
 * @returns {boolean} True if viewing favorites
 */
export function isViewingFavorites() {
    return viewingFavorites;

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

    // Use the set function or dynamic import
    if (displayMoviesFunc) {
        displayMoviesFunc(favorites);
    } else {
        const { displayMovies } = await import('./ui.js');
        displayMovies(favorites);
    }
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
        if (loadMoviesFunc) {
            loadMoviesFunc();
        } else {
            import('./ui.js').then(({ loadMovies }) => loadMovies());
        }
    }
}

export { displayFavoritesList, viewFavorites, clearFavorites };
