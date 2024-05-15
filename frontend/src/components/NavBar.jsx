import * as React from "react";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
import LoginAvatarMenu from "./LoginAvatarMenu";
import { useNavigate, Link } from "react-router-dom";

const pages = [
  { linkName: "Experiences", url: "/experiences" },
  { linkName: "New Trip", url: "/trip/add" },
  { linkName: "My Trips", url: "/profile" },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const handleLinkClick = (event) => {
    console.log(event.target.id);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src={"./logo.png"} width={80} height={56} />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                id={i}
                key={page.linkName}
                onClick={() => navigate(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.linkName}
              </Button>
            ))}
          </Box>
          <LoginAvatarMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
