// LoginForm.js

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";

const REACT_APP_CLIENT_ID ="Add API CLIENT KEY HERE OR IN .ENV file";
const LoginForm = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: REACT_APP_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client auth2", start);
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { username, password });
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  const responseGoogleTrue = (response) => {
    console.log("Login:" + response);
  };
  const responseGooglefalse = (response) => {
    console.log("Login:" + response);
  };

  return (
    <Paper
      sx={{ maxWidth: 400, margin: "auto", marginTop: 4, padding: 2 }}
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
            <GoogleLogin
              clientId={REACT_APP_CLIENT_ID}
              onSuccess={responseGoogleTrue}
              onFailure={responseGooglefalse}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoginForm;
