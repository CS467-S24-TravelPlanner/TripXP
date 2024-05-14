import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
  Box,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LoginAvatarMenu() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  if (user) {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open ">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.name} src={user.picture} />
          </IconButton>
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
          <MenuItem
            key="profile"
            onClick={() => {
              navigate("/profile");
            }}
          >
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem
            key="logout"
            onClick={() => {
              setUser(false);
              navigate("/");
            }}
          >
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 0 }}>
        <Button
          id="loginRedirBtn"
          onClick={() => navigate("/login")}
          sx={{ color: "white", display: "block" }}
        >
          Login
        </Button>
      </Box>
    );
  }
}
