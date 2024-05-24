import React, { useContext, useMemo } from 'react';
import { responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider, Backdrop, useTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid } from 'react-loader-spinner';
import { useWeb3ModalTheme } from '@web3modal/wagmi/react';

import { DataContext } from './utils/ContextAPI';
import { createCustomTheme } from './utils/createCustomTheme';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import { useAppSelector } from './utils/store/hooks';

const App = () => {
    const { loader } = useContext(DataContext);
    const mode = useAppSelector((state) => state.theme.mode);
    const { setThemeMode } = useWeb3ModalTheme();

    const theme = useTheme();

    const themeClient = useMemo(() => {
        setThemeMode(mode);
        let theme = createCustomTheme(mode);
        theme = responsiveFontSizes(theme);
        return theme;
    }, [mode, setThemeMode]);

    return (
        <>
            <ThemeProvider theme={themeClient}>
                <CssBaseline enableColorScheme />
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={mode}
                />
                <Header />
                <Backdrop
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={loader}
                >
                    <Grid
                        visible={true}
                        height="80"
                        width="80"
                        color={`${theme.palette.mode === 'dark' ? '#000' : '#fff'}`}
                        ariaLabel="grid-loading"
                        radius="12.5"
                        wrapperStyle={{}}
                        wrapperClass="grid-wrapper"
                    />
                </Backdrop>
                <Home />
                <Footer />
            </ThemeProvider>
        </>
    );
};

export default App;
