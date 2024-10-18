"use client"
import { DealService } from '@/application/services/DealService';
import { Deal } from '@/domain/entities/Deal';
import { DealRepository } from '@/infrastructure/firebase/dealRepo';
import { useState } from 'react';

const DealForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState(0);
  const dealService = new DealService(new DealRepository());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dealService.createDeal(new Deal('', title, description, discount));
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
