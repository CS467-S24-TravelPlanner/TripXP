import React, { useState } from "react";
import "./Experience.css";
import dummyData from "../dummy/dummyData.js"; // Import dummy data
import ReviewForm from "../ReviewForm/ReviewForm"; // Import ReviewForm component

const Experience = () => {
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
      {dummyData.map((experience) => (
        <div key={experience.id} className="experience">
          <h2>{experience.title}</h2>
          <p>{experience.description}</p>
          <p>{experience.location}</p>
          <img
            src={experience.imageUrl}
            alt={experience.title}
            className="experience-image"
          />

          <div className="ratings-section">
            <p>Rating: {experience.averageRating}</p>
            {/* Display detailed reviews */}
            <ul>
              {experience.reviews.map((review) => (
                <li key={review.id}>
                  <p>
                    <strong>{review.username}</strong>: {review.reviewText}
                  </p>
                  <p>Rating: {review.rating}</p>
                </li>
              ))}
            </ul>
          </div>

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
      ))}
    </div>
  );
};

export default Experience;
