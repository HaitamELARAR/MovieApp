import { useState } from 'react';
import MovieCard from '../components/MovieCard/MovieCard';
import { movieService } from '../services/tmdbApi';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const data = await movieService.searchMovies(query);
      setResults(data.results);
    } catch (err) {
      setError("Erreur lors de la recherche. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <span role="img" aria-label="search">🔍</span> Rechercher un film
        </h1>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-2xl mx-auto flex flex-col md:flex-row items-stretch gap-4 mt-6"
        >
          <input
            type="text"
            placeholder="Entrez un mot-clé..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={!query.trim()}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition-all 
              ${query.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-200 cursor-not-allowed'}`}
          >
            Rechercher
          </button>
        </form>
      </div>

      {loading && <div className="text-center text-gray-600">Chargement en cours...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
      {results.length === 0 && !loading && query.trim() && !error && (
        <div className="text-center text-gray-500">Aucun film trouvé.</div>
      )}
    </div>
  );
};

export default Search;
