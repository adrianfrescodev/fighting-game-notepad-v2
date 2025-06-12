import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
export default function Tile({
  char,
  onToggleFavorite,
  onToggleDelete,
  isSelectedToDelete,
  isDeleting,
}) {
  const { loggedIn } = useAuth();
  return (
    <Link
      to={isDeleting ? '#' : `/character/${char.name}`}
      className={`border-border bg-tile hover:border-text group relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border p-1.5 text-center transition-transform duration-200 ease-in-out hover:scale-105 ${
        char.favorite ? 'hover:border-yellow-100' : ''
      }`}
    >
      <div>
        {!isDeleting && loggedIn && (
          <span
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`absolute right-2 top-2 cursor-pointer text-xl text-amber-300 transition-opacity ${
              char.favorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
            title="Toggle Favorite"
          >
            {char.favorite ? '★' : '☆'}
          </span>
        )}
        {isDeleting && (
          <span
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onToggleDelete(char._id);
            }}
            className={`absolute right-2 top-2 cursor-pointer text-red-500`}
            title="Mark for Deletion"
          >
            {isSelectedToDelete ? '✔️' : '❌'}
          </span>
        )}
        <img
          src={`/Images/${char.name}.webp`}
          alt={char.name}
          className="mb-1 aspect-[4/3] w-full rounded object-cover"
          onError={e => {
            e.target.onerror = null;
            e.target.src = '/Images/default.webp';
          }}
        />
      </div>
      <span className="text-s text-text mt-1 font-medium capitalize">{char.name}</span>
    </Link>
  );
}
