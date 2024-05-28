import React, { useState, useEffect } from "react";
import "./Experience.css";
import dummyData from "../dummy/dummyData.js"; // Import dummy data
import ReviewForm from "../ReviewForm/ReviewForm"; // Import ReviewForm component
import RatingDisplay from "../RatingDisplay.jsx";
import { createReview, getReviews } from "../../utilities/ReviewHandler.jsx";
import ReviewList from "../ReviewList.jsx";
import {
  Paper,
  Stack,
  Button,
  Typography
} from "@mui/material";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Experience = ({ experience, closeExperience }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);

  useEffect(
    () =>
      async function fetchReviews() {
        if (!reviewsLoaded) {
          getReviews({ experience_id: experience.id }).then((results) => {
            console.log(results.data)
            const reviewList = []
            for (let i = 0; i < results.data.length; i++) {
              reviewList.push(results.data[i]);
            }
            setReviews(reviewList);
            setReviewsLoaded(true);
          });
        }
      },
    [reviewsLoaded]
  );

  const handleWriteReviewClick = (experienceId) => {
    setShowReviewForm({
      ...showReviewForm,
      [experienceId]: !showReviewForm[experienceId],
    });
  };

  const handleReviewSubmit = (reviewData, experienceId) => {
    // Handle submitted review data (e.g., update experience data)

    if (reviewData && Object.keys(reviewData).length) {
      const userId = 0; // TODO: Get actual User ID from login info

      const reviewText = reviewData.review_text;
      const rating = reviewData.rating;

      createReview(experienceId, userId, reviewText, rating);

      setReviewsLoaded(false);
    }

    setShowReviewForm(false); // Close form after submit
  };

  const handleReviewCancel = () => {
    setShowReviewForm(false);
  };

  return (
    <Paper sx={{ textAlign: "center", marginTop: "40px" }}>
      <Stack className="experiences" sx={{alignItems: "center", m:2}}>
      <Button onClick={closeExperience} sx={{width: "100px", height: "65px", margin: "5px"}}>Close Experience</Button>

        <Typography variant="h3">{experience.title}</Typography>
        <Typography variant="h5" sx={{marginBottom:2}}>{experience.location}</Typography>
        <Typography variant="cite" sx={{marginBottom:2}}>{experience.description}</Typography>
        
        <img
          src={apiUrl + "/uploads/?fileName=" + experience.image_url}
          alt={experience.title}
          className="experience-image"
        />

        <h4 className="ratings-section">
          Average Rating:
          <RatingDisplay value={experience.rating} />
        </h4>

          <Button
          type="button"
          variant="outlined"
          onClick={() => handleWriteReviewClick(experience.id)}
          sx={{
            backgroundColor: "#364958",
            color: "white",
            borderRadius: "7px",
            margin: "5px",
          }}
        >
          Write a Review
        </Button>
        {/* <button className="add-to-trip-btn">Add to Trip</button> */}

        {showReviewForm && ( // Conditionally render ReviewForm for specific experience
          <ReviewForm
            onSubmit={(reviewData) =>
              handleReviewSubmit(reviewData, experience.id)
            }
            onCancel={() => handleReviewCancel(experience.id)}
          />
        )}
    <ReviewList reviews={reviews} />
    </Stack>
    </Paper>
  );
};

export default Experience;
