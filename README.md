# La Bastille — Saloon

Site web RedM / RP de La Bastille.

## État actuel

- Identité visuelle western et bannière SVG dédiée.
- Navigation responsive.
- Carte de la maison.
- Registre des articles et quantités.
- Journal des entrées, sorties et corrections.
- Suivi des commandes et livraisons.
- Annuaire du personnel.
- Export JSON des données locales.

## Données et sécurité

Cette première version enregistre les données de gestion dans le stockage local du navigateur. Elles ne sont donc **pas partagées** entre les membres du personnel, les appareils ou les navigateurs. L'export JSON permet de sauvegarder les données du navigateur courant.

La connexion multi-utilisateur, les rôles et les droits d'accès ne sont pas encore activés. Ils nécessiteront une base Supabase dédiée à La Bastille et des règles RLS adaptées. Aucune URL, clé, table ou donnée des cabinets médicaux n'est réutilisée.

## Publication GitHub Pages

Dans les paramètres du dépôt, ouvrir **Pages**, choisir **Deploy from a branch**, sélectionner `main` et le dossier `/ (root)`, puis enregistrer. Le site sera publié à l'adresse GitHub Pages proposée par GitHub.

## Personnalisation

- Bannière : `assets/bastille-banner.svg`
- Page principale et interface : `index.html`
