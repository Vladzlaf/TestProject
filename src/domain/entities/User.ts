import { Deal } from "./Deal";

export interface User {
    id: string;
    email: string;
    enrolledDeals: Deal[];
}