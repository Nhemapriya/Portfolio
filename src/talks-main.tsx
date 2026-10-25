import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./lib/theme";
import { SmoothScroll } from "./components/SmoothScroll";
import { TalksPage } from "./components/TalksPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <SmoothScroll>
        <div className="aurora" aria-hidden />
        <div className="grid-overlay" aria-hidden />
        <TalksPage />
      </SmoothScroll>
    </ThemeProvider>
  </StrictMode>,
);
