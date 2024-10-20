const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares.js");
const {
  handleIndex,
  handleNewListing,
  handleCreateListing,
  handleEditListing,
  handleUpdateListing,
  handleDeleteListing,
  handleShowListing,
  handlefiltertrending
} = require("../controllers/listing.js");
const multer = require("multer"); //file parser
const { storage } = require("../cloudConfig.js"); //cloud storage
const upload = multer({ storage }); //path of storage

//index route
router.get("/", wrapAsync(handleIndex));

//new route
router.get("/new", isLoggedIn, handleNewListing);

//create route
router.post("/", isLoggedIn,  upload.single("listing[image]"), wrapAsync(handleCreateListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(handleEditListing));

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
   upload.single("listing[image]"),
  validateListing,
  wrapAsync(handleUpdateListing)
);

//delete route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(handleDeleteListing));

//show route
router.get("/:id", wrapAsync(handleShowListing));

router.get("/filter/trending", handlefiltertrending)


module.exports = router;
///cookies
// res.cookie("Made-In" , "India" ,{signed : true});
//  res.cookie("color", "Red")
// console.dir(req.signedCookies);
// console.dir(req.cookies);
