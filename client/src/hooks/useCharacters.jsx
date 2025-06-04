import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setCharacters(
          data
            .map(c => c.name)
            .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
        );
      } catch (err) {
        console.error('Failed to fetch characters:', err);
      }
    };
    fetchCharacters();
  }, [token]);

  const addCharacter = async newName => {
    const trimmed = newName.trim().toLowerCase();
    if (!trimmed || characters.includes(trimmed)) return false;

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: trimmed }),
      });
    } catch (err) {
      console.error('Failed to save character to server:', err);
      return false;
    }
    setCharacters(prev =>
      [...prev, trimmed].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
    );
    return true;
  };

  return { characters, addCharacter };
}

export default useCharacters;
