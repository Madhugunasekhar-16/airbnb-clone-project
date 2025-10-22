const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  image: {
    filename: { type: String, default: "listingimage" },
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1676269228970-69e8ec086fda?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0",
      set: v => v ? v : "https://images.unsplash.com/photo-1676269228970-69e8ec086fda?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0"
    }
  },
  price: { type: Number, default: 0 },
  location: { type: String, default: "" },
  country: { type: String, default: "" },
  reviews : [{
    type : Schema.Types.ObjectId,
    ref : "Review",
  },
],
});

listingSchema.post("findOneAndDelete", async (listing) =>{
  if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; 