import { Deal } from "./Deal";

export interface Merchant {
    id: string;
    email: string;
    deals: Deal[];
  }