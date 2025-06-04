import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseClient';

export default function Logout() {
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
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
