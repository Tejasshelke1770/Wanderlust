const mongoose = require("mongoose");
const Review = require("./review.js")
const User = require("./user.js")

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
   url : String,
   filename : String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Review"
    }
  ],
  owner :{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  },
  coordinates : {
    lat : Number,
    lon : Number,
  }
});

//Post mongoose middleware for handling deletion
listingSchema.post('findOneAndDelete' , async (listing)=>{
  if(listing){
    await Review.deleteMany({_id : {$in : listing.reviews} })
    console.log(`All Reviews are deleted of ${listing.title} `)
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;






