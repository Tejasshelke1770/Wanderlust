const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({    //credientials 
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({   //storage setup on cloud
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormat: ["png", "jpg", 'jpeg'], // supports promises as well
    },
  });

  module.exports = {
    cloudinary, storage
  }


  //this code is used from multer-storage-cloudinary library