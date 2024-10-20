const mongoose = require("mongoose");
const dbUrl = process.env.ATLASDB_URL;

module.exports  = async function connection() {
    await mongoose.connect(dbUrl);
  }