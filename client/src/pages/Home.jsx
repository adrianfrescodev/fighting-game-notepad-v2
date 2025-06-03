import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Grid from '../components/CharacterGrid/CharacterGrid';
import useCharacters from '../hooks/useCharacters';
import { useState } from 'react';
import CharacterMaker from '../components/CharacterGrid/CharacterMaker';
export default function Home() {
  const { characters, addCharacter } = useCharacters();
  const [isCreate, setIsCreate] = useState(false);
  return (
    <div className="bg-background flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="bg-card from-white/3 mx-auto my-4 flex h-[calc(100vh-2rem)] w-full max-w-4xl flex-col rounded-[10px] bg-gradient-to-tr via-transparent via-50% p-6 shadow-[0_0_12px_rgba(0,0,0,0.2)]">
        <Header />
        <div className="flex items-center justify-center gap-72 p-4">
          <div className="text-text flex gap-4">
            <div> Search:</div>
            <input className="border-border border" placeholder="Search for a character:"></input>
          </div>
          <button
            className="border-border bg-accent text-text w-64 rounded border"
            onClick={() => setIsCreate(true)}
          >
            Add Character
          </button>
        </div>
        <Grid characters={characters} />
        {isCreate && <CharacterMaker addCharacter={addCharacter} setIsCreate={setIsCreate} />}
        <Footer />
      </div>
    </div>
  );
}
