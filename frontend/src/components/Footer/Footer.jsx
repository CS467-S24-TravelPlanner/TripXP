// Footer.js

import React from "react";
import { Box, Typography, Link } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
      className="footer-component"
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body1" align="center">
        © 2024 TravelPlanner All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {" by "}
        <Link color="inherit" href="/">
          TravelPlanners@teams
        </Link>
        <br />

        {" Need Help? "}
        <Link color="inherit" href="/contactUs">
          ContactUs
        </Link>
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;
