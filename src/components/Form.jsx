import { Button, Paper, TextField, useMediaQuery } from '@mui/material';
import { MobileDateTimePicker, DesktopDateTimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';

function Form({ addTodo }) {
    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState(null); // Estado para armazenar a data e hora de vencimento

    // Verifica se a tela é pequena (dispositivos móveis)
    const isMobile = useMediaQuery('(max-width:600px)');

    const todoCreate = () => {
        if (!text.trim()) return;
        addTodo(text, dueDate); // Passa o texto e a data/hora de vencimento
        setText(''); // Limpa o campo de texto
        setDueDate(null); // Limpa o campo de data/hora
    };

    return (
        <Paper sx={{ padding: 2, display: 'flex', gap: 1, flexDirection: 'column' }}>
            <TextField
                label="Tarefa"
                placeholder="..."
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && todoCreate()}
            />
            {isMobile ? (
                <MobileDateTimePicker
                    label="Data e Hora de Vencimento"
                    value={dueDate}
                    onChange={(newValue) => setDueDate(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                    )}
                />
            ) : (
                <DesktopDateTimePicker
                    label="Data e Hora de Vencimento"
                    value={dueDate}
                    onChange={(newValue) => setDueDate(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 1 }}
                        />
                    )}
                />
            )}
            <Button variant="outlined" onClick={todoCreate}>
                <PostAddIcon />
            </Button>
        </Paper>
    );
}

export default Form;