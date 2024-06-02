// LoginForm.js

import React, { useState, useEffect, useContext } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const LoginForm = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  // Necessary for re-rendering of button after initial app load.
  useEffect(() => {
    window.google.accounts.id.renderButton(
      document.getElementById("googleLoginBtn"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, [divRef.current]);

  const handleLogin = () => {
    console.log("Logging in with: ", username);
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  const responseGoogleTrue = (response) => {};
  const responseGooglefalse = (response) => {};

  return (
    <Paper
      sx={{ maxWidth: 400, margin: "auto", marginTop: "5rem", padding: 2 }}
      elevation={3}
    >
      <form noValidate autoComplete="off">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <h2>Login</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClear}>
              Clear
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div id="googleLoginBtn"></div>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoginForm;
