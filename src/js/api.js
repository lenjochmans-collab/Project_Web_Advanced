/**
 * TMDB API Module
 * Verzorgt alle API calls naar The Movie Database
 */

const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// API key uit environment variabele
const API_KEY = import.meta.env.VITE_API_KEY || '';

/**
 * Haalt populaire films op
 * @param {number} page - Paginanummer
 * @returns {Promise<Array>} Array van films
 */
export async function getPopularMovies(page = 1) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=nl-NL`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen populaire films:', error);
        return [];
    }
}

/**
 * Haalt best beoordeelde films op
 * @param {number} page - Paginanummer
 * @returns {Promise<Array>} Array van films
 */
export async function getTopRatedMovies(page = 1) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=nl-NL`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen best beoordeelde films:', error);
        return [];
    }
}

/**
 * Zoekt films op titel
 * @param {string} query - Zoekterm
 * @param {number} page - Paginanummer
 * @returns {Promise<Array>} Array van films
 */
export async function searchMovies(query, page = 1) {
    if (!query.trim()) return [];

    try {
        const response = await fetch(
            `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=nl-NL`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij zoeken films:', error);
        return [];
    }
}

/**
 * Haalt genres op
 * @returns {Promise<Array>} Array van genres
 */
export async function getGenres() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=nl-NL`
        );
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Fout bij ophalen genres:', error);
        return [];
    }
}

/**
 * Haalt details van een film op
 * @param {number} movieId - ID van film
 * @returns {Promise<Object>} Film object met details
 */
export async function getMovieDetails(movieId) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=nl-NL`
        );
        return await response.json();
    } catch (error) {
        console.error(`Fout bij ophalen film ${movieId}:`, error);
        return null;
    }
}

/**
 * Haalt films op met filters
 * @param {Object} filters - Object met filterinstellingen
 * @returns {Promise<Array>} Array van gefilterde films
 */
export async function getFilteredMovies(filters = {}) {
    try {
        const params = new URLSearchParams({
            api_key: API_KEY,
            language: 'nl-NL',
            sort_by: `${filters.sortBy || 'popularity'}.desc`,
            page: filters.page || 1
        });

        if (filters.withGenres) {
            params.append('with_genres', filters.withGenres);
        }

        if (filters.primaryReleaseYear) {
            params.append('primary_release_year', filters.primaryReleaseYear);
        }

        if (filters.voteAverageGte) {
            params.append('vote_average.gte', filters.voteAverageGte);
        }

        if (filters.withOriginalLanguage) {
            params.append('with_original_language', filters.withOriginalLanguage);
        }

        const response = await fetch(
            `${API_BASE_URL}/discover/movie?${params.toString()}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen gefilterde films:', error);
        return [];
    }
}

/**
 * Formatteert afbeeldings-URL
 * @param {string} posterPath - Poster pad van TMDB
 * @returns {string} Volledige afbeeldings-URL
 */
export function getPosterUrl(posterPath) {
    if (!posterPath) return null;
    return `${IMAGE_BASE_URL}${posterPath}`;
}

/**
 * Formatteert achtergrond afbeeldings-URL
 * @param {string} backdropPath - Backdrop pad van TMDB
 * @returns {string} Volledige achtergrond URL
 */
export function getBackdropUrl(backdropPath) {
    if (!backdropPath) return null;
    return `${IMAGE_BASE_URL}${backdropPath}`;
}
