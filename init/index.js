const mongoose = require("mongoose")
const {data} = require("./data.js")
const Listing = require("../models/listing.js")

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async() =>{
   await Listing.deleteMany({});
  let newdata = data.map((obj) =>({
    ...obj,
    owner : '667f1fdd397fda34b3d760f3'
  }))
   await Listing.insertMany(newdata)
   console.log("Data was initialized")
}

initDb();