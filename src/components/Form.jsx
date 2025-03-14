import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';

function Form({ addTodo }) {
    const [text, setText] = useState('');

    const todoCreate = () => {
        if (!text.trim()) return;
        addTodo(text);
        setText('');
    };

    return (
        <Paper sx={{ padding: 2, display: 'flex', gap: 1 }}>
            <TextField
                label="Tarefa"
                placeholder="..."
                fullWidth
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && todoCreate()}
            />
            <Button variant="outlined" onClick={todoCreate}>
                <PostAddIcon />
            </Button>
        </Paper>
    );
}

export default Form;