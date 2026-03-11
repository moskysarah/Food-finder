import { useState, useRef, useCallback, useEffect } from 'react';
import type { Meal } from '../types/meal';
import SwipeCard from './SwipeCard';

interface SwipeStackProps {
  meals: Meal[];
  onSwipe: (direction: 'left' | 'right', meal: Meal) => void;
}

export default function SwipeStack({ meals, onSwipe }: SwipeStackProps) {
  const [stack, setStack] = useState<Meal[]>(meals);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);

  // Reset stack when meals prop changes
  useEffect(() => {
    setStack(meals);
    setOffsetX(0);
  }, [meals]);

  const handleStart = useCallback((clientX: number) => {
    startX.current = clientX;
    setIsDragging(true);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX.current;
    setOffsetX(diff);
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    
    if (offsetX > threshold) {
      // Swipe right - like
      const swipedMeal = stack[0];
      setStack(prev => prev.slice(1));
      setOffsetX(0);
      onSwipe('right', swipedMeal);
    } else if (offsetX < -threshold) {
      // Swipe left - pass
      const swipedMeal = stack[0];
      setStack(prev => prev.slice(1));
      setOffsetX(0);
      onSwipe('left', swipedMeal);
    } else {
      // Reset position
      setOffsetX(0);
    }
  }, [isDragging, offsetX, stack, onSwipe]);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Handle global mouse up for drag release outside card
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleEnd();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging, handleEnd]);

  if (stack.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center p-8">
        <div className="text-8xl mb-4">🍽️</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Plus de repas!</h2>
        <p className="text-gray-500">Vous avez vu tous les repas disponibles.</p>
      </div>
    );
  }

  return (
    <div 
      ref={cardRef}
      className="relative w-full max-w-md h-[600px] mx-auto"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {stack.slice(0, 2).reverse().map((meal, index) => (
        <SwipeCard
          key={meal.id}
          meal={meal}
          onSwipe={() => {}}
          isTop={index === 1}
          offsetX={index === 1 ? offsetX : 0}
        />
      ))}
    </div>
  );
}
