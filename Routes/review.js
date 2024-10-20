const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isReviewAuthor, isLoggedIn} = require("../middlewares.js")
const {handlePostReview ,handleDeleteReview } = require("../controllers/review.js")

//Reviews post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(handlePostReview)
);

// Delete Reviews Route
router.delete(
  "/:reviewId",
  isLoggedIn, 
  isReviewAuthor,
  wrapAsync(handleDeleteReview)
);

module.exports = router;
