import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Typography, Grid, IconButton } from '@mui/material';
import Link from 'next/link';

export const Footer: React.FC = () => {
    return (
        <footer style={{ width: '100%' }}>
            <Box
                sx={{
                    backgroundColor: '#D3D3D3',
                    color: 'white',
                    padding: 3,
                    textAlign: 'center',
                    width: '100%',
                    marginTop: 6,
                }}
            >
                <Grid container spacing={3} justifyContent='center'>
                    <Grid item xs={12} sm={4}>
                        <Typography mb={'10px'} variant='body1'>
                            Useful Links:
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '& p': {
                                    color: 'white',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                },
                            }}
                        >
                            <Link href='/'>
                                <Typography color={'white'}>About Us</Typography>
                            </Link>
                            <Link href='/privacyPolicy'>
                                <Typography color={'white'}>Privacy Policy</Typography>
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography mb={'10px'} variant='body1'>
                            Follow Us:
                        </Typography>
                        <Box>
                            <IconButton color='inherit' href='https://facebook.com'>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color='inherit' href='https://twitter.com'>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton color='inherit' href='https://instagram.com'>
                                <InstagramIcon />
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                <Typography sx={{ mt: 2 }}>© {new Date().getFullYear()} Cipher Codex LLC. All rights reserved.</Typography>
            </Box>
        </footer>
    );
};
