"use client";

import { DealRepository } from '@/domain/repos/DealRepository';
import { DealService } from '@/domain/services/DealService';
import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import DealForm from './DealForm'; // Import the DealForm component

const dealService = new DealService(new DealRepository());

export default function MerchantDashboard() {
  const [deals, setDeals] = useState<DocumentData[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchDeals() {
      const merchantDeals = await dealService.getDealsByMerchant('merchant-id-123');
      setDeals(merchantDeals);
    }

    async function fetchUser() {
      const user = await dealService.getCurrentUser();
      setCurrentUser(user);
    }

    fetchUser();
    fetchDeals();
  }, []);

  const handleEnrollInDeal = async (dealId: string) => {
    if (!currentUser) return;

    await dealService.enrollInDeal(currentUser.id, dealId);
    alert('You have successfully enrolled in the deal! You will receive an email soon.');
  };

  const handleDealCreated = async () => {
    const updatedDeals = await dealService.getDealsByMerchant('merchant-id-123');
    setDeals(updatedDeals);
  };

  return (
    <div>
      <h1>Merchant Dashboard</h1>
      {currentUser?.role === 'Merchant' ? (
        <div>
          <h2>Your Deals</h2>
          <ul>
            {deals.map((deal) => (
              <li key={deal.id}>
                {deal.title} 
                <button onClick={() => {}}>Update</button>
                <button onClick={() => {}}>Discontinue</button>
              </li>
            ))}
          </ul>
          <h3>Create a New Deal</h3>
          <DealForm onDealCreated={handleDealCreated} /> {}
        </div>
      ) : (
        <div>
          <h2>Available Deals</h2>
          <ul>
            {deals.map((deal) => (
              <li key={deal.id}>
                {deal.title} 
                <button onClick={() => handleEnrollInDeal(deal.id)}>Enroll</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
