import React, { useState } from "react";
import "./ReviewForm.css";
const ReviewForm = ({ onSubmit, onCancel }) => {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username, rating, reviewText }); // Pass review data
    setUsername(""); // Clear form data after submit
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="review-form">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="0"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label htmlFor="reviewText">Review Text:</label>
        <textarea
          id="reviewText"
          name="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />

        <button type="submit">Submit Review</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
