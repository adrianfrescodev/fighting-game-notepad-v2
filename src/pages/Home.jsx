import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Grid from '../components/CharacterGrid/CharacterGrid';

export default function Home() {
  return (
<div className="w-screen min-h-screen bg-background flex items-center justify-center">
  <div className= "bg-card flex flex-col max-w-4xl w-full rounded-[10px] my-4 mx-auto min-h-[calc(100vh-2rem)] shadow-[0_0_12px_rgba(0,0,0,0.2)] bg-gradient-to-tr from-white/3 via-transparent via-50% p-4">
  <Header />
  <Grid />
  <Footer />
  </div>
</div>
  );
}