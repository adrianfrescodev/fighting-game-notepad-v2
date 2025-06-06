import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebaseClient';
export default function Login() {
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
      onClick={handleLogin}
    >
      Login
    </button>
  );
}
