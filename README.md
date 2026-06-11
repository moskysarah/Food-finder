
# 🍔 Food-Finder

> **Le Tinder du kiff culinaire.** Tu swipes, tu matches, tu manges !

Marre de passer 45 minutes à décider ce que vous allez manger ce soir avec vos potes ou votre moitié ? **Food-Finder** règle le problème. Inspiré de l'interface intuitive de Tinder, cette application vous permet de swiper des plats de restaurants locaux. Quand deux personnes (ou un groupe) matchent sur le même plat, c'est l'heure de passer à table !

---

## 🚀 Fonctionnalités

* **Swipe à la Tinder :** Swipe à droite si le plat te fait saliver, à gauche si ce n'est pas ton mood du jour.
* **Matches de groupe :** Créez une session à plusieurs, invitez vos amis, et découvrez instantanément le plat ou le restaurant qui met tout le monde d'accord.
* **Filtres personnalisés :** Envie de s'évader ? Filtrez par type de cuisine (Italien, Asiatique, Burger...), restrictions alimentaires (Végan, Halal, Sans gluten) ou budget.
* **Géolocalisation en direct :** Ne swipez que des plats disponibles dans des restaurants à proximité immédiate.
* **Match & Action :** Une fois le match validé, accédez directement au bouton de livraison (UberEats, Deliveroo) ou à l'itinéraire pour vous y rendre.

---

## 🛠️ Tech Stack (Technologies utilisées)

Voici les technos principales au cœur de Food-Finder :

* **Frontend :** React (JSX / TypeScript), Tailwind CSS – Pour une expérience mobile/web fluide, moderne et des animations de swipe ultra-réactives.
* **Backend :** Python (FastAPI) – Pour une API asynchrone ultra rapide gérant les utilisateurs, les sessions de groupe et l'algorithme de match.
* **Base de données / Stockage :** Python (SQLAlchemy / PostgreSQL ou MongoDB) – Stockage des profils, des historiques de swipe et des données restaurants.
* **APIs tierces :** Google Places API (pour les restos), Yelp API, Geolocation API.

---

## 📸 Rendu du site food finder

Voici un aperçu visuel de l'application :

<p align="left">
  <img src="src/assets/food finder.png" alt="Rendu de Food Finder" width="100%">
</p>

---

## ⚙️ Installation et Lancement

Pour faire tourner le projet en local, suivez ces étapes :

### Configuration requise
Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18+ recommandée) et Python (version 3.10+).

### 1. Cloner le projet
```bash
git clone [https://github.com/moskysarah/Food-finder.git](https://github.com/moskysarah/Food-finder.git)
cd Food-finder
