import * as React from "react";
import { Rating, Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

/*
    Adapted from Material UI Documentation Examples
*/

// This component is used to display a rating as a series of stars.
export default function RatingDisplay(value) {
  return (
    <Box
      sx={{
        width: 100,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="rating-display"
        value={value.value}
        precision={0.125}
        readOnly
        emptyIcon={<StarIcon style={{ opacity: 0.35 }} fontSize="inherit" />}
      />
    </Box>
  );
}
