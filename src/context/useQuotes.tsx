import { useContext } from "react";
import { QuotesContext, QuotesContextValues } from "./QuotesContext";

export function useQuotes(): QuotesContextValues {
  const values = useContext(QuotesContext);
  if (!values) throw new Error("useQuotes must be used inside a QuotesProvider");
  return values;
}
