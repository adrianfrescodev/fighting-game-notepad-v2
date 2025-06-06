import { Link } from 'react-router-dom';

export default function Tile({ name }) {
  return (
    <Link
      to={`/character/${name}`}
      className="border-border bg-tile hover:border-text flex h-full w-full cursor-pointer flex-col items-center justify-center rounded border p-1.5 text-center transition-transform duration-200 ease-in-out hover:scale-105"
    >
      <img
        src={`/Images/${name}.png`}
        alt={name}
        className="mb-1 aspect-[4/3] w-full rounded object-cover"
        onError={e => {
          e.target.onerror = null;
          e.target.src = '/Images/default.png';
        }}
      />
      <span className="text-s text-text mt-1 font-medium capitalize">{name}</span>
    </Link>
  );
}
