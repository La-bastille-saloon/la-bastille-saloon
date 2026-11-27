# MÉMO DE CONTINUITÉ — LA BASTILLE

Dernière mise à jour : 26 novembre 2026

Ce fichier est le carnet de référence du travail sur le site La Bastille. Le relire avant toute reprise, même dans une nouvelle conversation.

## Dépôt de travail

- Dépôt UNIQUE à modifier : https://github.com/La-bastille-saloon/la-bastille-saloon
- Branche : `main`
- Dépôt source Saint-Denis (copie en lecture seule) : https://github.com/cabinet-medical-de-Saint-Denis/cabinet-medical-de-saint-denis.github.io (ne jamais écrire dedans)
- Ne pas travailler dans un dépôt homonyme ou dans `Ryuu62-debug/la-bastille-saloon` : ce n'est pas le dépôt confirmé pour ce projet.

## Objectif

Créer le site de gestion du saloon La Bastille (univers RedM / Red Dead Redemption 2) en partant d'une copie complète de la base Saint-Denis dans le dépôt La Bastille, puis effectuer les adaptations progressivement, une par une. Le dépôt source reste strictement intact.

Conserver les éléments fonctionnels utiles et la structure générale de la base, sans reproduire les fonctions médicales.

## Règles impératives

1. Ne JAMAIS modifier le dépôt Saint-Denis : il est utilisé en production.
2. Ne pas supprimer ni altérer les projets médicaux, leurs données ou leurs configurations Supabase.
3. La Bastille doit être totalement indépendante : AUCUNE authentification, AUCUN Supabase, aucune requête vers un service distant.
4. Stockage local navigateur uniquement, avec export et import de sauvegarde JSON.
5. Prévoir une sauvegarde de sécurité avant tout import qui remplace les données locales.
6. Nouvelle décision du 26/11/2026 : commencer par copier la base Saint-Denis complète dans le dépôt La Bastille, puis adapter les écrans et fonctions progressivement, une par une. Ne pas reconstruire une version simplifiée depuis zéro.
7. Retirer complètement les éléments médicaux : consultations, carnet de consultations, guide médical, tableau des fumigènes et section apprentis, ainsi que toute fonction exclusivement liée à ces modules.
8. Créer une identité visuelle cohérente avec La Bastille et Red Dead Redemption 2 : couleurs, bandeau supérieur, ambiance western/saloon. Aucun nom ou texte médical ne doit rester dans l'interface.
9. Avancer par petites étapes vérifiables. Ne pas lancer une refonte massive non contrôlée.
10. Après CHAQUE étape terminée : vérifier les fichiers et le fonctionnement (au minimum revue du code et tests adaptés), puis faire un commit GitHub dédié. Ne jamais annoncer une étape terminée si elle n'a pas été réellement vérifiée.
11. Mettre à jour ce mémo à chaque étape/commit : état, fichiers modifiés, contrôles effectués, problèmes connus et prochaine action.
12. En cas de doute sur une décision ou sur une donnée, ne pas inventer : inspecter le dépôt et demander une précision si nécessaire.

## Modules / fonctions attendus pour le saloon

- Tableau de bord adapté au saloon.
- Carte / menu de la maison : articles, rubriques et prix modifiables.
- Gestion des stocks et des réserves avec seuils d'alerte.
- Journal des entrées, sorties et corrections de stock.
- Commandes et réception.
- Annuaire / gestion du personnel adaptée au contexte du saloon.
- Navigation responsive.
- Sauvegarde locale : export et import JSON, avec protection avant remplacement.

Les noms précis des rubriques et les détails d'interface peuvent être adaptés, mais les fonctions utiles ne doivent pas être perdues sans raison.

## Découpage de travail convenu

Le projet a été organisé en 7 étapes. Reprendre/valider le découpage exact avec les demandes de l'utilisateur et le contenu du dépôt avant de poursuivre. Ne pas prétendre que les étapes sont finies sans preuves.

- Étape 1 — Cartographie complète du dépôt source et de La Bastille : fichiers, modules, dépendances, fonctions à conserver, fonctions médicales à retirer, ressources visuelles. Livrable : cartographie et plan de conversion.
- Étape 2 — Sécurisation de l'indépendance : vérifier l'absence de Supabase/authentification/services distants et mettre en place le stockage local.
- Étape 3 — Adaptation de la structure et de la navigation au saloon.
- Étape 4 — Conversion des modules métier (carte/menu, stocks, mouvements, commandes, personnel).
- Étape 5 — Identité visuelle La Bastille (bannière, couleurs, typographie, icônes et textes).
- Étape 6 — Sauvegarde/import/export JSON et vérification des cas de restauration.
- Étape 7 — Audit final : recherche de termes/fonctions médicaux, tests des parcours, responsive, publication GitHub Pages.

Ce découpage est indicatif : si le plan précis déjà établi dans la conversation diffère, les consignes explicites les plus récentes de l'utilisateur priment.

## État constaté dans le dépôt au 26/11/2026

- Dépôt public confirmé : `La-bastille-saloon/la-bastille-saloon`.
- Branche par défaut : `main`.
- Fichiers racine repérés : `README.md`, `index.html`, `favicon.svg`, dossier `assets/`.
- `index.html` existe (environ 27 Ko au dernier relevé).
- Le README décrit déjà une application saloon sans compte, sans Supabase, avec stockage local, menu, stocks, journal, commandes, personnel et sauvegarde JSON.
- Le dépôt contient donc déjà un début d'implémentation : ne pas repartir de zéro et ne pas écraser les travaux présents.
- Le dépôt source exact est cabinet-medical-de-Saint-Denis/cabinet-medical-de-saint-denis.github.io, branche main. Arborescence inspectée : .github/workflows, assets/, bureau-enhancements.css, index.html (3,4 Mo), medicine-guide.css, medicine-guide.js, supabase/migrations/, favicons et autres ressources. La copie doit se faire vers le dépôt La Bastille uniquement.
- Le statut fonctionnel réel de chaque module reste à confirmer après copie et tests.
- Le dépôt Saint-Denis n'a pas été modifié.

## Journal des étapes et commits

- 26/11/2026 — Création de ce mémo de continuité. Aucun fichier applicatif modifié dans cette action. Commit à référencer après création.
- Étape 1 — Cartographie : en cours / à valider sur le code source complet.
- Étapes 2 à 7 — Non validées à ce stade.

## Format obligatoire pour chaque mise à jour

À chaque étape, compléter cette section avec :
- Date et numéro d'étape.
- Résumé des modifications.
- Liste exacte des fichiers modifiés.
- Vérifications réellement effectuées et leur résultat.
- Limites / anomalies restantes.
- SHA du commit et lien GitHub.
- Statut : terminé uniquement si vérifié.

## Rappel avant chaque reprise

Lire ce mémo, examiner l'état actuel de `main` et les derniers commits, puis reprendre exactement au dernier point vérifié. Ne pas se fier à un souvenir approximatif de conversation. Ne jamais toucher à Saint-Denis.


## Changement de méthode — 26/11/2026, décision utilisateur

L'utilisateur a demandé de simplifier la méthode : « copie tout simplement saint denis et on fera les modif petit a petit ».

Conséquences :
- La base de départ est désormais une copie complète de Saint-Denis, pas une reconstruction simplifiée.
- Source exacte : https://github.com/cabinet-medical-de-Saint-Denis/cabinet-medical-de-saint-denis.github.io (branche main).
- Destination exclusive : https://github.com/La-bastille-saloon/la-bastille-saloon (branche main).
- Reproduire le contenu source dans le dépôt destination, puis adapter module par module, avec commit et vérification à chaque étape.
- Ne jamais pousser de commit, modifier un fichier, créer une branche ou changer un paramètre dans le dépôt source Saint-Denis.
- Contrainte préexistante maintenue : La Bastille ne doit pas utiliser Supabase ni l'authentification distante ; ne jamais connecter le site Bastille au projet Supabase de Saint-Denis. Lors de la copie, neutraliser/isoler toute configuration distante avant publication si nécessaire, puis migrer vers stockage local + import/export JSON.
- Conserver PROJECT_NOTES.md dans le dépôt La Bastille comme carnet de suivi, même si le reste de l'application est remplacé par la copie.
- 26/11/2026 — À la demande de l'utilisateur, le contenu applicatif préexistant de La Bastille a été retiré pour préparer le dépôt à recevoir la copie Saint-Denis.
- Le dépôt La Bastille ne conserve volontairement que ce fichier de continuité : PROJECT_NOTES.md. README.md, index.html, favicon.svg et assets/ ont été retirés.
- Vérification avant commit : arborescence GitHub inspectée récursivement ; six entrées initiales identifiées, dont PROJECT_NOTES.md conservé. Aucun accès en écriture au dépôt Saint-Denis.
- Prochaine action : l'utilisateur téléverse la copie Saint-Denis dans le dépôt La Bastille. Ne pas toucher à Saint-Denis et ne pas connecter La Bastille à Supabase.

## 27/11/2026 — Suppression de la connexion et sauvegarde locale

- Suppression de la connexion, des comptes, des contrôles d’accès, du client distant et des appels au serveur du cabinet. Le registre s’ouvre directement et enregistre ses données dans le navigateur.
- Les paramètres proposent l’export et l’import JSON. L’import valide le format, demande confirmation et conserve une copie exportable du registre précédent.
- Fichiers concernés : `index.html`, `local-register.js`, `README.md`, ce mémo et les images WebP extraites de la page dans `assets/registre-*.webp`. Le carnet, le guide, le tableau des fumigènes et les écrans d’apprentis ont été retirés. Les fichiers du guide ont été supprimés.
- Vérifications dans Chromium : ouverture des rubriques, zéro requête externe au chargement et pendant les parcours testés, caisse, fournisseur, commande et réception, note du Bureau, persistance après rechargement, export JSON, rejet d’un format invalide, import et copie avant remplacement.
- Les données utilisées auparavant par la copie distante n’ont pas été transférées. Le registre local démarre vide sur un nouveau navigateur. Le Bureau conserve les notes et les pièces jointes localement.

## 27/11/2026 — Thème visuel du saloon

- Palette acajou, bordeaux, laiton et crème inspirée des captures fournies. La façade de nuit sert de bannière du tableau de bord et la photo intérieure accompagne le registre du comptoir.
- Fichiers concernés : `index.html`, `bastille-theme.css`, `assets/bastille-facade.webp` et `assets/bastille-comptoir.webp`. Les vestiges visibles du formulaire de consultations ont été retirés.
- Vérifications dans Chromium sur ordinateur et téléphone : affichage et recadrage du bandeau, chargement de la photo intérieure, navigation et persistance de la caisse après rechargement.

## 27/11/2026 — Suppression des fournisseurs

- `index.html` affiche uniquement les lieux et fiches effectivement enregistrés. Les lieux prédéfinis et les fiches automatiques qui réapparaissaient après suppression ont été retirés.
- `local-register.js` désactive les fiches d’un lieu en tenant compte des espaces autour du nom et accepte les anciennes fiches sans lieu.
- Vérifié dans Chromium : suppression d’un lieu et de fiches individuelles, persistance après actualisation, stock conservé et possibilité de recréer le lieu.
