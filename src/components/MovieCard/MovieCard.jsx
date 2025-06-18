import { Link } from 'react-router-dom';
import { getImageUrl, formatDate } from '../../services/tmdbApi';

const MovieCard = ({ movie }) => {
const {
id,
title,
overview,
poster_path,
release_date,
vote_average
} = movie;

// Couleur douce selon la note
const getRatingBadge = (rating) => {
if (rating >= 8) return 'bg-green-200 text-green-900';
if (rating >= 6) return 'bg-yellow-200 text-yellow-800';
return 'bg-gray-300 text-gray-800';
};

return (
<div className="bg-[#fefce8] hover:bg-[#fffde8] border border-[#f5f5dc] text-[#1e293b] rounded-xl shadow-md overflow-hidden transition-all duration-300 flex flex-col">
{/* Image du film */}
<div className="relative">
<img
src={getImageUrl(poster_path)}
alt={title}
className="w-full h-80 object-cover"
onError={(e) => {
e.target.src = 'https://via.placeholder.com/500x750/eee/bbb?text=Pas+d%27image';
}}
/>
    {vote_average > 0 && (
      <span
        className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-full ${getRatingBadge(
          vote_average
        )} backdrop-blur-md shadow-sm`}
      >
        ⭐ {vote_average.toFixed(1)}
      </span>
    )}
  </div>

  {/* Contenu */}
  <div className="p-4 flex-1 flex flex-col justify-between">
    <div>
      <h3 className="text-lg font-bold mb-1 line-clamp-2">{title}</h3>
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">
        {overview || 'Aucune description disponible.'}
      </p>
    </div>

    <div className="flex justify-between items-center mt-auto pt-2 border-t border-[#e7e4c9]">
      <span className="text-xs text-gray-600">
        📅 {formatDate(release_date)}
      </span>
      <Link
        to={`/film/${id}`}
        className="text-sm font-semibold px-3 py-1 rounded border border-[#ccc] hover:bg-[#f3f3dd] transition"
      >
        ➤ Détails
      </Link>
    </div>
  </div>
</div>
);
};

export default MovieCard;