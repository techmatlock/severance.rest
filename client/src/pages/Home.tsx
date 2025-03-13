import { useState } from "react";
import "../index.css";
import GitHubButton from "react-github-btn";
import RefreshIcon from "@mui/icons-material/Refresh";
import XIcon from "@mui/icons-material/X";
import imgUrl from "../../public/lumon.png";
import { useQuotes } from "../context/useQuotes";
import DropDownMenu from "../components/DropdownMenu";

export default function Home() {
  const [index, setIndex] = useState(0);
  const { quotes = [] } = useQuotes();

  const showNextQuote = () => {
    setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handleTwitterShare = () => {
    const text = `${quotes[index].quote} - ${quotes[index].name} #severance`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, "_blank");
  };

  return (
    <>
      <header className="mt-12 text-center">
        <div className="flex justify-center items-center">
          <div className="w-16">
            <img src={imgUrl} alt="a lumon logo" className="rounded-lg" />
          </div>
          <h2 className="text-3xl font-semibold pl-4">severance.rest</h2>
        </div>
        <p className="mt-2">A free REST API for random Severance quotes</p>
      </header>
      <div className="grid min-h-screen">
        <section className="flex flex-col mx-auto mt-8 w-1/2">
          <div className="flex flex-col sm:flex-row items-center">
            <a href="https://api.severance.rest/quotes" target="_blank" className="text-blue-500 hover:underline">
              https://api.severance.rest
            </a>
            <div className="flex gap-8 sm:ml-auto sm:ml-4 mt-4 sm:mt-0">
              <button onClick={() => handleTwitterShare()}>
                <XIcon />
              </button>
              <button onClick={showNextQuote}>
                <RefreshIcon sx={{ fontSize: 28 }} />
              </button>
            </div>
          </div>

          <div>
            {quotes.length > 0 ? (
              <blockquote className="py-8 px-8 bg-slate-100 rounded mx-auto mt-8 h-[250px] sm:h-[150px]">
                <p>"{quotes[index].quote}"</p>
                <footer className="flex justify-end pt-4">- {quotes[index].name}</footer>
              </blockquote>
            ) : (
              <p className="text-center mt-8">Loading quote...</p>
            )}
          </div>
          <DropDownMenu />
          <div className="mt-8 mx-auto">
            <GitHubButton href="https://github.com/techmatlock/severance.rest" data-color-scheme="light" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star techmatlock/severance.rest on GitHub">
              Star
            </GitHubButton>
          </div>
        </section>
      </div>
    </>
  );
}
