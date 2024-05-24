import { createTheme } from '@mui/material/styles';

const themeObj = {
    light: {
        text: {
            primary: '#000',
        },
        background: {
            default: '#fff',
            paper: '#D3D3D3',
            input: '#D3D3D3',
        },
    },
    dark: {
        text: {
            primary: '#fff',
        },
        background: {
            default: '#000',
            paper: '#151515',
            input: '#000',
        },
    },
};

export const createCustomTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...themeObj[mode],
        },
        typography: {
            fontFamily: ['"Poppins"', 'sans-serif'].join(','),
            h1: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '4rem',
            },
            h2: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '4rem',
            },
            h3: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '3rem',
            },
            h4: {
                fontFamily: '"Poppins", sans-serif',
                fontSize: '1.125rem',
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: (theme) => `
		    body {
		      background-color: ${theme.palette.mode === 'dark' ? '#131213' : '#fdfdfd'}
		    }
		  `,
            },
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'contained' },
                        style: {
                            background: 'linear-gradient(97.01deg, #6C7DEB 8.16%, #50A6ED 103.71%)',
                            boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.3)',
                            color: '#fff',
                            fontFamily: '"Poppins", sans-serif',
                            fontStyle: 'normal',
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0.045em',
                            '&:hover': {
                                background:
                                    'linear-gradient(97.01deg, #50A6ED 8.16%, #6C7DEB 103.71%)',
                            },
                        },
                    },
                ],
            },
            MuiPaper: {
                variants: [
                    {
                        props: { variant: 'outlined' },
                        style: (theme) => ({
                            boxShadow: `0px 0px 10px 0px ${theme.theme.palette.mode === 'dark' ? '#000' : '#D3D3D3'}`,
                            background: 'transparent',
                            border: 'none',
                            borderRadius: '7px',
                        }),
                    },
                ],
            },
        },
    });
