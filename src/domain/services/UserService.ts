

export const enrollInDeal = async (userId: string, dealId: string) => {
  const userRef = firestore.collection('users').doc(userId);
  await userRef.update({
    enrolledDeals: firestore.FieldValue.arrayUnion(dealId),
  });
};

export const createUserProfile = async (userId: string, email: string) => {
  const userRef = firestore.collection('users').doc(userId);
  await userRef.set({ id: userId, email, enrolledDeals: [] } as User);
};
