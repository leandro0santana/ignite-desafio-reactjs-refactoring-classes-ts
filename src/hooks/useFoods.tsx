import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from "../services/api";

export interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export type FoodInput = Omit<Food, 'id'>;

interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodsContextData {
  foods: Food[];
  createFood: (food: FoodInput) => Promise<void>;
  deleteFood: (foodId: number) => Promise<void>;
  updateFood: (food: Food) => Promise<void>;
}

const FoodsContext = createContext<FoodsContextData>(
  {} as FoodsContextData
);

export function FoodsProvider({ children }: FoodsProviderProps) {
  
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() =>{
    api.get('foods')
      .then(response => {
        setFoods(response.data)
      });
  }, []);

  async function createFood({ 
    name,
    available,
    description,
    image,
    price,
  }: FoodInput) {
    const response = await api.post('foods', {
      name,
      available,
      description,
      image,
      price,
    });

    setFoods(oldFasks => [...oldFasks, response.data]);
  }

  async function deleteFood(foodId: number) {
    await api.delete(`/foods/${foodId}`);

    const foodIndex = foods.findIndex(food => food.id === foodId);
  
    foods.splice(foodIndex, 1);

    setFoods(foods.filter(food => food.id !== foodId));
  }

  async function updateFood(food: Food) {
    await api.put(`foods/${food.id}`, food);

    const newFoods = foods.map(foodOld => foodOld.id === food.id ? food : foodOld)

    setFoods(newFoods);
  }

  return (
    <FoodsContext.Provider value={{ foods, createFood, deleteFood, updateFood }}>
      {children}
    </FoodsContext.Provider>
  );
}

export function useFoods() {
  const context = useContext(FoodsContext);

  return context;
}
