# ldcWeb — Documentation pour Claude Code

## Ce qu'est ce projet

Site vitrine statique pour **LDC** (Logiciel de Caisse), une application de caisse enregistreuse open-source, gratuite et conforme NF525 (norme fiscale française obligatoire). Le site est l'outil marketing du projet — il doit convaincre des commerçants indépendants (restaurateurs, cafetiers, boulangers…) de télécharger LDC plutôt que de payer 50-200 €/mois pour une solution concurrente.

Le repo de l'application LDC elle-même est à `../ldc` (projet Tauri/React). Ce repo ne contient que le site web.

---

## Stack technique

- **Astro 4** (pas 5 ni 6 — Node 20 oblige, Astro 5+ requiert Node 22)
- **Tailwind CSS 3** via `@astrojs/tailwind`
- **Déploiement** : Vercel (config dans `vercel.json`)
- **Pas de framework JS** côté client — site 100% statique pour l'instant

```
ldcWeb/
├── src/
│   ├── layouts/
│   │   └── Layout.astro      # Layout HTML de base (meta, fonts, body)
│   ├── pages/
│   │   └── index.astro       # Page d'accueil (seule page pour l'instant)
│   └── components/           # Vide pour l'instant — prêt à recevoir des composants
├── public/                   # Assets statiques (favicon à ajouter)
├── astro.config.mjs
├── tailwind.config.mjs
├── vercel.json
└── package.json
```

---

## Commandes

```bash
npm install       # installer les dépendances
npm run dev       # serveur de développement → http://localhost:4321
npm run build     # build statique → ./dist/
npm run preview   # prévisualiser le build
```

---

## État actuel (v0.5.0 — avril 2026)

### Ce qui est fait ✅

**Page d'accueil unique** (`src/pages/index.astro`) avec :
- Header fixe avec nav + lien Ko-fi
- Hero : accroche militante, 3 boutons de téléchargement (macOS ARM, macOS Intel, Windows)
- Bloc statistiques (0€/mois, NF525, 100% open source)
- Section "Pour qui" (5 profils : restaurant, café, boulangerie, épicerie, food truck)
- Grille 6 fonctionnalités
- Section tarifs : plan Libre (gratuit) vs plan Pro (~15€/mois, marqué "Bientôt")
- Section Ko-fi + CTA GitHub
- Footer

### Ce qui manque 🔜

- Favicon (`public/favicon.png`) — à récupérer depuis `../ldc/src-tauri/icons/128x128.png`
- Screenshot de l'application dans le hero — le vide visuel est flagrant
- Page `/tarifs` dédiée avec le tableau complet (voir ROADMAP LDC)
- Page `/hardware` (kits Raspberry Pi clé en main)
- Page `/manifeste` (histoire du projet, philosophie)
- SEO : og:image, twitter card, sitemap
- Domaine : `ldccaisse.fr` (non encore acheté/configuré)

---

## Variables à mettre à jour à chaque release LDC

Dans `src/pages/index.astro`, ligne 4 :

```js
const VERSION = "0.5.0"; // ← mettre à jour à chaque nouvelle version de LDC
```

Les URLs de téléchargement sont construites automatiquement depuis `VERSION`.

---

## Positionnement et ton

**Message central** : un logiciel de caisse ne devrait pas être un poste de dépense pour un petit commerce. Les concurrents (Lightspeed, Zelty, Innovorder…) coûtent 50-200€/mois. LDC est gratuit, open-source, conforme NF525.

**Ton** : militant mais pas agressif. Direct, humain, pas corporate. "Un projet fait par une seule personne en dehors des heures de boulot."

**Accent couleur** : orange (`text-orange-500`, `bg-orange-500`) — cohérent avec le thème de l'app LDC.

**Thème** : dark uniquement (`bg-zinc-950`). Pas de toggle clair/sombre sur le site.

---

## Liens importants

| Ressource | URL |
|-----------|-----|
| Repo LDC (l'app) | https://github.com/aizo-groove/ldc |
| Ko-fi | https://ko-fi.com/aizogroove |
| Releases LDC | https://github.com/aizo-groove/ldc/releases |
| Vercel (déploiement) | à configurer — projet non encore connecté |
| Domaine cible | ldccaisse.fr (non encore acheté) |

---

## Déploiement Vercel

Le `vercel.json` est configuré. Pour connecter :

1. Créer un compte Vercel (gratuit)
2. "Add New Project" → importer ce repo GitHub
3. Vercel détecte Astro automatiquement
4. Deploy

À noter : Vercel est aussi utilisé pour l'API de feedback de l'app LDC (`../ldc/api/feedback.ts`). Ce sont deux projets Vercel distincts — le site vitrine est séparé de l'API feedback.

---

## Roadmap site (extraite du ROADMAP.md de LDC)

### MVP (fait)
- Page d'accueil avec hero, téléchargement, fonctionnalités, tarifs, Ko-fi

### Court terme
- Favicon + screenshot app dans le hero
- SEO de base (og:image, sitemap)
- Déploiement Vercel + domaine

### Moyen terme
- Page tarifs complète
- Page hardware (kits Raspberry Pi)
- Page manifeste / à propos
- Espace client Pro (si LDC Pro se concrétise — Next.js à ce stade)
