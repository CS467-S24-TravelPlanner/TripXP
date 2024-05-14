import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper } from "@mui/material";
import { GoogleLogin } from "react-google-login";

const clientId =
  "370617990760-0a454d3po46q4jkntns96pnov7ngfqev.apps.googleusercontent.com";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", { username, password });
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
  };

  const onSuccess = (res) => {
    console.log("login success:", res.profileObj);
  };
  const onFail = (res) => {
    console.log("login Fail:", res);
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
        </Grid>
      </form>
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFail}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
    </Paper>
  );
};

export default LoginForm;
