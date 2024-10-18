import { DealRepository } from '../../infrastructure/firebase/dealRepo';
import { Deal } from '../../domain/entities/Deal';

export class DealService {
  constructor(private dealRepo: DealRepository) {}

  async createDeal(deal: Deal) {
    await this.dealRepo.createDeal(deal);
  }

  async getAllDeals(): Promise<Deal[]> {
    return await this.dealRepo.getDeals();
  }

  async discontinueDeal(dealId: string) {
    const deals = await this.dealRepo.getDeals();
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
      deal.discontinue();
      await this.dealRepo.updateDeal(deal);
    }
  }
}
