const express = require("express");
const router = express.Router({ mergeParams : true });
const wrapAsync = require("../Utils/wrapAsync.js");
const expressError = require("../Utils/expressError.js");
const Listing = require("../models/listings.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
 

//Reviews
//Post Review route 
router.post("/", validateReview,isLoggedIn, wrapAsync(async (req,res) =>{
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created");
    res.redirect(`/listings/${listing.id}`);
}));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(async (req,res) =>{
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;