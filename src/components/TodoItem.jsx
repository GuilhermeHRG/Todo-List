import React, { useState } from 'react';
import { Checkbox, IconButton, Paper, Typography, Box, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTodoDialog from './EditTodoDialog';

export default function TodoItem({ todo, deleteTodo, editTodo, toggleComplete }) {
    const [openDialog, setOpenDialog] = useState(false); // Para o diálogo de edição
    const [openTextDialog, setOpenTextDialog] = useState(false); // Para o diálogo de texto completo

    const dialogHandler = () => {
        setOpenDialog(!openDialog);
    };

    const handleTextClick = () => {
        setOpenTextDialog(true); // Abre o diálogo com o texto completo
    };

    const handleCloseTextDialog = () => {
        setOpenTextDialog(false); // Fecha o diálogo com o texto completo
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    // Não renderiza a tarefa se estiver marcada como deletada
    if (todo.deleted) {
        return null;
    }

    return (
        <>
            {/* Diálogo de Edição */}
            <EditTodoDialog open={openDialog} editTodo={editTodo} dialogHandler={dialogHandler} todo={todo} />

            {/* Diálogo de Texto Completo */}
            <Dialog open={openTextDialog} onClose={handleCloseTextDialog}>
                <DialogContent>
                    <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                        {todo.text}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseTextDialog} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Container do Item */}
            <Box
                sx={{
                    position: 'relative', // Permite posicionamento absoluto da data
                    mb: 3, // Margem inferior para espaçamento entre itens
                }}
            >
                {/* Data de Modificação (Label) */}
                <Typography
                    variant="caption"
                    color="black"
                    sx={{
                        position: 'absolute', // Posicionamento absoluto
                        top: -12, // Ajuste para ficar acima do card
                        right: 10, // Alinhado à borda direita do card
                        backgroundColor: 'background.paper', // Fundo para destacar
                        px: 1, // Padding horizontal
                        borderRadius: '4px', // Bordas arredondadas
                        boxShadow: 1, // Sombra suave
                        zIndex: 1, // Garante que fique acima do card
                        fontSize: '0.75rem', // Tamanho da fonte
                    }}
                >
                    {todo.updatedAt ? formatDate(todo.updatedAt) : 'Data não disponível'}
                </Typography>

                {/* Card da Tarefa */}
                <Paper
                    sx={{
                        padding: { xs: 1, sm: 2 },
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: 3,
                        backgroundColor: todo.completed ? '#e0f7fa' : '#ffffff',
                        transition: 'all 0.3s ease-in-out',
                        border: todo.completed ? '2px solid #00bcd4' : '2px solid transparent',
                        '&:hover': {
                            transform: 'scale(1.02)',
                            boxShadow: 6,
                        },
                        maxWidth: '100%',
                    }}
                >
                    {/* Checkbox e Texto da Tarefa */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                            sx={{
                                color: todo.completed ? '#00bcd4' : 'default',
                                '&.Mui-checked': { color: '#00bcd4' },
                            }}
                        />
                        <Typography
                            onClick={handleTextClick}
                            sx={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                fontSize: { xs: '0.9rem', sm: '1rem' },
                                fontWeight: 'bold',
                                color: todo.completed ? '#00bcd4' : '#333',
                                flexGrow: 1,
                                mr: 2,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: { xs: '200px', sm: 'none' }, // 200px apenas para celular
                            }}
                        >
                            {todo.text}
                        </Typography>
                    </Box>

                    {/* Botões de Editar e Deletar */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            color="primary"
                            onClick={dialogHandler}
                            sx={{
                                '&:hover': { backgroundColor: '#e3f2fd' },
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton
                            color="error"
                            onClick={() => deleteTodo(todo.id)}
                            sx={{
                                '&:hover': { backgroundColor: '#ffebee' },
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}