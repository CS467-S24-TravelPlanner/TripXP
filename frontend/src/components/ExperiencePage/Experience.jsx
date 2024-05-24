import React, { useState, useEffect } from "react";
import "./Experience.css";
import dummyData from "../dummy/dummyData.js"; // Import dummy data
import ReviewForm from "../ReviewForm/ReviewForm"; // Import ReviewForm component
import RatingDisplay from "../RatingDisplay.jsx";
import { createReview, getReviews } from "../../utilities/ReviewHandler.jsx";
import ReviewList from "../ReviewList.jsx";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const Experience = ({ experience, closeExperience }) => {
  const [showReviewForm, setShowReviewForm] = useState({
    /* Object to store form visibility for each experience */
  });

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

    setShowReviewForm({ ...showReviewForm, [experienceId]: false }); // Close form after submit
  };

  const handleReviewCancel = (experienceId) => {
    setShowReviewForm({ ...showReviewForm, [experienceId]: false });
  };

  return (
    <div>
    <div className="experiences">
      <button onClick={closeExperience} style={{width: "100px", height: "65px", margin: "5px"}}>Close Experience</button>

      <div key={experience.id} className="experience">
        <h2>{experience.title}</h2>
        <p>{experience.description}</p>
        <p>{experience.location}</p>
        <img
          src={apiUrl + "/uploads/?fileName=" + experience.image_url}
          alt={experience.title}
          className="experience-image"
        />

        <h4 className="ratings-section">
          Rating:
          <RatingDisplay value={experience.rating} />
        </h4>

        <button
          className="write-review-btn"
          onClick={() => handleWriteReviewClick(experience.id)}
        >
          Write a Review
        </button>
        <button className="add-to-trip-btn">Add to Trip</button>

        {showReviewForm[experience.id] && ( // Conditionally render ReviewForm for specific experience
          <ReviewForm
            onSubmit={(reviewData) =>
              handleReviewSubmit(reviewData, experience.id)
            }
            onCancel={() => handleReviewCancel(experience.id)}
          />
        )}
      </div>
    </div>
    <ReviewList reviews={reviews} />
    </div>
  );
};

export default Experience;
