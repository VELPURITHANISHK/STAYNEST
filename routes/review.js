const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing");
const ExpressError=require("../utils/Expresserros.js");
const Wrapasync=require("../utils/Wrapasync.js");
const Review=require("../models/reviews");
const {isLoggedIn,validaeReview,isReviewAuthor,validateReview2} = require("../middleware.js");
const ReviewController=require("../controllers/reviews.js");



//Reviews
router.post("/",isLoggedIn,validateReview2,validaeReview,Wrapasync(ReviewController.createReview));

//Delete Review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,Wrapasync(ReviewController.destroyReview));

module.exports=router;