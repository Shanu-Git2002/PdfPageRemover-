import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDUw9xXg5nb_AZwj_pggiPCywurKbD2rco",
    authDomain: "phone-auth-46ff4.firebaseapp.com",
    projectId: "phone-auth-46ff4",
    storageBucket: "phone-auth-46ff4.appspot.com",
    messagingSenderId: "767095848697",
    appId: "1:767095848697:web:94eacd73010eb5048aec28"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;