import React, { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BarChart from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import ShopIcon from '@mui/icons-material/Shop';
import { Typography, Box, Stack, Button, Menu, MenuItem, Tooltip, Avatar, SxProps, Theme } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetUserQuery } from '../../redux/reducers';
import signOut from '../../utils/signOut';
import { IconLabel } from '../IconLabel/IconLabel';

interface NavBarProps {
    sx?: SxProps<Theme>;
}

const sxTabStyling = {
    '&:hover': {
        color: 'primary.main',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: 'primary.main',
        fontWeight: 'typography.fontWeightMedium',
    },
    '&.Mui-focusVisible': {
        backgroundColor: 'primary.main',
    },
};

export const NavBar: React.FC<NavBarProps> = ({ sx }) => {
    const { data, isError } = useGetUserQuery({});
    const user = data?.getUser;
    const router = useRouter();

    const path = typeof window !== 'undefined' ? window.location.pathname.replaceAll('/', '') : '';

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    if (!user || isError) return null;

    return (
        <Box
            sx={{
                color: 'primary.main',
                width: '100%',
                position: 'static',
                borderRadius: 0,
                backgroundColor: '#fff',
                borderBottom: 1,
                borderColor: 'divider',
            }}
        >
            <Stack direction='row' justifyContent='space-between' alignItems='center' flexWrap='nowrap' flexGrow={1} padding={0}>
                <Stack direction='row' flexWrap='nowrap' spacing={1} alignItems='center' justifyContent='flex-start' height='100%' padding={0}>
                    <Typography variant='h4' color='inherit' paddingLeft={1} fontWeight={100}>
                        PRONTO
                    </Typography>
                    {user.isProfileComplete ? (
                        <Tabs value={path.toLowerCase()} sx={{ height: '100%', padding: 0 }}>
                            <Tab label='Translators' value='' LinkComponent={Link} href='/' sx={sxTabStyling} />
                            <Tab label='Assignments' value='assignments' LinkComponent={Link} href='/assignments' sx={sxTabStyling} />
                            <Tab label='Claimants' value='claimants' LinkComponent={Link} href='/claimants' sx={sxTabStyling} />
                            <Tab icon={<BarChart />} value='analytics' LinkComponent={Link} href='/analytics' sx={sxTabStyling} />
                        </Tabs>
                    ) : null}
                </Stack>
                <Stack direction='row' flexWrap='nowrap' spacing={1} alignItems='center' justifyContent='flex-start'>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title='Open settings'>
                            <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user.firstName || 'User'} src={user.profilePic || ''} />
                            </Button>
                        </Tooltip>

                        {user.isProfileComplete ? (
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    LinkComponent={Link}
                                    href='/profile'
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        router.push('/profile');
                                    }}
                                >
                                    <IconLabel text='Profile' icon={<AccountCircle />} />
                                </MenuItem>
                                <MenuItem
                                    LinkComponent={Link}
                                    href='/subscribe/manage'
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        router.push('/subscribe/manage');
                                    }}
                                >
                                    <IconLabel text='Subscriptions' icon={<ShopIcon />} />
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <IconLabel
                                        text='Sign Out'
                                        onClick={() => {
                                            signOut();
                                        }}
                                        icon={<LogoutIcon />}
                                    />
                                </MenuItem>
                            </Menu>
                        ) : null}
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};
