import { useState, useEffect } from "react";
import { mockMeals, type Meal } from "./types/meal";
import SwipeStack from "./components/SwipeStack";
import RegistrationForm from "./components/RegistrationForm";
import HomePage from "./components/HomePage";
import "./index.css";

type View = "home" | "auth" | "app";

function App() {
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [, setUserName] = useState("");
  const [likedMeals, setLikedMeals] = useState<Meal[]>([]);
  const [showLikes, setShowLikes] = useState(false);
  const [view, setView] = useState<View>("home");

  useEffect(() => {
    const registered = localStorage.getItem("isRegistered");
    const storedName = localStorage.getItem("userName");

    if (registered === "true" && storedName) {
      setIsRegistered(true);
      setUserName(storedName);
      setView("app");
      return;
    }

    setIsRegistered(false);
    setView("home");
  }, []);

  const handleRegister = (name: string) => {
    setUserName(name);
    setIsRegistered(true);
    setView("app");
  };

  const handleGoToLogin = () => {
    setView("auth");
  };

  const handleSwipe = (direction: "left" | "right", meal: Meal) => {
    if (direction === "right") {
      setLikedMeals((prev) => [...prev, meal]);
    }
  };

  const handleReset = () => {
    setLikedMeals([]);
    setShowLikes(false);
  };

  // 1. Écran de chargement pendant la vérification du localStorage
  if (isRegistered === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-amber-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // 2. CORRECTION : Si la vue est 'home', on affiche TOUJOURS la page d'accueil en premier
  if (view === "home") {
    return <HomePage onLoginClick={handleGoToLogin} />;
  }

  // 3. Si on demande explicitement l'authentification ou si le user n'est pas connecté
  if (view === "auth" || !isRegistered) {
    return <RegistrationForm onRegister={handleRegister} />;
  }

  // 4. Si l'utilisateur est connecté et sur l'application (Vue principale 'app')
  return (
    <div className="min-h-screen bg-black to-amber-50">
      {/* Header */}
      <header className=" border-transparent  shadow-xl sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            <img
              src="src/assets/food_finder_logo-removebg-preview.png"
              alt="logo"
              title="food finder"
              width={150}
              height={150}
            />
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLikes(!showLikes)}
              className="relative p-2 rounded-full  w-25 hover:bg-gray-100 transition-colors"
            >
              <span className="text-2xl text-green-500  font-bold">Heart</span>
              {likedMeals.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {likedMeals.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {showLikes ? (
          /* Liked Meals List */
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-1xl font-bold  text-green-500">
                My liked meals
              </h2>
              <button
                onClick={() => setShowLikes(false)}
                className="text-orange-500 font-medium hover:underline"
              >
                Back to swipe
              </button>
            </div>

            {likedMeals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">Sad</div>
                <p className="text-gray-600">
                  You haven't liked any meals yet!
                </p>
                <p className="text-gray-500 text-sm">
                  Swipe right to add favorites
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {likedMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className="bg-white rounded-xl overflow-hidden shadow-md flex"
                  >
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <h3 className="font-bold text-gray-800">{meal.name}</h3>
                      <p className="text-sm text-gray-600">
                        Location: {meal.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Swipe Area */
          <div>
            <SwipeStack
              meals={mockMeals.filter(
                (m) => !likedMeals.some((lm) => lm.id === m.id),
              )}
              onSwipe={handleSwipe}
            />

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mt-6">
              <button
                onClick={() => {
                  const remaining = mockMeals.filter(
                    (m) => !likedMeals.some((lm) => lm.id === m.id),
                  );
                  if (remaining.length > 0) {
                    handleSwipe("left", remaining[0]);
                  }
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-bold shadow-lg flex items-center justify-center text-1xl text-bold text-white hover:scale-110 transition-transform"
              >
                Pass
              </button>
              <button
                onClick={handleReset}
                className="w-12 h-12 rounded-full border-1 border-green-500  shadow flex items-center justify-center text-sm text-green-500 hover:scale-110 transition-transform"
              >
                Reset
              </button>
              <button
                onClick={() => {
                  const remaining = mockMeals.filter(
                    (m) => !likedMeals.some((lm) => lm.id === m.id),
                  );
                  if (remaining.length > 0) {
                    handleSwipe("right", remaining[0]);
                  }
                }}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg flex items-center justify-center text-1xl font-bold text-white hover:scale-110 transition-transform"
              >
                Like
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
