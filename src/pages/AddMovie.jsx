import { useState, useEffect } from "react";
import MovieForm from "../components/MovieForm/MovieForm";
import MovieCard from "../components/MovieCard/MovieCard";

const AddMovie = () => {
  const [addedMovies, setAddedMovies] = useState([]);

  // Charger les films du localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem("addedMovies");
    if (stored) {
      try {
        setAddedMovies(JSON.parse(stored));
      } catch (error) {
        console.error("Erreur de parsing JSON:", error);
        setAddedMovies([]);
      }
    }
  }, []);

  // Ajouter un nouveau film
  const handleAddMovie = (movie) => {
    const updated = [movie, ...addedMovies];
    setAddedMovies(updated);
    localStorage.setItem("addedMovies", JSON.stringify(updated));
  };

  return (
   <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🎥 Ajouter un film</h1>
        <p className="text-gray-600">
          Remplissez le formulaire ci-dessous pour ajouter un film .
        </p>
      </div>

      <MovieForm onSubmit={handleAddMovie} />

      {addedMovies.length > 0 && (
        <div className="pt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            🎞️ Films ajoutés
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMovie;