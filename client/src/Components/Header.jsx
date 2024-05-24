import React, { useState } from 'react';
import { Container, Hidden, Box, IconButton, Drawer, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';
import { changeTheme } from '@/utils/store/features/themeSlice';

const Header = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);

    const [state, setState] = useState(false);

    const theme = useTheme();

    const toggleDrawer = () => {
        setState((prev) => (prev === true ? false : true));
    };

    return (
        <>
            <Box bgcolor="background.paper">
                <Container>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        py={2}
                    >
                        <Box>LOGO</Box>
                        <Hidden mdDown>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                }}
                            >
                                <IconButton onClick={() => dispatch(changeTheme())}>
                                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                                </IconButton>
                                <w3m-button />
                            </Box>
                        </Hidden>
                        <Hidden mdUp>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 2,
                                }}
                            >
                                <IconButton onClick={() => dispatch(changeTheme())}>
                                    {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                                </IconButton>
                                <IconButton onClick={() => toggleDrawer()}>
                                    <MenuIcon
                                        style={{
                                            fontSize: '28px',
                                        }}
                                    />
                                </IconButton>
                            </Box>
                            <Drawer anchor="right" open={state} onClose={() => toggleDrawer()}>
                                <Box
                                    sx={{
                                        background: `${theme.palette.background.medium}`,
                                        width: 300,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 5,
                                        pt: 8,
                                        px: 2,
                                    }}
                                    role="presentation"
                                >
                                    <Box>LOGO</Box>
                                    <w3m-button />
                                </Box>
                            </Drawer>
                        </Hidden>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Header;
