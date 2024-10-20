import { Deal } from "../entities/Deal";
import { DealRepository } from "../repos/DealRepository";

export class DealService {
  constructor(private dealRepo: DealRepository) {}

  async getCurrentUser() {
    return { id: 'user-id-123', email: 'user@example.com', role: 'User', enrolledDeals: [] };
  }
  createDeal(deal: Deal) {
    return this.dealRepo.create(deal);
  }

  updateDeal(deal: Deal) {
    return this.dealRepo.update(deal);
  }

  discontinueDeal(id: string) {
    return this.dealRepo.updateStatus(id, false);
  }

  getDealsByMerchant(merchantId: string) {
    return this.dealRepo.findByMerchant(merchantId);
  }
}
