import { createTheme } from '@mui/material/styles';
export const appTheme  = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    // Estilo base para todos os Typography
                    fontFamily: "'Roboto', sans-serif",
                },
                // Personalização por variant
                h6: {
                    fontWeight: 600,
                    color: '#333',
                },
                body1: {
                    color: 'rgba(228, 8, 8, 0.87)',
                    fontSize: '1.05rem',
                },
                body2: {
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '0.875rem',
                },
                // Personalização para cores específicas
                colorPrimary: {
                    color: '#1976d2', // Cor primária do tema
                },
                colorSecondary: {
                    color: '#9c27b0', // Cor secundária do tema
                },
                colorError: {
                    color: '#f44336',
                },
                colorSuccess: {
                    color: '#4caf50',
                },
                colorWarning: {
                    color: '#ff9800',
                },
                colorInfo: {
                    color: '#2196f3',
                },
            },
        },
    },
});