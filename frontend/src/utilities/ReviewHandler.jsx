import { postData, getData, patchData, deleteData } from "./ApiService.jsx";
import { updateRating, getExperience } from "./ExperienceHandler.jsx";

/**
 * createReview adds a new Review to the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} experienceId The ID of the Experience being Reviewed.
 * @param {number} userId - the User ID of the creator of the new Review.
 * @param {string} reviewText - The Text of the new Review.
 * @param {number} rating - The rating of the new Review.
 */
function createReview(experienceId, userId, reviewText, rating) {
  const newReview = {
    experience_id: experienceId,
    user_id: userId,
    review_text: reviewText,
    rating: rating,
  };

  console.log(newReview);

  getExperience(experienceId).then((res) => {
    let currentRating = res.data.rating;
    updateRating(experienceId, currentRating, rating);
    return postData("/review", {}, newReview);
  })
  
}

/**
 * getReviews returns Reviews matching the search parameters from the Database.
 * The return value is the response from the server in JSON format.
 * @param {JSON} searchParams - The optional search parameters for desired Review(s).
 */
function getReviews(searchParams = {}) {
  return getData("/review", searchParams);
}

// Not sure if we will need the Edit and Delete functions for Reviews, but I'll leave
// them here for now.

/**
 * editReview modifies an existing Review in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the Review being modified.
 * @param {JSON} newData - The key/value pairs being modified.
 */
function editReview(id, newData = {}) {
  const idObj = { id: id };
  const oldReview = getReviews(idObj);

  const newReview = Object.keys(newData).length
    ? { ...idObj, ...newData }
    : oldReview;

  return patchData("/review", newReview);
}

/**
 * deleteReview removes an existing Review in the Database.
 * The return value is the response from the server in JSON format.
 * @param {number} id - The ID of the Review being deleted.
 */
function deleteReview(id) {
  return deleteData("/review", { id: id });
}

export { createReview, editReview, getReviews, deleteReview };
