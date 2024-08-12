// Import the functions you need from the SDKs you need
import { FIREBASE_API } from 'config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp(FIREBASE_API);
const auth = getAuth(app);
export default auth;
