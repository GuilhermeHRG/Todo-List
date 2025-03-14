// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Importando getFirestore
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAdwaQKjclkhW1YrZwwK5sdEyMDm6LVNck",
  authDomain: "todolist-ff81f.firebaseapp.com",
  projectId: "todolist-ff81f",
  storageBucket: "todolist-ff81f.firebasestorage.app",
  messagingSenderId: "814957265695",
  appId: "1:814957265695:web:d8d8be2b4ab9a0f63fe62a",
  measurementId: "G-BNZHVSR7N7"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Obtendo a instância do Firestore
const db = getFirestore(app);  // Aqui você pega a instância do Firestore

// Exportando o db (Firestore)
export { db };  // Certifique-se de que o db está sendo exportado corretamente
export const auth = getAuth(app); // Exporte o auth
export const provider = new GoogleAuthProvider(); // Provedor do Google
