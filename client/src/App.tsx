import { useState } from "react";
import "./App.css";
import DropDownMenu from "./components/DropdownMenu";

type Quote = {
  name: string;
  quote: string;
  quoteId: number;
};

const quotes: Quote[] = [
  {
    name: "Mr. Milchick",
    quote: "Okay, refiners! Let's get this new group photo before the melon bloat sets in.",
    quoteId: 2,
  },
  {
    name: "Mr. Milchick",
    quote: "Okay, refiners! Let's get this new group photo before the melon bloat sets in.",
    quoteId: 3,
  },
  {
    name: "Mr. Milchick",
    quote: "Do you know how to make your eyes kind?",
    quoteId: 4,
  },
];

function App() {
  const [index, setIndex] = useState(0);

  const showNextQuote = () => {
    setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  return (
    <main className="grid">
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold">severance.rest</h2>
        <p className="mt-2">A free REST API for random Severance quotes</p>
      </div>
      <div className="flex flex-col mx-auto mt-8 w-1/2">
        <div className="flex flex-col sm:flex-row items-center">
          <a href="https://api.severance.rest" target="_blank" className="text-blue-500 hover:underline">
            https://api.severance.rest
          </a>
          <div className="flex gap-4 md:ml-auto">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-600">tweet</button>
            <button onClick={showNextQuote} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-600">
              refresh
            </button>
          </div>
        </div>

        <div>
          <blockquote className="py-8 px-8 bg-slate-100 rounded mx-auto mt-8">
            <p>"{quotes[index].quote}"</p>
            <footer className="flex justify-end">- {quotes[index].name}</footer>
          </blockquote>
        </div>
        <DropDownMenu />
      </div>
    </main>
  );
}

export default App;
