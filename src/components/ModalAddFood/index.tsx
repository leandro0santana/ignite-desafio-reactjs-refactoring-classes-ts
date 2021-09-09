import Modal from 'react-modal';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FiCheckSquare } from 'react-icons/fi';

import Input from '../Input';
import { Form } from './styles';
import { useFoods } from '../../hooks/useFoods';

interface ModalAddFoodProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface FoodData {
  name: string;
  description: string;
  image: string;
  price: string;
}

export function ModalAddFood({ isOpen, onRequestClose }: ModalAddFoodProps) {
  const formRef = useRef<FormHandles>(null);

  const { createFood } = useFoods();

  async function handleSubmit({ name, description, image, price }: FoodData) {
    await createFood({
      name,
      available: true,
      description,
      image,
      price
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
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
