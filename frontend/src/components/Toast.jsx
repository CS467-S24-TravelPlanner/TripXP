import * as React from "react";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";

export default function Toast({ show, severity, message }) {
  const [state, setState] = useState({
    show: false,
    severity: "",
    message: "",
  });
  const toastPostion = { vertical: "bottom", horizontal: "right" };

  useEffect(() => {
    setState({ show, severity, message });
  }, [show, severity, message]);

  const handleClose = () => {
    setState({ show: false, severity: "", message: "" });
  };

  return (
    <Snackbar
      open={state.show}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={toastPostion}
    >
      <Alert
        onClose={handleClose}
        severity={state.severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
