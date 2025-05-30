import { Link } from 'react-router-dom';

export default function CharacterHeader() {
  return (
    <Link to={'/'} className="w-full cursor-pointer p-4">
      Fighting Game Notepad
    </Link>
  );
}
