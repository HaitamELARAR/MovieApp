import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { movieService, getImageUrl } from '../services/tmdbApi';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await movieService.getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error('Erreur détails film :', err);
        setError('Une erreur est survenue.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center py-10">⏳ Chargement...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
  if (!movie) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-amber-900 dark:text-gray-100">
      {/* Image de fond */}
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w1280')})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-end">
          <div className="p-6 md:p-12 max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            {movie.tagline && <p className="italic text-sm mt-1">{movie.tagline}</p>}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Affiche */}
        <div>
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="rounded-lg shadow-xl w-full"
          />
        </div>

        {/* Infos */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold">📝 Synopsis</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {movie.overview || 'Aucune description disponible.'}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
            <div>
              <span className="font-semibold">📅 Date de sortie :</span><br />
              {movie.release_date || '—'}
            </div>
            <div>
              <span className="font-semibold">⭐ Note :</span><br />
              {movie.vote_average?.toFixed(1)} / 10
            </div>
            <div className="col-span-2">
              <span className="font-semibold">🎭 Genres :</span><br />
              {movie.genres?.map(g => g.name).join(', ') || '—'}
            </div>
          </div>

          <Link
            to="/"
            className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            ⬅ Retour à l’accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;