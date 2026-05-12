/**
 * Main entry point for Movie Database Application
 * Imports all modules en initialiseert de applicatie
 */

import { initTheme } from './theme.js';
import { initUI, displayMovies, loadMovies } from './ui.js';
import { initFilters } from './filters.js';
import { initSearch } from './search.js';
import { initFavorites, setUIFunctions } from './favorites.js';
import { getPopularMovies, getPosterUrl } from './api.js';

/**
 * Laadt en toont één aanbevolen film
 */
async function loadFeaturedMovie() {
    try {
        const container = document.getElementById('featuredMovieContainer');
        const movies = await getPopularMovies(1);
        
        if (movies.length > 0) {
            const movie = movies[0];
            const posterUrl = getPosterUrl(movie.poster_path);
            const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
            const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
            
            container.innerHTML = `
                <div class="featured-movie-content">
                    <div class="featured-movie-poster">
                        ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}">` : '<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem;">🎬</div>'}
                    </div>
                    <div class="featured-movie-info">
                        <h3 class="featured-movie-title">${movie.title}</h3>
                        <div class="featured-movie-rating">
                            <span>⭐</span>
                            <span>${rating}/10</span>
                        </div>
                        <div class="featured-movie-year">${year}</div>
                        <p class="featured-movie-overview">${movie.overview || 'Geen overzicht beschikbaar'}</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Fout bij laden aanbevolen film:', error);
        document.getElementById('featuredMovieContainer').innerHTML = '<div class="empty-state">Fout bij laden film</div>';
    }
}

/**
 * Initialiseert alle modules
 */
function init() {
    console.log('🎬 Movie Database applicatie starten...');

    // Thema initialiseren
    initTheme();

    // Aanbevolen film laden
    loadFeaturedMovie();

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
