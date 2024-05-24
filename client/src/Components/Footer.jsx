import React from 'react';
import { Box, Button, Container, InputBase, Stack, Typography, useTheme } from '@mui/material';

import { Facebook, Twitter, Telegram, YouTube } from '@mui/icons-material';
export default function Footer() {
    const theme = useTheme();
    return (
        <>
            <Box bgcolor="background.paper">
                <Container maxWidth="sm">
                    <Stack py={{ xs: 2, md: 5 }} direction="column" gap={2}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: { xs: '20px', md: '26px' },
                            }}
                        >
                            Don&apos;t miss out, Stay updated
                        </Box>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            bgcolor="background.medium"
                            borderRadius="20px"
                            boxShadow={`0px 0px 5px 0px ${theme.palette.background.shadow}`}
                            p={1}
                        >
                            <InputBase
                                placeholder="Enter your email"
                                sx={{ width: '100%', px: 2 }}
                            />
                            <Button
                                variant="gradient"
                                sx={{
                                    alignSelf: 'right',
                                    px: 5,
                                    borderRadius: '13px',
                                }}
                            >
                                SUBSCRIBE
                            </Button>
                        </Stack>
                        <Typography
                            sx={{
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '14px',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            Don’t hesitate to subscribe to latest news about ICo markets as well as
                            crucial financial knowledge to become successful investors globally
                        </Typography>
                        <Stack direction="row" gap={2} justifyContent="center">
                            <Facebook />
                            <Twitter />
                            <Telegram />
                            <YouTube />
                        </Stack>
                    </Stack>
                </Container>
                <Box
                    py={1}
                    textAlign="center"
                    fontSize="12px"
                    borderTop={`1px solid ${theme.palette.background.borderLight}}`}
                >
                    © 2022. All rights reserved by Avitex
                </Box>
            </Box>
        </>
    );
}
