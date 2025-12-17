<h1 align="center"> Moteur de Recherche </h1>


### *Modèles Booléen & Vectoriel (TF-IDF) – Projet Académique*



## Introduction

Ce projet implémente un **mini-moteur de recherche web** complet basé sur deux modèles vus en cours :

* **Modèle Booléen**
* **Modèle Vectoriel (TF-IDF + Similarité Cosinus)**

L’architecture repose sur :

* **Python** → Collecte, nettoyage des données et évaluation IR
* **Next.js / TypeScript** → Indexation, moteur de recherche et interface utilisateur

Ce README couvre l’installation, l’architecture, le fonctionnement, l’évaluation et les livrables.

---

# 1. Architecture du Projet

Le projet comporte **trois modules** :

```
Mini-Search-Engine
│
├── SEARCH_ENGINE_SCRAPPER/
│   ├── scrapper.py
│   ├── clean_json.py
│   └── archive_org_metadata_clean.json
│
├── NEXTJS_APP/
│   ├── app/
│   ├── data/index/
│   ├── export_index.js
│   └── pages/
│
└── EVALUATION/
    ├── ground_truth.xlsx
    ├── evaluator.py
    ├── plot_pr_curve.py
    ├── evaluation_report.md
```

---

# 2. Modèles de Recherche Implémentés

| Modèle                 | Méthode                 | Caractéristiques                                |
| ---------------------- | ----------------------- | ----------------------------------------------- |
| **Booléen**            | Opérateurs AND, OR, NOT | Haute précision<br>Faible rappel                |
| **Vectoriel (TF-IDF)** | Similarité Cosinus      | Meilleur rappel<br>Classement des documents     |

---

# 3. Installation & Exécution

Vous devez installer les dépendances dans **deux environnements distincts**.

---

## A. Environnement Python (Data & Évaluation)

Installer les dépendances :

```bash
pip install pandas numpy requests openpyxl matplotlib scikit-learn
```

---

## B. Environnement Node.js (Web App)

```bash
npm install
npm install -g ts-node typescript
```

---

# 4. Étape 1 : Collecte & Nettoyage (Python)

Dans `SEARCH_ENGINE_SCRAPPER` :

| Script          | Action               | Output                            |
| --------------- | -------------------- | --------------------------------- |
| `scrapper.py`   | Collecte Archive.org | `archive_org_metadata_100.json`   |
| `clean_json.py` | Nettoyage & filtrage | `archive_org_metadata_clean.json` |

Commandes :

```bash
python scrapper.py
python clean_json.py
```

---

# 5. Étape 2 : Préparation de l’Index (Next.js)

1. Copier `archive_org_metadata_clean.json` dans :
   `/app`

2. Renommer :
   `archive_org_metadata.json`

3. Générer l’index :

```bash
ts-node export_index.js
```

Sorties générées dans `/data/index` :

* `inverted_index.json`
* `global_idf.json`
* `documents_tokens.json`

---

# 6. Étape 3 : Lancer l’Application Web

```bash
npm run dev
```

Accès : **[http://localhost:3000](http://localhost:3000)**

---

# 7. Étape 4 : Évaluation IR (Python)

Dans le dossier `EVALUATION` :

* `ground_truth.xlsx` = jugements humains
* `evaluator.py` = produit précision, rappel, F1
* `plot_pr_curve.py` = bonus (courbe PR)

Commandes :

```bash
python evaluator.py
python plot_pr_curve.py
```

Sorties générées :

* `evaluation_report.md`
* `precision_recall_curve.png`

---

# 8. Livrables IR (Module 5)

| Fichier                  | Description                                |
| ------------------------ | ------------------------------------------ |
| **ground_truth.xlsx**    | Vérité terrain (pertinent / non pertinent) |
| **evaluator.py**         | Calcul P / R / F1                          |
| **evaluation_report.md** | Tableau final des résultats                |
| **plot_pr_curve.py**     | Courbe Précision–Rappel (bonus)            |

---
# 9. Captures Ecrans

## Développement

|<img width="1919" height="1029" alt="1" src="https://github.com/user-attachments/assets/492215df-c9e6-414f-832a-079441166b29" />|<img width="1919" height="1029" alt="2" src="https://github.com/user-attachments/assets/13861145-e998-4fdb-9813-dddbfe6d5f85" />|<img width="1919" height="1029" alt="3" src="https://github.com/user-attachments/assets/440a07ff-f275-46fc-81bb-261759d0ceea" />|
|---------|---------|---------|


## Plateforme

|<img width="1919" height="941" alt="4" src="https://github.com/user-attachments/assets/7eb3b995-089b-4ab2-9555-6789e48e4b57" />|<img width="1919" height="940" alt="5" src="https://github.com/user-attachments/assets/2654fd3a-58ee-47ad-b781-17d455ca4dcc" />|<img width="1899" height="939" alt="6" src="https://github.com/user-attachments/assets/64739091-0d8c-4087-9590-105a2cca3d0f" />|
|---------|---------|---------|


## Cloud

|<img width="1859" height="947" alt="7" src="https://github.com/user-attachments/assets/1eb64a1e-1723-42e0-8710-59eb62d19dfa" />|<img width="1857" height="950" alt="8" src="https://github.com/user-attachments/assets/ecd961d5-0ead-4b9c-8d43-c40fc265c902" />|<img width="1858" height="954" alt="9" src="https://github.com/user-attachments/assets/e1a1bda9-9bd5-4ba6-bc6b-e8baee5c102f" />|
|---------|---------|---------|

# 10. Technologies Utilisées

### Python

* pandas
* numpy
* requests
* scikit-learn
* matplotlib

### Next.js / TypeScript

* React
* TF-IDF implementation
* Inverted Index JSON
* Similarité cosinus

---

# 11. Résultats & Analyse

* Le **modèle vectoriel** obtient le **meilleur F1-score global**
* Le **modèle booléen** obtient une **précision élevée** mais manque beaucoup de documents pertinents (faible rappel)
* La courbe PR montre une **supériorité du modèle vectoriel** sur l’ensemble des requêtes testées

---
