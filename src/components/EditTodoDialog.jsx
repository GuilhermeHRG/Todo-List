import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField } from '@mui/material';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function EditTodoDialog({ open, dialogHandler, todo, editTodo }) {
    const [editedText, setEditedText] = React.useState(todo.text);

    React.useEffect(() => {
        setEditedText(todo.text);
    }, [todo]);

    const textHandler = () => {
        editTodo(todo.id, editedText);
        dialogHandler();
    };

    return (
        <Dialog fullWidth open={open} TransitionComponent={Transition} keepMounted onClose={dialogHandler}>
            <DialogTitle>Editar Tarefa</DialogTitle>
            <DialogContent>
                <TextField fullWidth value={editedText} onChange={(e) => setEditedText(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={dialogHandler}>Cancelar</Button>
                <Button onClick={textHandler}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}
