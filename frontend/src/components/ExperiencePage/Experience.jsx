import React, { useState, useEffect, useContext } from "react";
import "./Experience.css";
import ReviewForm from "../ReviewForm/ReviewForm"; // Import ReviewForm component
import RatingDisplay from "../RatingDisplay.jsx";
import { getReviews } from "../../utilities/ReviewHandler.jsx";
import ReviewList from "../ReviewList.jsx";
import { Paper, Stack, Button, Typography } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Experience = ({ experience, closeExperience }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (reviewsLoading) {
      fetchReviews();
    }
  }, [reviewsLoading]);

  const fetchReviews = async () => {
    getReviews({ experience_id: experience.id }).then((results) => {
      setReviews(results.data);
      setReviewsLoading(false);
    });
  };

  return (
    <Paper sx={{ textAlign: "center", marginTop: "40px" }}>
      <Stack className="experiences" sx={{ alignItems: "center", m: 2 }}>
        <Button
          onClick={closeExperience}
          sx={{ width: "100px", height: "65px", margin: "5px" }}
        >
          Close Experience
        </Button>

        <Typography variant="h3">{experience.title}</Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {experience.location}
        </Typography>
        <Typography variant="cite" sx={{ marginBottom: 2 }}>
          {experience.description}
        </Typography>

        <img
          src={apiUrl + "/uploads/?fileName=" + experience.image_url}
          alt={experience.title}
          className="experience-image"
        />

        <h4 className="ratings-section">
          Average Rating:
          <RatingDisplay value={experience.rating} />
        </h4>

        {user && (
          <Button
            type="button"
            variant="outlined"
            onClick={() => setShowReviewForm(!showReviewForm)}
            sx={{
              backgroundColor: "#364958",
              color: "white",
              borderRadius: "7px",
              margin: "5px",
            }}
          >
            Write a Review
          </Button>
        )}

        {showReviewForm && (
          <ReviewForm
            experienceId={experience.id}
            closeReviewForm={() => setShowReviewForm(!showReviewForm)}
            reloadReviews={() => setReviewsLoading(true)}
          />
        )}
        <ReviewList reviews={reviews} />
      </Stack>
    </Paper>
  );
};

export default Experience;
