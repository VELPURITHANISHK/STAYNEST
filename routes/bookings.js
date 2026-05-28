const express = require("express");
const router = express.Router({ mergeParams: true });
const flash = require("connect-flash");
const Listing = require("../models/listing");
const ExpressError=require("../utils/Expresserros.js");
const Wrapasync=require("../utils/Wrapasync.js");
const Review=require("../models/reviews");
const {isLoggedIn,validaeReview,isReviewAuthor} = require("../middleware.js");
const BookingController=require("../controllers/bookings.js");



router.post("/",isLoggedIn,BookingController.bookBookings);

// myBookings

router.get("/mybookings",isLoggedIn, BookingController.myBookings);

// cancelmyBookings
router.delete("/:id",isLoggedIn,BookingController.cancelBooking);

//owner bookings
router.get("/owner/bookings", isLoggedIn, BookingController.ownerBookings);




module.exports=router;