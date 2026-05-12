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
 * Haalt populaire films met paginatie info op
 * @param {number} page - Paginanummer
 * @returns {Promise<Object>} Object met results, total_pages en current_page
 */
export async function getPopularMoviesWithPagination(page = 1) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=nl-NL`
        );
        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1,
            currentPage: page,
            totalResults: data.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen populaire films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
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
 * Haalt best beoordeelde films met paginatie info op
 * @param {number} page - Paginanummer
 * @returns {Promise<Object>} Object met results, total_pages en current_page
 */
export async function getTopRatedMoviesWithPagination(page = 1) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}&language=nl-NL`
        );
        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1,
            currentPage: page,
            totalResults: data.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen best beoordeelde films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
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
 * Zoekt films met paginatie info
 * @param {string} query - Zoekterm
 * @param {number} page - Paginanummer
 * @returns {Promise<Object>} Object met results, total_pages en current_page
 */
export async function searchMoviesWithPagination(query, page = 1) {
    if (!query.trim()) return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };

    try {
        const response = await fetch(
            `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=nl-NL`
        );
        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1,
            currentPage: page,
            totalResults: data.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij zoeken films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
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
 * Haalt films op met filters en paginatie info
 * @param {Object} filters - Object met filterinstellingen
 * @returns {Promise<Object>} Object met results, total_pages en current_page
 */
export async function getFilteredMoviesWithPagination(filters = {}) {
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
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1,
            currentPage: filters.page || 1,
            totalResults: data.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen gefilterde films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    }
}

/**
 * Haalt filmcertificaties op per land
 * @returns {Promise<Object>} Object met certificaties per land
 */
export async function getCertifications() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/certification/movie/list?api_key=${API_KEY}`
        );
        const data = await response.json();
        return data.certifications || {};
    } catch (error) {
        console.error('Fout bij ophalen certificaties:', error);
        return {};
    }
}

/**
 * Haalt films op gefilterd op certificatie
 * @param {Object} options - Filter opties (certificationCountry, certification, page, sortBy)
 * @returns {Promise<Array>} Array van films
 */
export async function getMoviesByCertification(options = {}) {
    try {
        const params = new URLSearchParams({
            api_key: API_KEY,
            language: 'nl-NL',
            sort_by: `${options.sortBy || 'popularity'}.desc`,
            page: options.page || 1
        });

        if (options.certificationCountry) {
            params.append('certification_country', options.certificationCountry);
        }

        if (options.certification) {
            params.append('certification', options.certification);
        }

        const response = await fetch(
            `${API_BASE_URL}/discover/movie?${params.toString()}`
        );
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen films per certificatie:', error);
        return [];
    }
}

/**
 * Haalt films op gefilterd op certificatie met paginatie info
 * @param {Object} options - Filter opties (certificationCountry, certification, page, sortBy)
 * @returns {Promise<Object>} Object met results, totalPages, currentPage
 */
export async function getMoviesByCertificationWithPagination(options = {}) {
    try {
        const params = new URLSearchParams({
            api_key: API_KEY,
            language: 'nl-NL',
            sort_by: `${options.sortBy || 'popularity'}.desc`,
            page: options.page || 1
        });

        if (options.certificationCountry) {
            params.append('certification_country', options.certificationCountry);
        }

        if (options.certification) {
            params.append('certification', options.certification);
        }

        const response = await fetch(
            `${API_BASE_URL}/discover/movie?${params.toString()}`
        );
        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1,
            currentPage: options.page || 1,
            totalResults: data.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen films per certificatie:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
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
