import { db } from '@/infrastructure/firebase/firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { Deal } from '../entities/Deal';

export class DealRepository {
  async create(deal: Deal) {
    const docRef = doc(collection(db, 'deals'), deal.id);
    await setDoc(docRef, { ...deal });
  }

  async update(deal: Deal) {
    const docRef = doc(db, 'deals', deal.id);
    await setDoc(docRef, { ...deal }, { merge: true });
  }

  async updateStatus(id: string, isActive: boolean) {
    const docRef = doc(db, 'deals', id);
    await setDoc(docRef, { isActive }, { merge: true });
  }

  async findByMerchant(merchantId: string) {
    const dealsQuery = query(
      collection(db, 'deals'),
      where('merchantId', '==', merchantId)
    );
    const querySnapshot = await getDocs(dealsQuery);
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
