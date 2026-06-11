export interface Meal {
  id: number;
  name: string;
  type: MealType;
  location: string;
  image: string;
  description: string;
}

export type MealType = 'burger' | 'pizza' | 'sushi' | 'asian' | 'mexican' | 'italian' | 'dessert' | 'healthy' | 'poulet' | 'viande'| 'pate'| 'shawarma'| 'cheese';

export const mealTypeLabels: Record<MealType, string> = {
  burger: '🍔 Burger',
  pizza: '🍕 Pizza',
  sushi: '🍣 Sushi',
  asian: '🥡 Asian',
  mexican: '🌮 Mexican',
  italian: '🍝 Italian',
  dessert: '🍰 Dessert',
  healthy: '🥗 Healthy',
  poulet: '🍗 Poulet',
  viande: '🍖 Viande',
  pate: '🍜 Pâtes',
  cheese: '🧀 Cheese',
  shawarma: '🥙 Shawarma'
};

export const mealTypeColors: Record<MealType, string> = {
  burger: 'bg-orange-500',
  pizza: 'bg-red-500',
  sushi: 'bg-blue-500',
  asian: 'bg-yellow-500',
  mexican: 'bg-green-500',
  italian: 'bg-emerald-500',
  dessert: 'bg-pink-500',
  healthy: 'bg-lime-500',
  poulet: 'bg-amber-500',
  pate:'bg-cyan-500',
  viande:'bg-rose-500',
  shawarma:'bg-violet-500',
  cheese: 'bg-yellow-500'
};

// Mock data for testing
export const mockMeals: Meal[] = [
  {
    id: 1,
    name: 'Classic Burger',
    type: 'burger',
    location: 'Burger King - Centre Commercial',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    description: 'Un burger classique avec steak haché, fromage, laitue et tomate'
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    type: 'pizza',
    location: 'Pizza Hut - Rue Principale',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
    description: 'Pizza garnie de pepperoni fondant et fromage mozzarella'
  },
  {
    id: 3,
    name: 'Salmon Sushi',
    type: 'sushi',
    location: 'Sushi World - Quartier Japon',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    description: 'Assortiment de sushi au saumon frais et riz vinaigré'
  },
  {
    id: 4,
    name: 'Pad Thai',
    type: 'asian',
    location: 'Bangkok Street - Avenue des Arts',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
    description: 'Nouilles de riz sautées aux crevettes et cacahuètes'
  },
  {
    id: 5,
    name: 'Tacos Mexicains',
    type: 'mexican',
    location: 'El Mexico - Place du Village',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    description: 'Trois tacos garnis de viande hachée, fromage et pico de gallo'
  },
  {
    id: 6,
    name: 'Pâtes Carbonara',
    type: 'italian',
    location: 'Italiano - Rue de la Gare',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80',
    description: 'Pâtes crémeuses avec lardons, œuf et parmesan'
  },
  {
    id: 7,
    name: 'Cheesecake',
    type: 'dessert',
    location: 'Sweet Dream - Centre Ville',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80',
    description: 'Gâteau au fromage crémeux avec coulis de fruits rouges'
  },
  {
    id: 8,
    name: 'Bowl Poké',
    type: 'healthy',
    location: 'Green Life - Boulevard Santé',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    description: 'Bol건강 avec saumon, riz, avocat et légumes frais'
  },
  {
    id: 9,
    name: 'Double Cheeseburger',
    type: 'burger',
    location: "McDonald's - Zone Industrielle",
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80',
    description: 'Double steak avec double fromage et sauce spéciale'
  },
  {
    id: 10,
    name: 'Margherita',
    type: 'pizza',
    location: 'Napoli - Vieux Port',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80',
    description: 'Pizza authentique avec tomate, mozzarella et basilic frais'
  }
  ,
  {
    id: 11,
    name: 'Coca',
    type: 'poulet',
    location: 'Napoli - Vieux Port',
    image: 'https://i.pinimg.com/1200x/d8/e1/1a/d8e11a9356e347cb5e1c9c7215911d67.jpg',
    description: 'Poulet authentique avec tomate, et choux'
  }
  ,
  {
    id: 12,
    name: 'Poulet Barbecue',
    type: 'poulet',
    location: 'Kinshasa - Kasavubu',
    image: 'https://i.pinimg.com/736x/1a/9b/6e/1a9b6ed12a4d877dbf69f7a1cf93e1c2.jpg',
    description: 'Poulet grillé , avec feuille de laurié frais'
  }

   ,
  {
    id: 13,
    name: 'Plat au complet',
    type: 'viande',
    location: 'Kinshasa - Lemba',
    image: 'https://i.pinimg.com/1200x/af/f8/e5/aff8e576798a9f0e47716e4507a16077.jpg',
    description: 'Plat viande , frites '
  },
  {
    id: 14,
    name: 'Crispy frites',
    type: 'cheese',
    location: 'Kinshasa - Lemba',
    image: 'https://i.pinimg.com/736x/95/0d/9b/950d9b6fb679cf160aea27b0f50a9ec3.jpg',
    description: 'Plat viande , frites '
  } ,
  {
    id: 15,
    name: 'Spaghetti haitien',
    type: 'pate',
    location: 'Kinshasa - Lemba',
    image: 'https://i.pinimg.com/1200x/f0/7e/0d/f07e0de98edfae25bcae5e0128d8e702.jpg',
    description: 'Authentique spaghetti haitien '
  }
];

