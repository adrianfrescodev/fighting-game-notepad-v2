import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const CharactersContext = createContext();

export function CharactersProvider({ children }) {
  const { token } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [characterSettings, setCharacterSettings] = useState([]);
  const [mergedCharacters, setMergedCharacters] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/characters`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const characters = await charRes.json();

        let settings = [];
        if (token) {
          const settingsRes = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/api/usercharacterdata`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (settingsRes.ok) {
            settings = await settingsRes.json();
          } else {
            settings = [];
          }
        }

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
    characterSettings.forEach(s => settingsMap.set(String(s.character), s));

    const merged = characters.map(char => {
      const settings = settingsMap.get(String(char._id));
      return {
        ...char,
        favorite: settings?.favorite ?? false,
        deleted: settings?.deleted ?? false,
      };
    });

    const sorted = merged.sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });

    setMergedCharacters(sorted);
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

  return (
    <CharactersContext.Provider
      value={{
        characters: mergedCharacters,
        addCharacter,
        characterSettings,
        setCharacters,
        setCharacterSettings,
        isDeleting,
        setIsDeleting,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  const context = useContext(CharactersContext);
  if (!context) {
    throw new Error('useCharacters must be used within a CharactersProvider');
  }
  return context;
}
