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
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Verifica se a tarefa está vencida
    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date();

    // Não renderiza a tarefa se estiver marcada como deletada
    if (todo.deleted) {
        return null;
    }

    return (
        <>
            {/* Diálogo de Edição */}
            <EditTodoDialog open={openDialog} editTodo={editTodo} dialogHandler={dialogHandler} todo={todo} />
    
            {/* Diálogo de Texto Completo */}
            <Dialog 
                open={openTextDialog} 
                onClose={handleCloseTextDialog}
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        background: 'linear-gradient(145deg, #f5f7fa, #ffffff)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        minWidth: '300px'
                    }
                }}
            >
                <DialogContent>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            wordBreak: 'break-word',
                            padding: 2,
                            color: '#333',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                        }}
                    >
                        {todo.text}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ padding: 2 }}>
                    <Button 
                        onClick={handleCloseTextDialog} 
                        sx={{
                            background: 'linear-gradient(45deg, #6c5ce7, #a29bfe)',
                            color: 'white',
                            borderRadius: '8px',
                            padding: '8px 20px',
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #5649c0, #8c7ae6)',
                                boxShadow: '0 6px 8px rgba(0,0,0,0.15)'
                            }
                        }}
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
    
            {/* Container do Item */}
            <Box
                sx={{
                    position: 'relative',
                    mb: 3,
                    '&:hover': {
                        '& .date-label': {
                            transform: 'translateY(-2px)',
                            boxShadow: 3
                        }
                    }
                }}
            >
                {/* Data de Modificação */}
                <Typography
                    variant="caption"
                    className="date-label"
                    sx={{
                        position: 'absolute',
                        top: -18,
                        right: 0,
                        backgroundColor: '#6c5ce7',
                        color: 'white',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '8px',
                        boxShadow: 1,
                        zIndex: 1,
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                       
                    }}
                >
                    Criado: {todo.updatedAt ? formatDate(todo.updatedAt) : 'N/A'}
                </Typography>
    
                {/* Data de Vencimento */}
                {todo.dueDate && (
                    <Typography
                        variant="caption"
                        className="date-label"
                        sx={{
                            position: 'absolute',
                            top: -18,
                            left: 0,
                            backgroundColor: isOverdue ? '#ff4757' : 'rgb(152, 12, 12)',
                            color: 'white',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '6px',
                            boxShadow: 1,
                            zIndex: 1,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            transition: 'all 0.2s ease'
                        }}
                    >
                        Vence: {formatDate(todo.dueDate)}
                    </Typography>
                )}
    
                {/* Card da Tarefa */}
                <Paper
                    sx={{
                        padding: { xs: 1.5, sm: 1.5 },
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        background: todo.completed 
                            ? 'linear-gradient(135deg, #f0f9ff, #e0f7fa)' 
                            : isOverdue 
                                ? 'linear-gradient(135deg, #fff0f0, #ffebee)'
                                : 'linear-gradient(135deg, #f9f9f9, #ffffff)',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        borderLeft: isOverdue
                            ? '4px solid #ff4757'
                            : todo.completed
                                ? '4px solid #00bcd4'
                                : '4px solid #6c5ce7',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
                        },
                        maxWidth: '100%',
                        overflow: 'hidden'
                    }}
                >
                    {/* Checkbox e Texto */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, minWidth: 0 }}>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                            sx={{
                                color: isOverdue
                                    ? '#ff4757'
                                    : todo.completed
                                        ? '#00bcd4'
                                        : '#6c5ce7',
                                '&.Mui-checked': {
                                    color: isOverdue ? '#ff4757' : '#00bcd4',
                                },
                                padding: { xs: 1, sm: 1.5 },
                                '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1.5rem', sm: '1.75rem' }
                                }
                            }}
                        />
                        <Typography
                            onClick={handleTextClick}
                            sx={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                fontSize: { xs: '0.95rem', sm: '1.1rem' },
                                fontWeight: todo.completed ? 500 : 600,
                                color: isOverdue
                                    ? '#ff4757'
                                    : todo.completed
                                        ? '#00bcd4'
                                        : '#333',
                                flexGrow: 1,
                                mr: 2,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: { xs: '180px', sm: '400px', md: '500px' },
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    color: isOverdue 
                                        ? '#ff6b81' 
                                        : todo.completed 
                                            ? '#26c6da' 
                                            : '#6c5ce7'
                                }
                            }}
                        >
                            {todo.text}
                        </Typography>
                    </Box>
    
                    {/* Botões de Ação */}
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 1,
                        '& .MuiIconButton-root': {
                            transition: 'all 0.2s ease',
                            borderRadius: '10px'
                        }
                    }}>
                        <IconButton
                            onClick={dialogHandler}
                            sx={{
                                backgroundColor: 'rgba(108, 92, 231, 0.1)',
                                color: '#6c5ce7',
                                '&:hover': { 
                                    backgroundColor: 'rgba(108, 92, 231, 0.2)',
                                    transform: 'scale(1.1)'
                                },
                            }}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            onClick={() => deleteTodo(todo.id)}
                            sx={{
                                backgroundColor: 'rgba(255, 71, 87, 0.1)',
                                color: '#ff4757',
                                '&:hover': { 
                                    backgroundColor: 'rgba(255, 71, 87, 0.2)',
                                    transform: 'scale(1.1)'
                                },
                            }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}