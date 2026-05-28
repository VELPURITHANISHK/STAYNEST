const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({

  listingId: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  image: {
    url: String,
    filename: String
  },

  price: {
    type: Number,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  country: {
    type: String,
    required: true
  },

  checkin: {
    type: Date,
    required: true
  },

  checkout: {
    type: Date,
    required: true
  },

  guests:{
      type:Number,
    required:true
  },

  days: {
    type: Number,
    required: true
  },

  totalprice: {
    type: Number,
    required: true
  }

});

module.exports = mongoose.model("Booking", bookingSchema);