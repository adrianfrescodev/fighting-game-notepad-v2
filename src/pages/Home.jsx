import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Grid from '../components/CharacterGrid/CharacterGrid';
import useCharacters from '../hooks/useCharacters';

export default function Home() {
  const { characters, addCharacter } = useCharacters();

  return (
    <div className="bg-background flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="bg-card mx-auto my-4 flex h-[calc(100vh-2rem)] w-full max-w-4xl flex-col rounded-[10px] bg-gradient-to-tr from-white/3 via-transparent via-50% p-6 shadow-[0_0_12px_rgba(0,0,0,0.2)]">
        <Header />
        <Grid characters={characters} />
        <button onClick={() => addCharacter('new')}>Add Character</button>
        <Footer />
      </div>
    </div>
  );
}
