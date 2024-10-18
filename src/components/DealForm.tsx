import { Deal } from '@/domain/entities/Deal';
import { DealRepository } from '@/domain/repos/DealRepository';
import { DealService } from '@/domain/services/DealService';
import { useState } from 'react';

interface DealFormProps {
  onDealCreated: () => void; // Callback to notify parent when deal is created
}

const DealForm = ({ onDealCreated }: DealFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);

  const dealService = new DealService(new DealRepository());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dealService.createDeal(new Deal('', title, description, discount));
    onDealCreated(); // Notify parent that a deal has been created
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input value={discount} onChange={e => setDiscount(Number(e.target.value))} type="number" placeholder="Discount" />
      <button type="submit">Create Deal</button>
    </form>
  );
};

export default DealForm;
