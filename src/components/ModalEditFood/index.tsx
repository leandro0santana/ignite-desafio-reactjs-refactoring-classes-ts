import Modal from 'react-modal';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';

import Input from '../Input';
import { Form } from './styles';
import { Food, useFoods } from '../../hooks/useFoods';

interface ModalEditFoodProps {
  isOpen: boolean;
  food: Food;
  onRequestClose: () => void;
}

interface FoodData {
  name: string;
  description: string;
  image: string;
  price: string;
}

export function ModalEditFood({ food, isOpen, onRequestClose }:ModalEditFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const { updateFood } = useFoods();

  async function handleSubmit({ name, description, image, price }: FoodData) {
    await updateFood({
      id: food.id,
      name, 
      description, 
      image, 
      price,
      available: food.available
    });

    onRequestClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Form ref={formRef} onSubmit={handleSubmit} initialData={food}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditFood;
