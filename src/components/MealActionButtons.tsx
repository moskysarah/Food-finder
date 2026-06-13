import type { Meal } from '../types/meal';

interface MealActionButtonsProps {
  meal: Meal;
  onOrderInternal: (meal: Meal) => void;
}

export default function MealActionButtons({ meal, onOrderInternal }: MealActionButtonsProps) {
  
  // 1. Action Livraison : Ouvre Deliveroo avec une recherche automatique
  const handleDeliveryClick = () => {
    const searchQuery = encodeURIComponent(`${meal.name} ${meal.restaurantName}`);
    const url = `https://www.deliveroo.fr/fr/restaurants/paris/recherche?geospatial_query=${searchQuery}`;
    window.open(url, '_blank');
  };

  // 2. Action Itinéraire : Ouvre Google Maps avec les coordonnées GPS précises
  const handleDirectionsClick = () => {
    const { lat, lng } = meal.location.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full space-y-3 mt-4">
      <p className="text-xs text-zinc-400 text-center font-medium uppercase tracking-wider">
        Comment souhaitez-vous manger ?
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* BOUTON LIVRAISON */}
        <button
          onClick={handleDeliveryClick}
          className="flex flex-col items-center justify-center p-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-semibold shadow-md transition-all active:scale-95"
        >
          <span className="text-xl mb-1">🚴</span>
          <span className="text-xs">Se faire livrer</span>
        </button>

        {/* BOUTON ITINÉRAIRE */}
        <button
          onClick={handleDirectionsClick}
          className="flex flex-col items-center justify-center p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold shadow-md transition-all active:scale-95"
        >
          <span className="text-xl mb-1">📍</span>
          <span className="text-xs">S'y rendre (GPS)</span>
        </button>
      </div>

      {/* BOUTON COMMANDE INTERNE */}
      <button
        onClick={() => onOrderInternal(meal)}
        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg transition-all hover:opacity-90 active:scale-98 flex items-center justify-center gap-2"
      >
        <span>🛒</span> Commander sur l'App
      </button>
    </div>
  );
}