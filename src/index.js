import takeScreenshot from "./puppeteer.js";
import areImagesTheSame from "./imageComparison.js"
import {uploadImage, deleteImage} from "./cloudinary.js";
import { updateImageInFirestore, getImageFromFirestore } from "./firebase.js";

export const runProcess = async () => {
    const image1 = 'full_calendar2.png';
    let image2;

    try {
        image2 = await takeScreenshot();
    } catch (error) {
        console.error('Error taking screenshot:', error.message);
        // Future implementation: Send an email with error.message and additional details
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
            
            if(oldImageData && oldImageData.publicId) {
                await deleteImage(oldImageData.publicId);
                console.log('Old image deleted from Cloudinary.');
            }

            console.log('Process completed.');

        } else {
            console.log('Images are the same.');
        }
    } catch (error) {
        console.error('Error during image comparison:', error.message);
    }
};