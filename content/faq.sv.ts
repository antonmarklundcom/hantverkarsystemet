// FAQ-data — DRAFT, samma tonregler som copy.sv.ts. Källa för FAQ-sektionen
// och FAQPage JSON-LD (lib/jsonld.ts).

export const faqItems = [
  {
    question: "Hur lång tid tar det innan det är igång?",
    answer:
      "Vi sätter upp allt åt dig. De flesta är igång inom några dagar från att vi fått dina uppgifter — du behöver bara svara på ett par frågor om ditt företag.",
  },
  {
    question: "Måste jag kunna teknik?",
    answer:
      "Nej. Du behöver inte installera något eller lära dig något nytt system. Vi sköter uppsättningen, och sedan sköter det sig själv i bakgrunden.",
  },
  {
    question: "Får jag behålla mitt telefonnummer?",
    answer:
      "Ja. Ditt vanliga nummer fungerar precis som vanligt — SMS-svaret skickas i bakgrunden när du missar ett samtal, du behöver inte byta nummer.",
  },
  {
    question: "Hur lång är bindningstiden?",
    answer:
      "3 månader. Därefter fortsätter det löpande månad för månad, och du säger upp när du vill.",
  },
  {
    question: "Vad händer om jag säger upp?",
    answer:
      "Du hör av dig till oss så avslutar vi tjänsten från och med nästa månadsskifte. Inga krångliga villkor.",
  },
  {
    question: "Vem skriver SMS:en och hemsidan?",
    answer:
      "Vi gör det åt dig, baserat på ditt företag och vad du gör. Du får se och godkänna innan något går live.",
  },
  {
    question: "Får jag hjälp om något krånglar?",
    answer:
      "Ja, du når oss via telefon om du har frågor eller vill ändra något.",
  },
] as const;
