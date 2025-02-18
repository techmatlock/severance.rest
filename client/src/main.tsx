import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QuotesProvider } from "./context/QuotesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuotesProvider>
      <App />
    </QuotesProvider>
  </StrictMode>
);
