<div align="center">

<img src="public/icon-readme.png" width="96" height="96" alt="*maki icon" />

# \*maki

_si legge **"star maki"**_

**Il tuo taccuino digitale per il sushi all you can eat.**

[![Live](https://img.shields.io/badge/live-maki.mele.io-2C372D?style=flat-square&logoColor=white)](https://maki.mele.io)
[![PWA](https://img.shields.io/badge/PWA-installabile-F07868?style=flat-square)](https://maki.mele.io)
[![License](https://img.shields.io/badge/license-MIT-F4F0E2?style=flat-square&labelColor=2C372D)](LICENSE)

</div>

---

## Il problema

Sei al ristorante di sushi all you can eat. Devi sfogliare il menu, ricordarti cosa hai ordinato e cosa ti è piaciuto l'ultima volta, e tenere traccia di cosa hai già ordinato e cosa deve ancora arrivare al tavolo.

\*maki risolve esattamente questo.

## Cosa fa

- **Ristoranti multipli** — salva tutti i locali che frequenti, ognuno con la propria memoria
- **Catalogo piatti** — ogni piatto ha un nome e opzionalmente il numero dal menu; rimane salvato tra una visita e l'altra
- **Ordine in corso** — aggiungi i piatti che hai ordinato e segna quelli che arrivano al tavolo man mano
- **Voti** — alla fine di ogni visita puoi segnare cosa riordinare e cosa evitare, così la volta dopo sai già da dove partire

## Dove si usa

L'app è disponibile come **Progressive Web App** direttamente dal browser, senza installazione obbligatoria:

### [→ maki.mele.io](https://maki.mele.io)

Su Android e iOS puoi installarla nella schermata home come un'app nativa tramite il menu del browser → *Aggiungi alla schermata Home*.

## Tech stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Stile | Tailwind CSS v4 |
| Font | Fraunces (display) · DM Sans (corpo) |
| Componenti | Base UI |
| PWA | vite-plugin-pwa + Workbox |
| Analytics | Umami |

## Sviluppo locale

**Prerequisiti:** Node.js 18+

```bash
# Clona il repo
git clone https://github.com/melefabrizio/star-maki-app
cd star-maki-app

# Installa le dipendenze
npm install

# Avvia il dev server
npm run dev
```

L'app sarà disponibile su `http://localhost:3000`.

Per testare la PWA (service worker + manifest) usa invece:

```bash
npm run build && npm run preview
```

---

## Contribuire

Contributi benvenuti — che si tratti di bug, idee o miglioramenti all'interfaccia.

### Come iniziare

1. **Fai un fork** del repo e crea un branch dal tuo `main`:
   ```bash
   git checkout -b fix/nome-del-fix
   ```
2. **Fai le modifiche**, assicurandoti che il build passi:
   ```bash
   npm run build
   ```
3. **Apri una Pull Request** descrivendo cosa hai cambiato e perché.

### Linee guida

- Mantieni lo stile visivo coerente con la palette esistente (salmon · nori · rice)
- Preferisci modifiche piccole e focalizzate a PR monolitiche
- Se stai aggiungendo una feature nuova, aprila prima come issue per discuterne

### Segnalare un bug

Apri una [issue](https://github.com/melefabrizio/star-maki-app/issues) con una descrizione del problema, il browser/dispositivo usato e gli step per riprodurlo.

---

<div align="center">
  <sub>Made with ♥ by <a href="https://mele.io">Fab</a></sub>
</div>
