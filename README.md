# 🔤 محرك البحث الصرفي العربي — Arabic Morphological Search Engine

> Mini-projet Algorithmique — Moteur de Recherche Morphologique et Générateur de Dérivation Arabe

---

## 📌 Description

Ce projet implémente un **moteur morphologique pour la langue arabe** basé sur le système **racine–schème (Root–Pattern)**.  
Il permet de générer et valider des mots dérivés à partir de racines arabes trilitères, en exploitant des structures de données avancées pour garantir efficacité et précision.

**Stack technologique :**
- 🖥️ **Frontend** : React.js (Vite + Tailwind CSS)
- ⚙️ **Backend** : Java (Spring Boot REST API)
- 🗂️ **Structures de données** : AVL Tree (racines) + Hash Table (schèmes)

---

## 🎬 Démonstration & Téléchargement

| Ressource | Lien |
|-----------|------|
| 🎥 Vidéo démo + APK/App | [📁 Google Drive](https://drive.google.com/drive/folders/VOTRE_LIEN_ICI) |

> **Le dossier Drive contient :**
> - `demo.mp4` — Démonstration complète du système
> - `app-release.zip` — Application prête à l'emploi (JAR + build React)

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

## 🏗️ Architecture du Projet

```
arabic-morpho-engine/
│
├── frontend/                  # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── RootManager.jsx       # Gestion des racines (arbre AVL)
│   │   │   ├── SchemeManager.jsx     # Gestion des schèmes (hash table)
│   │   │   ├── WordGenerator.jsx     # Génération morphologique
│   │   │   ├── WordValidator.jsx     # Validation morphologique
│   │   │   └── DerivativesList.jsx   # Liste des dérivés
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Java Spring Boot API
│   ├── src/main/java/
│   │   ├── controller/
│   │   │   ├── RootController.java
│   │   │   ├── SchemeController.java
│   │   │   └── MorphologyController.java
│   │   ├── service/
│   │   │   ├── AVLTreeService.java        # Arbre AVL des racines
│   │   │   ├── HashTableService.java      # Table de hachage des schèmes
│   │   │   └── MorphologyEngine.java      # Moteur de dérivation
│   │   ├── model/
│   │   │   ├── Root.java
│   │   │   ├── Scheme.java
│   │   │   └── DerivedWord.java
│   │   └── ArabicMorphoApplication.java
│   ├── src/main/resources/
│   │   └── roots.txt                      # Racines initiales
│   └── pom.xml
│
└── README.md
```

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

## 🖥️ Installation & Lancement

### Prérequis
- Java 17+
- Node.js 18+
- Maven 3.8+

### Backend (Spring Boot)

```bash
# Cloner le projet
git clone https://github.com/votre-username/arabic-morpho-engine.git
cd arabic-morpho-engine/backend

# Compiler et lancer
mvn clean install
mvn spring-boot:run
```

> L'API sera disponible sur `http://localhost:8080`

### Frontend (React)

```bash
cd ../frontend

# Installer les dépendances
npm install

# Lancer en développement
npm run dev
```

> L'interface sera disponible sur `http://localhost:5173`

---

## 🔌 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/api/roots` | Ajouter une racine |
| `GET` | `/api/roots` | Lister toutes les racines |
| `GET` | `/api/roots/{root}` | Rechercher une racine |
| `DELETE` | `/api/roots/{root}` | Supprimer une racine |
| `POST` | `/api/schemes` | Ajouter un schème |
| `GET` | `/api/schemes` | Lister tous les schèmes |
| `POST` | `/api/generate` | Générer un mot dérivé |
| `POST` | `/api/validate` | Valider un mot |
| `GET` | `/api/derivatives/{root}` | Lister les dérivés d'une racine |

### Exemples de requêtes

**Générer un mot dérivé :**
```json
POST /api/generate
{
  "root": "كتب",
  "scheme": "مفعول"
}
// Réponse : { "word": "مكتوب", "root": "كتب", "scheme": "مفعول" }
```

**Valider un mot :**
```json
POST /api/validate
{
  "word": "مكتوب",
  "root": "كتب"
}
// Réponse : { "valid": true, "scheme": "مفعول" }
```

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

## 👨‍💻 Équipe

| Nom | Rôle |
|-----|------|
| [Membre 1] | Backend Java / AVL Tree |
| [Membre 2] | Backend Java / Hash Table |
| [Membre 3] | Frontend React |
| [Membre 4] | Moteur morphologique |

---

## 📄 Licence

Projet académique — Institut Supérieur d'Informatique, 2024–2025.  
Usage strictement pédagogique.
