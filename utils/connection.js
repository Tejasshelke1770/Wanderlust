const mongoose = require("mongoose");
// const dbUrl = process.env.ATLASDB_URL;

module.exports  = async function connection() {
    await mongoose.connect('mongodb+srv://tejasshelke:JQUMaU2OvzL1xcGu@cluster0.pew6f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  }