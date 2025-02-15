const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "upload",
    format: async (req, res) => "png",
    public_id: (req, file) => file.originalname.split(".")[0] + "",
    // This line takes the original file name (before the dot .) and uses it as the Cloudinary file name.
    // Example:
    // If you upload "myphoto.jpg", Cloudinary will store it as "myphoto.png".
  },
});

const cloudinaryFileUploder = multer({ storage: storage });

module.exports = {
  cloudinaryFileUploder,
};
