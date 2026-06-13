
export interface Meal {
  id: number;
  name: string;
  description?: string; 
  ingredients?: string[];
  type: MealType;
  restaurantName: string;
  location: {
    address: string;
    distance: number;
    coordinates: {     // 👈 Parfaitement placé !
      lat: number;
      lng: number;
    };
  };
  priceRange: 1 | 2 | 3;
  images: string[];
  description: string;
  ingredients?: string[];
}

export type MealType = 'burger' | 'pizza' | 'sushi' | 'asian' | 'mexican' | 'italian' | 'dessert' | 'healthy' | 'poulet' | 'viande' | 'pate' | 'shawarma' | 'cheese';

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
  pate: 'bg-cyan-500',
  viande: 'bg-rose-500',
  shawarma: 'bg-violet-500',
  cheese: 'bg-yellow-500'
};

// 👈 Données de test mises à jour avec les "coordinates" obligatoires
export const mockMeals: Meal[] = [
  {
    id: 1,
    name: 'Classic Burger',
    type: 'burger',
    restaurantName: 'Burger King',
    location: { address: 'Centre Commercial', distance: 1.2, coordinates: { lat: 48.8566, lng: 2.3522 } },
    priceRange: 1,
    images: [
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80'
    ],
    description: 'Un burger classique avec steak haché, fromage fondant, laitue et tomate croquante.',
    ingredients: ['Bœuf', 'Fromage', 'Gluten']
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    type: 'pizza',
    restaurantName: 'Pizza Hut',
    location: { address: 'Rue Principale', distance: 2.4, coordinates: { lat: 48.8606, lng: 2.3412 } },
    priceRange: 2,
    images: [
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80'
    ],
    description: 'Pizza généreusement garnie de pepperoni croustillant et mozzarella filante.',
    ingredients: ['Pepperoni', 'Mozzarella', 'Tomate']
  },
  {
    id: 3,
    name: 'Salmon Sushi Platter',
    type: 'sushi',
    restaurantName: 'Sushi World',
    location: { address: 'Quartier Japon', distance: 3.1, coordinates: { lat: 48.8526, lng: 2.3612 } },
    priceRange: 3,
    images: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80'
    ],
    description: 'Assortiment premium de sushi au saumon frais et riz vinaigré traditionnel.',
    ingredients: ['Saumon', 'Riz', 'Poisson']
  },
  {
    id: 4,
    name: 'Pad Thai aux Crevettes',
    type: 'asian',
    restaurantName: 'Bangkok Street',
    location: { address: 'Avenue des Arts', distance: 0.8, coordinates: { lat: 48.8416, lng: 2.3312 } },
    priceRange: 2,
    images: [
      'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80'
    ],
    description: 'Nouilles de riz sautées au wok avec des crevettes fraîches, des œufs et des cacahuètes pilées.',
    ingredients: ['Crevettes', 'Cacahuètes', 'Œuf']
  },
  {
    id: 5,
    name: 'Tacos Mexicains',
    type: 'mexican',
    restaurantName: 'El Mexico',
    location: { address: 'Place du Village', distance: 4.2, coordinates: { lat: 48.8716, lng: 2.3212 } },
    priceRange: 1,
    images: [
      'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80'
    ],
    description: 'Trois tacos authentiques garnis de viande hachée épicée, fromage et sauce pico de gallo.',
    ingredients: ['Viande Hachée', 'Fromage', 'Maïs']
  },
  {
    id: 6,
    name: 'Pâtes Carbonara',
    type: 'italian',
    restaurantName: 'Le Dolce Vita',
    location: { address: 'Rue de la Gare', distance: 1.7, coordinates: { lat: 48.8316, lng: 2.3712 } },
    priceRange: 2,
    images: [
      'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80'
    ],
    description: 'Pâtes crémeuses préparées dans les règles de l\'art avec des lardons fumés, du jaune d\'œuf et du parmesan râpé.',
    ingredients: ['Porc', 'Œuf', 'Parmesan']
  },
  {
    id: 7,
    name: 'Cheesecake Coulis Rouge',
    type: 'dessert',
    restaurantName: 'Sweet Dream',
    location: { address: 'Centre Ville', distance: 2.1, coordinates: { lat: 48.8216, lng: 2.3112 } },
    priceRange: 1,
    images: [
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&q=80'
    ],
    description: 'Gâteau au fromage blanc ultra crémeux sur son lit de biscuits émiettés, nappé d\'un coulis de fruits rouges.',
    ingredients: ['Produits Laitiers', 'Sucre', 'Gluten']
  },
  {
    id: 8,
    name: 'Bowl Poké Saumon',
    type: 'healthy',
    restaurantName: 'Green Life',
    location: { address: 'Boulevard Santé', distance: 0.5, coordinates: { lat: 48.8816, lng: 2.3912 } },
    priceRange: 2,
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80'
    ],
    description: 'Un bol healthy rempli de saumon mariné, riz vinaigré, avocat crémeux et assortiment de légumes frais.',
    ingredients: ['Saumon', 'Avocat', 'Riz']
  },
  {
    id: 9,
    name: 'Double Cheeseburger',
    type: 'burger',
    restaurantName: "McDonald's",
    location: { address: 'Zone Industrielle', distance: 5.0, coordinates: { lat: 48.8916, lng: 2.3812 } },
    priceRange: 1,
    images: [
      'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=800&q=80'
    ],
    description: 'Deux steaks de bœuf juteux, double portion de fromage fondu, cornichons, oignons et sauce spéciale.',
    ingredients: ['Bœuf', 'Fromage', 'Gluten']
  },
  {
    id: 10,
    name: 'Pizza Margherita',
    type: 'pizza',
    restaurantName: 'Napoli',
    location: { address: 'Vieux Port', distance: 3.5, coordinates: { lat: 48.8116, lng: 2.3012 } },
    priceRange: 1,
    images: [
      'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80'
    ],
    description: 'Pizza napolitaine authentique avec sauce tomate maison, mozzarella di bufala et feuilles de basilic frais.',
    ingredients: ['Mozzarella', 'Tomate', 'Basilic']
  },
  {
    id: 11,
    name: 'Poulet Croustillant Choux',
    type: 'poulet',
    restaurantName: 'Chicken Express',
    location: { address: 'Avenue de la Paix', distance: 2.8, coordinates: { lat: -4.325, lng: 15.322 } },
    priceRange: 1,
    images: [
      'https://i.pinimg.com/1200x/d8/e1/1a/d8e11a9356e347cb5e1c9c7215911d67.jpg'
    ],
    description: 'Morceaux de poulet panés ultra croustillants, servis sur un lit de salade de choux émincés.',
    ingredients: ['Poulet', 'Chou', 'Friture']
  },
  {
    id: 12,
    name: 'Poulet Barbecue',
    type: 'poulet',
    restaurantName: 'Chez Maman Nicole',
    location: { address: 'Kinshasa - Kasavubu', distance: 4.5, coordinates: { lat: -4.331, lng: 15.311 } },
    priceRange: 2,
    images: [
      'https://i.pinimg.com/736x/1a/9b/6e/1a9b6ed12a4d877dbf69f7a1cf93e1c2.jpg'
    ],
    description: 'Poulet braisé au barbecue à la kinoise, mariné avec des herbes locales et des feuilles de laurier frais.',
    ingredients: ['Poulet', 'Sauce BBQ']
  },
  {
    id: 13,
    name: 'Plat Complet Viande',
    type: 'viande',
    restaurantName: 'Le Grillardeur',
    location: { address: 'Kinshasa - Lemba', distance: 1.1, coordinates: { lat: -4.362, lng: 15.352 } },
    priceRange: 2,
    images: [
      'https://i.pinimg.com/1200x/af/f8/e5/aff8e576798a9f0e47716e4507a16077.jpg'
    ],
    description: 'Une généreuse portion de viande grillée accompagnée de frites maison dorées et croustillantes.',
    ingredients: ['Viande', 'Pommes de terre']
  },
  {
    id: 14,
    name: 'Crispy Frites & Cheese',
    type: 'cheese',
    restaurantName: 'Snack Elégance',
    location: { address: 'Kinshasa - Lemba', distance: 0.9, coordinates: { lat: -4.365, lng: 15.359 } },
    priceRange: 1,
    images: [
      'https://i.pinimg.com/736x/95/0d/9b/950d9b6fb679cf160aea27b0f50a9ec3.jpg'
    ],
    description: 'Frites croustillantes nappées d\'une sauce au fromage cheddar chaud et fondu.',
    ingredients: ['Pommes de terre', 'Cheddar']
  },
  {
    id: 15,
    name: 'Spaghetti Haïtien',
    type: 'pate',
    restaurantName: 'Lakay Resto',
    location: { address: 'Kinshasa - Lemba', distance: 1.4, coordinates: { lat: -4.361, lng: 15.351 } },
    priceRange: 2,
    images: [
      'https://i.pinimg.com/1200x/f0/7e/0d/f07e0de98edfae25bcae5e0128d8e702.jpg'
    ],
    description: 'Authentique spaghetti haïtien cuisiné avec du hareng saur, des épices antillaises, des oignons et des poivrons.',
    ingredients: ['Pâtes', 'Poisson', 'Épices']
  }
];