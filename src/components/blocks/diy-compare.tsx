import { useState, useEffect } from "react";
import { Check, X, Clock, Database, Wrench, Briefcase, PaperPlaneTilt, CaretDown } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { useLang, type Lang } from "@/lib/use-lang";

const HooklyneMark = ({ className = "" }: { className?: string }) => (
  <span
    className={`inline-flex items-center justify-center shrink-0 ${className}`}
    style={{ background: "var(--hooklyne-blue)" }}
    aria-hidden="true"
  >
    <img src="/logo-mark.svg" alt="" className="size-5 block" />
  </span>
);

type TabKey = "hooklyne" | "database" | "aioutreach" | "diy" | "agency";

type Step = {
  step: string;
  label: string;
  detail: string;
  time: string;
  callout: string;
  good: boolean;
};

type TabDef = {
  key: TabKey;
  label: string;
  sub: string;
  price?: string;
  icon: Icon;
  tone: "teal" | "orange" | "amber" | "slate" | "rose";
  totalLabel: string;
  total: string;
  totalSub: string;
  goodAt?: string;
  footerNote?: string;
  steps: Step[];
};

const EN_TABS: TabDef[] = [
  {
    key: "hooklyne",
    label: "Hooklyne",
    sub: "Entire workflow",
    price: "€39–239/mo",
    icon: Wrench,
    tone: "teal",
    totalLabel: "Your time",
    total: "≈90s per prospect",
    totalSub: "30s to pick the contact, under a minute to review and send",
    steps: [
      {
        step: "1", label: "Describe the company type",
        detail: "Plain language, not filter grids. We run a semantic match across billions of pages and return a ranked list. Best fit at the top, scored against your ICP.",
        time: "2 min", callout: "A ranked shortlist, not a dump of rows", good: true,
      },
      {
        step: "2", label: "Pick the contact you want to reach",
        detail: "Each company shows available roles. You pick the one that fits. We run a waterfall across 21 contact providers with four verification layers - because no single database has more than 40% of any market.",
        time: "30 sec", callout: "You pick the role. We verify the address.", good: true,
      },
      {
        step: "3", label: "Lands in My Leads with a reason",
        detail: "Every prospect arrives with a signal attached: funding round, hiring move, leadership change, launch. Scored twice - once for the prospect's business, once for what you sell. Only signals that pass both reach you.",
        time: "auto", callout: "A reason to reach out, not just a name.", good: true,
      },
      {
        step: "4", label: "Full email, written in your voice",
        detail: "Four reasoning passes: hook, angle, voice, quality check. Reads like your rep wrote it after doing the research.",
        time: "auto", callout: "Not generic. Dutch or English, locked to the prospect.", good: true,
      },
      {
        step: "5", label: "Track signals from that lead",
        detail: "Monitor any lead for ongoing signals: new funding, team changes, press coverage. You get notified when the moment changes - not when the calendar says so.",
        time: "toggle", callout: "Catch the next moment too, not just the first.", good: true,
      },
      {
        step: "6", label: "Request a meeting brief",
        detail: "When you are ready to meet, request a live-researched brief. Every claim traces to a real URL. Walk in prepared.",
        time: "on demand", callout: "Every claim traces to a source. No made-up facts.", good: true,
      },
    ],
  },
  {
    key: "database",
    label: "Contact database",
    sub: "Rows, filters, exports",
    price: "~€100–300/mo",
    icon: Database,
    tone: "orange",
    totalLabel: "Your time",
    total: "~45 min per prospect",
    totalSub: "research and writing on you",
    goodAt: "Fast, familiar, cheap per row. Great if you already know your ICP tightly and just need to pull a list of contacts to run through your own process.",
    footerNote: "Database price + verification tool + your time. The rows are cheap. The work around them is not.",
    steps: [
      {
        step: "1", label: "Build the filter query",
        detail: "Pick industry, company size, geography, seniority, job function. Save the view. The list refreshes against the database.",
        time: "5 min", callout: "Fast to build a list once you know the filters", good: true,
      },
      {
        step: "2", label: "Export the rows",
        detail: "Download CSV or push to your CRM. You get name, title, company, email, phone if available.",
        time: "instant", callout: "Standard format, works with your existing tools", good: true,
      },
      {
        step: "3", label: "Verify the emails",
        detail: "Some databases include built-in verification, others don't. Coverage and freshness varies by region and database. Bounce rates on single-source data are often high enough on European SMEs that buyers add a second verification tool on top before sending.",
        time: "10 min", callout: "Verification quality varies. A second tool is common.", good: false,
      },
      {
        step: "4", label: "Research each prospect",
        detail: "The row tells you what they do, not what's happening at their company this week. You check LinkedIn, news, funding sites manually to find a reason to reach out.",
        time: "15 min", callout: "The database doesn't know what's changed since last indexed", good: false,
      },
      {
        step: "5", label: "Write the email",
        detail: "Draft from scratch or from a template. No auto-personalisation, no voice matching, no signal-anchored hook - you bring all of that.",
        time: "15 min", callout: "Every message is your writing time", good: false,
      },
    ],
  },
  {
    key: "aioutreach",
    label: "AI outreach tool",
    sub: "Generated emails",
    price: "~€100–500/mo",
    icon: PaperPlaneTilt,
    tone: "amber",
    totalLabel: "Your time",
    total: "≈10 min setup, then ≈30s/prospect",
    totalSub: "research quality is fixed at setup, not adapted per prospect",
    goodAt: "Volume. If you have a clean list and want to send a lot of emails quickly with basic personalisation, these tools ship. They've built fast workflows for configured-once, sent-many campaigns.",
    footerNote: "Fast at sending. Not built for research. If your ICP is tight and your list is pre-verified, this is a sending layer - not a prospecting layer.",
    steps: [
      {
        step: "1", label: "Upload your list and set variables",
        detail: "You need a contact list first. That means buying one from a database, exporting from your CRM, or running a scrape yourself. The tool does not source it. Import the contacts, map the fields, set the variables the AI will fill in: first name, company, a LinkedIn field, a pain you've assumed.",
        time: "10 min", callout: "You source the list yourself. The tool starts after that.", good: true,
      },
      {
        step: "2", label: "Write the template with AI fill-ins",
        detail: "Most tools generate a base email and ask the AI to personalise per prospect. The personalisation pulls from your variables and whatever the model was trained on.",
        time: "5 min", callout: "The AI doesn't research the prospect. It works with what you gave it.", good: false,
      },
      {
        step: "3", label: "Campaign sends on schedule",
        detail: "Warm-up, pacing, deliverability handling. This part they do well.",
        time: "auto", callout: "Sending infrastructure is mature", good: true,
      },
      {
        step: "4", label: "Deal with the reply traffic",
        detail: "Some emails hit. Some bounce (list quality dependent). Some get flagged as generic. The ones that reply come back without the context of why they were messaged.",
        time: "ongoing", callout: "Generic personalisation reads as generic. Response rates reflect it.", good: false,
      },
    ],
  },
  {
    key: "diy",
    label: "DIY stack",
    sub: "Multi-tool, manual",
    price: "~€50–150/mo",
    icon: Wrench,
    tone: "slate",
    totalLabel: "Your time",
    total: "≈70 min per prospect",
    totalSub: "every minute is yours, every prospect starts from scratch",
    goodAt: "Total control. You make every decision. No subscription cost beyond the tools you already have. For a founder doing 2-3 prospects a week, this is genuinely viable - and many are doing exactly this right now.",
    footerNote: "Full control, no multiplier. Sustainable for a handful of prospects a week. Breaks the moment you need volume.",
    steps: [
      {
        step: "1", label: "Build the list",
        detail: "LinkedIn Sales Navigator search, export to spreadsheet. Or a database export, or a scrape. You pick the companies and the people manually.",
        time: "10 min", callout: "You control the shortlist completely", good: true,
      },
      {
        step: "2", label: "Find and verify the email",
        detail: "Try a pattern-matcher or a free email finder. Run it through a verification tool. Manual, slow, and inconsistent across providers.",
        time: "15 min", callout: "One provider's blind spot is your blind spot", good: false,
      },
      {
        step: "3", label: "Research the prospect",
        detail: "Open the company website, their LinkedIn, their recent news. Scan funding databases. Read the CEO's last three posts. Write notes.",
        time: "20 min", callout: "This is where most of your time goes. Every prospect. Every week.", good: false,
      },
      {
        step: "4", label: "Write the email in AI chat",
        detail: "Paste your research into ChatGPT or Claude. Ask for a first draft. Rewrite because it sounds generic. Rewrite again because it invented a fact. Paste back into your sequencer.",
        time: "20 min", callout: "AI is prone to hallucinations. Errors ship if you don't check the output.", good: false,
      },
      {
        step: "5", label: "Send and track manually",
        detail: "Send from your inbox or paste into a sequencer. Update a spreadsheet. Hope you remember to follow up.",
        time: "5 min", callout: "Tracking is a tab you forget to check", good: false,
      },
      {
        step: "6", label: "Do it again next week",
        detail: "The work doesn't compound. Every prospect starts from scratch.",
        time: "ongoing", callout: "Your time is the product", good: false,
      },
    ],
  },
  {
    key: "agency",
    label: "Outbound agency",
    sub: "Fully outsourced",
    price: "€2,500+/mo",
    icon: Briefcase,
    tone: "rose",
    totalLabel: "Your time",
    total: "≈10 min per prospect",
    totalSub: "to review their report, but not your voice, control or learning",
    goodAt: "Off your plate. A good agency brings experienced SDRs, existing infrastructure, and a process. If you have the budget and the patience to onboard them properly, they can book meetings.",
    footerNote: "If budget is not a constraint and you want outbound off your plate entirely, an agency works. For a team that wants to own the function and the learning, the math rarely works.",
    steps: [
      {
        step: "1", label: "Onboard the agency",
        detail: "Strategy calls, ICP documents, persona workshops, messaging reviews. They learn your business. Expensive weeks of calendar time before any prospect is contacted.",
        time: "wks 1-2", callout: "Ramp takes weeks. Budget starts immediately.", good: false,
      },
      {
        step: "2", label: "They run campaigns in their voice",
        detail: "Their SDRs write the messages. They send from their domains or yours. You review drafts, sometimes weekly, sometimes monthly. You are a step removed from what goes out.",
        time: "wks 3+", callout: "The voice in the inbox is not your rep's voice", good: false,
      },
      {
        step: "3", label: "Review results in a report",
        detail: "They deliver a dashboard. Meetings booked, emails sent, response rate. You learn the numbers. You don't learn what's working, why, or how to replicate it if the agency leaves.",
        time: "monthly", callout: "The learning stays with the agency", good: false,
      },
      {
        step: "4", label: "Cancel and lose the pipeline",
        detail: "Stop paying and everything stops. No knowledge transfer, no process you own, no contacts you keep. The meetings booked while you paid are yours. The machine is theirs.",
        time: "any time", callout: "The pipeline is rented, not built", good: false,
      },
    ],
  },
];

const NL_TABS: TabDef[] = [
  {
    key: "hooklyne",
    label: "Hooklyne",
    sub: "Hele workflow",
    price: "€39–239/mnd",
    icon: Wrench,
    tone: "teal",
    totalLabel: "Jouw tijd",
    total: "≈90s per prospect",
    totalSub: "30s om het contact te kiezen, onder een minuut om te beoordelen en versturen",
    steps: [
      { step: "1", label: "Beschrijf het bedrijfstype",
        detail: "Gewone taal, geen filter-rasters. We draaien een semantische match over miljarden pagina's en geven een gerangschikte lijst terug. Beste match bovenaan, gescoord tegen jouw ideaal klantprofiel.",
        time: "2 min", callout: "Een gerangschikte shortlist, geen data-dump", good: true },
      { step: "2", label: "Kies het contact dat je wilt bereiken",
        detail: "Per bedrijf zie je beschikbare rollen. Jij kiest welke past. Wij draaien een waterval over 21 contactproviders met vier verificatie-lagen - want geen enkele database dekt meer dan 40% van een markt.",
        time: "30 sec", callout: "Jij kiest de rol. Wij verifiëren het adres.", good: true },
      { step: "3", label: "Belandt in Mijn Leads met een aanleiding",
        detail: "Elke prospect komt binnen met een signaal: fundingronde, nieuwe aanstelling, leiderschapswissel, lancering. Twee keer gescoord - een keer voor het bedrijf, een keer voor wat jij verkoopt. Alleen wat door beide komt, bereikt jou.",
        time: "auto", callout: "Een aanleiding, niet alleen een naam.", good: true },
      { step: "4", label: "Volledige mail, in jouw schrijfstijl",
        detail: "Vier controlestappen: haak, invalshoek, schrijfstijl, kwaliteitscheck. Klinkt als je salesmedewerker, niet als een tool.",
        time: "auto", callout: "Niet generiek. NL of EN, afgestemd op die prospect.", good: true },
      { step: "5", label: "Volg signalen van die lead",
        detail: "Houd elke lead in de gaten voor doorlopende signalen: nieuwe funding, teamveranderingen, persvermeldingen. Je krijgt een signaal als het moment verandert - niet als de kalender dat zegt.",
        time: "toggle", callout: "Vang ook het volgende moment, niet alleen het eerste.", good: true },
      { step: "6", label: "Vraag een gespreksvoorbereiding aan",
        detail: "Klaar voor het gesprek? Vraag een live-onderzochte voorbereiding aan. Bedrijf, contact, signalen en gespreksaanknopingspunten op één pagina. Elke claim te herleiden naar een echte URL. Loop voorbereid naar binnen.",
        time: "op aanvraag", callout: "Elke claim met bron. Geen verzonnen feiten.", good: true },
    ],
  },
  {
    key: "database",
    label: "Contactdatabase",
    sub: "Data, filters, exports",
    price: "~€100–300/mnd",
    icon: Database,
    tone: "orange",
    totalLabel: "Jouw tijd",
    total: "~45 min per prospect",
    totalSub: "onderzoek en schrijven blijven jouw klus",
    goodAt: "Snel, vertrouwd, goedkoop per contact. Goed als je je ideaal klantprofiel scherp kent en gewoon contacten wilt trekken om door je eigen proces te draaien.",
    footerNote: "Database-prijs + verificatietool + jouw tijd. De data is goedkoop. Het werk eromheen niet.",
    steps: [
      { step: "1", label: "Bouw de filterquery",
        detail: "Kies sector, omvang, regio, seniority, functie. Sla de view op. De lijst ververst tegen de database.",
        time: "5 min", callout: "Snel een lijst bouwen als je de filters kent", good: true },
      { step: "2", label: "Exporteer de contacten",
        detail: "Download CSV of duw naar je CRM. Je krijgt naam, functie, bedrijf, mail, telefoon waar beschikbaar.",
        time: "instant", callout: "Standaardformaat, werkt met je bestaande tools", good: true },
      { step: "3", label: "Verifieer de mailadressen",
        detail: "Sommige databases hebben ingebouwde verificatie, andere niet. Per regio en database verschilt de dekking sterk en data veroudert snel. Bouncerates op single-source data liggen op Europese MKB-doelgroepen vaak zo hoog dat kopers er een tweede verificatietool bovenop zetten voor ze versturen.",
        time: "10 min", callout: "Verificatiekwaliteit varieert. Een tweede tool is gebruikelijk.", good: false },
      { step: "4", label: "Onderzoek elke prospect",
        detail: "De data vertelt wat ze doen, niet wat er deze week speelt. Je checkt LinkedIn, nieuws, fundingsites zelf om een aanleiding te vinden.",
        time: "15 min", callout: "De database weet niet wat er sinds de laatste update is veranderd", good: false },
      { step: "5", label: "Schrijf de mail",
        detail: "Vanaf nul of vanuit een template. Geen automatische personalisatie, geen stemkalibratie, geen aanhaak op het signaal - dat doe jij allemaal.",
        time: "15 min", callout: "Elke mail is jouw schrijftijd", good: false },
    ],
  },
  {
    key: "aioutreach",
    label: "AI-outreach tool",
    sub: "Gegenereerde mails",
    price: "~€100–500/mnd",
    icon: PaperPlaneTilt,
    tone: "amber",
    totalLabel: "Jouw tijd",
    total: "≈10 min setup, daarna ≈30s/prospect",
    totalSub: "onderzoekskwaliteit ligt vast bij setup, niet aangepast per prospect",
    goodAt: "Volume. Heb je een schone lijst en wil je snel veel mails versturen met basale personalisatie, dan leveren deze tools. Ze hebben snelle workflows voor eenmaal-ingesteld, vele-keren-verstuurd.",
    footerNote: "Snel met versturen. Niet gebouwd voor onderzoek. Bij een scherp ideaal klantprofiel en een vooraf geverifieerde lijst is dit een verzendlaag - geen prospecting-laag.",
    steps: [
      { step: "1", label: "Upload je lijst en zet variabelen op",
        detail: "Je hebt eerst een contactlijst nodig. Dat betekent er een kopen uit een database, exporteren uit je CRM of zelf scrapen. Het tool doet dat niet. Importeer de contacten, koppel de velden, stel de variabelen in die de AI invult: voornaam, bedrijf, een LinkedIn-veld, een pijn die je aanneemt.",
        time: "10 min", callout: "De lijst regel je zelf. Het tool begint daarna pas.", good: true },
      { step: "2", label: "Schrijf de template met AI-invullingen",
        detail: "De meeste tools genereren een basismail en laten de AI personaliseren per prospect. De personalisatie haalt uit je variabelen en wat het model is meegegeven.",
        time: "5 min", callout: "De AI onderzoekt de prospect niet. Het werkt met wat jij gaf.", good: false },
      { step: "3", label: "Campagne loopt op planning",
        detail: "Warm-up, pacing, deliverability. Dit deel doen ze goed.",
        time: "auto", callout: "Verzendinfra is volwassen", good: true },
      { step: "4", label: "Reageer op de antwoorden",
        detail: "Sommige mails komen aan. Sommige bouncen (hangt van je lijstkwaliteit af). Sommige worden als generiek geflagd. Wie reageert, komt terug zonder context van waarom ze zijn gemaild.",
        time: "doorlopend", callout: "Generieke personalisatie leest als generiek. Reactiepercentages weerspiegelen dat.", good: false },
    ],
  },
  {
    key: "diy",
    label: "DIY-stack",
    sub: "Meerdere tools, handmatig",
    price: "~€50–150/mnd",
    icon: Wrench,
    tone: "slate",
    totalLabel: "Jouw tijd",
    total: "≈70 min per prospect",
    totalSub: "elke minuut is van jou, elke prospect begint vanaf nul",
    goodAt: "Volledige controle. Jij beslist alles. Geen abonnementskosten boven de tools die je al hebt. Voor een founder met 2-3 prospects per week is dit echt werkbaar - en velen doen precies dit nu.",
    footerNote: "Volle controle, geen multiplier. Houdbaar voor een handvol prospects per week. Breekt op het moment dat je volume nodig hebt.",
    steps: [
      { step: "1", label: "Bouw de lijst",
        detail: "LinkedIn Sales Navigator-zoekopdracht, exporteren naar spreadsheet. Of een database-export, of een scrape. Je kiest de bedrijven en mensen handmatig.",
        time: "10 min", callout: "Jij bepaalt de shortlist volledig", good: true },
      { step: "2", label: "Vind en verifieer het mailadres",
        detail: "Probeer een pattern-matcher of een gratis email-finder. Draai het door een verificatietool. Handmatig, traag en wisselend per provider.",
        time: "15 min", callout: "De blinde vlek van een provider wordt jouw blinde vlek", good: false },
      { step: "3", label: "Onderzoek de prospect",
        detail: "Open de website, hun LinkedIn, recent nieuws. Zoek naar financieringsberichten. Lees de laatste drie posts van de CEO. Maak aantekeningen.",
        time: "20 min", callout: "Hier gaat het meeste van je tijd in zitten. Elke prospect. Elke week.", good: false },
      { step: "4", label: "Schrijf de mail in een AI-chat",
        detail: "Plak je onderzoek in ChatGPT of Claude. Vraag een eerste concept. Herschrijf omdat het generiek klinkt. Herschrijf nog eens omdat er een feit is verzonnen. Plak terug in je sequencer.",
        time: "20 min", callout: "AI hallucineert. Als je de output niet controleert, gaan fouten mee de deur uit.", good: false },
      { step: "5", label: "Verstuur en volg handmatig",
        detail: "Verstuur uit je inbox of plak in een sequencer. Update een spreadsheet. Hoop dat je opvolgt.",
        time: "5 min", callout: "Tracking is een tab die je vergeet te checken", good: false },
      { step: "6", label: "Doe het volgende week opnieuw",
        detail: "Het werk stapelt niet. Elke prospect begint vanaf nul.",
        time: "doorlopend", callout: "Jouw tijd is het product", good: false },
    ],
  },
  {
    key: "agency",
    label: "Outbound-agency",
    sub: "Volledig uitbesteed",
    price: "€2.500+/mnd",
    icon: Briefcase,
    tone: "rose",
    totalLabel: "Jouw tijd",
    total: "≈10 min per prospect",
    totalSub: "om hun rapport te beoordelen, maar niet jouw stem, controle of leerproces",
    goodAt: "Van je bord. Een goede agency heeft ervaren mensen, bestaande tools en een werkend proces. Heb je het budget en het geduld om ze goed in te werken, dan kunnen ze afspraken boeken.",
    footerNote: "Heb je het budget en wil je acquisitie volledig uitbesteden, dan kan een agency werken. Voor een team dat zelf wil leren en de controle wil houden, klopt de rekening zelden.",
    steps: [
      { step: "1", label: "De agency inwerken",
        detail: "Kennismakingsgesprekken, voorbeelddocumenten, mailwisseling over je klantprofiel. Ze leren je markt kennen. Weken gaan voorbij voordat er iemand is benaderd.",
        time: "wk 1-2", callout: "Inwerken duurt weken. Budget loopt direct.", good: false },
      { step: "2", label: "Ze versturen mails in hun eigen stijl",
        detail: "Hun mensen schrijven de mails. Je bekijkt concepten, soms wekelijks, soms niet. Wat de deur uitgaat klinkt niet als jou.",
        time: "wk 3+", callout: "De mails klinken niet als jij", good: false },
      { step: "3", label: "Je krijgt een maandelijks overzicht",
        detail: "Ze leveren een rapport. Geboekte afspraken, verzonden mails, openingspercentage. Je ziet de cijfers. Je leert niet wat werkt, waarom, of hoe je het zelf kunt herhalen.",
        time: "maandelijks", callout: "Het leerproces blijft bij de agency", good: false },
      { step: "4", label: "Stoppen kost je alles wat is opgebouwd",
        detail: "Stop met betalen, alles stopt. Geen kennisoverdracht, geen proces dat van jou is, geen contacten die blijven. De geboekte afspraken zijn van jou. De machine van hen.",
        time: "altijd", callout: "De pipeline wordt gehuurd, niet gebouwd", good: false },
    ],
  },
];

const TONE: Record<TabDef["tone"], { bg: string; border: string; fg: string; soft: string }> = {
  teal:   { bg: "rgba(13,148,136,0.10)",  border: "rgba(13,148,136,0.30)",  fg: "var(--hooklyne-teal)",   soft: "rgba(13,148,136,0.08)"  },
  orange: { bg: "rgba(255,140,66,0.10)",  border: "rgba(255,140,66,0.30)",  fg: "var(--hooklyne-orange)", soft: "rgba(255,140,66,0.08)"  },
  amber:  { bg: "rgba(245,158,11,0.10)",  border: "rgba(245,158,11,0.30)",  fg: "#b45309",                soft: "rgba(245,158,11,0.08)"  },
  slate:  { bg: "rgba(100,116,139,0.10)", border: "rgba(100,116,139,0.30)", fg: "#475569",                soft: "rgba(100,116,139,0.08)" },
  rose:   { bg: "rgba(225,29,72,0.08)",   border: "rgba(225,29,72,0.28)",   fg: "#be123c",                soft: "rgba(225,29,72,0.07)"   },
};

const NUDGE_ORDER: TabKey[] = ["database", "aioutreach", "diy", "agency"];

export const DIYCompare = ({ lang: langProp, hideCompare }: { lang?: Lang; hideCompare?: boolean } = {}) => {
  const lang = useLang(langProp);
  const TABS = lang === "nl" ? NL_TABS : EN_TABS;
  const labels = lang === "nl" ? {
    eyebrow: "De workflow",
    headline: (
      <>Van ideaal klantprofiel naar <span className="text-accent">inbox in zes stappen</span>.</>
    ),
    sub: "Zes stappen, volledig automatisch. Je salesmedewerker krijgt een compleet pakket: contact gevonden, context klaar, eerste bericht geschreven. Beoordelen en versturen in minder dan een minuut.",
    compareWith: "Vergelijk met",
    estCost: "geschatte toolkosten",
    compareLink: { href: "/nl/hoe-het-werkt", text: "Hoe vergelijkt het?" },
  } : {
    eyebrow: "The workflow",
    headline: (
      <>From ICP to <span className="text-accent">inbox in six steps</span>.</>
    ),
    sub: "Six steps, fully automated. The rep gets a complete prospect package - contact found, context built, outreach drafted. Review and send in under a minute.",
    compareWith: "Compare with",
    estCost: "est. tool cost",
    compareLink: { href: "/how-it-works", text: "How does it compare?" },
  };
  const [tab, setTab] = useState<TabKey>("hooklyne");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [nudgeIdx, setNudgeIdx] = useState(0);
  /* Mobile-only: which step is expanded. First step opens by default;
     desktop ignores this state entirely (CSS reveals all steps at md+). */
  const [openStep, setOpenStep] = useState<string | null>(null);

  useEffect(() => {
    if (hasInteracted) return;
    const id = window.setInterval(() => {
      setNudgeIdx((i) => (i + 1) % NUDGE_ORDER.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, [hasInteracted]);

  const nudgeKey: TabKey | null = hasInteracted ? null : NUDGE_ORDER[nudgeIdx];
  const active = hideCompare ? TABS.find((t) => t.key === "hooklyne")! : TABS.find((t) => t.key === tab)!;
  const tone = TONE[active.tone];
  const isHooklyne = active.key === "hooklyne";

  /* Reset which step is open when the user switches tabs - first step
     of the new flow opens by default. */
  useEffect(() => {
    setOpenStep(active.steps[0]?.step ?? null);
  }, [tab]);

  return (
    <section className="pt-8 pb-14 lg:pt-10 lg:pb-20" data-fade>
      <style>{`
        @keyframes diycompareAutoHover {
          0%       { background: transparent; border-color: transparent; transform: translateY(0); }
          25%, 75% { background: var(--card-hover); border-color: var(--border-strong); transform: translateY(-2px); }
          100%     { background: transparent; border-color: transparent; transform: translateY(0); }
        }
        .diycompare-auto-hover { animation: diycompareAutoHover 1.6s ease-in-out infinite; }
        .diycompare-auto-hover:hover { animation: none; }
        @media (prefers-reduced-motion: reduce) { .diycompare-auto-hover { animation: none; } }
      `}</style>

      <div className="container max-w-6xl">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--hooklyne-blue)] mb-4">{labels.eyebrow}</p>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[var(--heading)] tracking-tight leading-[1.15] md:leading-[1.1] mb-4">
            {labels.headline}
          </h2>
          <p className="text-base md:text-lg text-[var(--muted-foreground)] leading-relaxed">
            {labels.sub}
          </p>
        </div>

        {/* Tab label + tabs - hidden in hideCompare mode */}
        {!hideCompare && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--muted-foreground)]">{labels.compareWith}</span>
              <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-5 p-1.5 rounded-2xl"
              style={{ background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-xs)" }}
              role="tablist"
            >
              {TABS.map((t) => {
                const isActive = tab === t.key;
                const tTone = TONE[t.tone];
                const Icon = t.icon;
                const nudge = !isActive && t.key === nudgeKey;
                return (
                  <button
                    key={t.key}
                    onClick={() => { setTab(t.key); setHasInteracted(true); }}
                    role="tab"
                    aria-selected={isActive}
                    className={`relative text-left px-2.5 py-2.5 md:px-4 md:py-3 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm${nudge ? " diycompare-auto-hover" : ""}`}
                    style={{
                      background: isActive ? (t.key === "hooklyne" ? "var(--hooklyne-navy)" : tTone.bg) : "transparent",
                      border: `1px solid ${isActive ? (t.key === "hooklyne" ? "var(--hooklyne-navy)" : tTone.border) : "transparent"}`,
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--card-hover)"; e.currentTarget.style.borderColor = "var(--border-strong)"; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; } }}
                  >
                    <div className="flex items-start gap-2.5 w-full">
                      {t.key === "hooklyne" ? (
                        <HooklyneMark className="size-8 rounded-lg shrink-0 mt-0.5" />
                      ) : (
                        <span
                          className="inline-flex items-center justify-center size-8 rounded-lg shrink-0 mt-0.5 transition-colors"
                          style={{ background: isActive ? tTone.fg : "var(--card-hover)", color: isActive ? "#fff" : "var(--muted-foreground)" }}
                        >
                          <Icon className="size-4" />
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-[13px] leading-tight ${t.key === "hooklyne" ? "font-bold" : "font-medium"}`}
                          style={{ color: isActive && t.key === "hooklyne" ? "#ffffff" : "var(--heading)" }}
                        >
                          {t.label}
                        </div>
                        <div
                          className="text-[11px] leading-tight mt-0.5 truncate"
                          style={{ color: isActive && t.key === "hooklyne" ? "rgba(255,255,255,0.85)" : "var(--muted-foreground)" }}
                        >
                          {t.sub}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Totals strip - hidden in hideCompare mode */}
        {!hideCompare && <div
          className="mb-5 px-3.5 py-2.5 md:py-2 rounded-lg"
          style={{ background: tone.bg, border: `1px solid ${tone.border}` }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:gap-x-4 gap-y-1.5">
            {/* Left: label + main value */}
            <div className="flex items-center gap-2 md:gap-1.5 md:shrink-0">
              <Clock className="size-3.5 shrink-0" style={{ color: tone.fg }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] shrink-0" style={{ color: tone.fg }}>
                {active.totalLabel}
              </span>
              <span className="text-sm md:text-base font-semibold text-[var(--heading)] tracking-tight leading-tight">
                {active.total}
              </span>
            </div>

            {/* Middle: sub note */}
            <div className="md:flex-1 md:min-w-0">
              <span className="text-[12px] text-[var(--muted-foreground)] leading-snug block md:truncate">
                {active.totalSub}
              </span>
            </div>

            {/* Right: price */}
            {active.price && (
              <div className="flex items-baseline gap-1.5 md:shrink-0 pt-1.5 md:pt-0 border-t md:border-t-0" style={{ borderColor: tone.border }}>
                <span className="text-[11px] font-semibold tabular-nums" style={{ color: tone.fg }}>{active.price}</span>
                <span className="text-[10px] text-[var(--muted-foreground)]">{labels.estCost}</span>
              </div>
            )}
          </div>
        </div>}

        {/* Steps grid. Mobile: each step is collapsible, only the active one
            shows detail + callout. md+: full grid, every step always expanded. */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {active.steps.map((s) => {
            const isOpen = openStep === s.step;
            return (
              <div
                key={s.step}
                className="group relative flex flex-col h-full rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-sm"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-xs)",
                }}
              >
                {/* Header row - tappable on mobile, decorative on md+ */}
                <button
                  type="button"
                  className="flex items-center gap-3 text-left p-4 md:p-5 lg:p-7 md:pb-3 md:cursor-default"
                  onClick={() => setOpenStep((prev) => prev === s.step ? null : s.step)}
                  aria-expanded={isOpen}
                  aria-controls={`step-${active.key}-${s.step}`}
                >
                  <span
                    className="inline-flex items-center justify-center size-8 rounded-lg text-[11px] font-bold shrink-0"
                    style={{
                      background: isHooklyne ? "var(--hooklyne-navy)" : tone.fg,
                      color: "#fff",
                      boxShadow:
                        "0 1px 0 0 rgba(255,255,255,0.25) inset, 0 4px 10px -2px rgba(15,23,42,0.2)",
                    }}
                  >
                    {s.step}
                  </span>
                  <span className="flex-1 text-[14.5px] md:text-[15px] font-semibold text-[var(--heading)] leading-tight md:hidden">
                    {s.label}
                  </span>
                  <span
                    className="text-[10px] font-mono font-semibold px-2 py-1 rounded shrink-0"
                    style={{ background: tone.soft, color: tone.fg }}
                  >
                    {s.time}
                  </span>
                  <CaretDown
                    size={16}
                    weight="regular"
                    className={`md:hidden shrink-0 text-[var(--muted-foreground)] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Body - hidden when collapsed on mobile, always visible md+ */}
                <div
                  id={`step-${active.key}-${s.step}`}
                  className={`px-4 md:px-5 lg:px-7 pb-4 md:pb-5 lg:pb-7 md:flex md:flex-col md:flex-1 ${isOpen ? "block" : "hidden md:flex"}`}
                >
                  <div className="hidden md:block text-[15px] font-semibold text-[var(--heading)] mb-2 leading-tight">{s.label}</div>
                  <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed mb-3">{s.detail}</p>
                  <div className="flex items-start gap-1.5 pt-3 mt-auto border-t border-dashed border-[var(--border)]">
                    {s.good ? (
                      <Check className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-teal)" }} />
                    ) : (
                      <X className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--hooklyne-orange)" }} />
                    )}
                    <span className="text-[12px] font-medium text-[var(--heading)]">{s.callout}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Summary card fills the empty grid slot when step count < 6 */}
          {active.footerNote && active.steps.length < 6 && (
            <div
              className="relative flex flex-col justify-center p-5 lg:p-7 rounded-2xl"
              style={{
                background: "var(--bg)",
                border: "1px dashed var(--border-strong)",
              }}
            >
              <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed italic">
                {active.footerNote}
              </p>
            </div>
          )}
        </div>

        {/* Full-width footer line when all 6 slots are filled */}
        {!hideCompare && active.footerNote && active.steps.length >= 6 && (
          <div
            className="mt-4 px-4 py-3 rounded-xl flex items-start gap-2.5"
            style={{ background: tone.soft, border: `1px dashed ${tone.border}` }}
          >
            <Clock className="size-3.5 shrink-0 mt-0.5" style={{ color: tone.fg }} />
            <p className="text-[13px] text-[var(--muted-foreground)] leading-relaxed italic">
              {active.footerNote}
            </p>
          </div>
        )}

        {/* Quiet compare link shown only in hideCompare mode */}
        {hideCompare && (
          <div className="mt-6 flex justify-start">
            <a
              href={labels.compareLink.href}
              className="text-sm text-[var(--muted-foreground)] hover:text-[var(--hooklyne-blue)] transition-colors underline underline-offset-4"
            >
              {labels.compareLink.text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
