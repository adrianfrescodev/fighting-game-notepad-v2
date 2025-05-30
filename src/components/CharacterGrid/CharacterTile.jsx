import { Link } from "react-router-dom";


export default function Tile({ name }) {
  return (
    <Link to={`/character/${name}`} className="flex flex-col h-full w-full items-center text-center cursor-pointer p-1.5 rounded border border-border bg-tile transition-transform duration-200 ease-in-out justify-center hover:scale-105 hover:border-text">
      <img
        src={`/Images/${name}.png`}
        alt={name}
        className="object-cover rounded w-full aspect-[4/3] mb-1"
      />
      <span className="mt-1 font-medium text-s text-text capitalize">{name}</span>
    </Link>
  );
}