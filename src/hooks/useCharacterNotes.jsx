import { useState, useEffect } from 'react';

function useCharacterNotes(name) {
  const noteTemplate = {
    general: '',
    combos: '',
    'key-moves': '',
  };

  const [notes, setNotes] = useState(noteTemplate);

  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    saveNotes();
    // eslint-disable-next-line
  }, [notes]);

  function saveNotes() {
    localStorage.setItem(`notes-${name}`, JSON.stringify(notes));
  }
  function loadNotes() {
    const charnotes = localStorage.getItem(`notes-${name}`);
    return charnotes ? JSON.parse(charnotes) : noteTemplate;
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
