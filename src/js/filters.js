/**
 * Filters Module
 * Handles real-time filtering
 */

import { getFilteredMovies, getGenres } from './api.js';
import { displayMovies, loadMovies } from './ui.js';

/**
 * Initialize filter module
 */
export function initFilters() {
    console.log('Initializing filters...');

    // Real-time filter event listeners
    document.getElementById('genreFilter')?.addEventListener('change', applyFilters);
    document.getElementById('yearFilter')?.addEventListener('change', applyFilters);
    document.getElementById('ratingFilter')?.addEventListener('change', applyFilters);
    document.getElementById('sortFilter')?.addEventListener('change', applyFilters);
    document.getElementById('languageFilter')?.addEventListener('change', applyFilters);

    // Load genres
    loadGenres();
}

/**
 * Load genres into dropdown
 */
async function loadGenres() {
    try {
        const genres = await getGenres();
        console.log('Genres loaded:', genres);
    } catch (error) {
        console.error('Error loading genres:', error);
    }
}

/**
 * Apply selected filters (real-time)
 */
async function applyFilters() {
    console.log('Applying filters...');

    const filters = {
        withGenres: document.getElementById('genreFilter').value || '',
        primaryReleaseYear: document.getElementById('yearFilter').value || '',
        voteAverageGte: document.getElementById('ratingFilter').value || 0,
        sortBy: document.getElementById('sortFilter').value || 'popularity',
        withOriginalLanguage: document.getElementById('languageFilter').value || ''
    };

    console.log('Active filters:', filters);

    try {
        // Dynamisch import om circular dependency te voorkomen
        const { setFilters } = await import('./ui.js');
        await setFilters(filters);
    } catch (error) {
        console.error('Error applying filters:', error);
    }
}

/**
 * Get current active filters
 */
export function getActiveFilters() {
    return {
        genre: document.getElementById('genreFilter').value,
        year: document.getElementById('yearFilter').value,
        rating: document.getElementById('ratingFilter').value,
        sort: document.getElementById('sortFilter').value,
        language: document.getElementById('languageFilter').value
    };
}
