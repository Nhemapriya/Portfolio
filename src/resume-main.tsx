import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./lib/theme";
import { ResumePage } from "./components/ResumePage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <div className="aurora" aria-hidden />
      <div className="grid-overlay" aria-hidden />
      <ResumePage />
    </ThemeProvider>
  </StrictMode>,
);
