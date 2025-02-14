import { useState } from "react";
import "./App.css";

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
      <div className="flex flex-col mx-auto mt-8">
        <div className="flex items-center">
          <a href="https://api.severance.rest" target="_blank" className="text-blue-500 hover:underline">
            https://api.severance.rest
          </a>
          <div className="flex gap-4 ml-auto">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-600">tweet</button>
            <button onClick={showNextQuote} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-600">
              refresh
            </button>
          </div>
        </div>

        <div className="py-8 px-8 bg-slate-100 rounded mx-auto mt-8">
          <blockquote>
            <p>"{quotes[index].quote}"</p>
            <footer className="flex justify-end">- {quotes[index].name}</footer>
          </blockquote>
        </div>

        <div id="accordion-arrow-icon" data-accordion="open">
          <div id="accordion-arrow-icon-body-1" aria-labelledby="accordion-arrow-icon-heading-1"></div>
          <h2 id="accordion-arrow-icon-heading-3">
            <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-arrow-icon-body-3" aria-expanded="false" aria-controls="accordion-arrow-icon-body-3">
              <span>Accordion without arrow rotation</span>
              <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5" />
              </svg>
            </button>
          </h2>
          <div id="accordion-arrow-icon-body-3" className="hidden" aria-labelledby="accordion-arrow-icon-heading-3">
            <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
              <p className="mb-2 text-gray-500 dark:text-gray-400">The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone components, whereas Tailwind UI offers sections of pages.</p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no technical reason stopping you from using the best of two worlds.</p>
              <p className="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
              <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                <li>
                  <a href="https://flowbite.com/pro/" className="text-blue-600 dark:text-blue-500 hover:underline">
                    Flowbite Pro
                  </a>
                </li>
                <li>
                  <a href="https://tailwindui.com/" rel="nofollow" className="text-blue-600 dark:text-blue-500 hover:underline">
                    Tailwind UI
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
