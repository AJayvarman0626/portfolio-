import HeroCard from "../components/HeroCard";
import Journey from "../components/Journey";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import TicTacToe from "../components/TicTacToe"

export default function Home() {
  return (
    <main>
      <HeroCard />
      <Journey />
      <Skills />
      <Projects />
      <TicTacToe />
      <Footer />
    </main>
  );
}
