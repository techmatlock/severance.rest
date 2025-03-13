import { createContext, ReactNode, useEffect, useState } from "react";
import { API_URL, Quotes } from "../lib/data";
import { useLocation } from "react-router-dom";

export type QuotesContextValues = {
  quotes: Quotes[] | undefined;
  getQuotes: () => void;
};

export const QuotesContext = createContext<QuotesContextValues>({
  quotes: undefined,
  getQuotes: () => undefined,
});

type Props = {
  children: ReactNode;
};

export function QuotesProvider({ children }: Props) {
  const [quotes, setQuotes] = useState<Quotes[]>([]);
  const [error, setError] = useState<unknown>();
  const location = useLocation();

  useEffect(() => {
    async function loadQuotes() {
      try {
        if (location.pathname === "/") {
          const data = await getQuotes();
          setQuotes(data);
        }
      } catch (error) {
        setError(error);
      }
    }
    loadQuotes();
  }, [location.pathname]);

  async function getQuotes(): Promise<Quotes[]> {
    const res = await fetch(`${API_URL}/quotes`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Response status: ${res.status}`);
    return (await res.json()) as Quotes[];
  }

  if (error) {
    return <div>Error! {error instanceof Error ? error.message : "Unknown error"}</div>;
  }

  const contextValue = {
    quotes,
    getQuotes,
  };

  return <QuotesContext.Provider value={contextValue}>{children}</QuotesContext.Provider>;
}
