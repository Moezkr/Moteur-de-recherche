<h1 align="center"> Architecture du Projet </h1>
Cette section explique l'architecture logique du moteur de recherche et les choix techniques qui la supportent.

## 1.1 Architecture Logique (Divisions Modulaires)

L'application est conçue en trois modules distincts pour la collecte, la recherche et l'évaluation.

| Module                     | Technologies                   | Rôle Principal                                                                 |
|-----------------------------|-------------------------------|-------------------------------------------------------------------------------|
| Data Pipeline (SEARCH_ENGINE_SCRAPPER) | Python, requests, pandas      | Récupération du corpus depuis Archive.org (scraping) et nettoyage (suppression des doublons/nombres). |
| Moteur de RI & Frontend (NEXTJS_APP) | Next.js 16, React, TypeScript | Contient l'index en mémoire, les algorithmes Booléen et Vectoriel, et fournit l'interface utilisateur. |
| Évaluation (EVALUATION)    | Python, matplotlib, scikit-learn | Calcul des métriques de performance (Précision, Rappel, F1) et génération des graphiques P-R. |

## 1.2 Structure du Moteur de Recherche Interne (NEXTJS_APP)

Le cœur de la recherche repose sur des structures de données optimisées :

- `indexer.ts` : Lit les documents bruts et construit toutes les structures d'index en mémoire (Index Inversé, Term Frequencies, IDF).  
- `boolean.ts` : Utilise l'Index Inversé pour effectuer les opérations ensemblistes (union, intersection, différence) pour les requêtes AND, OR, NOT.  
- `vectoriel.ts` : Utilise les poids TF-IDF et le vocabulaire global pour calculer la Similarité Cosinus entre le vecteur de la requête et les vecteurs des documents.  

## 1.3 Choix Techniques et Justification

- **Next.js/React & TypeScript** : Choisi pour sa performance, son rendu côté serveur potentiel et l'utilisation de TypeScript qui améliore la robustesse du code. Le moteur de RI est codé en TypeScript côté client pour une exécution rapide et directe sans API backend complexe.  
- **TF-IDF** : Le Vectoriel a été préféré au TF-IDF "pur" car il intègre la normalisation de la longueur des documents et la similarité cosinus, offrant un meilleur classement.  
- **pandas et openpyxl** : Utilisés pour l'évaluation afin de simplifier la lecture et l'analyse du fichier `ground_truth.xlsx`.  

---

# 5. Architecture Physique et Déploiement

Le projet est déployé en utilisant une infrastructure cloud classique pour garantir la disponibilité et la performance.

| Composant              | Technologie                   | Rôle                                                                 |
|------------------------|-------------------------------|---------------------------------------------------------------------|
| Serveur d'Hébergement  | VPS (Virtual Private Server) OVHcloud | Héberge l'application Next.js compilée (rendu et exécution).       |
| Réseau de Distribution | CDN Cloudflare                 | Assure la mise en cache et la distribution rapide des assets statiques de l'application à l'échelle mondiale. |
| Gestion DNS            | Hostinger (moezkr.site)       | Gère le routage du domaine vers le CDN/VPS.                        |
