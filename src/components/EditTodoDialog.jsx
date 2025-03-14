import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function EditTodoDialog({ open, dialogHandler, editTodo, todo }) {
    const [text, setText] = useState(todo.text);

    const handleSave = () => {
        editTodo(todo.id, text); // Chama a função de edição
        dialogHandler();
    };

    return (
        <Dialog open={open} onClose={dialogHandler} fullWidth>
            <DialogTitle>Editar Tarefa</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Tarefa"
                    fullWidth
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={dialogHandler}>Cancelar</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}