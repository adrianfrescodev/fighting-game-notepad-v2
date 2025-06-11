import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function useCharacters() {
  const [characters, setCharacters] = useState([]);
  const { token } = useAuth();
  const [characterSettings, setCharacterSettings] = useState([]);
  const [mergedCharacters, setMergedCharacters] = useState([]);
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const [charRes, settingsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`, {
            headers: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/api/usercharacterdata`, {
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }),
        ]);
        const characters = await charRes.json();
        const settings = await settingsRes.json();

        setCharacters(characters);
        setCharacterSettings(settings);
      } catch (err) {
        console.error('Error fetching characters or settings', err);
      }
    };
    fetchCharacters();
  }, [token]);

  useEffect(() => {
    const settingsMap = new Map();
    characterSettings.forEach(s => settingsMap.set(s.character, s));

    const merged = characters.map(char => {
      const settings = settingsMap.get(char._id);
      return {
        ...char,
        favorite: settings?.favorite ?? false,
        deleted: settings?.deleted ?? false,
      };
    });

    setMergedCharacters(merged);
  }, [characters, characterSettings]);

  const addCharacter = async newName => {
    const trimmed = newName.trim().toLowerCase();
    if (!trimmed || characters.some(c => c.name === trimmed)) return false;

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name: trimmed }),
      });
    } catch (err) {
      console.error('Failed to save character to server:', err);
      return false;
    }
    setCharacters(prev =>
      [...prev, { name: trimmed }].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      )
    );
    return true;
  };

  return { characters: mergedCharacters, addCharacter, characterSettings };
}

export default useCharacters;
