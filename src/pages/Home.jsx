// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { movieService } from '../services/tmdbApi';
import MovieCard from '../components/MovieCard/MovieCard';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Charger les films populaires
  const loadMovies = async (page = 1) => {
    try {
      console.log(`Chargement des films populaires - Page ${page}`);
      setLoading(true);
      setError(null);
      
      const data = await movieService.getPopularMovies(page);
      
      if (page === 1) {
        setMovies(data.results);
      } else {
        // Ajouter les nouveaux films à la liste existante (pagination)
        setMovies(prev => [...prev, ...data.results]);
      }
      
      setTotalPages(data.total_pages);
      setCurrentPage(page);
    } catch (err) {
      setError('Erreur lors du chargement des films. Veuillez réessayer.');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Charger les films au montage du composant
  useEffect(() => {
    loadMovies();
  }, []);

  // Charger plus de films
  const loadMore = () => {
    if (currentPage < totalPages && !loading) {
      loadMovies(currentPage + 1);
    }
  };

  // Actualiser la liste
  const refresh = () => {
    console.log('Actualisation des films...');
    setCurrentPage(1);
    loadMovies(1);
  };

  if (loading && movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des films populaires...</p>
        </div>
      </div>
    );
  }

  if (error && movies.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Oups !</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={refresh}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🎬 Films Populaires
        </h1>
        <p className="text-gray-600">
          Découvrez les films les plus populaires du moment
        </p>
        
        {/* Bouton actualiser */}
        <button
          onClick={refresh}
          className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm"
        >
           Actualiser
        </button>
      </div>

      {/* Grille des films */}
      {movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* Bouton "Charger plus" */}
      {currentPage < totalPages && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                Chargement...
              </>
            ) : (
              'Charger plus de films'
            )}
          </button>
          
          <p className="text-gray-500 text-sm mt-2">
            Page {currentPage} sur {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;