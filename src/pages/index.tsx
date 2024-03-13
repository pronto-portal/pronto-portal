import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GrassIcon from '@mui/icons-material/Grass';
import InsightsIcon from '@mui/icons-material/Insights';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PeopleIcon from '@mui/icons-material/People';
import SmsIcon from '@mui/icons-material/Sms';
import { Box, Button, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FeatureCard } from '../components/FeatureCard/index';
import { Footer } from '../components/Footer/index';
import { IconBoxDescription } from '../components/IconBoxDescription';

const InfoRow = styled(motion.div)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '100px',
    width: '100%',
    minHeight: '100vh',
    scrollSnapAlign: 'start',
});

InfoRow.defaultProps = {
    ...InfoRow.defaultProps,
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { duration: 2 },
};

export default function Home() {
    return (
        <Stack
            direction='column'
            sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                alignItems: 'start',
                overflowY: 'scroll',
                scrollSnapType: 'y mandatory',
            }}
            spacing={2}
        >
            <Stack
                direction='column'
                width='100%'
                minHeight='100vh'
                alignItems='center'
                sx={{
                    scrollSnapAlign: 'start',
                }}
                spacing={10}
            >
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        width: '100%',
                        height: '60%',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'url(/images/geometricBackground.webp)',
                            backgroundSize: 'cover',
                            zIndex: -1,
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                mixBlendMode: 'multiply',
                            },
                        }}
                    />
                    <Typography variant='h1' color={'white'} sx={{ textShadow: '2px 2px 8px rgba(0,0,0,1.2)' }}>
                        Pronto Portal
                    </Typography>
                    <Typography variant='h4' sx={{ textAlign: 'center', maxWidth: '600px', color: 'white', textShadow: '2px 2px 8px rgba(0,0,0,1.2)' }}>
                        Manage your network and stay organized with automated notifications.
                    </Typography>
                    <Button variant='contained' component={Link} href='/login' sx={{ margin: 4, padding: 3, textShadow: '2px 2px 8px rgba(0,0,0,0.4)' }}>
                        <Typography variant='h5' color={'white'}>
                            Get Started
                        </Typography>
                    </Button>
                </Box>
                <Stack sx={{ height: '40%' }} alignItems='start' justifyContent='center' direction={{ xs: 'column', sm: 'column', md: 'row' }} spacing={10}>
                    <FeatureCard IconComponent={CalendarMonthIcon} title='Stay Organized' />
                    <FeatureCard IconComponent={PeopleIcon} title='Track Employee Assignments' />
                    <FeatureCard IconComponent={NotificationsActiveIcon} title='Automated Notifications' />
                </Stack>
            </Stack>

            <InfoRow
                sx={{
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    padding: 0,
                    paddingTop: 5,
                }}
            >
                <Divider sx={{ width: '75%', backgroundColor: 'primary.main' }} />
                <Typography variant='h5' sx={{ textAlign: 'center', width: '75%', color: 'primary.main' }}>
                    Welcome to Pronto Portal, the innovative platform transforming the way translation services are managed and delivered. At Pronto Portal, we
                    believe in the power of communication, and our mission is to streamline the coordination of translation assignments, ensuring seamless
                    experiences for both translators and clients.
                </Typography>
                <Divider sx={{ width: '75%', backgroundColor: 'primary.main' }} />
            </InfoRow>

            <InfoRow>
                <Box width='50%'>
                    <IconBoxDescription
                        title='Customizable Communication at Its Best'
                        description=''
                        IconComponent={<SmsIcon sx={{ fontSize: 100 }} />}
                        orientation='left'
                    />
                </Box>
                <Typography variant='h5' textAlign='right' width='50%' color='primary.main' pr={1}>
                    Understanding the importance of timely communication, Pronto Portal introduces customizable automated SMS reminders. These reminders
                    are&apos; not just notifications; they are tailored messages sent at strategic intervals before the assignment, ensuring that both
                    translators and claimants are well-informed and prepared. This feature eliminates confusion and fosters punctuality, enhancing the overall
                    service quality.
                </Typography>
            </InfoRow>

            <InfoRow>
                <Typography variant='h5' textAlign='left' width='50%' color='primary.main' pl={1}>
                    As your trusted partner, Pronto Portal goes beyond mere assignment management. Our analytical dashboards evolve with your business, offering
                    you valuable insights into your operational dynamics. Track your performance, understand your growth, and make informed decisions with
                    data-driven stats that reflect your business&apos;s health and progress.
                </Typography>
                <Box width='50%'>
                    <IconBoxDescription
                        title='Insightful Analytics for Strategic Decisions'
                        IconComponent={<InsightsIcon sx={{ fontSize: 100 }} />}
                        orientation='right'
                    />
                </Box>
            </InfoRow>

            <Stack sx={{ scrollSnapAlign: 'start' }} direction='column' justifyContent='space-between'>
                <InfoRow
                    sx={{
                        scrollSnapAlign: 'none',
                    }}
                >
                    <Box width='50%'>
                        <IconBoxDescription
                            title='Your Partner in Professional Growth'
                            IconComponent={<GrassIcon sx={{ fontSize: 100 }} />}
                            orientation='left'
                        />
                    </Box>
                    <Typography variant='h5' textAlign='right' width='50%' color='primary.main' pr={1}>
                        Pronto Portal is more than just a software. It&apos;s a testament to your brand&apos;s commitment to excellence in translation services.
                        By choosing Pronto Portal, you&apos;re not just optimizing your operations; you&apos;re elevating your brand&apos;s professionalism and
                        reliability in the eyes of your clients and translators alike.
                    </Typography>
                </InfoRow>
                <Footer />
            </Stack>
        </Stack>
    );
}
