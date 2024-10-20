const Listing = require("../models/listing.js");
const axios = require("axios");

module.exports.handleIndex = async (req, res) => {
  const allListing = await Listing.find({}); // res.locals.success = req.flash("success")  used here
  res.render("index.ejs", { allListing });
};

module.exports.handleNewListing = (req, res) => {
  res.render("new.ejs");
};

module.exports.handleCreateListing = async (req, res) => {
  let apiurl = `https://nominatim.openstreetmap.org/search?q=${req.body.listing.location}&format=json`;
  let response = await axios.get(apiurl);
  let { lat, lon } = response.data[0];

  const newList = new Listing(req.body.listing);
  newList.owner = req.user._id;
  let url = req.file.path;
  let filename = req.file.fileneme;
  newList.image = { url, filename };
  newList.coordinates = { lat, lon };
  await newList.save();
  req.flash("success", "New Listing Created Successfully!"); //declared here
  res.redirect("/listing");
};

module.exports.handleEditListing = async (req, res) => {
  let { id } = req.params;
  const list = await Listing.findById(id);
  if (!list) {
    req.flash("error", "Listing you requested does not exist!");
    res.redirect("/listing");
  }
  let ogImage = list.image.url;
  ogImage = ogImage.replace("/upload", "/upload/w_250");
  res.render("edit.ejs", { id, list, ogImage });
};

module.exports.handleUpdateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.fileneme;
    listing.image = { url, filename };
    await listing.save();
  }
  console.log("successfully Updated!");
  req.flash("success", " Listing Updated Successfully!");
  res.redirect(`/listing/${id}`);
};

module.exports.handleDeleteListing = async (req, res) => {
  const deleteListing = await Listing.findByIdAndDelete(req.params.id);
  console.log(`${deleteListing.title} Listing deleted`);
  req.flash("success", " Listing Deleted Successfully!");
  res.redirect("/listing");
};

module.exports.handleShowListing = async (req, res) => {
  let { id } = req.params;
  let hotel = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!hotel) {
    req.flash("error", "Listing you requested does not exists!");
    res.redirect("/listing");
  }
  // let lon = hotel.coordinates.lon;
  // let lat = hotel.coordinates.lat;
console.log(hotel)
  res.render("show.ejs", { hotel });
};

module.exports.handlefiltertrending = async(req,res)=>{
  let trendingListings = await Listing.find({type : "Trending"})
  res.send(trendingListings)
}
