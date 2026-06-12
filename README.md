<div align="center">

<img src="public/icon-readme.png" width="96" height="96" alt="*maki icon" />

# \*maki

_si legge **"star maki"**_

**L'app per segnare i piatti al sushi all you can eat.**

[![Live](https://img.shields.io/badge/live-maki.mele.io-2C372D?style=flat-square&logoColor=white)](https://maki.mele.io)
[![PWA](https://img.shields.io/badge/PWA-installabile-F07868?style=flat-square)](https://maki.mele.io)
[![License](https://img.shields.io/badge/license-MIT-F4F0E2?style=flat-square&labelColor=2C372D)](LICENSE)

</div>

---

## «E questo, chi l'ha ordinato?»

Sei al sushi all you can eat: il menù è infinito, i piatti arrivano alla rinfusa e a metà cena non ricordi più cosa hai ordinato, cosa deve ancora arrivare e cosa ti era piaciuto l'ultima volta.

\*maki ti allevia l'ansia da menù: segni cosa ordini, spunti quando arriva al tavolo, e la volta dopo sai già da dove partire.

## Cosa fa

- **Un menù per ogni ristorante** — ogni locale tiene il suo catalogo di piatti (nome + numero dal menù, se vuoi) e la sua memoria, visita dopo visita
- **Ordine al tavolo** — aggiungi i piatti che ordini e spunta quelli che arrivano, così non perdi il conto nella ressa di portate
- **Foto dei piatti** — attacca una foto a ogni piatto per riconoscerlo al volo quando atterra in tavola
- **Pollice su, pollice giù** — a fine cena vota cosa rifare e cosa evitare; la volta dopo i preferiti sono già in cima
- **Tutto in locale** — niente account, niente cloud: i dati, foto comprese, vivono solo sul tuo telefono
- **Installabile e offline** — è una PWA: funziona anche senza rete, con dark mode di serie

## Provala

\*maki è una **Progressive Web App**: si apre dal browser, senza installazione obbligatoria.

### [→ maki.mele.io](https://maki.mele.io)

Per averla a portata di mano puoi installarla in schermata Home: su iPhone da Safari → *Aggiungi alla schermata Home*, su Android da Chrome → *Installa app*. Niente store, niente download pesanti.

## Tech stack

| | |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 6 |
| Stile | Tailwind CSS v4 |
| Font | Fraunces (display) · DM Sans (corpo) |
| Componenti | Base UI |
| Dati | localStorage (stato) · IndexedDB via Dexie (foto) |
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
