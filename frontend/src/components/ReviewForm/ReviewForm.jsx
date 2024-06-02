import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import "./ReviewForm.css";
import {
  Rating,
  Box,
  FormControl,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { createReview } from "../../utilities/ReviewHandler";
import { useSnackbar } from "../../contexts/SnackbarContext";

const ReviewForm = ({ experienceId, closeReviewForm, reloadReviews }) => {
  const showSnackbar = useSnackbar();
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      try {
        const res = await createReview(
          experienceId,
          user.user_id,
          reviewText,
          rating
        );
        if (res.status) {
          showSnackbar("Review submitted successfully!", "success");
        } else {
          showSnackbar("Server error submitting review.", "error");
          console.error(res.error);
        }
      } catch (error) {
        showSnackbar("Error submitting review.", "error");
        console.error("Error submitting review:", error);
      }
    } else {
      showSnackbar("Please log in to submit a review.", "error");
    }
    closeReviewForm();
    reloadReviews();
  };

  return (
    <Box
      className="review-form"
      component="form"
      alignItems="stretch"
      display="block"
      noValidate
      autoComplete="off"
      margin={3}
      padding={2}
      border={"1px solid #364958"}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4" gutterBottom>
        Write a Review
      </Typography>

      <FormControl sx={{ m: 3 }}>
        <Stack direction="row" sx={{ alignContent: "center" }}>
          <Typography variant="h6" sx={{ paddingRight: 2 }}>
            Rating:{" "}
          </Typography>
          <Rating
            name="rating"
            value={rating}
            precision={1}
            emptyIcon={
              <StarIcon style={{ opacity: 0.35 }} fontSize="inherit" />
            }
            onChange={(e, newValue) => setRating(newValue)}
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

      <Stack direction="row-reverse" mt={3} useFlexGap sx={{ gap: ".5rem" }}>
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
          onClick={closeReviewForm}
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
