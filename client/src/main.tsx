import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QuotesProvider } from "./context/QuotesContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Authenticator.Provider>
        <QuotesProvider>
          <App />
        </QuotesProvider>
      </Authenticator.Provider>
    </BrowserRouter>
  </StrictMode>
);
