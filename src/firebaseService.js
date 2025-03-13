// Importando o Firestore e as funções necessárias
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";

// Definindo a coleção "todos"
const todoCollection = collection(db, "todos");

// Função para adicionar uma tarefa
export const addTodo = async (text) => {
    await addDoc(todoCollection, {
        text,
        completed: false,
        updatedAt: new Date().toISOString(),
    });
};

// Função para buscar todas as tarefas
export const getTodos = async () => {
    const snapshot = await getDocs(todoCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Função para atualizar uma tarefa
export const updateTodo = async (id, updatedData) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, updatedData);
};

// Função para deletar uma tarefa
export const deleteTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
};
