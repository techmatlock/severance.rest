import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QuotesProvider } from "./context/QuotesContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QuotesProvider>
        <App />
      </QuotesProvider>
    </BrowserRouter>
  </StrictMode>
);
