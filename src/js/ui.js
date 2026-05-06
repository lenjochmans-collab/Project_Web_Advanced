/**
 * UI Module
 * Verzorgt DOM manipulatie en weergave van films
 */

import { getPopularMovies, getPosterUrl } from './api.js';
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';

let currentMovies = [];
let currentView = 'grid';

/**
 * Initialiseert de UI
 */
export async function initUI() {
    console.log('UI initialiseren...');

    // Laad initiële films
    await loadMovies();

    // Event listeners voor view toggle
    document.getElementById('gridViewBtn').addEventListener('click', () => switchView('grid'));
    document.getElementById('listViewBtn').addEventListener('click', () => switchView('list'));
}

/**
 * Laadt films en toont ze
 */
async function loadMovies() {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Films laden...</div>';

    try {
        currentMovies = await getPopularMovies();
        displayMovies(currentMovies);
    } catch (error) {
        console.error('Fout bij laden films:', error);
        container.innerHTML = '<div class="empty-state">Fout bij laden films. Probeer later opnieuw.</div>';
    }
}

/**
 * Toont films in het scherm
 * @param {Array} movies - Array van films om weer te geven
 */
export function displayMovies(movies) {
    const container = document.getElementById('moviesContainer');

    if (!movies || movies.length === 0) {
        container.innerHTML = '<div class="empty-state">Geen films gevonden.</div>';
        return;
    }

    if (currentView === 'grid') {
        container.className = 'movies-grid';
        container.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
    } else {
        container.className = 'movies-list';
        container.innerHTML = movies.map(movie => createMovieRow(movie)).join('');
    }

    attachEventListeners();
}

/**
 * Creëert een filmkaart HTML
 * @param {Object} movie - Film object
 * @returns {string} HTML string voor filmkaart
 */
function createMovieCard(movie) {
    const posterUrl = getPosterUrl(movie.poster_path);
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const overview = movie.overview || 'Geen overzicht beschikbaar';

    return `
        <div class="movie-card" data-id="${movie.id}">
            <div class="movie-poster">
                ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}" loading="lazy">` : '🎬'}
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-rating">
                    <span class="stars">⭐</span>
                    <span>${rating}/10</span>
                </div>
                <div class="movie-year">${year}</div>
                <p class="movie-overview">${overview.substring(0, 100)}...</p>
                <div class="movie-actions">
                    <button class="btn-favorite ${isFavorite(movie.id) ? 'active' : ''}" data-id="${movie.id}">
                        ${isFavorite(movie.id) ? '❤️ Favoriet' : '🤍 Toevoegen'}
                    </button>
                    <button class="btn-details" data-id="${movie.id}">Details</button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Creëert een filmrij HTML (for list view)
 * @param {Object} movie - Film object
 * @returns {string} HTML string voor filmrij
 */
function createMovieRow(movie) {
    const posterUrl = getPosterUrl(movie.poster_path);
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

    return `
        <div class="movie-row" data-id="${movie.id}">
            <div class="movie-row-poster">
                ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 6px;">` : ''}
            </div>
            <div class="movie-row-content">
                <h3 class="movie-row-title">${movie.title}</h3>
                <div class="movie-row-meta">
                    <span>⭐ ${rating}/10</span>
                    <span>${year}</span>
                </div>
            </div>
            <div class="movie-actions" style="margin-left: auto;">
                <button class="btn-favorite ${isFavorite(movie.id) ? 'active' : ''}" data-id="${movie.id}">
                    ${isFavorite(movie.id) ? '❤️' : '🤍'}
                </button>
                <button class="btn-details" data-id="${movie.id}">Details</button>
            </div>
        </div>
    `;
}

/**
 * Hangt event listeners aan filmkaarten
 */
function attachEventListeners() {
    // Favoriet knop
    document.querySelectorAll('.btn-favorite').forEach(btn => {
        btn.addEventListener('click', handleFavoriteClick);
    });

    // Details knop
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', handleDetailsClick);
    });
}

/**
 * Handelt favoriet klik af
 */
function handleFavoriteClick(e) {
    e.stopPropagation();
    const movieId = parseInt(this.dataset.id);
    const movie = currentMovies.find(m => m.id === movieId);

    if (isFavorite(movieId)) {
        removeFavorite(movieId);
        this.classList.remove('active');
        this.textContent = currentView === 'grid' ? '🤍 Toevoegen' : '🤍';
    } else {
        addFavorite(movie);
        this.classList.add('active');
        this.textContent = currentView === 'grid' ? '❤️ Favoriet' : '❤️';
    }
}

/**
 * Handelt details klik af
 */
function handleDetailsClick(e) {
    e.stopPropagation();
    const movieId = parseInt(this.dataset.id);
    const movie = currentMovies.find(m => m.id === movieId);

    if (movie) {
        console.log('Details voor:', movie.title);
        // TODO: Open details modal/pagina
        alert(`Details: ${movie.title}\n\nRating: ${movie.vote_average}\nJaar: ${new Date(movie.release_date).getFullYear()}`);
    }
}

/**
 * Switcht tussen grid en list view
 * @param {string} view - 'grid' of 'list'
 */
function switchView(view) {
    currentView = view;

    // Update buttons
    document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid');
    document.getElementById('listViewBtn').classList.toggle('active', view === 'list');

    // Render films opnieuw
    displayMovies(currentMovies);
}

/**
 * Exporteer loadMovies voor externe gebruik
 */
export { loadMovies };
