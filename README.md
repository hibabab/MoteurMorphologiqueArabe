# 🔤 Arabic Morphological Search Engine

> Mini-projet Algorithmique — Moteur de Recherche Morphologique et Générateur de Dérivation Arabe

---

## 📌 Description

Ce projet implémente un **moteur morphologique pour la langue arabe** basé sur le système **racine–schème (Root–Pattern)**.  
Il permet de générer et valider des mots dérivés à partir de racines arabes trilitères, en exploitant des structures de données avancées pour garantir efficacité et précision.

**Stack technologique :**
- 🖥️ **Frontend** : React.js  Tailwind CSS
- ⚙️ **Backend** : Java (Spring Boot REST API)
- 🗂️ **Structures de données** : AVL Tree (racines) + Hash Table (schèmes)

---

## 🎬 Démonstration & Téléchargement

| Ressource | Lien |
|-----------|------|
| 🎥 Vidéo démo + APK/App | [📁 Google Drive](https://drive.google.com/drive/folders/1pXt8DiZM4KlOdS0s0thB5M5P5B4JWwRo?usp=sharing) |

> **Le dossier Drive contient :**
> - `demo.mp4` — Démonstration complète du système


---

## 🧠 Contexte Linguistique

La langue arabe repose sur un système morphologique **racine–schème** où les mots se forment par insertion d'une racine consonantique dans un schème abstrait :

| Racine | Schème | Mot Généré | Sens |
|--------|--------|------------|------|
| ك–ت–ب | فَاعِل | كَاتِب | Écrivain |
| ك–ت–ب | مَفعُول | مَكتُوب | Écrit |
| ك–ت–ب | افتَعَل | اكتَتَب | S'abonner |
| ك–ت–ب | تَفعِيل | تَكتِيب | Transcription |

---


## ⚙️ Structures de Données

### 1. 🌳 Arbre AVL — Gestion des Racines

Les racines trilitères arabes sont stockées dans un **arbre AVL** (arbre binaire de recherche équilibré).

**Chaque nœud contient :**
- La racine arabe (ex. : `كتب`)
- La liste des mots dérivés validés
- La fréquence d'apparition de chaque dérivé

**Complexité :**
| Opération | Complexité |
|-----------|-----------|
| Insertion | O(log n) |
| Recherche | O(log n) |
| Suppression | O(log n) |

### 2. 🗄️ Table de Hachage — Gestion des Schèmes

Les schèmes morphologiques sont stockés dans une **table de hachage implémentée manuellement**.

**Structure :**
- **Clé** : Identifiant du schème (ex. : `مفعول`)
- **Valeur** : Règle algorithmique de transformation + représentation abstraite

**Schèmes supportés :**

| Schème | Patron abstrait | Exemple |
|--------|----------------|---------|
| فَاعِل | C₁-ā-C₂-i-C₃ | كَاتِب |
| مَفعُول | m-a-C₁-C₂-ū-C₃ | مَكتُوب |
| افتَعَل | i-C₁-t-a-C₂-a-C₃ | اكتَتَب |
| تَفعِيل | t-a-C₁-C₂-ī-C₃ | تَكتِيب |
| مَفعَل | m-a-C₁-C₂-a-C₃ | مَكتَب |

---

## 🚀 Fonctionnalités

### ✅ Gestion des Racines
- Chargement initial depuis un fichier `roots.txt`
- Insertion / suppression dynamique dans l'AVL
- Recherche en O(log n)
- Affichage structuré (parcours infixe, préfixe, suffixe)

### ✅ Gestion des Schèmes
- Stockage dans une table de hachage manuelle
- Ajout / modification / suppression de schèmes
- Association de règles de transformation algorithmiques

### ✅ Génération Morphologique
- Dérivation automatique : `racine + schème → mot`
- Génération de toute une famille morphologique
- Affichage formaté : racine, schème, mot généré

### ✅ Validation Morphologique
- Vérification : `Le mot X appartient-il à la racine Y ?`
- Décomposition automatique → identification du schème
- Résultat explicite : **OUI / NON** + schème reconnu

### ✅ Gestion des Dérivés Validés
- Association racine ↔ liste de dérivés
- Mise à jour automatique à chaque opération
- Affichage de la famille morphologique complète

---


## 📊 Analyse de Complexité

| Opération | Structure | Cas moyen | Cas pire |
|-----------|-----------|-----------|----------|
| Recherche racine | AVL | O(log n) | O(log n) |
| Insertion racine | AVL | O(log n) | O(log n) |
| Accès schème | Hash Table | O(1) | O(n) |
| Génération mot | — | O(1) | O(1) |
| Validation mot | Hash Table + AVL | O(m) | O(m·n) |

> *n = nombre de racines, m = nombre de schèmes*

---


Projet académique — Institut Supérieur d'Informatique, 2024–2025.  
Usage strictement pédagogique.
