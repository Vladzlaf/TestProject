import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore';
import { Deal } from '../../domain/entities/Deal';

export class DealRepository {
  private dealCollection = collection(db, 'deals');

  async createDeal(deal: Deal): Promise<void> {
    await addDoc(this.dealCollection, { ...deal });
  }

  async getDeals(): Promise<Deal[]> {
    const snapshot = await getDocs(this.dealCollection);
    return snapshot.docs.map(doc => new Deal(doc.id, ...doc.data() ));
  }

  async updateDeal(deal: Deal): Promise<void> {
    const dealRef = doc(this.dealCollection, deal.id);
    await updateDoc(dealRef, { ...deal });
  }
}
