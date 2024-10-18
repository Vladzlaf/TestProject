import { User } from '../../domain/entities/User';
import { Deal } from '../../domain/entities/Deal';

export class EnrollUserInDeal {
  constructor(private userRepository: IUserRepository, private dealRepository: IDealRepository) {}

  async execute(userId: string, dealId: string): Promise<void> {
    const user = await this.userRepository.getUserById(userId);
    const deal = await this.dealRepository.getDealById(dealId);
    user.enrollInDeal(deal);
    // Logic to send email
  }
}
