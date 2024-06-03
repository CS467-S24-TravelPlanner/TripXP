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
  const [experienceImage, setExperienceImage] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (reviewsLoading) {
      fetchReviews();
    }
  }, [reviewsLoading]);

  useEffect(() => {
    if (experience.image_url) {
      fetchImage();
    }
  }, []);

  useEffect(() => {
    console.log(experienceImage);
  }, [experienceImage]);

  const fetchImage = async () => {
    try {
      const res = await fetch(
        apiUrl + "/uploads/?fileName=" + experience.image_url
      );
      if (!res.ok) {
        throw new Error("Error fetching image");
      }
      setExperienceImage(URL.createObjectURL(await res.blob()));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const fetchReviews = async () => {
    getReviews({ experience_id: experience.id }).then((results) => {
      setReviews(results.data);
      setReviewsLoading(false);
    });
  };

  return (
    <Paper sx={{ textAlign: "center", marginTop: "4rem", padding: "2rem" }}>
      <Stack className="experiences" sx={{ alignItems: "center", m: 2 }}>
        <Stack
          direction="row-reverse"
          sx={{ width: "100%", alignItems: "flex-end", mb: "3rem" }}
        >
          <Button onClick={closeExperience} variant="outlined" sx={{}}>
            Return to Experience List ↩
          </Button>
        </Stack>

        <Typography variant="h3">{experience.title}</Typography>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          {experience.location}
        </Typography>
        <Typography variant="cite" sx={{ marginBottom: 2, width: "90%" }}>
          {experience.description}
        </Typography>

        {experienceImage && (
          <img
            src={experienceImage}
            alt={experience.title}
            className="experience-image"
          />
        )}

        <h4 className="ratings-section">
          Average Rating:
          <RatingDisplay value={experience.rating} />
        </h4>

        {user && !showReviewForm && (
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
        <ReviewList reviews={reviews} reviewsLoading={reviewsLoading} />
      </Stack>
    </Paper>
  );
};

export default Experience;
