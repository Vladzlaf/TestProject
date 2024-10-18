import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../infrastructure/firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../infrastructure/firebase/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      if (req.body.type === 'signup') {
        const { email, password, role } = req.body;
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await setDoc(doc(db, 'users', userCredential.user.uid), { email, role });
          res.status(200).json({ user: userCredential.user });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      } else if (req.body.type === 'login') {
        const { email, password } = req.body;
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          res.status(200).json({ user: userCredential.user });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
