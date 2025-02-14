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
];

export default function DropDownMenu() {
  return (
    <div className="mt-8">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography component="span">Quotes List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {quotes.map((quote) => (
            <ul key={quote.quoteId}>
              <span>
                {quote.quote} - {quote.name}
              </span>
            </ul>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
