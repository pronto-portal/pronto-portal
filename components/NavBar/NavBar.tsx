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
  SxProps,
  Theme,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { IconLabel } from "../IconLabel/IconLabel";
import LogoutIcon from "@mui/icons-material/Logout";
import ShopIcon from "@mui/icons-material/Shop";
import router, { useRouter } from "next/router";

const navItems = [
  {
    name: "home",
    icon: <HomeIcon />,
    to: "/",
  },
];

interface NavBarProps {
  sx?: SxProps<Theme>;
}

export const NavBar: React.FC<NavBarProps> = ({ sx }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  if (!session) return null;

  return (
    <Box
      sx={{
        color: "primary.main",
        width: "100%",
        position: "static",
        borderRadius: 0,
        backgroundColor: "#fff",
      }}
      //backgroundColor="primary.dark"
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
        flexGrow={1}
        padding={1}
      >
        <Typography variant="h4" color="inherit">
          PRONTO
        </Typography>
        <Stack
          direction="row"
          flexWrap="nowrap"
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
        >
          {navItems.map((item) => (
            <Button
              key={item.name}
              onClick={() => {
                router.push(item.to);
              }}
            >
              <Typography>{item.icon}</Typography>
            </Button>
          ))}
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
              <MenuItem>
                <IconLabel
                  text="Profile"
                  icon={<AccountCircle />}
                  onClick={() => {
                    router.push("/profile");
                  }}
                />
              </MenuItem>
              <MenuItem>
                <IconLabel
                  text="Subscriptions"
                  icon={<ShopIcon />}
                  onClick={() => {
                    router.push("/subscribe/manage");
                    handleCloseUserMenu();
                  }}
                />
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <IconLabel
                  text="Sign Out"
                  onClick={() => signOut()}
                  icon={<LogoutIcon />}
                />
              </MenuItem>
            </Menu>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
