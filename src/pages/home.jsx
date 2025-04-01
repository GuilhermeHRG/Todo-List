import { Container, List, Button, ButtonGroup, Typography, Avatar, Box, Paper, Chip, Divider } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Form from '../components/Form';
import TodoItem from '../components/TodoItem';
import { addTodo, getTodos, deleteTodo, updateTodo } from '../firebaseService';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Add, ExitToApp, FilterList } from '@mui/icons-material';
function Home() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Verifica se o usuário está autenticado ao carregar o componente
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                fetchTodos(user.uid);
            } else {
                navigate('/login');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const fetchTodos = async (userId) => {
        try {
            const todosList = await getTodos(userId);
            // Filtra apenas as tarefas não deletadas
            const activeTodos = todosList.filter(todo => !todo.deleted);
            setTodos(activeTodos);
            console.log("Tarefas carregadas:", activeTodos); // Debug
        } catch (error) {
            console.error("Erro ao buscar tarefas: ", error);
        }
    };

    const addNewTodo = async (text, dueDate) => {
        if (!user) return;

        try {
            const newTodo = {
                text,
                completed: false,
                updatedAt: new Date().toISOString(),
                dueDate: dueDate ? dueDate.toISOString() : null, // Converte para ISO string
                userId: user.uid,
            };

            const todoId = await addTodo(newTodo); // Usa o ID gerado pelo Firestore
            setTodos([...todos, { ...newTodo, id: todoId }]); // Adiciona o ID ao estado local
        } catch (error) {
            console.error("Erro ao adicionar tarefa: ", error);
        }
    };

    const handleToggleComplete = async (id) => {
        if (!user) {
            console.error("Usuário não autenticado");
            return;
        }

        try {
            const todo = todos.find(todo => todo.id === id);
            if (!todo) {
                console.error("Tarefa não encontrada");
                return;
            }

            const updatedTodo = { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() };

            // Atualiza no Firestore
            await updateTodo(id, { completed: updatedTodo.completed, updatedAt: updatedTodo.updatedAt });

            // Atualiza o estado local
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
        } catch (error) {
            console.error("Erro ao atualizar tarefa: ", error);
        }
    };

    // Edita o texto de uma tarefa
    const handleEditTodo = async (id, newText) => {
        if (!user) {
            console.error("Usuário não autenticado");
            return;
        }

        try {
            const todo = todos.find(todo => todo.id === id);
            if (!todo) {
                console.error("Tarefa não encontrada");
                return;
            }

            // Verifica se o usuário é o dono da tarefa
            if (todo.userId !== user.uid) {
                console.error("Usuário não tem permissão para editar esta tarefa");
                return;
            }

            const updatedTodo = { ...todo, text: newText, updatedAt: new Date().toISOString() };

            // Atualiza no Firestore
            await updateTodo(id, { text: updatedTodo.text, updatedAt: updatedTodo.updatedAt });

            // Atualiza o estado local
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
        } catch (error) {
            console.error("Erro ao editar tarefa: ", error);
        }
    };

    const handleDelete = async (id) => {
        if (!user) {
            console.error("Usuário não autenticado");
            return;
        }

        try {
            const todo = todos.find(todo => todo.id === id);
            if (!todo) {
                console.error("Tarefa não encontrada");
                return;
            }

            // Marca a tarefa como deletada no Firestore
            await updateTodo(id, {
                deleted: true, // Marca como deletada
                updatedAt: new Date().toISOString() // Atualiza a data de modificação
            });

            // Atualiza o estado local
            setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? { ...todo, deleted: true } : todo));
        } catch (error) {
            console.error("Erro ao deletar tarefa: ", error);
        }
    };

    // Filtra as tarefas
    const filteredTodos = todos.filter((todo) => {
        if (filter === "pending") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    // Função para fazer logout
    const handleLogout = async () => {
        try {
            await signOut(auth); // Faz logout
            navigate('/login'); // Redireciona para a tela de login
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
        }
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                textAlign: 'center',
                my: 4,
                px: { xs: 2, sm: 3 },
                animation: 'fadeIn 0.5s ease-in-out',
                '@keyframes fadeIn': {
                    from: { opacity: 0, transform: 'translateY(20px)' },
                    to: { opacity: 1, transform: 'translateY(0)' }
                }
            }}
        >
            {/* User Profile Section */}
            {user && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    backdropFilter: 'blur(8px)'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                            alt={user.displayName || "Usuário"}
                            src={user.photoURL}
                            sx={{
                                width: 54,
                                height: 54,
                                border: '2px solid',
                                borderColor: 'primary.main'
                            }}
                        />
                        <Box textAlign="left">
                            <Typography variant="h6" fontWeight="600">
                                {user.displayName || "Usuário"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {user.email}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleLogout}
                        startIcon={<ExitToApp />}
                        sx={{
                            borderRadius: 2,
                            px: 3,
                            textTransform: 'none'
                        }}
                    >
                        Sair
                    </Button>
                </Box>
            )}

            {/* App Header */}
            <Box sx={{ mb: 5 }}>
                <Typography
                    variant="h3"
                    fontWeight="700"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '2rem', md: '2.5rem' },
                        color: '#fff',
                        mb: 1
                    }}
                >
                    Minhas Tarefas
                </Typography>
                <Typography variant="body1" color="#fff">
                    Organize sua vida em um só lugar
                </Typography>
            </Box>

            {/* Add Task Section */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 3,
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
                }}
            >
                <Typography variant="h6" fontWeight="600" gutterBottom sx={{ textAlign: 'left' }}>
                    Adicionar Tarefa
                </Typography>
                <Form addTodo={addNewTodo} />
            </Paper>

            {/* Filter Section */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3
            }}>
                <Typography variant="subtitle1" fontWeight="600" sx={{ display: 'flex', alignItems: 'center' }}>
                    <FilterList sx={{ mr: 1 }} /> Filtros
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, color: '#fff' }}>
                    <Chip
                        label="Todas"
                        onClick={() => setFilter("all")}
                        color={filter === "all" ? "primary" : "default"}
                        variant={filter === "all" ? "filled" : "outlined"}
                        clickable
                    />
                    <Chip
                        label="Pendentes"
                        onClick={() => setFilter("pending")}
                        color={filter === "pending" ? "warning" : "default"}
                        variant={filter === "pending" ? "filled" : "outlined"}
                        clickable
                    />
                    <Chip
                        label="Concluídas"
                        onClick={() => setFilter("completed")}
                        color={filter === "completed" ? "success" : "default"}
                        variant={filter === "completed" ? "filled" : "outlined"}
                        clickable
                    />
                </Box>
            </Box>

            {/* Task List */}
            {filteredTodos.length > 0 ? (
                <Paper
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
                        backdropFilter: 'blur(8px)', // Efeito de desfoque no fundo
                        border: '1px solid rgba(255, 255, 255, 0.07)' // Borda sutil
                    }}
                >
                    <List sx={{ p: 0 }}>
                        {filteredTodos.map((todo, index) => (
                            <React.Fragment key={todo.id}>
                                <Box sx={{
                                    p: 2,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        transform: 'translateX(4px)',
                                    },
                                }}>
                                    <TodoItem
                                        todo={todo}
                                        deleteTodo={handleDelete}
                                        editTodo={handleEditTodo}
                                        toggleComplete={handleToggleComplete}
                                    />
                                </Box>
                                {index < filteredTodos.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        borderRadius: 3,
                        backdropFilter: 'blur(8px)',
                        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.38)'
                    }}
                >
                    <Typography variant="body1" color="text.secondary">
                        Nenhuma tarefa encontrada
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setFilter("all")}
                        sx={{ mt: 2, borderRadius: 2 }}
                    >
                        Criar primeira tarefa
                    </Button>
                </Paper>
            )}

        </Container>
    );
}

export default Home;