# Portfolio

Site portfolio bilingue (EN/FR) construit avec Next.js 16, React 19 et TypeScript, avec un assistant IA propulsé par Claude.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:3000
```

`npm run lint` vérifie les types et `npm run build` prépare la version de production.

## Mettre ton contenu

Tout le contenu est dans **`content/profile.ts`** : nom, ville, email, liens, rôles, projets, expériences, formation, certifications, langues et distinctions. Chaque texte a une version `en` et `fr`. Remplace tout ce qui est entre `[CROCHETS]`.

- **Photo** : place ta photo dans `public/` (ex. `public/photo.jpg`) puis mets `photo: "/photo.jpg"` dans `profile`.
- **CV** : place ton CV dans `public/cv.pdf`.
- **Captures de projets** : place les images dans `public/projects/` et renseigne `image: "/projects/nom.png"` sur chaque projet.
- **Textes de l'interface** (boutons, titres) : `lib/strings.ts`.

## Assistant IA

Le chat répond aux questions des visiteurs à partir de `content/profile.ts` et peut rédiger pour eux un courriel d'offre d'emploi ou de collaboration (ouvert dans leur messagerie ou copié).

Pour activer les réponses de l'IA, crée une clé sur https://console.anthropic.com et définis la variable d'environnement `ANTHROPIC_API_KEY` (copie `.env.example` en `.env.local` en local, ou dans les réglages du site sur Netlify). Sans clé, l'assistant fonctionne quand même avec des réponses prévues à l'avance et la rédaction de courriels.

L'API utilise le modèle `claude-opus-5-5` (effort bas pour des réponses rapides), avec mise en cache du profil et le repli automatique côté serveur (`fallbacks: "default"`) activé : si une demande est refusée par le modèle principal, elle est relancée sur un modèle de secours.

## Déployer sur Netlify

1. Pousse ce dossier sur ton dépôt GitHub.
2. Sur Netlify : **Add new site → Import an existing project**, choisis le dépôt. La configuration est lue depuis `netlify.toml`.
3. Ajoute `ANTHROPIC_API_KEY` dans **Site configuration → Environment variables**, puis redéploie.

## Structure

```
app/            page, mise en page, styles et route /api/chat
components/     en-tête, hero (cube 3D), sections, assistant, recherche (Ctrl/Cmd+K)
content/        ton contenu (profile.ts)
lib/            état de l'application (langue, rôle) et textes de l'interface
public/         photo, CV, images
```
