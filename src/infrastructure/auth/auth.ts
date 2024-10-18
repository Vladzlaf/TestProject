import {
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';

const actionCodeSettings = {
  url: `http://localhost:3002/complete-logIn`,
  handleCodeInApp: true,
};

export async function sendLoginLink(email: string) {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email);
    alert('Login link sent! Check your email.');
  } catch (error) {
    console.error('Error sending login link:', error);
    alert('Failed to send login link.');
  }
}

export async function completeSignIn() {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      throw new Error('No email found in local storage.');
    }
    try {
      await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem('emailForSignIn');
      alert('Sign-in successful!');
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }
}
