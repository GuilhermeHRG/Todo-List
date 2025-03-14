import { db, auth } from './firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

const todoCollection = collection(db, "todos");

export const addTodo = async (todo) => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    // Remove o campo "id" e deixa o Firestore gerar o ID automaticamente
    const { id, ...todoWithoutId } = todo;

    const docRef = await addDoc(todoCollection, {
        ...todoWithoutId,
        userId: user.uid,
    });

    // Retorna o ID gerado pelo Firestore
    return docRef.id;
};

// Buscar tarefas do usuário autenticado
export const getTodos = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");

    const q = query(todoCollection, where("userId", "==", user.uid)); // Filtra por userId
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateTodo = async (id, updatedData) => {
    const todoRef = doc(db, "todos", id);
    await updateDoc(todoRef, updatedData);
};

// Deletar tarefa (não precisa alterar)
export const deleteTodo = async (id) => {
    const todoRef = doc(db, "todos", id);
    await deleteDoc(todoRef);
};