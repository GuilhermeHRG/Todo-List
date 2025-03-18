import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import { auth } from './firebaseConfig';
import { useEffect, useState } from 'react';
import Home from './pages/home';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Importe o AdapterDayjs

function App() {
    const [user, setUser] = useState(null); // Estado para armazenar o usuário autenticado

    // Verifica se o usuário está autenticado ao carregar o componente
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user); // Atualiza o estado do usuário
        });

        return () => unsubscribe(); // Limpa o listener ao desmontar o componente
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Home /> : <Navigate to="/login" />} // Redireciona para o login se não houver usuário
                    />
                    <Route
                        path="/login"
                        element={!user ? <Auth setUser={setUser} /> : <Navigate to="/" />} // Redireciona para a lista de tarefas se o usuário estiver autenticado
                    />
                </Routes>
            </Router>
        </LocalizationProvider>
    );
}

export default App;