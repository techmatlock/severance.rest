import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import quotes from "../quotes-list.json";

export default function DropDownMenu() {
  return (
    <div className="mt-8">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography component="span">Quotes List</Typography>
        </AccordionSummary>
        <AccordionDetails className="max-h-60 overflow-y-auto">
          {quotes?.length > 0 ? (
            <ul className="space-y-2">
              {quotes.map((quote, index) => (
                <li key={index} className="border-b pb-2">
                  <span>
                    "{quote.quote}" - <strong>{quote.name}</strong>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="space-y-2">
              <li className="border-b pb-2">
                <span>Loading quotes...</span>
              </li>
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
