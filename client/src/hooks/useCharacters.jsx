import { useState, useEffect } from 'react';

function useCharacters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`);
        const data = await res.json();
        setCharacters(data.map(c => c.name));
      } catch (err) {
        console.error('Failed to fetch characters:', err);
        setCharacters([
          'akuma',
          'aki',
          'blanka',
          'm.bison',
          'cammy',
          'chun-li',
          'deejay',
          'dhalsim',
          'e.honda',
          'ed',
          'guile',
          'jamie',
          'JP',
          'juri',
          'ken',
          'kimberly',
          'lily',
          'luke',
          'mai',
          'manon',
          'marisa',
          'rashid',
          'ryu',
          'terry',
          'zangief',
        ]);
      }
    };
    fetchCharacters();
  }, []);
  const addCharacter = async newName => {
    const trimmed = newName.trim().toLowerCase();
    if (!trimmed || characters.includes(trimmed)) return false;
    setCharacters([...characters, trimmed]);

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
    } catch (err) {
      console.error('Failed to save character to server:', err);
    }

    return true;
  };

  return { characters, addCharacter };
}
export default useCharacters;
