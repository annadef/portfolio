# Anna De Feo — Portfolio

Portfolio personale di Anna De Feo, web designer e full-stack developer. Il sito presenta progetti, competenze e contatti attraverso un'interfaccia editoriale interattiva, con animazioni, una scena 3D e un widget musicale Spotify.

## Stack

- Next.js 16 con App Router
- React 19 e TypeScript
- Tailwind CSS 4
- Motion per transizioni e interazioni
- GSAP per le animazioni testuali
- Lenis per lo smooth scrolling
- Spline per il robot 3D della sezione Skills
- Lucide React per le icone
- Vercel Analytics

## Funzionalità

- Hero responsive con effetto parallax
- Sezione About con testo animato
- Marquee `DESIGN — CODE — BUILD`
- Orbit interattiva delle competenze con trascinamento mouse e touch
- Robot 3D interattivo nella sezione Skills
- Galleria Projects responsive con hover desktop e tap mobile
- Footer Contact con CTA animata
- Floating dock con link a email, Instagram, LinkedIn e GitHub
- Widget vinile con embed di un album Spotify
- Favicon e asset ottimizzati nella cartella `public`

## Requisiti

- Node.js 20 o superiore
- npm

## Installazione

Clona il repository e installa le dipendenze:

```bash
git clone https://github.com/annadef/portfolio.git
cd portfolio
npm install
```

Avvia il server di sviluppo:

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Comandi disponibili

```bash
npm run dev       # Server di sviluppo
npm run lint      # Controllo ESLint
npm run build     # Build di produzione
npm run start     # Avvia la build di produzione
```

Prima del deploy è consigliato eseguire:

```bash
npm run lint
npm run build
```

## Configurazione Spline

Il robot usa una scena Spline configurabile tramite variabile d'ambiente. Se la variabile non è impostata, viene usato l'URL di default definito nel componente.

Crea un file `.env.local` se vuoi usare una scena diversa:

```env
NEXT_PUBLIC_SPLINE_ROBOT_SCENE=https://prod.spline.design/your-scene/scene.splinecode
```

La variabile inizia con `NEXT_PUBLIC_` perché la scena viene caricata dal client.

## Widget Spotify

Il vinile usa l'embed ufficiale di Spotify. L'album può essere cambiato in:

```text
components/music-vinyl.tsx
```

Usa il formato embed:

```text
https://open.spotify.com/embed/album/ALBUM_ID?utm_source=generator
```

La riproduzione dipende dalle limitazioni di Spotify e dal tipo di account dell'utente. L'audio deve essere avviato tramite un'interazione dell'utente.

## Struttura principale

```text
app/
	layout.tsx              Layout globale, metadata e floating dock
	page.tsx                Composizione della pagina principale
	globals.css             Design system e responsive styles

components/
	skills-orbit-robot.tsx  Orbit delle competenze e robot 3D
	works-gallery.tsx       Galleria dei progetti
	video-card.tsx          Card dei progetti
	music-vinyl.tsx         Widget Spotify
	mobile-bubble-menu.tsx  Menu mobile
	ui/                     Componenti UI riutilizzabili

public/
	projects/               Immagini dei progetti
	skills/                 Icone delle competenze
	favicon.png             Favicon del portfolio
```

## Deploy su Vercel

1. Importa il repository `annadef/portfolio` su [Vercel](https://vercel.com/new).
2. Seleziona Next.js come framework.
3. Lascia la directory principale su `./`.
4. Aggiungi `NEXT_PUBLIC_SPLINE_ROBOT_SCENE` solo se vuoi sovrascrivere la scena di default.
5. Avvia il deploy.

Vercel riconosce automaticamente Next.js e usa `npm install` e `npm run build` grazie al `package-lock.json` presente nel repository.

## Licenza e contenuti

I contenuti personali, le immagini dei progetti e gli asset del portfolio appartengono ai rispettivi proprietari. Non riutilizzare immagini, loghi o testi senza autorizzazione.
