export type QA = { q: string; a: string };
export type Group = { title: string; short: string; items: QA[] };

export const faqGroups: Group[] = [
  {
    title: "How Hooklyne works",
    short: "How it works",
    items: [
      { q: "What does Hooklyne actually do?", a: "A research workflow that ships ready-to-send prospect packages. Verified contacts, a live signal, and a first message in your voice. One portal. Under a minute to review and send." },
      { q: "Is this just another AI prospecting tool?", a: "No. Most are one ask and a database. Hooklyne is six specialised stages working together. Research first, writing last." },
      { q: "How is Hooklyne different from a contact database?", a: "A database gives you a name. Hooklyne gives you a verified contact, a live reason to reach out, and a drafted message. Databases stop at the row. We deliver the whole package." },
      { q: "How is Hooklyne different from a sales agency?", a: "Agencies cost €2,500+ a month and take the sending away from you. Hooklyne costs a fraction of that and keeps you in the sales seat, with the research already done." },
      { q: "Does Hooklyne use AI?", a: "Hooklyne combines several research and data systems into one workflow. Point is what shows up in the inbox, not what's under the hood." },
      { q: "Will the messages sound like a bot wrote them?", a: "No. Voice is calibrated from a 30-minute interview and up to five example emails. Every draft is reasoned through four times before it reaches you." },
    ],
  },
  {
    title: "Contacts, signals, and data quality",
    short: "Data & signals",
    items: [
      { q: "How do you find contact details?", a: "A waterfall across 20+ contact data providers, picking the best source per region. If one doesn't return a verified match, the next tries. Until we get a clean hit." },
      { q: "Why not just use one database?", a: "Any single provider covers about 40% of a market, and every provider covers a different 40%. One database means thin coverage and bounces. 20+ combined is how you reach the contacts that actually move." },
      { q: "How are email addresses verified?", a: "Four deliverability layers. Three parallel checks during enrichment, plus a final deliverability pass. Catch-alls, spam traps, role accounts, disposables, known complainers - flagged or dropped. If it can't be verified, it doesn't ship." },
      { q: "Will verifying my prospects damage my sender reputation?", a: "No. Verification runs on our infrastructure, not yours. Your domain never touches the probing." },
      { q: "What signals do you track?", a: "Seven sources: funding, hiring, leadership, launches, press, expansion, sector news. Every tracked prospect watched continuously." },
      { q: "How fresh are the signals?", a: "Within hours. We also watch company and team pages directly - new roles, quiet launches, careers-page expansions - often before the press picks up." },
      { q: "Why don't I see every hire and press release?", a: "Every signal is scored twice: matters to them, matters to you. Only the ones that pass both land in your inbox." },
      { q: "How accurate is the data?", a: "We ship only verified contacts. The four-layer verification holds bounce rate well below the 2% industry safe zone." },
      { q: "Is the data GDPR-compliant?", a: "Yes. Dutch-built, EU-first. Every provider in the waterfall operates under GDPR. Compliance is baked in, not bolted on." },
    ],
  },
  {
    title: "Research and message quality",
    short: "Research",
    items: [
      { q: "How do you avoid making stuff up about my prospects?", a: "Live web research, not training data. Every claim traces back to a current URL you can click. No invented quotes, no made-up stats, no fabricated customers." },
      { q: "Can I see the sources behind a meeting brief?", a: "Yes. Every brief shows its citations, clickable, so you can verify any fact before you walk in." },
      { q: "How do you personalise the messages?", a: "Sender Profile: five tabs - company, voice, example emails, products, rules. Set it once (about 30 minutes). Every message from that point inherits your voice through four reasoning passes." },
    ],
  },
  {
    title: "Languages and markets",
    short: "Languages",
    items: [
      { q: "Do you support Dutch outreach?", a: "Yes. Native Dutch, written to the tone Dutch buyers expect. Not translated." },
      { q: "How is the language chosen?", a: "Automatically, at prospecting. From the company domain and the contact's location. Once a prospect is in, language is locked for that package." },
      { q: "Can I target prospects outside the Netherlands?", a: "Yes. Provider selection tunes per region. Strong coverage across the UK, DACH, Benelux, and the Nordics." },
      { q: "Is Hooklyne only for Dutch companies?", a: "Dutch-built, but any EMEA team working in Dutch or English is a fit." },
    ],
  },
  {
    title: "Credits, plans, and billing",
    short: "Credits & plans",
    items: [
      { q: "How does the credit system work?", a: "Prospecting, intelligence, and meeting prep use credits. Reviewing and editing don't. Dashboard shows what's used, what's left. Resets monthly." },
      { q: "Do I pay for contacts we can't verify?", a: "No. Only verified hits are charged. No hit, no charge." },
      { q: "What if I run out mid-month?", a: "Top-ups on every plan at €0.85 per credit. Custom rates on Enterprise." },
      { q: "Can I change plans?", a: "Yes, anytime." },
      { q: "Long-term contract?", a: "No. Monthly or annual - annual saves up to €60/month. Cancel anytime." },
      { q: "Per-seat fees?", a: "Start 1 seat, Growth 2, Scale 5, Enterprise unlimited." },
    ],
  },
  {
    title: "Pilots and onboarding",
    short: "Pilots",
    items: [
      { q: "What's the free pilot?", a: "Ten fully built prospects, free. Verified contacts, live signals, messages in your voice. We ask for a 20-minute feedback call in return." },
      { q: "How long does onboarding take?", a: "Under a week for a single rep. A bit longer for a team. Sender Profile takes ~30 minutes per voice. ICP calibration, one or two passes. Growth and Scale include a kick-off call and a live training session for the whole team." },
      { q: "Do I need to change my CRM or sequencer?", a: "No. Copy packages into what you already use, or send from your inbox." },
      { q: "Who sends the emails?", a: "You do. Your inbox, your domain, your reputation." },
    ],
  },
];

export const faqGroupsNL: Group[] = [
  {
    title: "Hoe Hooklyne werkt",
    short: "Hoe het werkt",
    items: [
      { q: "Wat doet Hooklyne precies?", a: "Een onderzoekswerkstroom die kant-en-klare prospect-pakketten oplevert. Geverifieerde contacten, een live signaal en een eerste mail in je stem. Eén portaal. In minder dan een minuut bekijk en verstuur je 'm." },
      { q: "Is Hooklyne leadgeneratie-software?", a: "Deels. We genereren leads, maar we zijn geen lijstenleverancier. Een leadgeneratie-tool stopt bij een naam en een mailadres. Wij leveren het hele pakket: geverifieerd contact, een actuele koopreden, een opgestelde mail. Voor MKB-teams die liever tien goede prospects benaderen dan duizend slechte." },
      { q: "Werkt dit voor koude acquisitie?", a: "Ja, en het is precies waar we voor gebouwd zijn. Koude acquisitie werkt alleen als de aanleiding klopt en de mail niet als spam leest. Daarom verifiëren we contacten, scoren we signalen dubbel (relevant voor hen, relevant voor jou) en schrijven we in je stem." },
      { q: "Is dit weer zo'n AI-prospecting tool?", a: "Nee. De meeste zijn één prompt op een database. Hooklyne is zes gespecialiseerde fases die samen werken. Onderzoek eerst, schrijven als laatste." },
      { q: "Wat is het verschil met een contactdatabase?", a: "Een database geeft je een naam. Hooklyne geeft je een geverifieerd contact, een actuele aanleiding om te bellen en een opgesteld bericht. Databases stoppen bij de regel. Wij leveren het hele pakket." },
      { q: "Wat is het verschil met een sales agency?", a: "Agencies kosten €2.500+ per maand en nemen het versturen uit je handen. Hooklyne kost een fractie daarvan en houdt je aan het stuur, met het onderzoek al gedaan." },
      { q: "Gebruikt Hooklyne AI?", a: "Hooklyne combineert verschillende onderzoeks- en datasystemen tot één werkstroom. Wat telt is wat in de inbox terechtkomt, niet wat eronder zit." },
      { q: "Klinkt het bericht alsof een bot het schreef?", a: "Nee. De stem wordt gekalibreerd via een interview van 30 minuten en tot vijf voorbeeldmails. Elk concept gaat door vier reasoning-passes voordat het bij je belandt." },
    ],
  },
  {
    title: "Contacten, signalen en datakwaliteit",
    short: "Data & signalen",
    items: [
      { q: "Hoe vinden jullie contactgegevens?", a: "Een waterval over 20+ contactdataproviders, met de beste bron per regio. Mist de eerste een geverifieerde match, dan probeert de volgende. Tot we een schone hit hebben." },
      { q: "Waarom niet gewoon één database?", a: "Eén provider dekt zo'n 40% van een markt, en elke provider dekt een andere 40%. Eén database betekent dunne dekking en bounces. 20+ gecombineerd is hoe je de contacten bereikt die er toe doen." },
      { q: "Hoe worden e-mailadressen geverifieerd?", a: "Vier deliverability-lagen. Drie parallelle checks tijdens de enrichment, plus een laatste deliverability-pass. Catch-alls, spam traps, role accounts, disposables, bekende klagers - geflagd of weggegooid. Komt het niet door de check, dan gaat het niet uit." },
      { q: "Schaadt verificatie mijn sender reputation?", a: "Nee. Verificatie draait op onze infrastructuur, niet die van jou. Je domein blijft buiten elke probing." },
      { q: "Welke signalen volgen jullie?", a: "Zeven bronnen: funding, hiring, leiderschapswissels, launches, pers, expansie, sectornieuws. We houden elke gevolgde prospect continu in de gaten." },
      { q: "Hoe vers zijn de signalen?", a: "Binnen uren. We kijken ook direct mee op bedrijfs- en teampagina's - nieuwe rollen, stille launches, uitbreidingen op de careers-pagina - vaak voordat de pers het oppikt." },
      { q: "Waarom zie ik niet elke nieuwe hire of persbericht?", a: "Elk signaal krijgt twee scores: relevant voor hen, relevant voor jou. Alleen wat door beide komt, belandt in je inbox." },
      { q: "Hoe goed is de data?", a: "We versturen alleen geverifieerde contacten. De viertraps-verificatie houdt de bouncerate ruim onder de 2% industry safe zone." },
      { q: "Is de data AVG-proof?", a: "Ja. Nederlands gebouwd, EU-first. Elke provider in de waterval werkt onder de AVG. Compliance zit ingebakken, niet erbij geplakt." },
    ],
  },
  {
    title: "Onderzoek en berichtkwaliteit",
    short: "Onderzoek",
    items: [
      { q: "Hoe voorkomen jullie dat er onzin over mijn prospects wordt verzonnen?", a: "Live webonderzoek, geen trainingsdata. Elke claim is te herleiden naar een actuele URL die je kunt aanklikken. Geen verzonnen quotes, geen verzonnen cijfers, geen verzonnen klanten." },
      { q: "Kan ik de bronnen achter een meeting brief zien?", a: "Ja. Elke brief toont zijn citaties, klikbaar, zodat je elk feit kunt verifiëren voordat je naar binnen loopt." },
      { q: "Hoe personaliseren jullie de berichten?", a: "Sender Profile: vijf tabs - bedrijf, stem, voorbeeldmails, producten, regels. Eenmalig invullen (zo'n 30 minuten). Vanaf dat moment erft elk bericht je stem via vier reasoning-passes." },
    ],
  },
  {
    title: "Talen en markten",
    short: "Talen",
    items: [
      { q: "Ondersteunen jullie Nederlandse outreach?", a: "Ja. Native Nederlands, geschreven in de toon die Nederlandse kopers verwachten. Niet vertaald." },
      { q: "Hoe wordt de taal gekozen?", a: "Automatisch, bij het prospecten. Op basis van het bedrijfsdomein en de locatie van het contact. Zodra een prospect binnen is, ligt de taal vast voor dat pakket." },
      { q: "Kan ik prospects buiten Nederland targeten?", a: "Ja, we stemmen de providerselectie af per regio. Sterke dekking in UK, DACH, Benelux en de Nordics." },
      { q: "Is Hooklyne alleen voor Nederlandse bedrijven?", a: "Nederlands gebouwd, maar elk EMEA-team dat in Nederlands of Engels werkt past hier." },
    ],
  },
  {
    title: "Credits, abonnementen en facturatie",
    short: "Credits & plans",
    items: [
      { q: "Hoe werkt het credit-systeem?", a: "Prospecten, intelligence en meeting prep gebruiken credits. Beoordelen en bewerken niet. Het dashboard laat zien wat is gebruikt en wat over is. Reset maandelijks." },
      { q: "Betaal ik voor contacten die jullie niet kunnen verifiëren?", a: "Nee. Alleen geverifieerde hits worden afgerekend. Geen hit, geen kosten." },
      { q: "Wat als ik halverwege de maand zonder credits zit?", a: "Top-ups op elk plan voor €0,85 per credit. Custom tarieven op Enterprise." },
      { q: "Kan ik van plan wisselen?", a: "Ja, op elk moment." },
      { q: "Lange contracten?", a: "Nee. Maandelijks of jaarlijks - jaarlijks scheelt tot €60 per maand. Op elk moment opzegbaar." },
      { q: "Kosten per seat?", a: "Start 1 seat, Growth 2, Scale 5, Enterprise unlimited." },
    ],
  },
  {
    title: "Pilots en onboarding",
    short: "Pilots",
    items: [
      { q: "Wat is de gratis pilot?", a: "Tien volledig opgebouwde prospects, gratis. Geverifieerde contacten, live signalen, berichten in je stem. We vragen er een feedbackgesprek van 20 minuten voor terug." },
      { q: "Hoe lang duurt onboarding?", a: "Onder een week voor één rep. Iets langer voor een team. Sender Profile is ~30 minuten per stem. ICP-kalibratie, één of twee passes. Growth en Scale krijgen een kickoff-call en een live training voor het hele team." },
      { q: "Moet ik mijn CRM of sequencer aanpassen?", a: "Nee. Kopieer pakketten in wat je al gebruikt, of verstuur vanuit je inbox." },
      { q: "Wie verstuurt de mails?", a: "Jij. Jouw inbox, jouw domein, jouw reputatie." },
    ],
  },
];
