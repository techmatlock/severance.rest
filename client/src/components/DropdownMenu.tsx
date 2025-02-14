import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  {
    name: "Mark Scout",
    quote: "I have no choice. You do.",
    quoteId: 5,
  },
  {
    name: "Helly R.",
    quote: "Every time you find yourself here, it’s because you chose to come back.",
    quoteId: 6,
  },
  {
    name: "Irving Bailiff",
    quote: "We must reinstate the morning handshake.",
    quoteId: 7,
  },
  {
    name: "Dylan George",
    quote: "I get to see my kid, Mark. My real kid.",
    quoteId: 8,
  },
  {
    name: "Harmony Cobel",
    quote: "You are not your actions here.",
    quoteId: 9,
  },
  {
    name: "Burt Goodman",
    quote: "The surest way to tame a prisoner is to let him believe he's free.",
    quoteId: 10,
  },
  {
    name: "Mr. Milchick",
    quote: "A handshake is available upon request.",
    quoteId: 11,
  },
  {
    name: "Helly R.",
    quote: "What if I'm not happy? What if I'm not even me?",
    quoteId: 12,
  },
  {
    name: "Mark Scout",
    quote: "I want to remember my wife.",
    quoteId: 13,
  },
];

export default function DropDownMenu() {
  return (
    <div className="mt-8">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography component="span">Quotes List</Typography>
        </AccordionSummary>
        <AccordionDetails className="max-h-60 overflow-y-auto">
          {quotes.map((quote) => (
            <ul key={quote.quoteId} className="border-b pb-2">
              <span>
                "{quote.quote}" - <strong>{quote.name}</strong>
              </span>
            </ul>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
