import type { Meal } from '../types/meal';
import { mealTypeLabels, mealTypeColors } from '../types/meal';

interface SwipeCardProps {
  meal: Meal;
  onSwipe: (direction: 'left' | 'right', meal: Meal) => void;
  isTop: boolean;
  offsetX: number;
}

export default function SwipeCard({ meal, isTop, offsetX }: SwipeCardProps) {
  const rotate = offsetX * 0.05;

  const typeColor = mealTypeColors[meal.type] || 'bg-gray-500';

  // Récupère la première image du tableau (ou une image par défaut si le tableau est vide)
  const mainImage = meal.images && meal.images.length > 0 
    ? meal.images[0] 
    : 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80';

  // Génère les symboles $ selon la gamme de prix (1 = $, 2 = $$, 3 = $$$)
  const priceSymbols = '$'.repeat(meal.priceRange);

  // VERSION CARTE DU DESSOUS (En attente)
  if (!isTop) {
    return (
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-white">
        <img
          src={mainImage}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pt-20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-bold text-white">{meal.name}</h2>
            <span className="text-xl font-bold text-yellow-400">{priceSymbols}</span>
          </div>
          <div className="flex gap-2 mb-2">
            <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium ${typeColor}`}>
              {mealTypeLabels[meal.type]}
            </span>
          </div>
          <p className="text-gray-200 text-sm">
            📍 {meal.restaurantName} • {meal.location.address} ({meal.location.distance} km)
          </p>
        </div>
      </div>
    );
  }

  // VERSION CARTE DU DESSUS (Active / Swipable)
  return (
    <div
      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-white cursor-grab active:cursor-grabbing select-none"
      style={{
        transform: `translateX(${offsetX}px) rotate(${rotate}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Like/Nope indicators */}
      {offsetX > 50 && (
        <div className="absolute top-8 left-8 z-20 px-4 py-2 border-4 border-green-500 rounded-lg transform -rotate-12">
          <span className="text-4xl font-bold text-green-500">AIME!</span>
        </div>
      )}
      {offsetX < -50 && (
        <div className="absolute top-8 right-8 z-20 px-4 py-2 border-4 border-red-500 rounded-lg transform rotate-12">
          <span className="text-4xl font-bold text-red-500">PASS</span>
        </div>
      )}

      {/* Image principale */}
      <img
        src={mainImage}
        alt={meal.name}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-3xl font-bold text-white">{meal.name}</h2>
          <span className="text-xl font-bold text-yellow-400">{priceSymbols}</span>
        </div>
        
        <p className="text-gray-300 text-lg font-medium mb-2">{meal.restaurantName}</p>
        
        <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3 ${typeColor}`}>
          {mealTypeLabels[meal.type]}
        </span>
        
        <p className="text-gray-200 text-sm mb-2">
          📍 {meal.location.address} <span className="text-gray-400">•</span> à {meal.location.distance} km
        </p>
        
        <p className="text-gray-300 text-sm line-clamp-2">{meal.description}</p>
      </div>

      {/* Swipe hint indicators */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
        <span className="text-3xl">👈</span>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2 w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
        <span className="text-3xl">👉</span>
      </div>
    </div>
  );
}