// LoginForm.js

import React, { useState } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { GoogleLogin } from "react-google-login";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
    console.log("Logging in with:", { username, password });
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Handle the response from Google login here
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
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LoginForm;
