export type MealType = 'veg' | 'non-veg' | 'vegan' | 'jain';

export interface Meal {
  id: string;
  name: string;
  type: MealType;
  price: number;
  description: string;
  icon: string;
}
