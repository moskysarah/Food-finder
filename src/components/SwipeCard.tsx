import type { Meal } from '../types/meal';
import { mealTypeLabels, mealTypeColors } from '../types/meal';

interface SwipeCardProps {
  meal: Meal;
  onSwipe: (direction: 'left' | 'right', meal: Meal) => void;
  isTop: boolean;
  offsetX: number;
}

export default function SwipeCard({ meal,isTop, offsetX }: SwipeCardProps) {
  const rotate = offsetX * 0.05;

  const typeColor = mealTypeColors[meal.type] || 'bg-gray-500';

  if (!isTop) {
    return (
      <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl bg-white">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pt-20">
          <h2 className="text-3xl font-bold text-white mb-2">{meal.name}</h2>
          <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-2 ${typeColor}`}>
            {mealTypeLabels[meal.type]}
          </span>
          <p className="text-gray-200 text-sm">📍 {meal.location}</p>
        </div>
      </div>
    );
  }

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

      {/* Image */}
      <img
        src={meal.image}
        alt={meal.name}
        className="w-full h-full object-cover"
        draggable={false}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-3xl font-bold text-white mb-2">{meal.name}</h2>
        
        <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3 ${typeColor}`}>
          {mealTypeLabels[meal.type]}
        </span>
        
        <p className="text-gray-200 text-base mb-2">📍 {meal.location}</p>
        
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

