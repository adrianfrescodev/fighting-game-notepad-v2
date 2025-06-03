import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../services/firebaseClient';
export default function Login() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // token is handled by useAuth
    } catch (err) {
      console.error('Login error:', err.message);
    }
  };

  return <button onClick={handleLogin}>Login</button>;
}
