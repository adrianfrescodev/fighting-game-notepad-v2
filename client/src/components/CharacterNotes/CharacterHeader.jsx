import { Link } from 'react-router-dom';

export default function CharacterHeader() {
  return (
    <Link to={'/'} className="border-b-border h-full w-full cursor-pointer border-b">
      <div
        className="text-text text-center text-3xl font-bold hover:scale-105 hover:underline sm:text-4xl"
        title="Return to home page"
      >
        Fighting Game Notepad
      </div>
    </Link>
  );
}
