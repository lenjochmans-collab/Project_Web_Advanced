import { getPopularMovies, getTopRatedMovies, getPosterUrl, getPopularMoviesWithPagination, getTopRatedMoviesWithPagination, searchMoviesWithPagination, getFilteredMoviesWithPagination, getMoviesByCertificationWithPagination } from './api.js';
import { addFavorite, removeFavorite, isFavorite } from './favorites.js';

let currentMovies = [];
let currentView = 'grid';
let currentPage = 1;
let totalPages = 1;
let currentSource = 'popular';
let currentSearchQuery = '';
let currentFilters = {};
let currentCertification = {};

export async function initUI() {
    console.log('UI initialiseren...');
    await loadMovies();
    document.getElementById('gridViewBtn').addEventListener('click', () => switchView('grid'));
    document.getElementById('listViewBtn').addEventListener('click', () => switchView('list'));
    document.querySelectorAll('.nav-link').forEach(link => { link.addEventListener('click', (e) => { e.preventDefault(); handleNavClick(e.target.closest('.nav-link')); }); });
    document.getElementById('favoritesDropdown').addEventListener('click', viewFavorites);
    setupPaginationListeners();
    setupModalListeners();
}

function setupPaginationListeners() {
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageInput = document.getElementById('pageInput');
    const goBtn = document.getElementById('goPageBtn');
    if (prevBtn) prevBtn.addEventListener('click', () => handlePageChange(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => handlePageChange(currentPage + 1));
    if (goBtn) goBtn.addEventListener('click', () => { const pageNum = parseInt(pageInput.value); if (pageNum > 0 && pageNum <= totalPages) handlePageChange(pageNum); });
    if (pageInput) pageInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { const pageNum = parseInt(pageInput.value); if (pageNum > 0 && pageNum <= totalPages) handlePageChange(pageNum); } });
}

function setupModalListeners() {
    const modal = document.getElementById('detailsModal');
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('show'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) modal.classList.remove('show'); });
}

async function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    currentPage = newPage;
    await loadMovies();
    document.getElementById('moviesContainer').scrollIntoView({ behavior: 'smooth' });
}

export async function loadMovies() {
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Films laden...</div>';
    try {
        let paginatedData = {};
        switch(currentSource) {
            case 'popular': paginatedData = await getPopularMoviesWithPagination(currentPage); break;
            case 'top-rated': paginatedData = await getTopRatedMoviesWithPagination(currentPage); break;
            case 'upcoming': paginatedData = await getUpcomingMoviesWithPagination(currentPage); break;
            case 'search': paginatedData = await searchMoviesWithPagination(currentSearchQuery, currentPage); break;
            case 'filtered': paginatedData = await getFilteredMoviesWithPagination({ ...currentFilters, page: currentPage }); break;
            case 'certification': paginatedData = await getMoviesByCertificationWithPagination({ ...currentCertification, page: currentPage }); break;
            default: paginatedData = await getPopularMoviesWithPagination(currentPage);
        }
        currentMovies = paginatedData.results;
        totalPages = paginatedData.totalPages;
        displayMovies(currentMovies);
        renderPagination();
    } catch (error) {
        console.error('Fout bij laden films:', error);
        container.innerHTML = '<div class="empty-state">Fout bij laden films. Probeer later opnieuw.</div>';
    }
}

function renderPagination() {
    const paginationContainer = document.getElementById('paginationContainer');
    if (!paginationContainer) return;
    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    const pageInfo = document.getElementById('pageInfo');
    const pageInput = document.getElementById('pageInput');
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
    if (pageInfo) pageInfo.textContent = `Pagina ${currentPage} van ${totalPages}`;
    if (pageInput) { pageInput.value = currentPage; pageInput.max = totalPages; }
}

export function displayMovies(movies) {
    const container = document.getElementById('moviesContainer');
    if (!movies || movies.length === 0) { container.innerHTML = '<div class="empty-state">Geen films gevonden.</div>'; return; }
    if (currentView === 'grid') { container.className = 'movies-grid'; container.innerHTML = movies.map(movie => createMovieCard(movie)).join(''); }
    else { container.className = 'movies-list'; container.innerHTML = movies.map(movie => createMovieRow(movie)).join(''); }
    attachEventListeners();
}

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

function attachEventListeners() { document.querySelectorAll('.btn-favorite').forEach(btn => { btn.addEventListener('click', handleFavoriteClick); }); document.querySelectorAll('.btn-details').forEach(btn => { btn.addEventListener('click', handleDetailsClick); }); }

function handleFavoriteClick(e) {
    e.stopPropagation();
    const movieId = parseInt(this.dataset.id);
    const movie = currentMovies.find(m => m.id === movieId);
    if (isFavorite(movieId)) { removeFavorite(movieId); this.classList.remove('active'); this.textContent = currentView === 'grid' ? '🤍 Toevoegen' : '🤍'; }
    else { addFavorite(movie); this.classList.add('active'); this.textContent = currentView === 'grid' ? '❤️ Favoriet' : '❤️'; }
}

async function handleDetailsClick(e) { e.stopPropagation(); const movieId = parseInt(this.dataset.id); const movie = currentMovies.find(m => m.id === movieId); if (movie) await showMovieDetails(movieId); }

async function showMovieDetails(movieId) {
    try {
        const { getMovieDetails, getPosterUrl } = await import('./api.js');
        const { isFavorite, addFavorite, removeFavorite } = await import('./favorites.js');
        const details = await getMovieDetails(movieId);
        if (!details) { alert('Fout bij laden filmdetails'); return; }
        document.getElementById('detailsTitle').textContent = details.title || details.name || '';
        document.getElementById('detailsPoster').src = getPosterUrl(details.poster_path) || '';
        document.getElementById('detailsYear').textContent = details.release_date ? new Date(details.release_date).getFullYear() : (details.first_air_date ? new Date(details.first_air_date).getFullYear() : 'N/A');
        document.getElementById('detailsGenres').textContent = details.genres ? details.genres.map(g => g.name).join(', ') : 'N/A';
        document.getElementById('detailsRating').textContent = `⭐ ${details.vote_average ? details.vote_average.toFixed(1) : 'N/A'}/10`;
        document.getElementById('detailsOverview').textContent = details.overview || 'Geen overzicht beschikbaar';
        document.getElementById('detailsReleaseDate').textContent = details.release_date || details.first_air_date || 'N/A';
        document.getElementById('detailsVoteAverage').textContent = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
        document.getElementById('detailsPopularity').textContent = details.popularity ? details.popularity.toFixed(0) : 'N/A';
        document.getElementById('detailsVoteCount').textContent = details.vote_count || 'N/A';
        const favoriteBtn = document.getElementById('detailsFavoriteBtn');
        const isFav = isFavorite(movieId);
        favoriteBtn.textContent = isFav ? '❤️ In favorieten' : '🤍 Toevoegen aan favorieten';
        favoriteBtn.classList.toggle('active', isFav);
        favoriteBtn.onclick = () => { if (isFavorite(movieId)) { removeFavorite(movieId); favoriteBtn.textContent = '🤍 Toevoegen aan favorieten'; favoriteBtn.classList.remove('active'); } else { addFavorite(details); favoriteBtn.textContent = '❤️ In favorieten'; favoriteBtn.classList.add('active'); } };
        const modal = document.getElementById('detailsModal');
        modal.classList.add('show');
    } catch (error) {
        console.error('Fout bij laden details:', error);
        alert('Fout bij laden filmdetails');
    }
}

async function getUpcomingMovies(page = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a0ab9fe4a5f4b23c5723b5f2fc500995&page=${page}&language=nl-NL`);
        const data = await response.json();
        return data.results || [];
    } catch (error) {
        console.error('Fout bij ophalen upcoming films:', error);
        return [];
    }
}

async function getUpcomingMoviesWithPagination(page = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=a0ab9fe4a5f4b23c5723b5f2fc500995&page=${page}&language=nl-NL`);
        const data = await response.json();
        return { results: data.results || [], totalPages: data.total_pages || 1, currentPage: page, totalResults: data.total_results || 0 };
    } catch (error) {
        console.error('Fout bij ophalen upcoming films:', error);
        return { results: [], totalPages: 1, currentPage: 1, totalResults: 0 };
    }
}

async function handleNavClick(linkElement) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    linkElement.classList.add('active');
    const view = linkElement.dataset.view;
    currentPage = 1;
    const container = document.getElementById('moviesContainer');
    container.innerHTML = '<div class="loading">Films laden...</div>';
    try {
        switch(view) {
            case 'popular': currentSource = 'popular'; break;
            case 'upcoming': currentSource = 'upcoming'; break;
            case 'top-rated': currentSource = 'top-rated'; break;
            case 'search': document.getElementById('searchInput').focus(); return;
            default: currentSource = 'popular';
        }
        await loadMovies();
    } catch (error) {
        console.error('Fout bij laden films:', error);
        container.innerHTML = '<div class="empty-state">Fout bij laden films. Probeer later opnieuw.</div>';
    }
}

async function viewFavorites() { const { viewFavorites: showFavorites } = await import('./favorites.js'); showFavorites(); }

function switchView(view) { currentView = view; document.getElementById('gridViewBtn').classList.toggle('active', view === 'grid'); document.getElementById('listViewBtn').classList.toggle('active', view === 'list'); displayMovies(currentMovies); }

export function getCurrentMovies() { return currentMovies; }

export async function setSearchQuery(query) { currentSearchQuery = query; currentSource = 'search'; currentPage = 1; await loadMovies(); }

export async function setFilters(filters) { currentFilters = filters; currentSource = 'filtered'; currentPage = 1; await loadMovies(); }

export async function setCertification(certification) { currentCertification = certification; if (certification.certification) { currentSource = 'certification'; currentPage = 1; await loadMovies(); } }
