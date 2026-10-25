import { ThemeProvider } from "./lib/theme";
import { SmoothScroll } from "./components/SmoothScroll";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { TalksPreview } from "./components/TalksPreview";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="aurora" aria-hidden />
        <div className="grid-overlay" aria-hidden />
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Skills />
          <TalksPreview />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </SmoothScroll>
    </ThemeProvider>
  );
}
