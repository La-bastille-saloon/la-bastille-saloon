# La Bastille — Saloon

Site de gestion du saloon La Bastille pour le serveur RedM / RP.

## Fonctionnalités

- Identité visuelle western dédiée : bandeau, couleurs et typographies.
- Navigation responsive.
- Carte de la maison.
- Inventaire des réserves et seuils d'alerte.
- Journal des entrées, sorties et corrections de stock.
- Suivi des commandes et de leur réception.
- Annuaire du personnel.
- Export et import de sauvegardes JSON.

## Stockage des données

Le site fonctionne sans compte, sans authentification et sans service distant. Les données sont enregistrées dans le stockage local du navigateur utilisé.

**Important :** le stockage local n'est pas synchronisé entre plusieurs appareils ou navigateurs. Utilisez régulièrement « Exporter une sauvegarde JSON » et conservez le fichier obtenu. L'import d'un fichier JSON La Bastille remplace les données actuellement présentes dans le navigateur.

Aucune connexion ni donnée Supabase n'est utilisée par ce site.

## Publication GitHub Pages

Dans les paramètres du dépôt, ouvrir **Pages**, choisir **Deploy from a branch**, sélectionner la branche `main` et le dossier `/ (root)`, puis enregistrer.

## Personnalisation

- Bannière : `assets/bastille-banner.svg`
- Page et fonctionnalités : `index.html`
- Icône : `favicon.svg`
