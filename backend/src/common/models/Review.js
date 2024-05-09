import { Model } from "sequelize";

export class Review extends Model {
  otherPublicField;
}

// -----*** CREATE ***------

// Create new Review
export function createReview(review) {
  return Review.create(review);
}

// -----*** READ ***------

// Return all existing Reviews matching given query parameters
export function findAllReviews(query) {
  return Review.findAll({
    where: query,
  });
}

// Find a specific Review by ID - May not be needed
export function findReview(reviewId) {
  return Review.findByPk(reviewId);
}

// -----*** UPDATE ***------

// Update an existing Review
export function updateReview(query, updatedReview) {
  return Review.update(updatedReview, {
    where: query,
  });
}

// -----*** DELETE ***------

// Delete an existing Review
export function deleteReview(query) {
  return Review.destroy({
    where: query,
  });
}

export default Review;
