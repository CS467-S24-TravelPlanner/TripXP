import * as React from "react";
import { AppBar, Box, Toolbar, Container, Button } from "@mui/material";
import LoginAvatarMenu from "./LoginAvatarMenu";
import { useNavigate, Link } from "react-router-dom";
import "../navbar.css";

const pages = [
  { linkName: "Find Experiences", url: "/" },
  { linkName: "New Experience", url: "/experience/add" },
  { linkName: "New Trip", url: "/trip/add" },
  { linkName: "My Trips", url: "/profile" },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        height: "5rem",
        backgroundColor: "#90B494",
      }}
    >
      <Container>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/" style={{ display: "block" }}>
            <Box
              component="img"
              src="/logo.png"
              sx={{
                display: "block",
                height: "5rem",
                "&:hover": { cursor: "pointer" },
              }}
            />
          </Link>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {pages.map((page, i) => (
              <Button
                id={i}
                key={page.linkName}
                onClick={() => navigate(page.url)}
                sx={{
                  my: 2,
                  mr: 5,
                  color: "#364958",
                  display: "block",
                  position: "relative",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                className="navButton"
              >
                {page.linkName}
              </Button>
            ))}
          </Box>
          <Box>
            <LoginAvatarMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
