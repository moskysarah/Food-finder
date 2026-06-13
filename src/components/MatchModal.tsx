import type { Meal } from '../types/meal';
import MealActionButtons from './MealActionButtons'; // 👈 Import des boutons d'action

interface MatchModalProps {
  meal: Meal;
  onClose: () => void;
}

export default function MatchModal({ meal, onClose }: MatchModalProps) {
  
  // Fonction temporaire en attendant de coder l'écran de panier à l'étape suivante
  const handleOrderInternal = (selectedMeal: Meal) => {
    alert(`🛒 Simulation : Le plat "${selectedMeal.name}" a été ajouté à votre panier interne !`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center text-white shadow-2xl relative overflow-hidden">
        
        {/* Effet de lumière en arrière-plan */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>

        {/* Titre animé */}
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent tracking-wide animate-bounce mb-2">
          It's a Match !
        </h2>
        <p className="text-zinc-400 text-sm mb-6">Vous avez trouvé votre bonheur culinaire.</p>

        {/* Image du plat matché */}
        <div className="relative w-44 h-44 mx-auto mb-4 rounded-full overflow-hidden border-4 border-orange-500 shadow-xl shadow-orange-500/20">
          <img 
            src={meal.images[0]} 
            alt={meal.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Infos du plat */}
        <h3 className="text-xl font-bold text-white px-2 truncate">{meal.name}</h3>
        <p className="text-orange-400 font-medium text-sm mb-2">🏪 {meal.restaurantName}</p>
        <p className="text-zinc-500 text-xs mb-6">📍 {meal.location.address} ({meal.location.distance} km)</p>

        <hr className="border-zinc-800 my-4" />

        {/* 👈 INJECTION DES 3 POSSIBILITÉS (Livraison, Itinéraire, Commande) */}
        <MealActionButtons 
          meal={meal} 
          onOrderInternal={handleOrderInternal} 
        />

        {/* Bouton pour fermer et continuer à swiper */}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-zinc-400 hover:text-white font-medium underline transition-colors block mx-auto pt-2"
        >
          Continuer à swiper
        </button>

      </div>
    </div>
  );
}