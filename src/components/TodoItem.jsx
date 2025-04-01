import React, { useState } from 'react';
import { Checkbox, IconButton, Paper, Typography, Box, Dialog, DialogContent, DialogActions, Button, Tooltip, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTodoDialog from './EditTodoDialog';

// Por isso:
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircle from '@mui/icons-material/CheckCircle';

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
            <EditTodoDialog
                open={openDialog}
                editTodo={editTodo}
                dialogHandler={dialogHandler}
                todo={todo}
            />

            {/* Diálogo de Visualização de Texto */}
            <Dialog
                open={openTextDialog}
                onClose={handleCloseTextDialog}
                PaperProps={{
                    sx: {
                        borderRadius: '16px',
                        background: '#ffffff',
                        boxShadow: '0 10px 50px rgba(0,0,0,0.15)',
                        minWidth: '350px',
                        maxWidth: '90vw',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }
                }}
            >
                <DialogContent sx={{ p: 3 }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 2,
                        pb: 2,
                        borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <Box sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: todo.completed ? '#4caf50' : '#2196f3',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                        }}>
                            {todo.completed ? <CheckIcon /> : <AccessTimeIcon />}
                        </Box>
                        <Typography variant="h6" fontWeight="600">
                            Detalhes da Tarefa
                        </Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            wordBreak: 'break-word',
                            p: 2,
                            backgroundColor: 'rgba(0,0,0,0.02)',
                            borderRadius: '8px',
                            fontSize: '1.1rem',
                            lineHeight: 1.7
                        }}
                    >
                        {todo.text}
                    </Typography>

                    {todo.dueDate && (
                        <Box sx={{
                            mt: 3,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: isOverdue ? '#f44336' : '#607d8b'
                        }}>
                            <EventIcon fontSize="small" />
                            <Typography variant="body2">
                                <strong>Vencimento:</strong> {formatDate(todo.dueDate)}
                                {isOverdue && (
                                    <Chip
                                        label="Atrasado"
                                        size="small"
                                        sx={{
                                            ml: 1,
                                            backgroundColor: '#ffebee',
                                            color: '#f44336'
                                        }}
                                    />
                                )}
                            </Typography>
                        </Box>
                    )}

<Box sx={{
    mt: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    p: '8px 12px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5', // Cinza claro
    border: '1px solid #e0e0e0' // Borda sutil
}}>
    <UpdateIcon fontSize="small" sx={{ color: '#607d89' }} />
    <Typography variant="body2" sx={{ color: '#424242' }}>
        <strong>Criado em:</strong> {todo.updatedAt ? formatDate(todo.updatedAt) : 'N/A'}
    </Typography>
</Box>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        onClick={handleCloseTextDialog}
                        variant="contained"
                        sx={{
                            borderRadius: '12px',
                            px: 3,
                            py: 1,
                            textTransform: 'none',
                            fontWeight: 500,
                            backgroundColor: '#6c5ce7',
                            '&:hover': {
                                backgroundColor: '#5649c0'
                            }
                        }}
                    >
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Item de Tarefa */}
            <Box
                sx={{
                    position: 'relative',
                    mb: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-3px)',
                        '& .task-actions': {
                            opacity: 1
                        }
                    }
                }}
            >
                {/* Status Badges */}
                <Box sx={{
                    position: 'absolute',
                    top: -12,
                    left: 16,
                    right: 16,
                    display: 'flex',
                    justifyContent: 'space-between',
                    zIndex: 1
                }}>
                    {todo.dueDate && (
                        <Chip
                            label={`Vence: ${formatDate(todo.dueDate)}`}
                            size="small"
                            sx={{
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                backgroundColor: isOverdue ? '#ffebee' : '#e3f2fd',
                                color: isOverdue ? '#f44336' : '#1976d2',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                height: 24
                            }}
                        />
                    )}

                    <Chip
                        label={`Criado: ${todo.updatedAt ? formatDate(todo.updatedAt) : 'N/A'}`}
                        size="small"
                        sx={{
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            color: 'rgba(0,0,0,0.7)',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            height: 24
                        }}
                    />
                </Box>

                {/* Card Principal */}
                <Paper
                    sx={{
                        p: 2,
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        background: '#ffffff',
                        borderLeft: '4px solid',
                        borderColor: isOverdue
                            ? '#f44336'
                            : todo.completed
                                ? '#4caf50'
                                : '#2196f3',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                            boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    {/* Checkbox */}
                    <Checkbox
                        checked={todo.completed}
                        onChange={() => toggleComplete(todo.id)}
                        icon={<RadioButtonUnchecked />}
                        checkedIcon={<CheckCircle />}
                        sx={{
                            color: isOverdue ? '#f44336' : '#2196f3',
                            '&.Mui-checked': {
                                color: '#4caf50',
                            },
                            p: 1.5,
                            '& .MuiSvgIcon-root': {
                                fontSize: '1.8rem'
                            }
                        }}
                    />

                    {/* Texto da Tarefa */}
                    <Box
                        onClick={handleTextClick}
                        sx={{
                            flexGrow: 1,
                            minWidth: 0,
                            mr: 2,
                            cursor: 'pointer',
                            position: 'relative'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '1.05rem',
                                fontWeight: todo.completed ? 500 : 600,
                                color: isOverdue
                                    ? '#f44336'
                                    : todo.completed
                                        ? '#4caf50'
                                        : 'text.primary',
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                pr: 1,
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {todo.text}
                        </Typography>

                        {todo.completed && (
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                right: 0,
                                height: '1px',
                                backgroundColor: '#4caf50',
                                transform: 'translateY(-50%)',
                                opacity: 0.3
                            }} />
                        )}
                    </Box>

                    {/* Ações */}
                    <Box
                        className="task-actions"
                        sx={{
                            display: 'flex',
                            gap: 0.5,
                            opacity: { xs: 1, sm: 0.7 },
                            transition: 'opacity 0.2s ease',
                            '&:hover': {
                                opacity: 1
                            }
                        }}
                    >
                        <Tooltip title="Editar">
                            <IconButton
                                onClick={dialogHandler}
                                size="small"
                                sx={{
                                    color: '#2196f3',
                                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 150, 243, 0.2)'
                                    }
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Excluir">
                            <IconButton
                                onClick={() => deleteTodo(todo.id)}
                                size="small"
                                sx={{
                                    color: '#f44336',
                                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(244, 67, 54, 0.2)'
                                    }
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}