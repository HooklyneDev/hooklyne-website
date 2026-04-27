---
title: "Je eigen AI lead-generatie agent bouwen: wat er stuk gaat op schaal"
description: "DIY AI-prospectie-agents werken in een demo en stranden in productie. De data-, signaal-, stem- en compliance-gaten die ze stilletjes om zeep helpen."
pubDate: 2026-04-19
authorName: Tim
authorBio: "Tim is medeoprichter van Hooklyne. Schreef hiervoor jarenlang outbound voor Nederlandse B2B-bedrijven."
type: guide
readingTime: "10 min"
image: /blog/build-your-own-ai-agent-hero.jpg
---

Elke founder met wie we in 2026 spreken heeft hetzelfde geprobeerd: ChatGPT plus een CSV plus een paar enrichment-API's, aan elkaar geknoopt tot iets wat lijkt op een werkende prospectie-agent. Het kost een middag. Het demoot prachtig. Het overtuigt het team dat betaalde tools overbodig zijn.

Dan komt kwartaal twee, en de hele stack stopt stilletjes met werken.

Deze post is voor de founder, sales lead of solo SDR die één weekend-project verwijderd is van zijn eigen AI lead-generatie agent. We gaan je niet vertellen dat het een slecht idee is. Voor sommige teams is het de juiste keuze. We gaan je vertellen wat er werkelijk stuk gaat, omdat we er zelf een hebben gebouwd en hem hebben omgezet in Hooklyne.

## De korte versie

Heb je minder dan 20 prospects per maand te onderzoeken, dan is een in-house AI-agent (ChatGPT plus een enrichment-provider plus een sequencer) prima. Je bent ongeveer 4 uur per maand kwijt aan onderhoud.

Heb je 100 of meer prospects per maand, of moet dezelfde agent 12 maanden blijven werken zonder dat een fulltime engineer hem moet bijhouden, dan verandert de rekensom. De eerlijke kosten van zelf draaien op die schaal zijn niet de LLM-tokens. Het zijn de zeven dingen hieronder die je demo nooit heeft getest.

## Waarom je eigen AI-agent bouwen er makkelijk uitziet

Het basisrecept is goed gedocumenteerd:

1. Trek een lijst bedrijven uit een directory of scrape (LinkedIn Sales Navigator-export, Apollo-export, Crunchbase API)
2. Verrijk elk bedrijf met één of twee providers (Clay, Apollo, ZoomInfo)
3. Stuur elke regel door een LLM met een research-prompt (Claude, GPT-4, Gemini)
4. Laat de LLM een gepersonaliseerde eerste mail schrijven
5. Push naar je sequencer (Instantly, Smartlead, Lemlist)

Een ervaren developer doet dit in een weekend. Een niet-technische founder doet het in twee dagen via n8n of Make. De eerste 10 prospects zien er echt indrukwekkend uit. De mails verwijzen naar echte dingen. De targeting voelt scherp. Je denkt dat je net een tool-stack van €1.500 per maand hebt vervangen door €80 aan API-credits.

Hierover liegt niemand. De demo werkt echt.

## Waar de DIY-agent stilletjes faalt

### 1. Eén dataprovider zit er ongeveer 40 procent naast

Elke B2B-contactdatabase zit ergens fout. Apollo heeft verouderde mailadressen voor Europees mid-market. Cognism heeft dunne dekking buiten enterprise. ZoomInfo overpresenteert AVG-compliant EU-data. Clay aggregeert er meerdere maar erft elke blinde vlek.

Een solo agent op één provider matcht zo'n 60 procent van je doelgroep met bruikbare data. Voor een demo van 10 namen is dat prima. Op een lijst van 500 betaal je voor verrijking van 300 contacten die zullen bouncen, genegeerd worden of überhaupt nooit de juiste persoon waren.

De oplossing is niet een betere provider kiezen. Het is 5 tot 20 providers tegen elkaar uitspelen op elke regel, terugvallen waar de primaire mist, en conflicten signaleren voordat je verstuurt. Dat werk staat in geen enkele demo en niemand wil het onderhouden.

[Hooklyne gebruikt 20+ dataproviders in een gelaagde verificatieflow](/nl/hoe-het-werkt) precies hierom.

### 2. LLM's hallucineren koopsignalen

Vraag Claude of GPT-4 om een "koopsignaal" voor een bedrijf te vinden, en je krijgt er een. Elke keer. Of er nu een bestaat of niet.

Echte triggers die met reply-rates correleren: fundingrondes in de laatste 90 dagen, leiderschapshires in een specifieke functie, technologie-stack-toevoegingen, hiring-pieken in target-afdelingen, M&A-activiteit, expansie naar een nieuwe markt. Die komen uit gestructureerde bronnen (Crunchbase, Dealroom, BuiltWith, vacaturesites, KvK-mutaties) en moeten worden gedetecteerd, niet samengevat.

Een DIY-agent leest een LinkedIn-post die zegt "we groeien hard" en concludeert dat het bedrijf opschaalt. Je reply-rate op die mails blijft op 0,4 procent steken, en je geeft twee maanden de copy de schuld.

### 3. Je agent schrijft 200 keer dezelfde mail

Het slechte geheim van LLM-gegenereerde outreach: het model heeft een default-stramien dat het altijd gebruikt. Elke koude mail die het maakt, ongeacht je prompt, eindigt rond:

> "Hi [Naam], ik zag dat [Bedrijf] recent [vage observatie]. Wij helpen bedrijven zoals dat van jou met [vaag voordeel]. Even bellen?"

Je merkt dit niet bij de eerste 5 outputs. Je merkt het bij mail 80, wanneer een prospect antwoordt: "dit is de derde versie van deze mail die ik dit kwartaal van jullie team kreeg".

Voice-modeling — het soort dat outreach echt laat klinken als de vertegenwoordiger — vereist fine-tuning of zorgvuldige retrieval over de eerder verzonden mails van die rep. Geen system prompt. Dat is een meerweekse engineering-klus per rep, en die moet opnieuw als de stijl van de rep verschuift.

[Hooklyne modelleert de stem van de afzender op basis van zijn eigen verzonden mails](/nl/product), zodat de output leest als hij — niet als een LLM.

### 4. Onderhoud-schuld stapelt elke maand

Wat in jouw DIY-stack zal breken, ongeveer in deze volgorde:

- Apollo verandert een CSV-veldnaam. Je downstream-parser breekt stilletjes.
- LinkedIn werkt anti-scraping bij. Je enrichment-fallback gaat dood.
- Een modelversie wordt deprecated. Je prompt regresseert op outputs die je voorheen goed vond.
- Je enrichment-vendor verhoogt zijn prijs met 5x. Je unit-economics keren over één nacht om.
- Een feestdag valt, drie reps klagen over output-kwaliteit, en je realiseert je dat niemand de agent eigenaar is.

Geen van deze is onoplosbaar. Elk kost 2 tot 6 uur diagnose en fix. Over 12 maanden compoundt dat tot ongeveer een engineer-maand per jaar voor een agent die 50 prospects per week produceert. Bij €100k volledig belaste engineer-kosten is dat de prijs van een managed dienst voordat je één deal hebt gesloten.

### 5. AVG en spam-wetgeving zijn niet optioneel

Ben je een Nederlandse, Duitse of Britse SME, dan moet je DIY-agent:

- De rechtmatige grondslag per contact bijhouden (Art. 6(1)(f) gerechtvaardigd belang, in de meeste B2B-gevallen)
- Suppression-lijsten respecteren over alle campagnes, inclusief eerdere
- Opt-outs voor altijd bewaren, niet alleen 30 dagen
- Een informatie-notice (Art. 14 AVG) leveren aan de contacten die je hebt verrijkt
- Elke verzending loggen voor de [Autoriteit Persoonsgegevens](https://autoriteitpersoonsgegevens.nl) als die ernaar vraagt

De eerste versie van je agent doet niets van dit. De Google Sheet die je team gebruikt om opt-outs bij te houden zal uit sync raken. Je mailt iemand die drie maanden geleden heeft uitgeschreven. Hij vertelt het zijn netwerk. Je domein-reputatie, die je niet kunt herbouwen, neemt de klap.

### 6. Deliverability is een eigen vakgebied

500 koude mails per week sturen vanaf een vers domein, ook met perfecte copy, brengt je binnen zeven dagen in spam. De infrastructuur die dit voorkomt — domein-warmup, IP-rotatie, SPF/DKIM/DMARC-uitlijning, send-pacing, mailbox-providergedrag — is een product op zich. Lemwarm en Mailreach bestaan met reden.

Je DIY-agent weet hier niets van. Hij zal het domein verbranden dat je echt voor werk gebruikt, dan koop je een secondair domein om het "te fixen", dan verbrand je dat ook.

### 7. De "5 prospects zien er goed uit"-val

Deze is psychologisch, niet technisch. Wanneer je een DIY-agent bouwt, test je natuurlijk op 5 tot 10 prospects die je hebt gekozen. Je leest de outputs zorgvuldig. Ze zien er goed uit. Je gaat live.

Wat je hebt gevalideerd, is het 90e-percentielgedrag van de agent. Je hebt de long tail niet gezien: het bedrijf zonder website, het contact wiens LinkedIn privé staat, de trigger-event die een persbericht uit 2019 blijkt, de mail die wordt gegenereerd voor de verkeerde persoon bij het juiste bedrijf.

Op schaal is de long tail de meeste van je lijst. Je ziet het niet tot 200 mails al de deur uit zijn.

## Wanneer DIY wel het juiste antwoord is

We verkopen niet dat je nooit je eigen AI lead-generatie agent moet bouwen. We verkopen eerlijkheid over wanneer het werkt:

- **Je hebt minder dan 20 hoog-waardevolle prospects per maand.** Een founder die handgepicktee outbound doet aan een strakke ideaal klantprofiel. Een senior AE die een target-account-lijst bewerkt. Het volume is laag genoeg dat de long tail niet bijt.
- **Je bent een developer die hier plezier aan beleeft.** Als de stack onderhouden een hobby is en geen belasting, is de rekensom anders.
- **Je TAM is onder 200 bedrijven.** Je onderzoekt elk bedrijf één keer, stuurt een paar touches, en hebt nooit ongoing schaal nodig.
- **Je doet eenmalig onderzoek, niet outbound.** Account intelligence, marktmapping en concurrentieonderzoek zijn prima LLM-toepassingen die de meeste faalmodes hierboven niet hebben.

Voor iedereen anders is de berekening: wil je in de business van een prospectie-agent runnen zitten, of in de business van verkopen.

## Wat je werkelijk koopt met een managed dienst

Wanneer een team van zijn DIY-agent overstapt naar [Hooklyne](/nl/product), zijn de regels die ze betalen niet glamoureus. Het zijn:

- De 20+ data-provider-integraties die op elke regel worden gekruist
- De gestructureerde signaal-pipeline die 95 procent van de "signalen" filtert die een LLM zou hebben gemarkeerd
- Het stem-model getraind op de werkelijke verzonden-mail-historie van de rep, niet op een system prompt
- De compliance-laag: AVG Art. 14 notices, persistente suppression, lawful-basis-tracking
- De deliverability-infrastructuur: domein-warmup, send-pacing, reputation-monitoring
- Iemand wiens fulltime baan is om dat alles draaiend te houden als vendors dingen breken

Die bundel is wat het verschil maakt tussen een agent die in een demo werkt en een die in maand negen nog steeds werkt.

## Hoe te beslissen

Voor je een weekend besteedt aan je eigen AI lead-generatie agent, run deze checklist:

- [ ] **Volume.** Hoeveel prospects per maand? Onder 20: bouw 'm. Boven 100: niet doen.
- [ ] **Tijdshorizon.** Run je dit nog over 12 maanden? Zo ja, reken op één engineer-maand per jaar onderhoud.
- [ ] **Compliance-blootstelling.** Verkoop je aan EU-MKB? Zo ja, is de AVG-laag niet optioneel en moeilijker dan hij eruitziet.
- [ ] **Stem.** Maakt outreach in de werkelijke schrijfstijl van je rep uit? Zo ja, system prompts brengen je daar niet.
- [ ] **Deliverability-budget.** Wil je je primaire domein riskeren? Zo nee, heb je warmup-infrastructuur nodig.

Vink je minder dan twee aan, bouw 'm. Vink je drie of meer aan, dan kost de in-house versie meer dan 'ie er uitziet.

## Waar Hooklyne past

[Hooklyne](/nl) is wat je bouwt als je de output van een DIY AI-agent wilt zonder de zeven faalmodes hierboven. Wij doen het gekruiste-data-werk, de gestructureerde signaaldetectie, de stem-modeling, de compliance, en de deliverability-laag, en leveren outreach-klare prospectpakketten terug aan je reps in hun eigen schrijfstijl.

Heb je je eigen versie al gebouwd en loop je tegen één van de dingen in deze post aan, [start dan een pilot](/nl/contact). Wij vertellen eerlijk of je DIY-stack goed genoeg is om te houden, of dat overstappen naar een managed dienst voor jouw nummers werkelijk zin heeft.

We hebben de [pleidooi tegen Apollo, Cognism of Lusha kiezen](/nl/blog/apollo-vs-cognism-vs-lusha-voor-nederlands-mkb) in een aparte post geschreven. De DIY-route is de vierde optie die mensen steeds vaker proberen. Dit is wat we erover hebben geleerd, omdat we er zelf een hebben gebouwd.
