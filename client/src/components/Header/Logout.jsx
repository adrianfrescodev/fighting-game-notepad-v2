import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseClient';
import { useCharacters } from '../../context/CharactersContext';
export default function Logout() {
  const { setIsDeleting } = useCharacters();
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err.message);
    }
  };
  return (
    <button
      className="border-border bg-accent text-text w-24 cursor-pointer rounded border p-2"
      onClick={async () => {
        setIsDeleting(false);
        await handleLogout();
      }}
    >
      Logout
    </button>
  );
}
