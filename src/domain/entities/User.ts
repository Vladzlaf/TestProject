import { Deal } from "./Deal";

export interface User {
    id: string;
    email: string;
    role: 'Merchant' | 'User';
    enrolledDeals: Deal[];
  }
  