import type { Meal } from '../types/meal';

export const MEAL_OPTIONS: Meal[] = [
  {
    id: 'meal-std-veg',
    name: 'Vegetarian Standard Meal',
    type: 'veg',
    price: 0,
    description: 'Complimentary paneer butter masala with jeera rice & warm paratha',
    icon: '🥗',
  },
  {
    id: 'meal-std-nonveg',
    name: 'Non-Vegetarian Standard Meal',
    type: 'non-veg',
    price: 0,
    description: 'Complimentary chicken curry with fragrant basmati rice & salad',
    icon: '🍗',
  },
  {
    id: 'meal-jain-thali',
    name: 'Special Jain Thali',
    type: 'jain',
    price: 0,
    description: 'Prepared strictly without onion, garlic, or root vegetables',
    icon: '🍲',
  },
  {
    id: 'meal-vegan-bowl',
    name: 'Superfood Quinoa Bowl',
    type: 'vegan',
    price: 220,
    description: 'Fresh avocado, roasted chickpeas, kale & lemon-tahini dressing',
    icon: '🥑',
  },
  {
    id: 'meal-gourmet-paneer',
    name: 'Tandoori Paneer Tikka Wrap',
    type: 'veg',
    price: 280,
    description: 'Char-grilled cottage cheese with bell peppers & mint chutney',
    icon: '🧀',
  },
  {
    id: 'meal-premium-biryani',
    name: 'Royal Dum Biryani',
    type: 'non-veg',
    price: 350,
    description: 'Slow-cooked chef special biryani served with raita & mirchi salan',
    icon: '🥘',
  },
];

export const MEAL_MAP: Map<string, Meal> = new Map(
  MEAL_OPTIONS.map((m) => [m.id, m])
);
