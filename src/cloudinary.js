
import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  export const uploadImage = async (image) => {
    try {
        const result = await cloudinary.uploader.upload(image, { folder: 'HuntersHeraldHelper' });
        const imageUrl = result.url;
        const publicId = result.public_id;
        return { imageUrl, publicId };
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.message);
        throw error;
    }
}

export const deleteImage = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    }
    catch (error) {
        console.log('Error deleting image from Cloudinary:', error.message);	
        throw error;
    }
}

