import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import emailjs from "emailjs-com";
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
} from "../Constants";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError(true);
      return;
    }

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID, // Use environment variable
        EMAILJS_TEMPLATE_ID, // Use environment variable
        templateParams,
        EMAILJS_PUBLIC_KEY // Use environment variable
      );

      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Failed to send email:", err);
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={() => setSuccess(false)}
        >
          <Alert
            onClose={() => setSuccess(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Message sent successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={error}
          autoHideDuration={6000}
          onClose={() => setError(false)}
        >
          <Alert
            onClose={() => setError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            There was an error sending your message. Please try again.
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
