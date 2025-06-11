import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterPage from './pages/CharacterPage';
import { AuthProvider } from './context/AuthContext';
import { CharactersProvider } from './context/CharactersContext';
export default function App() {
  return (
    <AuthProvider>
      <CharactersProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/character/:name" element={<CharacterPage />} />
          </Routes>
        </Router>
      </CharactersProvider>
    </AuthProvider>
  );
}
