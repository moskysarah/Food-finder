// import {React} from 'react';

import foodBg from '../assets/food.png';

interface HomePageProps {
  onLoginClick: () => void;
}

export default function HomePage({ onLoginClick }: HomePageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fullscreen background image */}
      <img
        src={foodBg}
        alt="Food background"
        className="absolute inset-0 w-full h-300 object-cover overflow-hidden overlay-blend-darken"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-end justify-center px-6 pb-92">
          <div className="w-full max-w-md text-center">
            <h1 className="text-white text-5xl md:text-6xl font-extrabold drop-shadow">
              Food Finder
            </h1>
            <p className="text-white/90 mt-4 text-lg">
              Swipe et découvrez vos repas préférés.
            </p>

            <button
              type="button"
              onClick={onLoginClick}
              className="mt-10 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-4 shadow-xl hover:scale-[1.02] transition-transform"
            >
              Se connecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

