import React, { useState } from "react";
import {
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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { IconLabel } from "../IconLabel/IconLabel";
import LogoutIcon from "@mui/icons-material/Logout";
import ShopIcon from "@mui/icons-material/Shop";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BarChart from "@mui/icons-material/BarChart";
import Link from "next/link";

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

const sxTabStyling = {
  "&:hover": {
    color: "primary.main",
    opacity: 1,
  },
  "&.Mui-selected": {
    color: "primary.main",
    fontWeight: "typography.fontWeightMedium",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "primary.main",
  },
};

export const NavBar: React.FC<NavBarProps> = ({ sx }) => {
  const { data: session } = useSession();
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replaceAll("/", "")
      : "";

  console.log(path);
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
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="nowrap"
        flexGrow={1}
        padding={0}
      >
        <Stack
          direction="row"
          flexWrap="nowrap"
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
          height="100%"
          padding={0}
        >
          <Typography variant="h4" color="inherit" paddingLeft={1}>
            PRONTO
          </Typography>
          <Tabs value={path.toLowerCase()} sx={{ height: "100%", padding: 0 }}>
            <Tab
              label="Translators"
              value="translators"
              LinkComponent={Link}
              href="/translators"
              sx={sxTabStyling}
            />
            <Tab
              label="Assignments"
              value="assignments"
              LinkComponent={Link}
              href="/assignments"
              sx={sxTabStyling}
            />
            <Tab
              label="Claimants"
              value="claimants"
              LinkComponent={Link}
              href="/claimants"
              sx={sxTabStyling}
            />
            <Tab
              icon={<BarChart />}
              value="analytics"
              LinkComponent={Link}
              href="/analytics"
              sx={sxTabStyling}
            />
          </Tabs>
        </Stack>
        <Stack
          direction="row"
          flexWrap="nowrap"
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
        >
          {navItems.map((item) => (
            <Button key={item.name} LinkComponent={Link} href={item.to}>
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
              <MenuItem LinkComponent={Link} href="/profile">
                <IconLabel text="Profile" icon={<AccountCircle />} />
              </MenuItem>
              <MenuItem LinkComponent={Link} href="/subscribe/manage">
                <IconLabel
                  text="Subscriptions"
                  icon={<ShopIcon />}
                  onClick={() => {
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
