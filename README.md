# MovieDB - Interactive Single Page Application

Een interactieve webapplicatie voor het verkennen van films en series van The Movie Database (TMDB) API. Gebruikers kunnen films doorzoeken, filteren, sorteren en hun favorieten opslaan. Dit project is gebouwd met vanilla JavaScript, HTML5 en CSS3 met Vite als build tool.

## 🚀 Snelle Start

### Met Vite (Aanbevolen voor Development)

1. **Node.js installeren** - Download van https://nodejs.org/ (LTS versie)

2. **Dependencies installeren:**
```bash
npm install
```

3. **Development server starten:**
```bash
npm run dev
```
De applicatie opent automatisch op `http://localhost:5173`

4. **Production build maken:**
```bash
npm run build
```
Dit genereert een `dist/` folder klaar voor deployment

### Zonder Build Tool (Directe Browser)

Je kunt de applicatie ook rechtstreeks openen (zonder Vite):
1. Open `index.html` in je favoriet browser
2. De applicatie laadt onmiddellijk

**Opmerking:** De development server met Vite biedt hot module reloading en betere developer experience.

## 📋 Projectbeschrijving

MovieDB is een single-page applicatie gebouwd met vanilla JavaScript die de TMDB API gebruikt om films en series weer te geven. De applicatie biedt een intuïtieve interface met geavanceerde filter- en sorteermogelijkheden, zoekfunctionaliteit en de mogelijkheid om favorieten op te slaan.

### Functionaliteiten

De applicatie bevat alle vereiste functionaliteiten voor een advanced web project:

**Dataverzameling & -weergave:** Films en series worden opgehaald via de TMDB API met minstens 20 items per pagina. De data wordt weergegeven in een aantrekkelijke gridlayout met filmposters in 2:3 aspect ratio. Elk item toont minstens 6 kolommen aan informatie: titel, rating, jaar, genre, populariteit en stemmen. Een detailspagina biedt volledige informatie wanneer gebruikers op een film klikken.

**Filteropties:** Gebruikers kunnen films filteren op type (Film of Serie), genre, uitgebracht jaar, minimale rating en taal. De sorteermogelijkheden omvatten populariteit, rating, releasedatum en titel (A-Z). Alle filters werken in combinatie met elkaar en kunnen gereset worden naar standaardwaarden.

**Zoeken:** Een real-time zoekfunctie stelt gebruikers in staat om films te zoeken op titel. De zoekresultaten worden onmiddellijk weergegeven en kunnen gecombineerd worden met filters.

**Personalisatie:** Gebruikers kunnen hun favoriete films opslaan in LocalStorage, wat betekent dat de favorieten behouden blijven tussen browsersessies. De applicatie biedt ook een dark mode / light mode toggle met automatische opslag van de themavoorkeur.

**Gebruikerservaring:** De interface is volledig responsive en werkt perfect op mobiele apparaten, tablets en desktops. De applicatie bevat smooth animations, hover effecten op filmkaarten en een modale detailweergave die de achtergrond verduistert.

## 🔧 Gebruikte Technologieën

- **HTML5** - Semantic markup en structuur
- **CSS3** - Flexbox, CSS Grid, CSS variables voor thema's
- **JavaScript (Vanilla ES6+)** - Geen frameworks, pure JavaScript
- **Vite** - Modern build tool voor development en production optimization
- **TMDB API** - The Movie Database REST API voor filmdata
- **LocalStorage** - Browser API voor persistente opslag

## 🎬 API Informatie

### The Movie Database (TMDB) API

De applicatie maakt gebruik van de gratis The Movie Database API:
- **Website:** https://www.themoviedb.org/
- **API Documentatie:** https://developer.themoviedb.org/docs

De volgende API endpoints worden gebruikt:
- `/movie/popular` - Ophalen van populaire films
- `/movie/top_rated` - Ophalen van best beoordeelde films
- `/search/movie` - Zoeken naar films op titel
- `/genre/movie/list` - Ophalen van genrelijst
- `/movie/{id}` - Ophalen van volledige filmdetails
- `/discover/movie` - Ophalen van films met custom filters

Alle API calls gebruiken Bearer token authenticatie voor veilige communicatie met de TMDB servers.

## 📁 Projectstructuur

De applicatie volgt een logische folderstructuur met Vite build tool:

```
Project_Web_Advanced/
├── src/
│   ├── assets/          # Afbeeldingen en media bestanden
│   ├── css/
│   │   └── style.css    # Alle styling (flexbox, grid, dark mode)
│   └── js/
│       ├── main.js      # Entry point en initialisatie (CSS import)
│       ├── api.js       # API calls met fetch en async/await
│       ├── ui.js        # DOM manipulatie en weergave
│       ├── filters.js   # Filterfunctionaliteit
│       ├── search.js    # Zoekfunctie
│       ├── favorites.js # Favorieten management met LocalStorage
│       └── theme.js     # Dark mode toggle
├── dist/                # Production build (gegenereerd met npm run build)
├── node_modules/        # Dependencies (gegenereerd met npm install)
├── index.html           # HTML structuur en semantische markup
├── package.json         # Project dependencies en scripts
├── vite.config.js       # Vite configuratie
├── .gitignore           # Git ignore rules
└── README.md            # Documentatie (dit bestand)
```

## 🛠️ Installatiehandleiding

### Lokale Development Setup:

**Stap 1: Node.js installeren**
Download en installeer Node.js van https://nodejs.org/ (kies LTS versie). Dit bevat npm die nodig is voor Vite.

**Stap 2: Project downloaden**
Download het project als ZIP bestand of clone het via Git:
```bash
git clone <repository-url>
cd Project_Web_Advanced
```

**Stap 3: Vite en dependencies installeren**
Voer dit commando uit in de project folder:
```bash
npm install
```
Dit installeert Vite en andere dependencies in `node_modules/` folder.

**Stap 4: Development server starten**
```bash
npm run dev
```
Dit start de Vite development server. De applicatie opent automatisch op `http://localhost:5173`.

**Stap 5: Hot Module Reloading**
Wijzigingen in code worden automatisch gereloaded in de browser. Geweldig voor development!

### Production Build maken:

```bash
npm run 


```

### screenshots 
Zie folder screenshots voor een voorbeelt van de website.
[screenshots](https://vscode.dev/github/lenjochmans-collab/Project_Web_Advanced/blob/main/screenshots)

Dit genereert een geoptimaliseerde `dist/` folder klaar voor deployment. Deze folder bevat minified code en assets.

### Voor online deployment:

Upload de inhoud van de `dist/` folder naar je webserver of gebruik gratis hosting:
- **GitHub Pages** - Gratis hosting direct van je repository
- **Netlify** - Versleep eenvoudig je project folder
- **Vercel** - Ideaal voor static sites en web apps
- **Any web hosting** - Met HTML/CSS/JS support

Je kunt ook rechtstreeks `index.html` openen in een browser (zonder development server) voor snelle tests.

## 📚 Implementatie van Technische Vereisten

De applicatie implementeert alle vereiste JavaScript concepten die gedurende het vak Advanced Web zijn behandeld:

### DOM Manipulatie

De applicatie demonstreert uitgebreide DOM manipulatie op meerdere plekken:

**Elementen selecteren** gebeurt in `ui.js` (linens 164-180) met `document.getElementById()` voor specifieke elementen en `querySelector()` voor CSS selectors. Deze methodes worden gebruikt om filmcontainers, filterbuttons en modale dialogen te selecteren.

**Elementen manipuleren** gebeurt in `ui.js` (lines 164-220) waar `innerHTML` gebruikt wordt om dynamisch filmkaarten te genereren uit API data. De `classList.add()` en `classList.remove()` methodes worden gebruikt om klassen toe te voegen/verwijderen voor styling en state management.

**Events koppelen** gebeurt in `ui.js` (lines 253-290) waar event listeners aan buttons worden gekoppeld voor favorietfunctionaliteit, detailweergave, paginatie en filtertoepassing. Alle event handlers zijn gedocumenteerd met duidelijke functienamen.

### Modern JavaScript

De codebase maakt extensief gebruik van moderne JavaScript features:

**Constanten** worden gebruikt in `api.js` (lines 5-7) voor `API_BASE_URL` en `IMAGE_BASE_URL` die niet mogen veranderen tijdens runtime. Dit bevordert code quality en voorkomt onbedoelde wijzigingen.

**Template literals** worden overal gebruikt voor HTML generatie. In `ui.js` (lines 190-210) zien we backtick-strings met `${variable}` substitutie voor het creëren van HTML. Dit is veel leesbaarder dan string concatenatie met `+`.

**Array iteratie** gebeurt met moderne methodes. In `ui.js` (lines 164-180) gebruiken we `.map()` om een array van filmobjecten te transformeren naar HTML strings. In `filters.js` gebruiken we `.forEach()`, `.filter()` en `.find()` voor diverse array operaties.

**Arrow functions** zijn overal gebruikt in de codebase met de `() => {}` syntax. Deze geven concisere code en beter contextueel `this` binding in callbacks.

**Ternary operator** wordt gebruikt voor compacte conditionale logica. In `ui.js` (lines 185-188) zien we `condition ? trueValue : falseValue` voor het selecteren van poster URLs of fallback emoji's.

**Callback functions** worden uitgebreid gebruikt voor event listeners. Wanneer gebruikers op buttons klikken, worden callback functions opgeroepen die state bijwerken en UI refreshen.

**Promises** worden gegenereerd door de `fetch()` API. Elke API call in `api.js` retourneert een Promise die fulfilled of rejected kan worden.

**Async/Await** wordt gebruikt voor asynchrone operaties. In `ui.js` (lines 100-120) zien we `async function loadMovies()` met `await` keywords die wachten op API calls voordat ze doorgaan. Dit maakt asynchrone code sequentieel en leesbaar.

**Observer API** wordt geïmplementeerd met `IntersectionObserver` voor lazy loading van afbeeldingen. Dit verbetert performance door images pas te laden wanneer ze in beeld komen.

### Data & API

De applicatie implementeert professionele data handling:

**Fetch API** wordt gebruikt in `api.js` (lines 20-27) voor GET requests naar TMDB. De `fetch()` functie retourneert een Promise die de HTTP response representeert.

**Async functions** zijn alle API wrapper functions. Elke functie is gedefinieerd met `async` keyword wat allows voor `await` expressions.

**JSON parsing** gebeurt met `.json()` method op fetch responses. In `api.js` (lines 22-26) zien we hoe response data wordt geparsed van JSON naar JavaScript objecten.

**Error handling** is implementeerd met try/catch blokken in alle API functions. Fouten in API calls resulteren in lege arrays terug naar UI in plaats van crashes.

### Opslag & Validatie

**LocalStorage** wordt intensief gebruikt in `favorites.js` (lines 30-50):
- `localStorage.setItem()` slaat favorieten op
- `localStorage.getItem()` haalt favorieten op
- Data persists automatisch tussen browser sessions

**Data validatie** gebeurt in `filters.js` (lines 48-65) waar input values gecheckt worden op lege strings en ongeldige waardes. Alleen geldige filterwaarden worden naar API verzonden.

**Formulier validatie** in `search.js` (lines 25-35) checkt of zoektermen niet leeg zijn voordat API calls worden gedaan.

### Styling & Layout

**Flexbox** wordt uitgebreid gebruikt voor layouts. In `style.css` (lines 100-120) zien we `.header-container` en `.filter-bar-content` die flexbox gebruiken voor horizontale en verticale alignment van elementen.

**CSS Grid** wordt gebruikt in `style.css` (lines 395-400) voor de `.movies-grid` class die een 4-koloms layout creëert met `grid-template-columns: repeat(4, 1fr)`.

**CSS Variables** definiëren het gehele thema system. In `style.css` (lines 5-35) zien we `:root` variables voor kleuren, spacing en transitions. Dark mode switcht deze variabelen zonder CSS duplication.

**Responsive design** wordt geïmplementeerd met media queries in `style.css` (lines 900+). De layout adapts zich voor mobiele apparaten, tablets en desktops met breakpoints op 1200px, 768px en 480px.

**Gebruiksvriendelijke elementen** zijn overal aanwezig: buttons met duidelijke labels, emoji icons, dropdown selects, range sliders, search bars en favoriet toggles.

## 🎨 Gebruikerservaring

De applicatie is geoptimaliseerd voor het beste gebruikerservaring:

**Responsief Design:** De applicatie werkt perfect op alle schermgroottes. De grid layout schaalt automatisch van 4 kolommen op desktop naar 2 kolommen op tablet en 1 kolom op mobiel.

**Visuele Feedback:** Hover effecten tonen aan gebruikers welke elementen interactief zijn. Filmkaarten tonen informatie op hover met een elegante gradient overlay.

**Modaal Detail View:** Wanneer gebruikers op details klikken, wordt een modale dialoog getoond met een donkergrijze overlay die de achtergrond verduistert. Dit isolates het detail view van de rest van de interface.

**Dark Mode:** Een toggle button in de header laat gebruikers switchen tussen lichte en donkere thema's. De voorkeur wordt opgeslagen in LocalStorage.

**Smooth Transitions:** Alle state changes worden smooth geanimeerd met CSS transitions. Elementen faden in en schuiven subtiel in plaats van te poppen.

**Feedback op Acties:** Wanneer gebruikers een favorieet toevoegen, verandert het hart icoon visueel en wordt feedback gegeven. Filters tonen laadstate terwijl API call in progress is.


🤖 AI Gebruik & Ontwikkelproces
Tijdens dit project heb ik gebruik gemaakt van verschillende AI-tools om mijn workflow te versnellen en mijn code te verbeteren. Hieronder leg ik uit hoe ik AI concreet heb ingezet.

🛠️ Gebruikte tools

GitHub Copilot (VS Code)
Voor inline code suggesties, autocompletion en kleine verbeteringen tijdens het typen
AI (ChatGPT / Claude)
Voor layout generatie, debugging en hulp bij problemen


📋 Ontwikkelproces
1. Basis layout genereren
Ik begon met het laten maken van een basis layout via AI.
Prompt:
maak een basis layout voor een pagina waar je film kan bekijken met zoek sorteer en favorieten opties

De AI gaf mij een eerste ontwerp voor de pagina.
Daarna heb ik deze handmatig aangepast:

Layout verbeterd
Styling aangepast naar mijn eigen voorkeur
Spacing en kleuren verfijnd


2. Gebruik van GitHub Copilot
Tijdens het coderen hielp GitHub Copilot mij met:

Automatische code-aanvullingen
CSS suggesties
Sneller schrijven van functies

Dit maakte het ontwikkelproces efficiënter.

3. API integratie (problemen)
Ik probeerde zelf de API te integreren, maar kreeg meerdere errors:

API werkte niet correct
Data werd niet goed opgehaald
Code gaf fouten

Mijn eerste aanpak was om kleine delen aan te passen, maar dat werkte niet.

4. Debugging met AI
Daarna heb ik AI om hulp gevraagd.
Prompt:
mijn api werkt niet wat is er fout

5. Verdere verbeteringen
Na de werkende oplossing heb ik zelf aanpassingen gedaan:

Functionaliteit getest
Kleine bugs opgelost
Layout verder verbeterd

Wanneer iets niet werkte, gebruikte ik opnieuw AI.
Voorbeeld prompt:
verdubbel het aantal films op 1 pagina


6. README genereren
Tot slot heb ik AI gebruikt om een README te schrijven.
Prompt:
schrijf een read me 'cursusinfo'

Daarna heb ik deze README zelf aangepast en aangevuld.

## 📋 Volledigheid Checklist

Alle vereisten van de opdracht zijn geïmplementeerd:

- ✅ API data ophalen met minstens 20 items per pagina
- ✅ Visueel aantrekkelijke weergave met gridlayout en hover effecten
- ✅ Minstens 6 kolommen informatie per item (titel, rating, jaar, genre, populariteit, stemmen)
- ✅ Filter functionaliteit (type, genre, jaar, rating, taal)
- ✅ Zoekfunctie met real-time resultaten
- ✅ Sorteermogelijkheden (5 opties)
- ✅ Favorieten opslaan in LocalStorage
- ✅ Data persistentie tussen sessies
- ✅ Gebruikersvoorkeuren opslaan (dark mode voorkeur)
- ✅ Responsive design voor mobiel/tablet/desktop
- ✅ Modern, aantrekkelijke interface
- ✅ Intuïtieve navigatie en gebruiksvriendelijke elementen
- ✅ DOM manipulatie (selectie, wijziging, event binding)
- ✅ Modern JavaScript (constanten, template literals, arrow functions, async/await)
- ✅ Callback functions en Promises
- ✅ Observer API (IntersectionObserver)
- ✅ Fetch API en JSON handling
- ✅ LocalStorage opslag en validatie
- ✅ Flexbox en CSS Grid layouts
- ✅ CSS variables voor theming
- ✅ Correcte folderstructuur
- ✅ Meerdere Git commits
- ✅ Uitgebreide README met implementatiedetails
- ✅ Volledig werkende applicatie

## 📍 Vereisten Index - Locaties in Code

Hier is een complete referentielijst met alle vereiste termen en hun exacte locaties in de codebase:

| Vereiste | Bestand | Lijnen | Beschrijving |
|----------|---------|--------|-------------|
| **API Data (20+ items/pagina)** | `src/js/api.js` | 28-35 | `getPopularMoviesWithPagination()` haalt paginated data op |
| **API Endpoints** | `src/js/api.js` | 5 | `API_BASE_URL` constant voor TMDB API |
| **Bearer Token Auth** | `src/js/api.js` | 14-23 | `apiFetch()` injecteert Authorization header |
| **Gridlayout (4 kolommen)** | `src/css/style.css` | 395-400 | `grid-template-columns: repeat(4, 1fr)` |
| **2:3 Aspect Ratio** | `src/css/style.css` | 420-425 | `aspect-ratio: 2 / 3` voor filmposters |
| **6 Informatie Kolommen** | `src/js/ui.js` | 190-210 | `createMovieCard()` toont titel, rating, jaar, genre, populariteit, stemmen |
| **Hover Effects** | `src/css/style.css` | 426-445 | `.movie-info` appears op hover met gradient overlay |
| **Detail Modal** | `src/js/ui.js` | 345-405 | `showMovieDetails()` populeert modale dialoog |
| **Filter - Type** | `src/js/filters.js` | 45-73 | `typeFilter` select element en logic |
| **Filter - Genre** | `src/js/filters.js` | 45-73 | `genreFilter` select element en logic |
| **Filter - Jaar** | `src/js/filters.js` | 45-73 | `yearFilter` select element en logic |
| **Filter - Rating** | `src/js/filters.js` | 45-73 | `ratingFilter` range slider en logic |
| **Filter - Taal** | `src/js/filters.js` | 45-73 | `languageFilter` select element en logic |
| **Filter - Reset** | `src/js/filters.js` | 77-90 | `resetFilters()` stelt alles naar default |
| **Sorteren (5 opties)** | `src/js/filters.js` | 45-73 | `sortFilter` options: popularity, rating, release date, title |
| **Zoeken** | `src/js/search.js` | 25-45 | `handleSearch()` queried `/search/movie` endpoint |
| **Favorites - LocalStorage** | `src/js/favorites.js` | 30-50 | `localStorage.setItem/getItem` voor persistentie |
| **Dark Mode Toggle** | `src/js/theme.js` | 15-35 | `toggleDarkMode()` switcht CSS variables |
| **Theme Opslag** | `src/js/theme.js` | 40-50 | LocalStorage slaat thema preference op |
| **DOM Selectie** | `src/js/ui.js` | 164-180 | `getElementById()`, `querySelector()` voor element access |
| **DOM Manipulatie** | `src/js/ui.js` | 164-220 | `innerHTML`, `classList.add/remove()` voor content wijziging |
| **Event Listeners** | `src/js/ui.js` | 253-290 | `addEventListener()` voor alle user interactions |
| **Template Literals** | `src/js/ui.js` | 190-210 | Backtick strings met `${variable}` substitutie |
| **Arrow Functions** | `src/js/ui.js` | 165+ | `=>` syntax overal in codebase |
| **Array .map()** | `src/js/ui.js` | 164-180 | `.map()` voor array transformatie |
| **Array .filter()** | `src/js/filters.js` | 50-65 | `.filter()` voor array filteren |
| **Array .find()** | `src/js/filters.js` | 60-70 | `.find()` voor single element zoeken |
| **Ternary Operator** | `src/js/ui.js` | 185-188 | `condition ? true : false` compacte logica |
| **Callback Functions** | `src/js/ui.js` | 253-290 | Callbacks in addEventListener handlers |
| **Promises** | `src/js/api.js` | 20-27 | `fetch()` retourneert Promise |
| **Async Functions** | `src/js/ui.js` | 100-120 | `async function loadMovies()` met await |
| **Await Expressions** | `src/js/ui.js` | 100-120 | `await getMovieDetails()` wacht op Promise |
| **Try/Catch** | `src/js/api.js` | 20-27 | Error handling in API calls |
| **Fetch API** | `src/js/api.js` | 20-27 | `fetch(url, options)` voor HTTP requests |
| **JSON Parsing** | `src/js/api.js` | 22-26 | `.json()` method op responses |
| **IntersectionObserver** | `src/js/ui.js` | 430-445 | Lazy loading van afbeeldingen |
| **Flexbox Layout** | `src/css/style.css` | 100-120 | `.header-container`, `.filter-bar-content` |
| **CSS Grid Layout** | `src/css/style.css` | 395-400 | `.movies-grid` met grid-template-columns |
| **CSS Variables** | `src/css/style.css` | 5-35 | `:root` en `body.dark-mode` variabelen |
| **Media Queries** | `src/css/style.css` | 900+ | Responsive breakpoints: 1200px, 768px, 480px |
| **Form Selectie** | `index.html` | 110-150 | Filter form elements met ID selectors |
| **HTML Semantiek** | `index.html` | 1-50 | `<header>`, `<nav>`, `<main>`, `<section>` tags |
| **Input Validatie** | `src/js/filters.js` | 48-65 | Check op lege strings en ongeldige values |
| **Paginatie** | `src/js/ui.js` | 295-320 | Next/prev buttons voor page navigation |
| **ES6 Module Imports** | `src/js/main.js` | 1-12 | `import/export` syntax voor module loading |
| **CSS Import in JS** | `src/js/main.js` | 6 | `import '../css/style.css'` voor Vite |
| **Vite Build Tool** | `vite.config.js` | 1-15 | Development server en production build config |
| **npm Scripts** | `package.json` | 6-9 | `dev`, `build`, `preview` commands |

### Snelle Referentie

**HTML Structuur:** [index.html](index.html)
- Header en navigatie: lijnen 1-50
- Filter bar: lijnen 110-150
- Movies grid container: lijnen 160-170
- Details modal: lijnen 165-203

**Vite Configuratie:**
- [package.json](package.json) - Dependencies en npm scripts
- [vite.config.js](vite.config.js) - Vite server en build config

**JavaScript Modules:**
- [src/js/main.js](src/js/main.js) - Entry point met CSS import (lijnen 1-35)
- [src/js/api.js](src/js/api.js) - API calls (lijnen 5-145)
- [src/js/ui.js](src/js/ui.js) - DOM manipulatie (lijnen 22-450)
- [src/js/filters.js](src/js/filters.js) - Filter logica (lijnen 12-90)
- [src/js/search.js](src/js/search.js) - Zoekfunctie (lijnen 25-45)
- [src/js/favorites.js](src/js/favorites.js) - LocalStorage (lijnen 30-50)
- [src/js/theme.js](src/js/theme.js) - Dark mode (lijnen 15-50)

**Styling:**
- [src/css/style.css](src/css/style.css) - Alle CSS (1000+ lijnen)
- CSS variabelen: lijnen 5-35
- Layout (Flexbox/Grid): lijnen 100-450
- Modal styling: lijnen 655-780
- Dark mode: lichnen 880-900
- Responsive design: lijnen 900+

## 🏫 Project Informatie

Dit project is gemaakt voor het vak **Advanced Web** aan de **Erasmushogeschool Brussel (EHB)**. Het demonstreert master-level JavaScript skills door een volledig functionele single-page applicatie te bouwen met vanilla JavaScript, HTML, CSS en Vite als moderne build tool.

## 📄 Licentie

Dit project is gemaakt voor educatieve doeleinden. Vrij te gebruiken, aanpassen en distribueren met correcte bronvermelding.
