import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebaseClient';
import { useCharacters } from '../../context/CharactersContext';
export default function Login() {
  const { setIsDeleting } = useCharacters();
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };
  return (
    <button
      className="border-border bg-accent text-text w-24 cursor-pointer rounded border p-2"
      onClick={async () => {
        setIsDeleting(false);
        await handleLogin();
      }}
    >
      Login
    </button>
  );
}
