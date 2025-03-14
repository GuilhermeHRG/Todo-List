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
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh', // Ocupa toda a altura da tela
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)', // Gradiente moderno
                padding: { xs: '1em', sm: '2em' }, // Padding responsivo
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fundo semi-transparente
                    color: 'black',
                    padding: { xs: '1.5em', sm: '2.5em' }, // Padding responsivo
                    borderRadius: '12px', // Bordas arredondadas
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // Sombra suave
                }}
            >
                {/* Título */}
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '1.75rem', sm: '2.25rem' }, // Tamanho da fonte responsivo
                        fontWeight: 'bold',
                        color: 'black',
                        mb: 3, // Margem inferior
                    }}
                >
                    Faça login para continuar
                </Typography>

                {/* Botão de Login com Google */}
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        onClick={handleLogin}
                        size="large"
                        sx={{
                            backgroundColor: '#4285F4', // Cor do Google
                            color: 'white',
                            '&:hover': { backgroundColor: '#357ABD' }, // Efeito hover
                            fontSize: { xs: '0.875rem', sm: '1rem' }, // Tamanho da fonte responsivo
                            padding: { xs: '10px 20px', sm: '12px 24px' }, // Padding responsivo
                            borderRadius: '8px', // Bordas arredondadas
                            textTransform: 'none', // Remove uppercase
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Sombra suave
                            width: { xs: '100%', sm: 'auto' }, // Largura total em telas pequenas
                        }}
                    >
                        Entrar com Google
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Auth;