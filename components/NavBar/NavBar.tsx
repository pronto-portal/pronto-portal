import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { IconLabel } from "../IconLabel/IconLabel";
import LogoutIcon from "@mui/icons-material/Logout";

const navItems = [
  {
    name: "home",
    icon: <HomeIcon />,
    to: "/",
  },
  {
    name: "network",
    icon: <PeopleIcon />,
    to: "/",
  },
];

export const NavBar: React.FC = () => {
  const { data: session } = useSession();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  if (!session) return null;

  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
          flexGrow={1}
        >
          <Stack
            direction="row"
            flexWrap="nowrap"
            spacing={1}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Typography variant="h4">PRONTO</Typography>
            {navItems.map((item) => (
              <Button key={item.name}>
                <Typography>{item.icon}</Typography>
              </Button>
            ))}
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <Button onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={session?.user?.name || ""}
                  src={session?.user?.image || ""}
                />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <IconLabel
                  text="Sign Out"
                  onClick={() => signOut()}
                  icon={<LogoutIcon />}
                />
              </MenuItem>
              <MenuItem>
                <IconLabel
                  text="Profile"
                  icon={<AccountCircle />}
                  to="/profile"
                />
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
