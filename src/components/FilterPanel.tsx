import type { MealType } from '../types/meal';
import { mealTypeLabels } from '../types/meal';

export interface FilterState {
  maxDistance: number;
  priceRanges: (1 | 2 | 3)[];
  selectedTypes: MealType[];
}

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose: () => void;
}

export default function FilterPanel({ filters, onChange, onClose }: FilterPanelProps) {
  
  // Gérer le changement de distance
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, maxDistance: parseFloat(e.target.value) });
  };

  // Gérer la coche/décoche des prix ($, $$, $$$)
  const togglePriceRange = (range: 1 | 2 | 3) => {
    const updated = filters.priceRanges.includes(range)
      ? filters.priceRanges.filter(r => r !== range)
      : [...filters.priceRanges, range];
    onChange({ ...filters, priceRanges: updated });
  };

  // Gérer la coche/décoche des catégories
  const toggleType = (type: MealType) => {
    const updated = filters.selectedTypes.includes(type)
      ? filters.selectedTypes.filter(t => t !== type)
      : [...filters.selectedTypes, type];
    onChange({ ...filters, selectedTypes: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      {/* Panneau latéral coulissant */}
      <div className="w-full max-w-md h-full bg-zinc-900 text-white p-6 shadow-2xl overflow-y-auto flex flex-col">
        
        {/* Header du panneau */}
        <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">⚙️ Filtres de découverte</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-xl p-1">✕</button>
        </div>

        <div className="space-y-8 flex-1">
          {/* 1. FILTRE DISTANCE */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="font-semibold text-gray-300">Distance maximale</label>
              <span className="text-orange-500 font-bold">{filters.maxDistance} km</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="5" 
              step="0.5"
              value={filters.maxDistance}
              onChange={handleDistanceChange}
              className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>0.5 km</span>
              <span>5 km</span>
            </div>
          </div>

          {/* 2. FILTRE PRIX */}
          <div>
            <label className="block font-semibold text-gray-300 mb-3">Fourchette de prix</label>
            <div className="grid grid-cols-3 gap-3">
              {([1, 2, 3] as const).map((range) => {
                const label = range === 1 ? '$' : range === 2 ? '$$' : '$$$';
                const isSelected = filters.priceRanges.includes(range);
                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => togglePriceRange(range)}
                    className={`py-3 rounded-xl font-bold border transition-all ${
                      isSelected 
                        ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                        : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. FILTRE CATÉGORIES */}
          <div>
            <label className="block font-semibold text-gray-300 mb-3">Catégories de nourriture</label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(mealTypeLabels) as MealType[]).map((type) => {
                const isSelected = filters.selectedTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      isSelected 
                        ? 'bg-amber-500 border-amber-500 text-white' 
                        : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600'
                    }`}
                  >
                    {mealTypeLabels[type]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bouton pour valider et fermer */}
        <button
          onClick={onClose}
          className="w-full mt-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl text-lg shadow-lg"
        >
          Voir les résultats
        </button>

      </div>
    </div>
  );
}