const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const Wrapasync=require("../utils/Wrapasync.js");
const flash = require("connect-flash");
const {isLoggedIn, isOwner,validaeListing} = require("../middleware.js");
const ListingController=require("../controllers/listing.js");
const BookingController=require("../controllers/bookings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

//Index Route,Create Route
router.route("/")
.get(Wrapasync(ListingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validaeListing,Wrapasync(ListingController.createListing));

//New Route
router.get("/new",isLoggedIn,ListingController.rendernewform);


//mylistings(owner created listings)
router.get("/mylistings",isLoggedIn,Wrapasync(ListingController.myListings));

// Booking Route
router.get("/:id/booking",isLoggedIn,Wrapasync(BookingController.showBooking));

//Show Route,Update Route,Delete Route
router.route("/:id")
.get(Wrapasync(ListingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validaeListing,Wrapasync(ListingController.updateListing))
.delete(isLoggedIn,isOwner, Wrapasync(ListingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,Wrapasync(ListingController.editListing));





module.exports=router;



/* //Index Route
router.get("/",Wrapasync(ListingController.index)); */


/* //New Route
router.get("/new",isLoggedIn,ListingController.rendernewform); */


/* 
//Show Route
router.get("/:id",Wrapasync(ListingController.showListing)); */


/* //Create Route
router.post("/",isLoggedIn,validaeListing,Wrapasync(ListingController.createListing)); */

/* 
//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,Wrapasync(ListingController.editListing)); */

/* 
//Update Route
router.put("/:id",isLoggedIn,isOwner,validaeListing,Wrapasync(ListingController.updateListing)); */
/* 

//Delete Route
router.delete("/:id",isLoggedIn,isOwner, Wrapasync(ListingController.destroyListing)); */
