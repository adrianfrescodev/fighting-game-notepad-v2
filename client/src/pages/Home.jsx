import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Grid from '../components/CharacterGrid/CharacterGrid';
import { useCharacters } from '../context/CharactersContext';
import { useState } from 'react';
import CharacterMaker from '../components/CharacterGrid/CharacterMaker';
import { useAuth } from '../context/AuthContext';
import CharacterDeletePanel from '../components/CharacterGrid/Delete';
export default function Home() {
  const {
    characters,
    addCharacter,
    setCharacters,
    setCharacterSettings,
    isDeleting,
    setIsDeleting,
  } = useCharacters();
  const [isCreate, setIsCreate] = useState(false);
  const { loggedIn, token } = useAuth();
  const [curSearch, setCurSearch] = useState('');
  const visibleCharacters = characters.filter(c => c.deleted !== true);
  const [selectedToDelete, setSelectedToDelete] = useState([]);
  const handleToggleFavorite = async (name, isFavorite) => {
    try {
      setCharacters(prev =>
        prev.map(char => (char.name === name ? { ...char, favorite: isFavorite } : char))
      );

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/usercharacterdata/${name}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ favorite: isFavorite }),
        }
      );
      if (res.ok) {
        const updatedSetting = await res.json();
        setCharacterSettings(prev => {
          const idx = prev.findIndex(s => String(s.character) === String(updatedSetting.character));
          if (idx !== -1) {
            const updated = [...prev];
            updated[idx] = updatedSetting;
            return updated;
          } else {
            return [...prev, updatedSetting];
          }
        });
      } else {
        console.error('Failed to patch setting:', await res.text());
      }
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };
  const onToggleDelete = id => {
    setSelectedToDelete(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const isSelectedToDelete = id => selectedToDelete.includes(id);
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="bg-card from-white/3 mx-auto my-4 flex h-[calc(100vh-2rem)] w-full max-w-4xl flex-col rounded-[10px] bg-gradient-to-tr via-transparent via-50% p-6 shadow-[0_0_12px_rgba(0,0,0,0.2)]">
        <Header />
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <div className="text-text flex gap-2">
            <div> Search:</div>
            <input
              className="bg-tile border-border text-text placeholder:text-subheading rounded border px-3 py-1 text-sm"
              placeholder="Search for a character:"
              value={curSearch}
              onChange={e => setCurSearch(e.target.value)}
            ></input>
          </div>
          <div className="flex flex-row gap-8">
            {!isDeleting && loggedIn && (
              <button
                className="border-border bg-accent text-text cursor-pointer rounded border px-4 py-1 text-center text-sm"
                onClick={() => setIsCreate(true)}
              >
                Add Character
              </button>
            )}
            {!loggedIn && (
              <p className="border-border bg-accent text-text cursor-not-allowed rounded border text-center">
                Log in to add your own characters
              </p>
            )}
            {loggedIn && (
              <CharacterDeletePanel
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                selectedToDelete={selectedToDelete}
                setSelectedToDelete={setSelectedToDelete}
                characters={characters}
                setCharacters={setCharacters}
                setCharacterSettings={setCharacterSettings}
              />
            )}
          </div>
        </div>
        <Grid
          characters={visibleCharacters.filter(c =>
            c.name.toLowerCase().includes(curSearch.toLowerCase())
          )}
          onToggleFavorite={handleToggleFavorite}
          onToggleDelete={onToggleDelete}
          isSelectedToDelete={isSelectedToDelete}
          isDeleting={isDeleting}
        />
        {isCreate && <CharacterMaker addCharacter={addCharacter} setIsCreate={setIsCreate} />}
        <Footer />
      </div>
    </div>
  );
}
