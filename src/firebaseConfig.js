// Importando as funções necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
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
const db = getFirestore(app);

// Exportando o db (Firestore)
export { db };
