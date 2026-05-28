const Listing = require("../models/listing");
const Booking = require("../models/bookings");
const axios=require("axios");

module.exports.showBooking=async(req,res)=>
{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing)
    {
        req.flash("error","Listing unavailable. Please check and try again !");
        return res.redirect("/listing");
    }
    res.render("bookings/showbooking.ejs",{ listing });

};


module.exports.bookBookings = async (req, res) => {
  try {
    const { listingId, checkin, checkout, guests } = req.body;

if (!checkin || !checkout || !guests) {
    req.flash("error","Please select dates and guests");

    return res.redirect(`/listing/${listingId}/booking`);
}

        const checkInDate = new Date(checkin);
        const checkOutDate = new Date(checkout);

    if (checkInDate >= checkOutDate) {
      req.flash("error","Checkout date must be after checkin date");
  return res.redirect(`/listing/${listingId}/booking`);
    }

    // Check overlap
    const existingBooking = await Booking.findOne({
      listingId,

      checkin: {
        $lt: checkOutDate
      },

      checkout: {
        $gt: checkInDate
      }
    });

    if (existingBooking) {
      req.flash("error","Selected dates already booked. Please choose another date!");

     return res.redirect(`/listing/${listingId}/booking`);
    }

    // Get listing
    const listing = await Listing.findById(listingId);

    if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listing");
    }

    // Calculate days
    const days = Math.ceil(
      (checkOutDate - checkInDate) /
      (1000 * 60 * 60 * 24)
    );

    const subtotal = listing.price * days;
    const gst = Math.round(subtotal * 0.18);
    const totalprice = subtotal + gst;

const newBooking = new Booking({
  listingId,

   user: req.user._id,
  title: listing.title,
  image: listing.image,
  price: listing.price,

  location: listing.location,
  country: listing.country,

  checkin: checkInDate,
  checkout: checkOutDate,
  guests,
  days,
  totalprice
});

    await newBooking.save();

    req.flash("success","Booking created successfully");

    res.redirect("/booking/mybookings");

  } catch (err) {
    console.log(err);

    req.flash("error","Booking failed");

    res.redirect("/listing");
  }
};


module.exports.myBookings=async(req,res)=>{
    const bookings = await Booking.find({user: req.user._id});

    res.render("bookings/mybooking.ejs", { bookings });

};
module.exports.cancelBooking = async (req, res) => {

    const { id } = req.params;

    await Booking.findByIdAndDelete(id);

    req.flash("success","Booking cancelled");

    res.redirect("/booking/mybookings");

};


module.exports.ownerBookings = async (req, res) => {

    if (!req.user) {
        req.flash("error", "Please login first!");
        return res.redirect("/login");
    }

    // find listings created by owner
    const ownerListings = await Listing.find({ owner: req.user._id });

    // get all listing ids
    const listingIds = ownerListings.map(listing => listing._id);

    // find bookings for those listings
   const bookings = await Booking.find({
    listingId: { $in: listingIds }
})
    .populate("user")
    .populate("listingId");

//     console.log(ownerListings);
// console.log(listingIds);
// console.log(bookings);
    
   res.render("mylistings/listingdetails.ejs", {bookings,page:"totalbookings"});

};