import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Grid from '../components/CharacterGrid/CharacterGrid';
import useCharacters from "../hooks/useCharacters";

export default function Home() {
  const { characters, addCharacter } = useCharacters();

  return (
    <div className="w-full h-screen bg-background flex items-center justify-center overflow-hidden">
      <div className="bg-card flex flex-col max-w-4xl w-full rounded-[10px] my-4 mx-auto h-[calc(100vh-2rem)] shadow-[0_0_12px_rgba(0,0,0,0.2)] bg-gradient-to-tr from-white/3 via-transparent via-50% p-6">
        <Header />
        <Grid characters={characters} />
        <button onClick={() => addCharacter("new")}>Add Character</button>
        <Footer />
      </div>
    </div>
  );
}