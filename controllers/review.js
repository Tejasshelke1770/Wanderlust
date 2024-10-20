const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


module.exports.handlePostReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log("new review saved!");
    req.flash("success", "New Review Added Successfully!")
    res.redirect(`/listing/${req.params.id}`);
  }


  module.exports.handleDeleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    console.log("review is deleted");
    req.flash("success", " Review Deleted Successfully!")
    res.redirect(`/listing/${id}`);
  }