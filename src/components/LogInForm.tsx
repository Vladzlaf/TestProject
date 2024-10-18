'use client';
import { sendLoginLink } from '@/infrastructure/auth/auth';
import { auth, db } from '@/infrastructure/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Define a type for form values
interface LoginFormValues {
  email: string;
}

export default function LogInForm() {
  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await sendLoginLink(data.email);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        if (userData?.role !== 'merchant') {
          alert('Access denied!');
          router.push('/');
        } else {
          setUser(user);
        }
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div>
      <h1>Email Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', { required: true })} 
          type="email"
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Login Link</button>
      </form>
    </div>
  );
}
