// FAQ-data: enda källan för både FAQ-sektionen och FAQPage JSON-LD.
// TODO(ägare): granska svaren, särskilt uppstartstiden nedan som kräver en
// verifierad siffra från Fas 0 innan publicering.

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Hur lång tid tar det att komma igång?",
    answer:
      "TODO(ägare): fyll i verklig, verifierad uppstartstid från Fas 0-testet innan publicering. Ingen siffra publiceras förrän den är bekräftad i praktiken.",
  },
  {
    question: "Måste jag kunna teknik?",
    answer:
      "Nej. Vi sätter upp allt åt dig. Du behöver bara svara på några frågor om ditt företag när vi kommer igång, sen sköter systemet resten av sig själv.",
  },
  {
    question: "Får jag hjälp om något krånglar?",
    answer: "Ja, du når support på svenska. Vi finns till hands om du kör fast eller undrar över något.",
  },
  {
    question: "Behåller jag mitt vanliga telefonnummer?",
    answer:
      "Ja. Det är samma nummer som dina kunder redan ringer — vi kopplar bara på ett automatiskt SMS-svar när du missar samtalet. Du byter inget nummer.",
  },
  {
    question: "Vad gäller med bindningstid?",
    answer:
      "3 månaders bindningstid, sen löpande månadsvis. Vi är ärliga med det redan här — ingen finstilt text som säger något annat.",
  },
  {
    question: "Vad händer när jag säger upp?",
    answer:
      "SMS-svaren och recensionsfrågorna stängs av, och hemsidan tas ner. Du hör av dig till oss så hjälper vi dig med uppsägningen — inget krångel.",
  },
  {
    question: "Vem skriver SMS:en och hemsidan?",
    answer:
      "Vi hjälper dig sätta upp texten från början utifrån ditt företag, så den låter som dig — inte som en robot.",
  },
];
