const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMGFiOWZlNGE1ZjRiMjNjNTcyM2I1ZjJmYzUwMDk5NSIsIm5iZiI6MTc3ODA4MDI3MS43OTMsInN1YiI6IjY5ZmI1YTBmOTJlYmQxM2RiZWI5YWI4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fhju573-nxGaHYmJd3ktb5AQ8j0A0GNGxowGkwmEJUw';

async function apiFetch(url, options = {}) {
    const headers = {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        ...options.headers
    };
    return fetch(url, { ...options, headers });
}

export async function getPopularMovies(page = 1) {
    try {
        const response = await apiFetch(`${API_BASE_URL}/movie/popular?page=${page}&language=nl-NL`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen populaire films:', error);
        return [];
    }
}

export async function getPopularMoviesWithPagination(page = 1) {
    try {
        const response1 = await apiFetch(`${API_BASE_URL}/movie/popular?page=${page}&language=nl-NL`);
        const data1 = await response1.json();
        const response2 = await apiFetch(`${API_BASE_URL}/movie/popular?page=${page + 1}&language=nl-NL`);
        const data2 = await response2.json();
        return {
            results: [...(data1.results || []), ...(data2.results || [])],
            totalPages: Math.ceil((data1.total_pages || 1) / 2),
            currentPage: page,
            totalResults: data1.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen populaire films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    }
}

export async function getTopRatedMovies(page = 1) {
    try {
        const response = await apiFetch(`${API_BASE_URL}/movie/top_rated?page=${page}&language=nl-NL`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen best beoordeelde films:', error);
        return [];
    }
}

export async function getTopRatedMoviesWithPagination(page = 1) {
    try {
        const response1 = await apiFetch(`${API_BASE_URL}/movie/top_rated?page=${page}&language=nl-NL`);
        const data1 = await response1.json();
        const response2 = await apiFetch(`${API_BASE_URL}/movie/top_rated?page=${page + 1}&language=nl-NL`);
        const data2 = await response2.json();
        return {
            results: [...(data1.results || []), ...(data2.results || [])],
            totalPages: Math.ceil((data1.total_pages || 1) / 2),
            currentPage: page,
            totalResults: data1.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen best beoordeelde films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    }
}

export async function searchMovies(query, page = 1) {
    if (!query.trim()) return [];
    try {
        const response = await apiFetch(`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=nl-NL`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij zoeken films:', error);
        return [];
    }
}

export async function searchMoviesWithPagination(query, page = 1) {
    if (!query.trim()) return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    try {
        const response1 = await apiFetch(`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}&language=nl-NL`);
        const data1 = await response1.json();
        const response2 = await apiFetch(`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page + 1}&language=nl-NL`);
        const data2 = await response2.json();
        return {
            results: [...(data1.results || []), ...(data2.results || [])],
            totalPages: Math.ceil((data1.total_pages || 1) / 2),
            currentPage: page,
            totalResults: data1.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij zoeken films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    }
}

export async function getGenres() {
    try {
        const response = await apiFetch(`${API_BASE_URL}/genre/movie/list?language=nl-NL`);
        const data = await response.json();
        return data.genres || [];
    } catch (error) {
        console.error('Fout bij ophalen genres:', error);
        return [];
    }
}

export async function getMovieDetails(movieId) {
    try {
        const response = await apiFetch(`${API_BASE_URL}/movie/${movieId}?language=nl-NL`);
        return await response.json();
    } catch (error) {
        console.error(`Fout bij ophalen film ${movieId}:`, error);
        return null;
    }
}

export async function getFilteredMovies(filters = {}) {
    try {
        const params = new URLSearchParams({
            language: 'nl-NL',
            sort_by: `${filters.sortBy || 'popularity'}.desc`,
            page: filters.page || 1
        });
        if (filters.withGenres) params.append('with_genres', filters.withGenres);
        if (filters.primaryReleaseYear) params.append('primary_release_year', filters.primaryReleaseYear);
        if (filters.voteAverageGte) params.append('vote_average.gte', filters.voteAverageGte);
        if (filters.withOriginalLanguage) params.append('with_original_language', filters.withOriginalLanguage);
        const response = await apiFetch(`${API_BASE_URL}/discover/movie?${params.toString()}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen gefilterde films:', error);
        return [];
    }
}

export async function getFilteredMoviesWithPagination(filters = {}) {
    try {
        const page = filters.page || 1;
        const buildParams = (pageNum) => {
            const params = new URLSearchParams({
                language: 'nl-NL',
                sort_by: `${filters.sortBy || 'popularity'}.desc`,
                page: pageNum
            });
            if (filters.withGenres) params.append('with_genres', filters.withGenres);
            if (filters.primaryReleaseYear) params.append('primary_release_year', filters.primaryReleaseYear);
            if (filters.voteAverageGte) params.append('vote_average.gte', filters.voteAverageGte);
            if (filters.withOriginalLanguage) params.append('with_original_language', filters.withOriginalLanguage);
            return params.toString();
        };
        const response1 = await apiFetch(`${API_BASE_URL}/discover/movie?${buildParams(page)}`);
        const data1 = await response1.json();
        const response2 = await apiFetch(`${API_BASE_URL}/discover/movie?${buildParams(page + 1)}`);
        const data2 = await response2.json();
        return {
            results: [...(data1.results || []), ...(data2.results || [])],
            totalPages: Math.ceil((data1.total_pages || 1) / 2),
            currentPage: page,
            totalResults: data1.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen gefilterde films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    }
}

export async function getCertifications() {
    try {
        const response = await apiFetch(`${API_BASE_URL}/certification/movie/list`);
        const data = await response.json();
        return data.certifications || {};
    } catch (error) {
        console.error('Fout bij ophalen certificaties:', error);
        return {};
    }
}

export async function getMoviesByCertification(options = {}) {
    try {
        const params = new URLSearchParams({
            language: 'nl-NL',
            sort_by: `${options.sortBy || 'popularity'}.desc`,
            page: options.page || 1
        });
        if (options.certificationCountry) params.append('certification_country', options.certificationCountry);
        if (options.certification) params.append('certification', options.certification);
        const response = await apiFetch(`${API_BASE_URL}/discover/movie?${params.toString()}`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen films per certificatie:', error);
        return [];
    }
}

export async function getMoviesByCertificationWithPagination(options = {}) {
    try {
        const page = options.page || 1;
        const buildParams = (pageNum) => {
            const params = new URLSearchParams({
                language: 'nl-NL',
                sort_by: `${options.sortBy || 'popularity'}.desc`,
                page: pageNum
            });
            if (options.certificationCountry) params.append('certification_country', options.certificationCountry);
            if (options.certification) params.append('certification', options.certification);
            return params.toString();
        };
        const response1 = await apiFetch(`${API_BASE_URL}/discover/movie?${buildParams(page)}`);
        const data1 = await response1.json();
        const response2 = await apiFetch(`${API_BASE_URL}/discover/movie?${buildParams(page + 1)}`);
        const data2 = await response2.json();
        return {
            results: [...(data1.results || []), ...(data2.results || [])],
            totalPages: Math.ceil((data1.total_pages || 1) / 2),
            currentPage: page,
            totalResults: data1.total_results || 0
        };
    } catch (error) {
        console.error('Fout bij ophalen films per certificatie:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    }
}

export function getPosterUrl(posterPath) {
    if (!posterPath) return null;
    return `${IMAGE_BASE_URL}${posterPath}`;
}

export function getBackdropUrl(backdropPath) {
    if (!backdropPath) return null;
    return `${IMAGE_BASE_URL}${backdropPath}`;
}
