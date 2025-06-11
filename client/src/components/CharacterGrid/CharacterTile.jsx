import { Link } from 'react-router-dom';

export default function Tile({ char, onToggleFavorite }) {
  return (
    <Link
      to={`/character/${char.name}`}
      className="border-border bg-tile hover:border-text flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border p-1.5 text-center transition-transform duration-200 ease-in-out hover:scale-105"
    >
      <div>
        <span
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute right-2 top-2 cursor-pointer text-xl"
          title="Toggle Favorite"
        >
          {char.favorite ? '★' : '☆'}
        </span>
        <img
          src={`/Images/${char.name}.png`}
          alt={char}
          className="mb-1 aspect-[4/3] w-full rounded object-cover"
          onError={e => {
            e.target.onerror = null;
            e.target.src = '/Images/default.png';
          }}
        />
      </div>
      <span className="text-s text-text mt-1 font-medium capitalize">{char.name}</span>
    </Link>
  );
}
