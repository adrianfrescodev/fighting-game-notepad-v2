import useAuth from '../../hooks/useAuth';
import Login from './Login';
import Logout from './Logout';
export default function Header() {
  const { loggedIn } = useAuth();

  return (
    <div>
      <div className="text-text border-border my-6 border-b py-3 text-center text-2xl font-bold sm:text-4xl">
        Welcome to The Fighting Game Notepad
      </div>

      {loggedIn ? <Logout /> : <Login />}
      <div className="text-subheading mb-8 text-center text-lg font-semibold sm:text-2xl">
        Select your character:{' '}
      </div>
    </div>
  );
}
