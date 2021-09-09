import { useState } from 'react';

import { Header } from '../../components/Header';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';

import { FoodsContainer } from './styles';
import { Food as FoodType, useFoods } from '../../hooks/useFoods';

interface FoodEditModal {
  food: FoodType;
  isOpen: boolean;
}

export function Dashboard() {
  const [isModalAddFoodOpen, setIsModalAddFoodOpen] = useState(false);
  const [isModalEditFoodOpen, setIsModalEditFoodOpen] = useState<FoodEditModal>(
    {} as FoodEditModal
  );

  const { foods } = useFoods();

  function handleOpenModalAddFood() {
    setIsModalAddFoodOpen(true);
  }

  function handleCloseModalAddFood() {
    setIsModalAddFoodOpen(false);
  }

  function handleOpenModalEditFood(food: FoodType) {
    setIsModalEditFoodOpen({
      food,
      isOpen: true,
    });
  }

  function handleCloseModalEditFood() {
    setIsModalEditFoodOpen({
      food: {} as FoodType,
      isOpen: false,
    });
  }

  return (
    <>
      <Header onOpenNewFoodModal={handleOpenModalAddFood} />
      <ModalAddFood
        isOpen={isModalAddFoodOpen}
        onRequestClose={handleCloseModalAddFood}
      />
      <ModalEditFood
        food={isModalEditFoodOpen.food}
        isOpen={isModalEditFoodOpen.isOpen}
        onRequestClose={handleCloseModalEditFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods.map(food => (
            <Food
              key={food.id}
              food={food}
              onOpenEditedFoodModal={handleOpenModalEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};
