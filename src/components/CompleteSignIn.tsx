"use client"; // Must be the first line

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Ensure you import from next/navigation
import { completeSignIn } from '@/infrastructure/auth/auth';

export default function CompleteSignIn() {
  const router = useRouter();

  useEffect(() => {
    console.log('Router is mounted:', router);
    async function verifySignIn() {
      try {
        await completeSignIn(); 
        router.push('/dashboard');
      } catch (error) {
        console.error('Sign-in failed:', error);
      }
    }
    
    if (router) {
      verifySignIn();
    }
  }, [router]);

  return <p>Verifying your email link...</p>;
}
