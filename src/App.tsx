import { useState, useEffect } from "react";
import { type Meal, type MealType, mealTypeLabels } from "./types/meal";
import SwipeStack from "./components/SwipeStack";
import RegistrationForm from "./components/RegistrationForm";
import HomePage from "./components/HomePage";
import MatchModal from "./components/MatchModal";
import FilterPanel, { type FilterState } from "./components/FilterPanel";
import "./index.css";

// Importation propre du nouveau logo sur fond noir
import logoFoodFinder from "./assets/logologo.png";

type View = "home" | "auth" | "app";

const RESTAURANT_NAMES = [
  "Le Bistrot Gourmand", "Chez Luigi", "Sakura Sushi", "Burger Factory", 
  "La Piazza", "Green & Co", "Le Dragon d'Or", "Tacos & Co", "Au Bon Pain"
];

function App() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  
  // États pour les infos de l'utilisateur connecté
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false); // Gère l'affichage du volet profil

  const [likedMeals, setLikedMeals] = useState<Meal[]>([]);
  const [showLikes, setShowLikes] = useState(false);
  const [view, setView] = useState<View>("home");
  const [matchedMeal, setMatchedMeal] = useState<Meal | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [apiMeals, setApiMeals] = useState<Meal[]>([]);
  const [isLoadingMeals, setIsLoadingMeals] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    maxDistance: 5,
    priceRanges: [1, 2, 3],
    selectedTypes: Object.keys(mealTypeLabels) as MealType[]
  });

  // Chargement des infos de l'utilisateur depuis localStorage
  useEffect(() => {
    const registered = localStorage.getItem("isRegistered");
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail") || "non-renseigne@foodfinder.com";

    if (registered === "true" && storedName) {
      setIsRegistered(true);
      setUserName(storedName);
      setUserEmail(storedEmail);
      setView("app");
      return;
    }

    setIsRegistered(false);
    setView("home");
  }, []);

  // Chargement des données de l'API avec géolocalisation
  useEffect(() => {
    if (view !== "app") return;

    const loadRealData = async () => {
      setIsLoadingMeals(true);
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const categories = ["chicken", "beef", "seafood", "pork", "vegetarian", "pasta"];
            
            const requests = categories.map(cat => 
              fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${cat}`)
                .then(res => res.json())
                .catch(() => ({ meals: [] }))
            );

            const results = await Promise.all(requests);
            const allRawMeals = results.flatMap(result => result.meals || []);

            if (allRawMeals.length > 0) {
              type MealDbMeal = {
                idMeal: string | number;
                strMeal: string;
                strMealThumb?: string | null;
                strIngredient1?: string | null;
                strIngredient2?: string | null;
                strIngredient3?: string | null;
              };

              // Déclaration de "types" pour corriger l'erreur de variable manquante
              const types = Object.keys(mealTypeLabels) as MealType[];

              const structuredMeals: Meal[] = allRawMeals.map((m: MealDbMeal, index: number) => {
                const mealType = types[index % types.length];
                const distance = parseFloat((Math.random() * 4.5 + 0.3).toFixed(1));
                const restaurantName = RESTAURANT_NAMES[index % RESTAURANT_NAMES.length];

                // Nettoyage et typage strict des ingrédients requis par TypeScript (string[])
                const cleanedIngredients = [m.strIngredient1, m.strIngredient2, m.strIngredient3]
                  .filter((ing): ing is string => typeof ing === "string" && ing.trim() !== "");

                // Nettoyage des images
                const cleanedImages = [m.strMealThumb, m.strMealThumb]
                  .filter((img): img is string => typeof img === "string" && img.trim() !== "");

                return {
                  // Conversion en Number() pour résoudre l'erreur d'assignation de l'ID
                  id: Number(m.idMeal),
                  name: m.strMeal,
                  images: cleanedImages.length > 0 ? cleanedImages : ["https://placehold.co/600x400?text=No+Image"], 
                  type: mealType,
                  priceRange: (index % 3 + 1) as 1 | 2 | 3,
                  restaurantName: restaurantName,
                  location: {
                    address: `${Math.floor(Math.random() * 120) + 1} Rue de la Gastronomie`,
                    distance: distance,
                    coordinates: {
                      lat: latitude + (Math.random() - 0.5) * 0.02,
                      lng: longitude + (Math.random() - 0.5) * 0.02
                    }
                  },
                  ingredients: cleanedIngredients
                };
              });

              const shuffledMeals = structuredMeals.sort(() => Math.random() - 0.5);
              setApiMeals(shuffledMeals);
            }
            setIsLoadingMeals(false);
          },
          (error) => {
            console.error("Erreur Géolocalisation", error);
            setIsLoadingMeals(false);
          }
        );
      } catch (err) {
        console.error("Erreur API", err);
        setIsLoadingMeals(false);
      }
    };

    loadRealData();
  }, [view]);

  const filteredMeals = apiMeals.filter((meal) => {
    const interpretationAlreadyLiked = likedMeals.some((lm) => lm.id === meal.id);
    if (interpretationAlreadyLiked) return false;

    if (meal.location.distance > filters.maxDistance) return false;
    if (!filters.priceRanges.includes(meal.priceRange)) return false;
    if (!filters.selectedTypes.includes(meal.type)) return false;

    return true;
  });

  const handleRegister = (name: string) => {
    setUserName(name);
    const mockEmail = `${name.toLowerCase().replace(/\s+/g, '')}@example.com`;
    setUserEmail(mockEmail);
    localStorage.setItem("userEmail", mockEmail);
    
    setIsRegistered(true);
    setView("app");
  };

  const handleGoToLogin = () => {
    setView("auth");
  };

  const handleSwipe = (direction: "left" | "right", meal: Meal) => {
    if (direction === "right") {
      setLikedMeals((prev) => [...prev, meal]);
      setMatchedMeal(meal);
    }
  };

  const handleReset = () => {
    setLikedMeals([]);
    setShowLikes(false);
    setMatchedMeal(null);
  };

  // Fonction de déconnexion (Logout)
  const handleLogout = () => {
    localStorage.clear();
    setIsRegistered(false);
    setUserName("");
    setUserEmail("");
    setLikedMeals([]);
    setShowProfile(false);
    setView("home");
  };

  if (isRegistered === null || isLoadingMeals) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
        <p className="text-gray-400 font-medium animate-pulse">
          {isRegistered === null ? "Vérification du profil..." : "Localisation des meilleurs plats autour de vous..."}
        </p>
      </div>
    );
  }

  if (view === "home") {
    return <HomePage onLoginClick={handleGoToLogin} />;
  }

  if (view === "auth" || !isRegistered) {
    return <RegistrationForm onRegister={handleRegister} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-transparent shadow-xl sticky top-0 z-40 bg-neutral-900/40 backdrop-blur-md">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            {/* Utilisation dynamique de ton nouveau logo sur fond noir */}
            <img
              src={logoFoodFinder}
              alt="logo"
              title="food finder"
              width={120}
              height={120}
              className="object-contain"
            />
          </h1>
          <div className="flex items-center gap-3">
            {/* BOUTON FILTRE */}
            <button
              onClick={() => setShowFilters(true)}
              className="p-2 text-lg bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-white"
              title="Filtres"
            >
              ⚙️
            </button>
            {/* BOUTON LIKES */}
            <button
              onClick={() => { setShowLikes(!showLikes); setShowProfile(false); }}
              className="relative p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors text-lg"
              title="Favoris"
            >
              ❤️
              {likedMeals.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {likedMeals.length}
                </span>
              )}
            </button>
            {/* BOUTON AVATAR PROFIL */}
            <button
              onClick={() => { setShowProfile(!showProfile); setShowLikes(false); }}
              className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-500 to-red-500 text-white font-bold text-sm flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              title="Mon Profil"
            >
              {userName.charAt(0).toUpperCase()}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-md mx-auto">
        
        {/* INTERFACE DU PROFIL UTILISATEUR */}
        {showProfile ? (
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl animate-fade-in space-y-6">
            <div className="text-center space-y-2">
              <div className="w-20 h-20 bg-gradient-to-tr from-orange-500 to-red-500 rounded-full mx-auto flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-orange-500/10">
                {userName.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold text-white">{userName}</h2>
              <p className="text-xs text-zinc-400">Membre Food Finder VIP</p>
            </div>

            <div className="space-y-3 bg-zinc-800/40 p-4 rounded-2xl border border-zinc-800/60">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Nom d'utilisateur</span>
                <span className="text-sm font-medium text-zinc-200">{userName}</span>
              </div>
              <div className="border-t border-zinc-800 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Adresse Email</span>
                <span className="text-sm font-medium text-zinc-200 truncate block">{userEmail}</span>
              </div>
              <div className="border-t border-zinc-800 pt-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block">Statut GPS</span>
                <span className="text-sm font-medium text-green-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Connecté
                </span>
              </div>
            </div>

            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-zinc-800/20 border border-zinc-800 p-3 rounded-xl">
                <span className="text-xl block">🔥</span>
                <span className="text-lg font-bold block">{likedMeals.length}</span>
                <span className="text-[10px] text-zinc-400">Plats aimés</span>
              </div>
              <div className="bg-zinc-800/20 border border-zinc-800 p-3 rounded-xl">
                <span className="text-xl block">📍</span>
                <span className="text-lg font-bold block">{filters.maxDistance} km</span>
                <span className="text-[10px] text-zinc-400">Rayon max</span>
              </div>
            </div>

            {/* Boutons d'action du profil */}
            <div className="space-y-2 pt-4">
              <button
                onClick={() => setShowProfile(false)}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Retour au Swipe
              </button>
              <button
                onClick={handleLogout}
                className="w-full py-3 bg-red-600/10 hover:bg-red-600/20 text-red-500 font-semibold rounded-xl text-sm transition-colors border border-red-500/20"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        ) : showLikes ? (
          /* Liked Meals List */
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-green-500">Mes Plats Likés</h2>
              <button onClick={() => setShowLikes(false)} className="text-orange-500 font-medium text-sm hover:underline">
                Retour au swipe
              </button>
            </div>

            {likedMeals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-3">😢</div>
                <p className="text-gray-400">Aucun coup de cœur pour l'instant !</p>
              </div>
            ) : (
              <div className="space-y-4">
                {likedMeals.map((meal) => (
                  <div key={meal.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-md flex">
                    <img src={meal.images[0] || ""} alt={meal.name} className="w-24 h-24 object-cover" />
                    <div className="p-3 flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate text-sm">{meal.name}</h3>
                      <p className="text-xs text-orange-400 truncate">🏪 {meal.restaurantName}</p>
                      <p className="text-[11px] text-zinc-400 truncate mt-1">📍 {meal.location.address} ({meal.location.distance} km)</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Swipe Area */
          <div>
            <SwipeStack meals={filteredMeals} onSwipe={handleSwipe} />

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={() => filteredMeals.length > 0 && handleSwipe("left", filteredMeals[0])}
                className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 font-bold shadow-lg flex items-center justify-center text-red-500 hover:scale-110 transition-transform"
              >
                ✕
              </button>
              <button
                onClick={handleReset}
                className="w-11 h-11 rounded-full border border-zinc-800 shadow flex items-center justify-center text-xs text-zinc-400 hover:scale-110 transition-transform"
              >
                Reset
              </button>
              <button
                onClick={() => filteredMeals.length > 0 && handleSwipe("right", filteredMeals[0])}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-lg flex items-center justify-center font-bold text-white hover:scale-110 transition-transform"
              >
                ❤️
              </button>
            </div>
          </div>
        )}
      </main>

      {matchedMeal && <MatchModal meal={matchedMeal} onClose={() => setMatchedMeal(null)} />}
      {showFilters && <FilterPanel filters={filters} onChange={setFilters} onClose={() => setShowFilters(false)} />}
    </div>
  );
}

export default App;