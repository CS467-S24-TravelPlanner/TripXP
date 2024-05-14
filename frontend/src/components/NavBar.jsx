import * as React from "react";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
import LoginAvatarMenu from "./LoginAvatarMenu";

const pages = ["Experiences", "Page 1", "Page 2"];

function ResponsiveAppBar() {
  const handleLinkClick = (event) => {
    console.log(event.target.id);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={"./logo.png"} width={80} height={56} />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, i) => (
              <Button
                id={i}
                key={page}
                onClick={handleLinkClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
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
