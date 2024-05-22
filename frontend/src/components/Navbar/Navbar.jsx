import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./Navbar.css";
import loginImg from "../../assets/user.png";

import LOGO from "../../assets/icons8-airplane-emoji/LOGO.png";
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className="full-nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className="logo-img" src={LOGO} alt="" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TravelPlanner
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <Typography
                    textAlign="center"
                    className="collaplse-menu-list"
                    component="a"
                    href="/ProfilePage"
                  >
                    Profile Page
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign="center"
                    className="collaplse-menu-list"
                    component="a"
                    href="/ExperienceSearch"
                  >
                    Experience Search
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign="center"
                    className="collaplse-menu-list"
                    component="a"
                    href="/TripPage"
                  >
                    Trip Page
                  </Typography>
                </MenuItem>
                <MenuItem>
                  <Typography
                    textAlign="center"
                    className="collaplse-menu-list"
                    component="a"
                    href="/contactUs"
                  >
                    Need Help?
                  </Typography>
                </MenuItem>
              </Menu>
            }
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TravelPlanner
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <a href="/ProfilePage" className="collaplse-menu-list">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                {"Profile Page"}
              </Button>
            </a>
            <a href="/ExperienceSearch" className="collaplse-menu-list">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                {"Experience Search"}
              </Button>
            </a>
            <a href="/TripPage" className="collaplse-menu-list">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                {"Trip Page"}
              </Button>
            </a>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={loginImg} />
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
              <MenuItem>
                <Typography
                  textAlign="center"
                  component="a"
                  className="collaplse-menu-list"
                  href="/"
                >
                  {"Dashboard"}
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  textAlign="center"
                  component="a"
                  className="collaplse-menu-list"
                  href="/ExperienceSearch"
                >
                  {"ExperienceSearch"}
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  textAlign="center"
                  className="collaplse-menu-list"
                  component="a"
                  href="/login"
                >
                  {"Login/Logout"}
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  textAlign="center"
                  className="collaplse-menu-list"
                  component="a"
                  href="/contactUs"
                >
                  Need Help?
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
