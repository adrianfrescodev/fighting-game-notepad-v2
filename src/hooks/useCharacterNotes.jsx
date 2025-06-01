import { useState, useEffect } from 'react';

function useCharacterNotes(name) {
  const noteTemplate = {
    general: '',
    combos: '',
    'key-moves': '',
  };
  const [hasLoaded, setHasLoaded] = useState(false);

  const [notes, setNotes] = useState(noteTemplate);

  useEffect(() => {
    const loaded = loadNotes();
    if (loaded) {
      setNotes(loaded);
    }
    setHasLoaded(true);
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    if (hasLoaded) {
      saveNotes();
    }
    // eslint-disable-next-line
  }, [notes]);

  function saveNotes() {
    localStorage.setItem(`notes-${name}`, JSON.stringify(notes));
  }
  function loadNotes() {
    const charnotes = localStorage.getItem(`notes-${name}`);
    return charnotes ? JSON.parse(charnotes) : null;
  }
  function updateNotes(section, newContent) {
    setNotes(prev => ({
      ...prev,
      [section]: newContent,
    }));
  }
  return { notes, setNotes, saveNotes, loadNotes, updateNotes };
}
export default useCharacterNotes;
