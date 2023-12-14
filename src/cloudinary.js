
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const uploadImage = async (image) => {
    return await cloudinary.uploader.upload(image, {folder: 'HuntersHeraldHelper'});
}

export default uploadImage;