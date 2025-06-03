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

  return <button onClick={handleLogout}>Logout</button>;
}
