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
      { q: "What are the different ways to start prospecting?", a: "Four paths: describe your ICP and get a ranked shortlist, paste a domain and get matched decision-makers, paste a name or LinkedIn URL and get verified contact and outreach, or upload your best customers to find the next 50 with the same shape (coming soon). Every path lands on the same ready-to-send package." },
      { q: "Where do my completed prospects go?", a: "Into My Leads - a pipeline view with status, signal, and outreach angle for every prospect. Filter, sort, expand for the full brief, and go straight to Meeting Prep from there. No CSV or CRM entry needed to track them." },
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
      { q: "Can I track signals from a prospect after I've already reached out?", a: "Yes. Flip tracking on for any lead in My Leads. When something new happens - a hire, a funding round, a launch - it surfaces in your dashboard. You pick the moment, not the calendar." },
    ],
  },
  {
    title: "Research and message quality",
    short: "Research",
    items: [
      { q: "How do you avoid making stuff up about my prospects?", a: "Live web research, not training data. Every claim traces back to a current URL you can click. No invented quotes, no made-up stats, no fabricated customers." },
      { q: "Can I see the sources behind a meeting brief?", a: "Yes. Every brief shows its citations, clickable, so you can verify any fact before you walk in." },
      { q: "How do you personalise the messages?", a: "Sender Profile: five tabs - company, voice, example emails, products, rules. Set it once (about 30 minutes). Every message from that point inherits your voice through four reasoning passes." },
      { q: "What is Meeting Prep?", a: "A live-researched brief built for the prospect you are about to meet. Company snapshot, decision-maker context, recent signals, and talking points - each claim linked to a real URL. One click from My Leads, pre-filled." },
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
      { q: "Wat doet Hooklyne precies?", a: "Een onderzoeksworkflow die kant-en-klare prospectpakketten oplevert, met een geverifieerd contact, een real-time koopsignaal en een eerste mail in jouw stem; alles in één portaal en binnen een minuut te beoordelen en te versturen." },
      { q: "Is Hooklyne leadgeneratie-software?", a: "Deels: we leveren leads, maar geen platte lijst. Een leadgeneratie-tool stopt bij een naam en een mailadres. Wij leveren het hele pakket: een geverifieerd contact, een actuele aanleiding en een opgestelde mail. Voor MKB-teams die liever tien goede prospects benaderen dan duizend slechte." },
      { q: "Werkt dit voor koude acquisitie?", a: "Daar is Hooklyne voor gebouwd. Koude acquisitie werkt alleen als de aanleiding klopt en de mail niet als spam binnenkomt, dus verifiëren we elk contact, scoren we elk signaal dubbel (relevant voor hen, relevant voor jou) en schrijven we in jouw eigen toon." },
      { q: "Is dit weer zo'n AI-prospecting tool?", a: "Nee. De meeste AI-tools zijn één prompt op één database. Hooklyne combineert zes gespecialiseerde fases die samenwerken: eerst onderzoek, dan pas schrijven." },
      { q: "Wat is het verschil met een contactdatabase?", a: "Een database geeft je een naam. Hooklyne levert je een geverifieerd contact, een actuele aanleiding én een opgestelde mail. Databases stoppen bij de regel; wij leveren het hele pakket." },
      { q: "Wat is het verschil met een sales agency?", a: "Een agency kost €2.500+ per maand en haalt het versturen uit jouw handen. Hooklyne kost een fractie daarvan en houdt jou aan het stuur, met het onderzoek al gedaan." },
      { q: "Gebruikt Hooklyne AI?", a: "Hooklyne combineert verschillende onderzoeks- en datasystemen tot één workflow. Wat telt is wat in de inbox terechtkomt, niet wat eronder draait." },
      { q: "Klinkt het bericht alsof een bot het schreef?", a: "Nee. We kalibreren je stem op basis van een interview van 30 minuten en tot vijf voorbeeldmails, en elk concept gaat door vier controlestappen voor het bij jou belandt." },
      { q: "Hoe kan ik starten met prospecten?", a: "Vier manieren: beschrijf je ideale klant en ontvang een gerangschikte shortlist, plak een domein en krijg drie matched beslissers, plak een naam of LinkedIn-URL en ontvang geverifieerd contact met concept-outreach, of upload je beste klanten om de volgende 50 met hetzelfde profiel te vinden (binnenkort). Elke weg leidt naar hetzelfde kant-en-klare pakket." },
      { q: "Waar komen mijn afgeronde prospects terecht?", a: "In My Leads, een pipelineoverzicht met status, signaal en outreach-invalshoek per prospect. Filteren, sorteren, uitklappen voor het volledige briefje, en direct doorsturen naar Gespreksvoorbereiding. Geen CSV of CRM-invoer nodig." },
    ],
  },
  {
    title: "Contacten, signalen en datakwaliteit",
    short: "Data & signalen",
    items: [
      { q: "Hoe vinden jullie contactgegevens?", a: "We gebruiken een waterval over 20+ contactdataproviders en kiezen per regio de beste bron. Levert de eerste provider geen geverifieerde match, dan probeert de volgende, totdat we een schone hit hebben." },
      { q: "Waarom niet gewoon één database?", a: "Eén provider dekt meestal zo'n 40% van een markt, en elke provider dekt een andere 40%; één database betekent dus dunne dekking en bounces. Door 20+ bronnen te combineren bereik je de contacten die er werkelijk toe doen." },
      { q: "Hoe worden mailadressen geverifieerd?", a: "Vier deliverability-lagen: drie parallelle checks tijdens de enrichment en een laatste deliverability-pass aan het eind. Catch-alls, spam traps, role accounts, disposables en bekende klagers worden geflagd of weggegooid; komt een adres er niet doorheen, dan gaat het niet uit." },
      { q: "Schaadt verificatie mijn sender reputation?", a: "Nee. Verificatie draait op onze infrastructuur en niet op die van jou, dus jouw domein blijft buiten elke probing." },
      { q: "Welke signalen volgen jullie?", a: "Zeven bronnen: funding, nieuwe aanstellingen, leiderschapswissels, lanceringen, pers, expansie en sectornieuws. Elke gevolgde prospect wordt continu in de gaten gehouden." },
      { q: "Hoe vers zijn de signalen?", a: "Binnen uren. We monitoren ook direct mee op bedrijfs- en teampagina's, zodat we nieuwe rollen, stille launches en uitbreidingen op de careers-pagina vaak oppikken voor de pers ze publiceert." },
      { q: "Waarom zie ik niet elke nieuwe aanstelling of elk persbericht?", a: "Elk signaal krijgt twee scores, een voor relevantie aan hun kant en een voor jouw kant. Alleen signalen die door beide checks komen, belanden in jouw inbox." },
      { q: "Hoe goed is de data?", a: "We versturen alleen geverifieerde contacten, en de viertraps-verificatie houdt de bouncerate ruim onder de 2% safe zone die in de markt gangbaar is." },
      { q: "Is de data AVG-proof?", a: "Ja. Hooklyne is in Nederland gebouwd en EU-first opgezet; elke provider in de waterval werkt onder de AVG en compliance is van begin af aan ingebakken in de workflow, niet er bovenop geplakt." },
      { q: "Kan ik signalen blijven volgen nadat ik een prospect heb benaderd?", a: "Ja. Zet tracking aan voor elke lead in My Leads. Bij een nieuwe aanstelling, fundingronde of lancering zie je het direct in je dashboard. Jij kiest het juiste moment, niet de kalender." },
    ],
  },
  {
    title: "Onderzoek en berichtkwaliteit",
    short: "Onderzoek",
    items: [
      { q: "Hoe voorkomen jullie dat er onzin over mijn prospects wordt verzonnen?", a: "We doen live webonderzoek in plaats van te leunen op stoffige trainingsdata, en elke claim is te herleiden naar een actuele URL die je kunt aanklikken. Geen verzonnen quotes, geen verzonnen cijfers, geen verzonnen klanten." },
      { q: "Kan ik de bronnen achter een meeting brief zien?", a: "Ja. Elke brief toont zijn citaties klikbaar in de tekst, zodat je elk feit kunt verifiëren voordat je het gesprek ingaat." },
      { q: "Hoe personaliseren jullie de berichten?", a: "Via het Sender Profile met vijf tabs: bedrijf, stem, voorbeeldmails, producten en regels. Eenmalig invullen kost zo'n 30 minuten, en vanaf dat moment erft elk bericht jouw toon via vier controlestappen." },
      { q: "Wat is Gespreksvoorbereiding?", a: "Een live-onderzocht briefje voor de prospect die je gaat ontmoeten. Bedrijfsoverzicht, contactcontext, recente signalen en gespreksaanknopingspunten - elke claim gekoppeld aan een echte URL. Eén klik vanuit My Leads, al ingevuld." },
    ],
  },
  {
    title: "Talen en markten",
    short: "Talen",
    items: [
      { q: "Ondersteunen jullie Nederlandse outreach?", a: "Ja. Native Nederlands, geschreven in de toon die Nederlandse kopers verwachten, en niet vertaald uit het Engels." },
      { q: "Hoe wordt de taal gekozen?", a: "Automatisch tijdens het prospecten, op basis van het bedrijfsdomein en de locatie van het contact. Zodra een prospect binnen is, ligt de taal vast voor dat pakket." },
      { q: "Kan ik prospects buiten Nederland targeten?", a: "Ja. We stemmen de providerselectie per regio af en hebben sterke dekking in UK, DACH, Benelux en de Nordics." },
      { q: "Is Hooklyne alleen voor Nederlandse bedrijven?", a: "Hooklyne is in Nederland gebouwd, maar elk EMEA-team dat in Nederlands of Engels werkt past hier prima." },
    ],
  },
  {
    title: "Credits, abonnementen en facturatie",
    short: "Credits & plans",
    items: [
      { q: "Hoe werkt het credit-systeem?", a: "Prospecten, intelligence en meeting prep verbruiken credits. Beoordelen en bewerken zijn altijd gratis. Het dashboard toont je verbruik en het saldo, dat maandelijks reset." },
      { q: "Betaal ik voor contacten die jullie niet kunnen verifiëren?", a: "Nee. Alleen geverifieerde hits worden afgerekend: geen hit, geen kosten." },
      { q: "Wat als ik halverwege de maand zonder credits zit?", a: "Op elk plan kun je top-uppen voor €0,85 per credit; op Enterprise gelden custom prijzen." },
      { q: "Kan ik van plan wisselen?", a: "Ja, op elk moment." },
      { q: "Lange contracten?", a: "Geen lange contracten. Maandelijks of jaarlijks, waarbij jaarlijks tot €60 per maand scheelt, en altijd opzegbaar." },
      { q: "Kosten per seat?", a: "Start: 1 seat. Growth: 2 seats. Scale: 5 seats. Enterprise: ongelimiteerd." },
    ],
  },
  {
    title: "Pilots en onboarding",
    short: "Pilots",
    items: [
      { q: "Wat is de gratis pilot?", a: "Tien volledig opgebouwde prospectpakketten, gratis, met geverifieerde contacten, real-time signalen en berichten in jouw stem. We vragen er een feedbackgesprek van 20 minuten voor terug." },
      { q: "Hoe lang duurt onboarding?", a: "Onder een week voor één rep, iets langer voor een heel team. Het Sender Profile kost ongeveer 30 minuten per stem, en de ICP-kalibratie vraagt een of twee passes. Growth en Scale krijgen een kickoff-call en een live training voor het hele team." },
      { q: "Moet ik mijn CRM of sequencer aanpassen?", a: "Nee. Je kopieert pakketten in wat je al gebruikt, of verstuurt direct vanuit je inbox." },
      { q: "Wie verstuurt de mails?", a: "Jij. Jouw inbox, jouw domein, jouw reputatie." },
    ],
  },
];
