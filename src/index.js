import takeScreenshot from "./puppeteer.js";
import areImagesTheSame from "./imageComparison.js"
import {uploadImage, deleteImage} from "./cloudinary.js";
import { updateImageInFirestore, getImageFromFirestore } from "./firebase.js";
import { downloadImage } from "./downloadImage.js";
import { sendEmail } from "./emailHandler.js";
import dotenv from 'dotenv';
dotenv.config();

export const runProcess = async () => {
    
    const {url} = await getImageFromFirestore();

    await downloadImage(url, './base-image.png');

    const image1 = 'base-image.png';
    let image2;
    
    try {
        image2 = await takeScreenshot();
    } catch (error) {
        console.error('Error taking screenshot:', error.message);
        await sendEmail(process.env.HUNTER_HERALD_EMAIL,'Error while taking screenshot!', error.message, null);
        console.log('Email sent.');
        return; // Exit the function cause no image.
    }

    try {
        const imagesAreTheSame = await areImagesTheSame(image1, image2);

        if (!imagesAreTheSame) {
            console.log('Images are different, uploading new image.');

            const oldImageData = await getImageFromFirestore();
            const {publicId, imageUrl} = await uploadImage(image2);
            console.log('New image uploaded to Cloudinary.');
            await updateImageInFirestore(publicId, imageUrl);
            console.log('New image updated in Firestore.');

            await sendEmail(process.env.CLIENT_EMAIL,'Calendar Updated!', 'The calendar has been updated! Check it out here: https://myodfw.com/reserve-your-hunt', image2);
            console.log('Email sent.');
            
            if(oldImageData && oldImageData.publicId) {
                await deleteImage(oldImageData.publicId);
                console.log('Old image deleted from Cloudinary.');
            }

            console.log('Process completed.');

        } else {
            console.log('Images are the same.');
        }
    } catch (error) {
        if (error.message === 'Image sizes do not match.') {
            const oldImageData = await getImageFromFirestore();
            const {publicId, imageUrl} = await uploadImage(image2);
            console.log('New image uploaded to Cloudinary.');
            await updateImageInFirestore(publicId, imageUrl);
            console.log('New image updated in Firestore.');
            await sendEmail(process.env.CLIENT_EMAIL,'Calendar Updated!', 'The calendar has been updated! Check it out here: https://myodfw.com/reserve-your-hunt', image2);
            console.log('Email sent.');
            
            if(oldImageData && oldImageData.publicId) {
                await deleteImage(oldImageData.publicId);
                console.log('Old image deleted from Cloudinary.');
            }

            console.log('Process completed.');
        } else {
            console.error('Error during image comparison:', error.message);
            await sendEmail(process.env.HUNTER_HERALD_EMAIL,'Error during image comparison:', error.message, null);
        }
    }
};