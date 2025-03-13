import * as React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton, Paper, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTodoDialog from './EditTodoDialog';

export default function TodoItem({ todo, deleteTodo, editTodo, toggleComplete }) {
    const [openDialog, setOpenDialog] = React.useState(false);

    const dialogHandler = () => {
        setOpenDialog(!openDialog);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <>
            <EditTodoDialog open={openDialog} editTodo={editTodo} dialogHandler={dialogHandler} todo={todo} />
            <Paper
                sx={{
                    padding: 2,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: 4,
                    backgroundColor: todo.completed ? '#e0f2f1' : '#ffffff',
                    transition: 'all 0.3s ease-in-out',
                    border: todo.completed ? '2px solid #4caf50' : '2px solid transparent',
                    '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 6,
                    },
                    width: '100%',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Checkbox
                        edge="start"
                        tabIndex={-1}
                        disableRipple
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        sx={{
                            color: todo.completed ? '#4caf50' : 'default',
                            '&.Mui-checked': { color: '#4caf50' },
                        }}
                    />
                    <ListItemText
                        primary={todo.text}
                        sx={{
                            textDecoration: todo.completed ? 'line-through' : 'none',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            color: todo.completed ? '#4caf50' : '#333',
                        }}
                    />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                    {formatDate(todo.updatedAt)}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" onClick={dialogHandler}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => deleteTodo(todo.id)}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Paper>
        </>
    );
}
