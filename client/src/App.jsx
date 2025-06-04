import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterPage from './pages/CharacterPage';
import { AuthProvider } from './context/AuthContext';
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:name" element={<CharacterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
