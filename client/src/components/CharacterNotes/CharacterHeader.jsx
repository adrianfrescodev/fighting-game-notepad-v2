import { Link } from 'react-router-dom';

export default function CharacterHeader() {
  return (
    <Link
      to={'/'}
      className="text-text border-b-border h-full w-full cursor-pointer border-b p-4 text-center text-4xl font-bold"
    >
      Fighting Game Notepad
    </Link>
  );
}
