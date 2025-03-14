import React from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { Button, Typography, Container, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function Auth({ setUser }) {
    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user); // Atualiza o estado do usuário
        } catch (error) {
            console.error("Erro ao fazer login: ", error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Faça login para continuar
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    onClick={handleLogin}
                    size="large"
                >
                    Entrar com Google
                </Button>
            </Box>
        </Container>
    );
}

export default Auth;