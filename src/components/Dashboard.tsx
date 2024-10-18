"use client"

import { DealRepository } from '@/domain/repos/DealRepository';
import { DealService } from '@/domain/services/DealService';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const dealService = new DealService(new DealRepository());

export default function MerchantDashboard() {
  const [deals, setDeals] = useState<DocumentData[]>([]);

  useEffect(() => {
    async function fetchDeals() {
      const merchantDeals = await dealService.getDealsByMerchant('merchant-id-123');
      setDeals(merchantDeals);
    }
    fetchDeals();
  }, []);

  return (
    <div>
      <h1>Merchant Dashboard</h1>
      <ul>
        {deals.map((deal) => (
          <li key={deal.id}>{deal.title}</li>
        ))}
      </ul>
    </div>
  );
}
