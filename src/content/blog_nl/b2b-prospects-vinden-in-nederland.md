---
title: "Hoe vind je B2B-prospects in Nederland zonder betaalde tools"
description: "Praktische gids voor het vinden van Nederlandse B2B-prospects via KvK, LinkedIn en gratis bronnen. Waar elke methode werkt, en waar 'ie ophoudt te schalen."
pubDate: 2026-04-23
authorName: Tim
authorBio: "Tim is medeoprichter van Hooklyne. Schreef hiervoor jarenlang outbound voor Nederlandse B2B-bedrijven."
type: guide
readingTime: "12 min"
image: /blog/find-prospects-netherlands-hero.jpg
---

Verkoop je B2B in Nederland en heb je nog niet gecommitteerd aan een dataspeel van €1.500 per maand, dan heb je je waarschijnlijk afgevraagd of je dit niet zelf kunt doen. Een lijst trekken, de juiste persoon op LinkedIn vinden, een mail sturen, herhalen.

Dat kan. Een tijd. Deze post is de eerlijke versie van die werkstroom: wat werkt, wat niet, en op welk punt de unit economics omslaan.

We hebben het beide manieren gedaan. Hooklyne is ontstaan nadat we genoeg uren hadden verbrand op de handmatige route om precies te weten waar 'ie breekt.

## Voor wie deze gids is

Je bent founder, sales lead of eerste commerciële hire bij een Nederlands B2B-bedrijf van 5 tot 50 personen. Je verkoopt aan andere Nederlandse (of Britse, of EMEA-)MKB. Je hebt nog geen Apollo, Cognism, Lusha of Salesmotion aangeschaft. Je vermoedt dat de handmatige route genoeg moet zijn voor het volume dat je werkelijk nodig hebt.

Voor de eerste 50 prospects heb je gelijk.

## De vier gratis routes die het waard zijn om te kennen

### 1. KvK (Kamer van Koophandel)

Elk in Nederland geregistreerd bedrijf staat in het [KvK Handelsregister](https://www.kvk.nl/zoeken/handelsregister/). Een publieke database met gestructureerde filters: SBI-code (sectorclassificatie), regio, omvang, oprichtingsdatum.

**Waar 'ie goed voor is:**
- Een schone lijst bouwen van bijvoorbeeld alle Nederlandse SaaS-bedrijven in Noord-Holland met 10 tot 50 medewerkers
- Verifiëren dat een bedrijf werkelijk bestaat en actief is
- De geregistreerde naam, adres en KvK-nummer ophalen voor compliance en facturatie
- Bedrijven spotten die in de laatste 12 maanden zijn opgericht (founder-led ICP-signaal)

**Praktische werkstroom:**
1. Ga naar [Handelsregister geavanceerd zoeken](https://www.kvk.nl/zoeken/)
2. Filter op SBI-code (`62.01` voor softwareontwikkeling, `70.22` voor managementadvies, etc.) en op regio
3. Exporteer naar CSV (betaalde extract, ongeveer €7 per 100 records via de KvK-API of €1,83 per bedrijf voor een uittreksel)
4. De gratis zoekfunctie toont je bedrijfsnamen en basale info; voor gestructureerde bulkexport heb je een betaald extract of een data-reseller (Company.info, Graydon, Altares) nodig

**Waar 'ie ophoudt te schalen:**
- KvK geeft je het bedrijf. Niet een persoon, geen contactmail, geen functie, geen koopsignaal. Dat zijn de vier dingen die je werkelijk nodig hebt.
- Gratis zoeken cap't op een klein aantal resultaten per query. Voor echt volume betaal je per record sowieso.
- Sectorclassificatie (SBI-codes) is zelf-gerapporteerd en vaak verouderd. Een bedrijf dat in 2018 als "consultancy" geregistreerd staat, is in 2026 mogelijk een SaaS-product-bedrijf.

Voor een lijst van 30 doelbedrijven die je diep wilt onderzoeken, is KvK uitstekend. Voor een lijst van 500 bedrijven die je wilt benaderen, is het het begin van een project, niet het einde.

### 2. LinkedIn (gratis + Sales Navigator-trial)

LinkedIn is waar de mensen zijn. Specifiek: de besluitvormers in jouw ICP.

**Waar 'ie goed voor is:**
- Zoeken op functietitel, bedrijfsomvang, regio en recente activiteit
- De werkelijke persoon bij een doelbedrijf vinden die jouw categorie behandelt
- Trigger-events spotten (jobwissels, promoties, posts over hiring)
- Handmatige personalisatie: hun laatste 3 posts lezen voor je een mail opstelt

**Praktische werkstroom:**
1. Meld je aan voor de [LinkedIn Sales Navigator gratis trial](https://business.linkedin.com/sales-solutions/sales-navigator) (30 dagen, geen kosten, volledige toegang)
2. Bouw een opgeslagen zoekopdracht: sector + headcount + seniority + geografie
3. Sla leads op in een lijst. Sales Navigator toont je 25 resultaten per pagina, tot 2.500 resultaten per opgeslagen zoekopdracht
4. Exporteer de leads via [Apollo's gratis tier (10.000 credits/maand voor beperkt gebruik)](https://www.apollo.io/) of via Phantombuster, Evaboot of Findymail om ze met mailadressen te verrijken

**Waar 'ie ophoudt te schalen:**
- De gratis trial eindigt na 30 dagen. Daarna is Sales Navigator €99 per maand. Nuttig, maar niet meer gratis.
- LinkedIn rate-limit't bulk-scraping agressief. Je krijgt waarschuwingen, dan beperkingen, dan een tijdelijke ban. Iedereen die je "onbeperkt LinkedIn-scraping" verkoopt voor €19 per maand is één update verwijderd van breken.
- Mailadressen zijn het moeilijke deel. LinkedIn toont je geen mails. Elke flow die "mails uit LinkedIn exporteert" gebruikt een third-party verrijking (Apollo, RocketReach, ContactOut), en accuratesse varieert sterk per regio.

Voor Nederlandse en Britse contacten zit de mail-match-rate uit alleen-LinkedIn-verrijking tussen 40 en 65 procent. De andere 35 tot 60 procent van je lijst is onbruikbaar zonder een tweede provider.

### 3. Google operators

Dit is de onderschatte route. Een handvol zoekoperators legt verrassend veel bloot.

**Bruikbare queries:**

```
site:nl "we zijn op zoek naar" "sales manager"
```
Vindt Nederlandse bedrijven die actief sales managers zoeken. Hiring is een koopsignaal voor aangrenzende producten.

```
site:linkedin.com/in "head of growth" "amsterdam" "scaleup"
```
Vindt growth-leiders bij Amsterdamse scale-ups, geïndexeerd door Google.

```
"powered by [concurrent product]" site:nl
```
Vindt Nederlandse sites die de tech van een concurrent draaien (werkt voor SaaS, payments, e-commerce platforms).

```
"published a job" "netherlands" "founder" 2026
```
Persberichten en aankondigingen die founders of hiring noemen.

```
filetype:pdf site:overheid.nl "aanbesteding" "software"
```
Publieke aanbestedingsdocumenten met software-eisen (werkt voor govtech-sales).

**Waar 'ie goed voor is:**
- Gratis, geen quota, geen rate-limit
- Brengt publieke signalen aan het oppervlak die betaalde tools niet altijd indexeren
- Bevestigt dat een bedrijf werkelijk doet wat hun website beweert

**Waar 'ie ophoudt te schalen:**
- Handmatig. Je kunt 20 zoekopdrachten in een middag draaien. Je kunt er geen 2.000 draaien.
- Kwaliteit varieert sterk per query. Je besteedt de helft van je tijd aan het tunen van de operator voordat de resultaten bruikbaar zijn.
- Geen gestructureerde output. Je krijgt een lijst URL's. Je moet nog steeds elk doorklikken en uitzoeken met wie je moet praten.

Voor eenmalig onderzoek op een specifieke account zijn Google operators de beste gratis tool die niemand noemt. Voor doorlopende prospectie zijn ze geen werkstroom.

### 4. Lokale directories en branche-lijsten

Branchverenigingen en regionale directories zijn onderschat voor verticale sales.

**Waar te zoeken:**
- [NLdigital](https://www.nldigital.nl/) voor Nederlandse IT- en software-bedrijven
- [Dutch Startup Association](https://dutchstartup.org/) voor early-stage founders
- [MKB-Nederland](https://www.mkbnl.nl/) voor algemene MKB-directories
- Branchespecifieke gildes (BOVAG voor automotive, Koninklijke Horeca Nederland voor hospitality, etc.)
- Regionale kamers (BOM in Brabant, Oost NL in Gelderland)

**Waar 'ie goed voor is:**
- Vooraf gekwalificeerde lijsten. Als een bedrijf zich bij NLdigital heeft aangesloten, identificeren ze zich als Nederlands IT-bedrijf. Dat is betrouwbaarder dan een SBI-code.
- Bevat vaak contactgegevens van de juiste persoon (lidmaatschapsdirectories noemen een primair contact)
- Gratis of goedkoop toegankelijk (de meeste zijn gratis; sommige betaalde lidmaatschappen ontsluiten de directory)

**Waar 'ie ophoudt te schalen:**
- Dekking is gedeeltelijk. Niet elk relevant bedrijf sluit zich aan.
- Het "primaire contact" is vaak iemand in marketing of operations, niet de koper van jouw product.
- Handmatige extractie. Geen bulkexport.

Dit is de route die de meeste Nederlandse salesteams onderbenutten. Voor een verticaal-specifieke outbound-campagne (bijvoorbeeld verkopen aan Nederlandse IT-consultancies) is starten vanuit de lidmaatschapslijst van NLdigital sneller en schoner dan welke database dan ook.

## De eerlijke unit economics

Dit is de berekening die we op onszelf draaiden voordat we Hooklyne bouwden.

**Handmatige route, 50 prospects per maand:**
- KvK-extracts: €30 per maand voor occasionele pulls
- Sales Navigator: €99 per maand na de gratis trial
- Mail-verrijking (Findymail of vergelijkbaar): €49 per maand instapplan
- Tijd: ongeveer 4 uur per week om 50 prospects te sourcen, verrijken, verifiëren en voor te bereiden. Tegen €75/uur volledig belast is dat €1.200 per maand aan jouw tijd.

**Totale werkelijke kosten: ~€1.378 per maand voor 50 prospects** (€178 in tools + €1.200 in tijd).

**Handmatige route, 200 prospects per maand:**
- Zelfde tools: €178
- Tijd: 16 uur per week. Dat is een halve fulltime hire. ~€4.800 per maand.

**Totaal: ~€4.978 per maand voor 200 prospects.**

Het kruispunt waarop een managed dienst goedkoper wordt dan jouw eigen tijd, voor de meeste teams, ligt rond 80 tot 120 prospects per maand. Daaronder is handmatig prima. Daarboven betaal je voor de tijd van iemand die je voor calls had kunnen gebruiken.

## Waar de handmatige route stilletjes faalt (de delen waar niemand voor waarschuwt)

Na ongeveer 6 tot 8 weken handmatig prospecten gebeuren er drie dingen, in deze volgorde:

**1. De lijst veroudert.** Mensen die je in week 1 onderzocht, hebben in week 6 een nieuwe rol. Ongeveer 4 procent van de B2B-contacten wisselt elke maand van baan. Je "geverifieerde" lijst is binnen zes maanden voor 25 procent verouderd. Handmatig onderhoud is onrealistisch.

**2. De signalen drogen op.** Je hebt de voor de hand liggende triggers (recente funding, nieuwe hires) op je initiële lijst binnen een maand uitgeput. Daarna staan de prospects daar zonder nieuwe reden om contact op te nemen. Of je spamt ze met re-touches, of je laat ze vallen.

**3. De stem vlakt af.** Wanneer één persoon 50 mails per week onderzoekt en schrijft, herhalen de patronen zich. Tegen maand twee begint elke mail hetzelfde te klinken. Reply-rates dalen, en je merkt het pas een maand later omdat het volume het verbergt.

Dit zijn geen problemen die je oplost met betere discipline. Dit zijn problemen die compounden tot je outbound stopt of er een systeem omheen bouwt.

## Wat een managed werkstroom anders doet

De kortste versie: het doet de delen die niet makkelijker worden met oefening.

Gekruiste data over 20+ bronnen zodat het contact dat je onderzoekt werkelijk nog in zijn rol zit. [Hooklyne](/nl/hoe-het-werkt) checkt elke regel tegen meerdere providers en signaleert conflicten voor je een touch verspilt.

Gestructureerde signaaldetectie (funding, hiring, leiderschapswissels, tech-stack-veranderingen, vacatures) die continu draait, niet alleen wanneer je eraan denkt te kijken. Verifieerbare triggers, geen LLM-geparafraseerde "ze hebben over schalen gepost".

Voice-modeling zodat de mail werkelijk leest in de schrijfstijl van je rep, niet als een generieke template die klinkt als elke andere outbound-mail in de inbox.

Compliance- en suppression-infrastructuur zodat de prospect die drie maanden geleden afmeldde niet opnieuw wordt gemaild.

Geen van deze is opwindend. Alle vier zijn het verschil tussen outbound die compoundt en outbound die stilletjes ophoudt te werken.

## Wanneer je handmatig blijft

Voor alle duidelijkheid: we vinden niet dat elk team een tool moet kopen. De handmatige route is het juiste antwoord wanneer:

- Je hebt **minder dan 30 prospects per maand** (de tijdkosten liggen onder de toolkosten)
- Je verkoopt aan **een strakke TAM van onder 200 bedrijven** (je kunt handmatig kiezen en hebt nooit bulk nodig)
- Je bent **de founder die handgepicktee outreach** doet aan droom-accounts (de tijd die je in de prospect investeert is zelf onderdeel van de deal)
- Je **test een nieuwe markt of ICP** en moet leren wat werkt voor je betaalt voor schaal

Voor iedereen anders kost de handmatige route uiteindelijk meer dan ze bespaart.

## De praktische checklist

Ben je een Nederlands MKB dat deze maand B2B-outbound start, dan is dit de volgorde:

- [ ] **Definieer eerst je ICP.** Sector, headcount, regio, rol van de koper. Zonder dit helpt geen tool.
- [ ] **Begin met KvK of NLdigital** om een lijst van 50 doelbedrijven te bouwen. Gratis, snel, accuraat op bedrijfsniveau.
- [ ] **Pak de LinkedIn Sales Navigator-trial** voor 30 dagen. Vind de werkelijke persoon bij elk bedrijf. Sla op als lijst.
- [ ] **Gebruik Google operators** om te verifiëren dat elke prospect een recent signaal heeft dat het waard is te noemen. Zo niet, laat vallen.
- [ ] **Verrijk mails handmatig** voor de eerste 30. Gebruik Hunter, Findymail of RocketReach gratis tiers. Sla over wie je niet kunt verifiëren.
- [ ] **Stuur 30 hoogst gepersonaliseerde mails.** Track replies 14 dagen.
- [ ] **Bekijk de unit economics.** Heb je hier meer dan 8 uur in gestopt, dan is de handmatige route al te duur.

Bereik je stap 7 en klopt de rekening niet, dan is dat het moment waarop [een managed dienst zoals Hooklyne](/nl/contact) zin begint te hebben. Wij vertellen eerlijk of jouw volume het rechtvaardigt. Voor sommige teams niet, en dan zeggen we dat.

## Verwante posts

- [Apollo vs Cognism vs Lusha voor Nederlands en Brits MKB](/nl/blog/apollo-vs-cognism-vs-lusha-voor-nederlands-mkb) - heb je besloten dat je een betaalde tool nodig hebt, dan vergelijken we hier de drie grote opties
- [Je eigen AI lead-generatie agent bouwen: wat er stuk gaat op schaal](/nl/blog/bouw-je-eigen-ai-leadgeneratie-agent) - de derde optie die mensen steeds vaker proberen, en waar 'ie ophoudt te werken
- [Hoe Hooklyne werkt](/nl/hoe-het-werkt) - de werkstroom die we bouwden nadat we tegen de limieten van de handmatige route aanliepen
