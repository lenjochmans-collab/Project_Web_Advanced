const STORAGE_KEY = 'movieDatabase_favorites';
let displayMoviesFunc = null;
let loadMoviesFunc = null;

export function initFavorites() {
    console.log('Favorites initialiseren...');
    const favBtn = document.getElementById('favoritesDropdown');
    if (favBtn) favBtn.addEventListener('click', viewFavorites);
    displayFavoritesList();
}

export function setUIFunctions(displayMovies, loadMovies) {
    displayMoviesFunc = displayMovies;
    loadMoviesFunc = loadMovies;
}

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

export function removeFavorite(movieId) {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav.id !== movieId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    console.log('Film verwijderd uit favorieten');
    displayFavoritesList();
}

export function getFavorites() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function isFavorite(movieId) {
    return getFavorites().some(fav => fav.id === movieId);
}

function displayFavoritesList() {
    const favoritesList = document.getElementById('favoritesList');
    const favorites = getFavorites();
    if (!favoritesList) return;
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
    document.querySelectorAll('.remove-favorite').forEach(btn => {
        btn.addEventListener('click', (e) => {
            removeFavorite(parseInt(e.target.dataset.id));
        });
    });
}

async function viewFavorites() {
    console.log('Favorieten weergeven...');
    const favorites = getFavorites();
    if (favorites.length === 0) {
        alert('Je hebt nog geen favoriete films!');
        return;
    }
    if (displayMoviesFunc) {
        displayMoviesFunc(favorites);
    } else {
        const { displayMovies } = await import('./ui.js');
        displayMovies(favorites);
    }
}

function clearFavorites() {
    if (confirm('Weet je zeker dat je alle favorieten wilt verwijderen?')) {
        localStorage.removeItem(STORAGE_KEY);
        console.log('Alle favorieten gewist');
        displayFavoritesList();
        if (loadMoviesFunc) {
            loadMoviesFunc();
        } else {
            import('./ui.js').then(({ loadMovies }) => loadMovies());
        }
    }
}

export { displayFavoritesList, viewFavorites, clearFavorites };
