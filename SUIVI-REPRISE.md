# La Bastille — suivi de reprise

## Règles impératives
- Le dépôt Saint-Denis est une source de lecture uniquement : aucune écriture, aucun changement de branche, aucun commit.
- Tous les changements sont réalisés exclusivement dans ce dépôt La Bastille.
- Aucun compte, aucune authentification, aucun rôle et aucune dépendance Supabase.
- Persistance locale dans le navigateur, avec export et import de sauvegarde JSON.
- Enregistrer les étapes terminées par des commits Git réguliers.

## Point de départ vérifié — 26 novembre 2026
- Dépôt cible : `La-bastille-saloon/la-bastille-saloon`.
- Branche de travail isolée : `work/bastille-reprise-securisee`.
- Branche de publication existante : `main` (non modifiée par cette reprise).
- Dépôt source consulté en lecture seule : `cabinet-medical-de-Saint-Denis/cabinet-medical-de-saint-denis.github.io`.
- La page actuelle de La Bastille est une application autonome d'environ 27 Ko avec carte, inventaire, mouvements, commandes, personnel et sauvegarde locale.
- La page source Saint-Denis fait environ 3,4 Mo et comporte des fichiers et modules complémentaires. La version actuelle de La Bastille n'est donc pas encore une reprise fidèle de sa structure complète.

## À faire
1. Cartographier la structure et les fonctionnalités utiles de la source Saint-Denis, sans jamais modifier son dépôt.
2. Reproduire dans le dépôt La Bastille les éléments de structure utiles, en supprimant consultations, carnet, guide médical, fumigènes et apprentis.
3. Remplacer les fonctions médicales conservées par des fonctions cohérentes avec un saloon.
4. Vérifier l'absence totale de Supabase, authentification et comptes.
5. Vérifier les données locales, l'export JSON et la restauration JSON.
6. Finaliser le thème et les éléments graphiques La Bastille.
7. Tester les parcours principaux avant toute publication sur `main`.

## Dernier point enregistré
Branche de travail créée depuis `main`. Aucune modification n'a été faite au dépôt Saint-Denis ni à la branche `main` de La Bastille.
