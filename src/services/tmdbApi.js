// src/services/tmdbApi.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

// Instance axios configurée
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'fr-FR', // Ou 'en-US' selon votre préférence
  },
});

// Service pour les appels API
export const movieService = {
  // Récupérer les films populaires
  getPopularMovies: async (page = 1) => {
    try {
      const response = await tmdbApi.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des films populaires:', error);
      throw error;
    }
  },

  // Rechercher des films
  searchMovies: async (query, page = 1) => {
    try {
      const response = await tmdbApi.get('/search/movie', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de films:', error);
      throw error;
    }
  },

  // Récupérer les détails d'un film
  getMovieDetails: async (movieId) => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du film:', error);
      throw error;
    }
  },

  // Récupérer les genres
  getGenres: async () => {
    try {
      const response = await tmdbApi.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Erreur lors de la récupération des genres:', error);
      throw error;
    }
  }
};

// Utilitaire pour construire l'URL complète des images
export const getImageUrl = (imagePath, size = 'w500') => {
  if (!imagePath) return '/placeholder-movie.jpg'; // Image par défaut
  return `https://image.tmdb.org/t/p/${size}${imagePath}`;
};

// Utilitaire pour formater la date
export const formatDate = (dateString) => {
  if (!dateString) return 'Date inconnue';
  return new Date(dateString).toLocaleDateString('fr-FR');
};

export default movieService;