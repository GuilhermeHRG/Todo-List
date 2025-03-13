import { Container, List, Button, ButtonGroup, Typography } from '@mui/material';
import '../App.css';
import Form from '../components/Form';
import TodoItem from '../components/TodoItem';
import { useState } from 'react';

function Home() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    const addTodo = (todo) => {
        setTodos([...todos, { ...todo, completed: false, updatedAt: new Date() }]);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Função para editar a tarefa
    const editTodo = (id, editedText) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, text: editedText, updatedAt: new Date() } : todo
        ));
    };

    // Função para alternar o status de conclusão
    const toggleComplete = (id) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: new Date() } : todo
        ));
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "pending") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                Gerenciador de Tarefas
            </Typography>

            <Form addTodo={addTodo} />

            <ButtonGroup variant="contained" fullWidth sx={{ mt: 2, mb: 2 }}>
                <Button 
                    onClick={() => setFilter("all")} 
                    color={filter === "all" ? "primary" : "inherit"}
                >
                    Todas
                </Button>
                <Button 
                    onClick={() => setFilter("pending")} 
                    color={filter === "pending" ? "warning" : "inherit"}
                >
                    Pendentes
                </Button>
                <Button 
                    onClick={() => setFilter("completed")} 
                    color={filter === "completed" ? "success" : "inherit"}
                >
                    Concluídas
                </Button>
            </ButtonGroup>

            <List>
                {filteredTodos.map((todo) => (
                    <div key={todo.id} style={{ marginTop: '1em' }}>
                        <TodoItem 
                            todo={todo} 
                            deleteTodo={deleteTodo} 
                            editTodo={editTodo} 
                            toggleComplete={toggleComplete} 
                        />
                    </div>
                ))}
            </List>
        </Container>
    );
}

export default Home;
