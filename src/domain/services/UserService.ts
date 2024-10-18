

export const enrollInDeal = async (userId: string, dealId: string) => {
  const userRef = firestore.collection('users').doc(userId);
  await userRef.update({
    enrolledDeals: firestore.FieldValue.arrayUnion(dealId),
  });
  // Logic to send email with deal redemption instructions goes here
};

export const createUserProfile = async (userId: string, email: string) => {
  const userRef = firestore.collection('users').doc(userId);
  await userRef.set({ id: userId, email, enrolledDeals: [] } as User);
};
