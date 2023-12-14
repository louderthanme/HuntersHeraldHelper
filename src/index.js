import takeScreenshot from "./puppeteer.js";
import areImagesTheSame from "./imageComparison.js"
import uploadImage from "./cloudinary.js";

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

        if (imagesAreTheSame) {
            console.log('Images are the same.');
        } else {
            console.log('Images are different, uploading new image. Sending email');
            uploadImage(image2);
        }
    } catch (error) {
        console.error('Error during image comparison:', error.message);
        // Future implementation: Send an email with error.message and additional details
    }
};
