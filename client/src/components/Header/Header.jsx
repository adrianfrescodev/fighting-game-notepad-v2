import Login from './Login';
import Logout from './Logout';
import { useAuth } from '../../context/AuthContext';
export default function Header() {
  const { loggedIn } = useAuth();
  return (
    <div>
      {loggedIn ? <Logout /> : <Login />}
      <div className="text-text border-border border-b py-3 text-center text-2xl font-bold sm:my-6 sm:text-4xl">
        Welcome to The Fighting Game Notepad
      </div>

      <div className="text-subheading text-center text-lg font-semibold sm:mb-8 sm:text-2xl">
        Select your character:
      </div>
    </div>
  );
}
