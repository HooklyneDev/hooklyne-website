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
      { q: "Wat doet Hooklyne precies?", a: "Een werkstroom die kant-en-klare prospect-pakketten oplevert. Geverifieerd contact. Live koopsignaal. Eerste mail in je stem. Alles in één portaal. Onder de minuut bekijk en verstuur je 'm." },
      { q: "Is Hooklyne leadgeneratie-software?", a: "Deels. We leveren leads. Geen lijst. Een leadgeneratie-tool stopt bij een naam en een mailadres. Wij maken het hele pakket: geverifieerd contact, een actuele aanleiding, een opgestelde mail. Voor MKB-teams die liever tien goede prospects benaderen dan duizend slechte." },
      { q: "Werkt dit voor koude acquisitie?", a: "Daar is het voor gebouwd. Koude acquisitie werkt alleen als de aanleiding klopt en de mail niet als spam leest. Daarom verifiëren we contacten, scoren we elk signaal dubbel (relevant voor hen, relevant voor jou) en schrijven we in jouw toon." },
      { q: "Is dit weer zo'n AI-prospecting tool?", a: "Nee. De meeste zijn één prompt op een database. Hooklyne is zes gespecialiseerde fases die samenwerken. Eerst onderzoek. Dan pas schrijven." },
      { q: "Wat is het verschil met een contactdatabase?", a: "Een database geeft je een naam. Hooklyne geeft je een geverifieerd contact, een actuele aanleiding om te bellen, en een opgestelde mail. Databases stoppen bij de regel. Wij leveren het hele pakket." },
      { q: "Wat is het verschil met een sales agency?", a: "Een agency kost €2.500+ per maand en haalt het versturen uit jouw handen. Hooklyne kost een fractie. En houdt je aan het stuur, met het onderzoek al gedaan." },
      { q: "Gebruikt Hooklyne AI?", a: "Hooklyne combineert verschillende onderzoeks- en datasystemen. Wat telt is wat in de inbox terechtkomt. Niet wat eronder zit." },
      { q: "Klinkt het bericht alsof een bot het schreef?", a: "Nee. We kalibreren je stem via een interview van 30 minuten en tot vijf voorbeeldmails. Elk concept gaat door vier reasoning-passes voor het bij je belandt." },
    ],
  },
  {
    title: "Contacten, signalen en datakwaliteit",
    short: "Data & signalen",
    items: [
      { q: "Hoe vinden jullie contactgegevens?", a: "Een waterval over 20+ contactdataproviders. Beste bron per regio. Mist de eerste een match, dan probeert de volgende. Tot we een schone hit hebben." },
      { q: "Waarom niet gewoon één database?", a: "Eén provider dekt zo'n 40% van een markt. En elke provider dekt een andere 40%. Eén database betekent dunne dekking en bounces. 20+ gecombineerd, dat is hoe je de contacten bereikt die er toe doen." },
      { q: "Hoe worden mailadressen geverifieerd?", a: "Vier deliverability-lagen. Drie parallelle checks tijdens de enrichment. Eén laatste deliverability-pass aan het eind. Catch-alls, spam traps, role accounts, disposables, bekende klagers - geflagd of weggegooid. Komt het niet door de check, dan gaat het niet uit." },
      { q: "Schaadt verificatie mijn sender reputation?", a: "Nee. Verificatie draait op onze infrastructuur. Niet die van jou. Je domein blijft buiten elke probing." },
      { q: "Welke signalen volgen jullie?", a: "Zeven bronnen. Funding. Hiring. Leiderschapswissels. Launches. Pers. Expansie. Sectornieuws. We kijken continu mee op elke prospect die je volgt." },
      { q: "Hoe vers zijn de signalen?", a: "Binnen uren. We kijken ook direct mee op bedrijfs- en teampagina's. Nieuwe rollen, stille launches, careers-page-uitbreidingen. Vaak voor de pers het oppikt." },
      { q: "Waarom zie ik niet elke nieuwe hire of persbericht?", a: "Elk signaal krijgt twee scores. Relevant voor hen, relevant voor jou. Alleen wat door beide komt, belandt in je inbox." },
      { q: "Hoe goed is de data?", a: "We versturen alleen geverifieerde contacten. De viertraps-verificatie houdt de bouncerate ruim onder de 2% safe zone." },
      { q: "Is de data AVG-proof?", a: "Ja. Nederlands gebouwd. EU-first. Elke provider in de waterval werkt onder de AVG. Compliance zit ingebakken, niet er bovenop geplakt." },
    ],
  },
  {
    title: "Onderzoek en berichtkwaliteit",
    short: "Onderzoek",
    items: [
      { q: "Hoe voorkomen jullie dat er onzin over mijn prospects wordt verzonnen?", a: "Live webonderzoek. Geen trainingsdata. Elke claim te herleiden naar een actuele URL die je aanklikt. Geen verzonnen quotes. Geen verzonnen cijfers. Geen verzonnen klanten." },
      { q: "Kan ik de bronnen achter een meeting brief zien?", a: "Ja. Elke brief toont zijn citaties. Klikbaar. Zo verifieer je elk feit voor je naar binnen loopt." },
      { q: "Hoe personaliseren jullie de berichten?", a: "Sender Profile. Vijf tabs: bedrijf, stem, voorbeeldmails, producten, regels. Eenmalig invullen, zo'n 30 minuten. Vanaf dat moment erft elk bericht je toon via vier reasoning-passes." },
    ],
  },
  {
    title: "Talen en markten",
    short: "Talen",
    items: [
      { q: "Ondersteunen jullie Nederlandse outreach?", a: "Ja. Native Nederlands. Geschreven in de toon die Nederlandse kopers verwachten. Niet vertaald." },
      { q: "Hoe wordt de taal gekozen?", a: "Automatisch, bij het prospecten. Op basis van het bedrijfsdomein en de locatie van het contact. Zodra een prospect binnen is, ligt de taal vast voor dat pakket." },
      { q: "Kan ik prospects buiten Nederland targeten?", a: "Ja. We stemmen de providerselectie af per regio. Sterke dekking in UK, DACH, Benelux en de Nordics." },
      { q: "Is Hooklyne alleen voor Nederlandse bedrijven?", a: "Nederlands gebouwd. Maar elk EMEA-team dat in Nederlands of Engels werkt past hier." },
    ],
  },
  {
    title: "Credits, abonnementen en facturatie",
    short: "Credits & plans",
    items: [
      { q: "Hoe werkt het credit-systeem?", a: "Prospecten, intelligence en meeting prep gebruiken credits. Beoordelen en bewerken niet. Het dashboard laat zien wat is gebruikt en wat over is. Reset maandelijks." },
      { q: "Betaal ik voor contacten die jullie niet kunnen verifiëren?", a: "Nee. Alleen geverifieerde hits worden afgerekend. Geen hit, geen kosten." },
      { q: "Wat als ik halverwege de maand zonder credits zit?", a: "Top-uppen kan op elk plan voor €0,85 per credit. Custom prijzen op Enterprise." },
      { q: "Kan ik van plan wisselen?", a: "Ja. Op elk moment." },
      { q: "Lange contracten?", a: "Geen. Maandelijks of jaarlijks. Jaarlijks scheelt tot €60 per maand. Op elk moment opzegbaar." },
      { q: "Kosten per seat?", a: "Start: 1 seat. Growth: 2. Scale: 5. Enterprise: unlimited." },
    ],
  },
  {
    title: "Pilots en onboarding",
    short: "Pilots",
    items: [
      { q: "Wat is de gratis pilot?", a: "Tien volledig opgebouwde prospects. Gratis. Geverifieerde contacten, live signalen, berichten in je stem. We vragen er een feedbackgesprek van 20 minuten voor terug." },
      { q: "Hoe lang duurt onboarding?", a: "Onder een week voor één rep. Iets langer voor een team. Sender Profile: ~30 minuten per stem. ICP-kalibratie: één of twee passes. Growth en Scale krijgen een kickoff-call en een live training voor het hele team." },
      { q: "Moet ik mijn CRM of sequencer aanpassen?", a: "Nee. Kopieer pakketten in wat je al gebruikt. Of verstuur direct vanuit je inbox." },
      { q: "Wie verstuurt de mails?", a: "Jij. Jouw inbox. Jouw domein. Jouw reputatie." },
    ],
  },
];
