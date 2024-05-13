import React, { useState } from "react";
import "./Experience.css";
import dummyData from "../dummy/dummyData.js"; // Import dummy data
import ReviewForm from "../ReviewForm/ReviewForm"; // Import ReviewForm component
import RatingDisplay from "../RatingDisplay.jsx";

const Experience = ({ experience, closeExperience }) => {
  const [showReviewForm, setShowReviewForm] = useState({
    /* Object to store form visibility for each experience */
  });

  const handleWriteReviewClick = (experienceId) => {
    setShowReviewForm({
      ...showReviewForm,
      [experienceId]: !showReviewForm[experienceId],
    });
  };

  const handleReviewSubmit = (reviewData, experienceId) => {
    // Handle submitted review data (e.g., update experience data)
    console.log("Submitted review:", reviewData);
    setShowReviewForm({ ...showReviewForm, [experienceId]: false }); // Close form after submit
  };

  const handleReviewCancel = (experienceId) => {
    setShowReviewForm({ ...showReviewForm, [experienceId]: false });
  };


  return (
    <div className="experiences">

      <button onClick={closeExperience}>Back to Experience Search</button>
      
        <div key={experience.id} className="experience">
          
          <h2>{experience.title}</h2>
          <p>{experience.description}</p>
          <p>{experience.location}</p>
          <img
            src={experience.image_url}
            alt={experience.title}
            className="experience-image"
          />

          <h4 className="ratings-section">
                Rating: 
              <RatingDisplay value={experience.rating} />

            {/* Display detailed reviews */}
            {/* <ul>
              {experience.reviews.map((review) => (
                <li key={review.id}>
                  <p>
                    <strong>{review.username}</strong>: {review.reviewText}
                  </p>
                  <p>Rating: {review.rating}</p>
                </li>
              ))}
            </ul> */}
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
  );
};

export default Experience;
