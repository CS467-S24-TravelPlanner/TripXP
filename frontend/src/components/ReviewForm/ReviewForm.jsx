import React, { useState } from "react";
import "./ReviewForm.css";
import { Rating, Box, FormControl, TextField, Button, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const ReviewForm = ({ onSubmit, onCancel }) => {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ review_text: reviewText, rating: rating }); // Pass review data
    setUsername(""); // Clear form data after submit
    setRating(0);
    setReviewText("");
  };

  return (
    <Box className="review-form"
    component="form"
    alignItems="stretch"
    display="block"
    noValidate
    autoComplete="off"
    margin={3}
    padding={2}
    border={"1px solid #364958"}
    onSubmit={handleSubmit}>

      <Typography variant="h4" gutterBottom >
        Write a Review
      </Typography>

        <FormControl sx={{m:3}}>
          <Stack direction="row"  sx={{alignContent: "center"}}>
            <Typography variant="h6"  sx={{paddingRight:2}}>Rating: </Typography>
          <Rating
            name="rating"
            value={rating}
            precision={1}
            emptyIcon={
              <StarIcon style={{ opacity: 0.35 }} fontSize="inherit" />
            }
            onChange={(e) => setRating(parseInt(e.target.value))}
          />
          </Stack>
        </FormControl>

        <FormControl fullWidth={true} variant="filled" display="inline">
          <TextField
            id="reviewText"
            label="Review Text"
            type="text"
            onChange={(e) => setReviewText(e.target.value)}
            value={reviewText}
            multiline
            rows={4}
          />
          </FormControl>

            <Stack direction="row" m={3}>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            backgroundColor: "#364958",
            color: "white",
            borderRadius: "7px",
          }}
        >
          Submit Review
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          sx={{
            backgroundColor: "#364958",
            color: "white",
            borderRadius: "7px",
          }}
        >
          Cancel
        </Button>
        </Stack>
    </Box>
  );
};

export default ReviewForm;
