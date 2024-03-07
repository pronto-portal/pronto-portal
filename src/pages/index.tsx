import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FeatureCard } from '../components/FeatureCard/index';
import { Footer } from '../components/Footer/index';

export default function Home() {
    return (
        <Stack
            direction='column'
            sx={{
                width: '100%',
                minHeight: '100vh',
                position: 'relative',
                alignItems: 'center',
                pt: '500px',
            }}
        >
            <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: '500px', zIndex: -1 }}>
                <Image src='/images/busyCity.png' alt='background' fill style={{ objectFit: 'cover' }} priority />
            </Box>
            <Box sx={{ position: 'absolute', top: 100, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant='h1' color={'white'} sx={{ textShadow: '2px 2px 8px rgba(0,0,0,1.2)' }}>
                    Pronto Portal
                </Typography>
                <Typography variant='h5' sx={{ textAlign: 'center', maxWidth: '600px', color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,1)' }}>
                    Manage your network and stay organized with automated notifications.
                </Typography>
                <Button variant='contained' component={Link} href='/login' sx={{ margin: 4, padding: 3, textShadow: '2px 2px 8px rgba(0,0,0,0.4)' }}>
                    <Typography variant='h5' color={'white'}>
                        Get Started
                    </Typography>
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px',
                    gap: '100px',
                    flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                }}
            >
                <FeatureCard IconComponent={CalendarMonthIcon} title='Stay Organized' />
                <FeatureCard IconComponent={PeopleIcon} title='Track assignments' />
                <FeatureCard IconComponent={NotificationsActiveIcon} title='Automated Notifications' />
            </Box>
            <Footer />
        </Stack>
    );
}
