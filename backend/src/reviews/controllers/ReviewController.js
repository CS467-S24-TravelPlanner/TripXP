import {
    findReview,
    createReview as _createReview,
    updateReview as _updateReview,
    deleteReview as _deleteReview,
    findAllReviews,
  } from "./../../common/models/Review.js";
  
  // -----*** CREATE ***------
  
  // Create a new Review
  export function createReview(req, res) {
    const { body: payload } = req;
  
    // Return Error if no Payload provided
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, can't create the review.",
        },
      });
    }
  
    // Returns a 200 status and Success message upon successful creation
    _createReview(payload)
      .then(() => {
        return res.status(200).json({
          status: true,
          data: "Successfully created new review.",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  // -----*** READ ***------
  
  // Return all Reviews in DB matching given parameters. If no parameters are given,
  // all reviews are returned. If no Reviews match given parameters, data is empty.
  export function getAllReviews(req, res) {
    findAllReviews(req.query)
      .then((reviews) => {
        return res.status(200).json({
          status: true,
          data: reviews,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  // Get Review by ID - This may not be needed
  export function getReview(req, res) {
    const { body: payload } = req;
  
    findReview(payload.id)
      .then((review) => {
        return res.status(200).json({
          status: true,
          data: review.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  // -----*** UPDATE ***------
  
  // Update an existing Review
  export function updateReview(req, res) {
    const { body: payload } = req;
  
    const reviewId = payload.id;
  
    // If the payload does not have any keys,
    // Return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, can't update the review.",
        },
      });
    }
  
    // Returns a 200 status and Success message upon successful update
    _updateReview({ id: reviewId }, payload)
      // .then(() => {
      //   return findReview(reviewId);
      // })
      .then(() => {
        return res.status(200).json({
          status: true,
          data: "Successfully updated Review.",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  // -----*** DELETE ***------
  
  // Delete exitisting Review
  export function deleteReview(req, res) {
    const reviewId = req.query.id;
  
    // Returns a 200 status and number of deleted reviews upon succes
    _deleteReview({ id: reviewId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfReviewsDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  }
  
  //export default ReviewController;
  