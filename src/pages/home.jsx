import { Container, List, Button, ButtonGroup, Typography, Avatar, Box, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import Form from '../components/Form';
import TodoItem from '../components/TodoItem';
import { addTodo, getTodos, deleteTodo, updateTodo } from '../firebaseService';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

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
                mt: 2,
                mb: 4,
                px: { xs: 2, sm: 3, md: 4 }, // Padding horizontal responsivo
            }}
        >
            {/* Cabeçalho com informações do usuário e botão de logout */}
            {user && (
                <Paper
                    elevation={3}
                    sx={{
                        p: 2,
                        mb: 4,
                        borderRadius: 2,
                        backgroundColor: 'background.paper',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2,
                            flexDirection: { xs: 'column', sm: 'row' }, // Coluna em telas pequenas, linha em telas maiores
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                                alt={user.displayName || "Usuário"}
                                src={user.photoURL}
                                sx={{ width: 48, height: 48 }}
                            />
                            <Box textAlign="left">
                                <Typography variant="subtitle1" color="text.primary" fontWeight="bold">
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
                            sx={{ textTransform: 'none', mt: { xs: 2, sm: 0 } }} // Margem superior em telas pequenas
                        >
                            Sair
                        </Button>
                    </Box>
                </Paper>
            )}

            {/* Título do Gerenciador de Tarefas */}
            <Typography
                variant="h4"
                fontWeight="bold"
                color="white"
                gutterBottom
                sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' } }} // Tamanho responsivo
            >
                Gerenciador de Tarefas
            </Typography>

            {/* Formulário para adicionar tarefas */}
            <Form addTodo={addNewTodo} />

            {/* Botões de filtro */}
            <ButtonGroup
                variant="contained"
                fullWidth
                sx={{
                    mt: 3,
                    mb: 3,
                    boxShadow: 2,
                    flexDirection: { xs: 'column', sm: 'row' }, // Coluna em telas pequenas, linha em telas maiores
                }}
            >
                <Button
                    onClick={() => setFilter("all")}
                    color={filter === "all" ? "primary" : "inherit"}
                    sx={{ flex: 1, mb: { xs: 1, sm: 0 } }} // Margem inferior em telas pequenas
                >
                    Todas
                </Button>
                <Button
                    onClick={() => setFilter("pending")}
                    color={filter === "pending" ? "warning" : "inherit"}
                    sx={{ flex: 1, mb: { xs: 1, sm: 0 } }} // Margem inferior em telas pequenas
                >
                    Pendentes
                </Button>
                <Button
                    onClick={() => setFilter("completed")}
                    color={filter === "completed" ? "success" : "inherit"}
                    sx={{ flex: 1 }}
                
                >
                    Concluídas 
                </Button>
            </ButtonGroup>

            {/* Lista de tarefas */}
            <List sx={{ width: '100%' }}>
                {filteredTodos.map((todo) => (
                    <Box key={todo.id} sx={{ mt: 2, px: { xs: 1, sm: 2 } }}> {/* Padding horizontal responsivo */}
                        <TodoItem
                            todo={todo}
                            deleteTodo={handleDelete}
                            editTodo={handleEditTodo}
                            toggleComplete={handleToggleComplete}
                        />
                    </Box>
                ))}
            </List>
        </Container>
    );
}

export default Home;