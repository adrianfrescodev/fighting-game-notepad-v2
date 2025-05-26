import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CharacterNotes from './pages/CharacterNotes';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:name" element={<CharacterNotes />} />
      </Routes>
    </Router>
  );
}