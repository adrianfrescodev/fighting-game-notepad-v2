import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
function useCharacterNotes(name) {
  const noteTemplate = {
    general: '',
    combos: '',
    'key-moves': '',
  };
  const { token, loggedIn } = useAuth();
  const [noteReady, setNoteReady] = useState(false);
  const [notes, setNotes] = useState({});
  useEffect(() => {
    const local = loadNotes();
    if (local) {
      setNotes(local);
    }
    const init = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notes/${name}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.status === 404) {
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notes/${name}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ sections: noteTemplate }),
          });
          setNotes(noteTemplate);
        } else if (res.ok) {
          const data = await res.json();
          setNotes(data.sections || {});
        } else {
          console.error(`Unexpected error: ${res.statusText}`);
        }
      } catch (err) {
        console.error('Failed to load or initialize notes:', err);
      }

      setNoteReady(true);
    };

    if (!token) {
      setNoteReady(true);
    } else if (token && loggedIn) {
      init();
    }
  }, [name, token, loggedIn]);
  useEffect(() => {
    if (noteReady) {
      saveNotes();
      if (token) {
        saveNotesToDB();
      }
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
  async function saveNotesToDB() {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/notes/${name}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sections: notes }),
      });
    } catch (err) {
      console.error('Failed to save note to server:', err);
      return false;
    }
  }
  function addTab(name) {
    name = name.trim();
    if (!name || notes[name]) return;

    setNotes(prev => ({
      ...prev,
      [name]: '',
    }));
  }

  function deleteTab(name) {
    setNotes(prev => {
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  }
  return { notes, setNotes, saveNotes, loadNotes, updateNotes, addTab, deleteTab };
}
export default useCharacterNotes;
