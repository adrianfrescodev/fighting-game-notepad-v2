import { useState, useEffect } from 'react';

function useCharacters() {
  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('characters');
    return saved
      ? JSON.parse(saved)
      : [
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
        ];
  });

  useEffect(() => {
    localStorage.setItem('characters', JSON.stringify(characters));
  }, [characters]);

  const addCharacter = newName => {
    const trimmed = newName.trim().toLowerCase();
    if (!trimmed || characters.includes(trimmed)) return;
    setCharacters([...characters, trimmed]);
  };

  return { characters, addCharacter };
}
export default useCharacters;
