import { getImageFromFirestore, updateImageInFirestore } from './firebase.js';
import { uploadImage, deleteImage } from './cloudinary.js';
import { sendEmail } from './emailHandler.js';
import { successEmailSubject, successEmailContent } from './constants.js';


const updateSendCleanup = async ({image2}) => {
    console.log('Images are different, uploading new image.');

    const oldImageData = await getImageFromFirestore();
    const {publicId, imageUrl} = await uploadImage(image2);
    console.log('New image uploaded to Cloudinary.');
    await updateImageInFirestore(publicId, imageUrl);
    console.log('New image updated in Firestore.');

    await sendEmail(process.env.CLIENT_EMAIL,successEmailSubject, successEmailContent, image2);
    console.log('Email sent.');
    
    if(oldImageData && oldImageData.publicId) {
        await deleteImage(oldImageData.publicId);
        console.log('Old image deleted from Cloudinary.');
    }

    console.log('Process completed.');
}

export default updateSendCleanup;