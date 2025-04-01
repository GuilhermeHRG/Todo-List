import React from 'react';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { Button, Typography, Container, Box, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; 


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
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: { xs: '1em', sm: '2em' },
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 75% 30%, rgba(255,255,255,0.1) 0%, transparent 40%)',
                    pointerEvents: 'none'
                }
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    color: 'black',
                    padding: { xs: '2em', sm: '3em' },
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transform: 'translateY(0)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)'
                    }
                }}
            >
                {/* Logo/Icon placeholder */}
                <Box sx={{ mb: 3 }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 60,
                            height: 60,
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            borderRadius: '50%',
                            mb: 2
                        }}
                    >
                        <AccountCircleIcon sx={{ fontSize: 40, color: '#667eea' }} />
                    </Box>
                </Box>
    
                {/* Title */}
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontSize: { xs: '1.75rem', sm: '2.125rem' },
                        fontWeight: 700,
                        color: '#2d3748',
                        mb: 2,
                        lineHeight: 1.3
                    }}
                >
                    Bem-Vindo
                </Typography>
                
                {/* Subtitle */}
                <Typography
                    variant="body1"
                    sx={{
                        color: '#718096',
                        mb: 4,
                        fontSize: { xs: '0.95rem', sm: '1rem' }
                    }}
                >
                    Faça login para continuar
                </Typography>
    
                {/* Google Login Button */}
                <Box sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        onClick={handleLogin}
                        size="large"
                        sx={{
                            backgroundColor: '#fff',
                            color: '#5f6368',
                            '&:hover': { 
                                backgroundColor: '#f7f7f7',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                            },
                            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                            padding: { xs: '12px 20px', sm: '14px 28px' },
                            borderRadius: '10px',
                            textTransform: 'none',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                            width: { xs: '100%', sm: 'auto' },
                            minWidth: 240,
                            border: '1px solid #e0e0e0',
                            transition: 'all 0.3s ease',
                            fontWeight: 500
                        }}
                    >
                        Continue with Google
                    </Button>
                </Box>
                
                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', my: 3 }}>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Divider sx={{ flexGrow: 1 }} />
                </Box>
                
                
                
                {/* Footer */}
                <Typography variant="body2" sx={{ mt: 4, color: '#a0aec0', fontSize: '0.75rem' }}>
                    Ao continuar, você Aceita os Termos e Políticas de Privacidade
                </Typography>
            </Container>
        </Box>
    );
}

export default Auth;