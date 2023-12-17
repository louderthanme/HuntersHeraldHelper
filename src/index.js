import takeScreenshot from "./puppeteer.js";
import areImagesTheSame from "./imageComparison.js"
import {getImageFromFirestore } from "./firebase.js";
import { downloadImage } from "./downloadImage.js";
import updateSendCleanup from "./updateSendCleanup.js";
import { handleScreenshotError, handleImageComparisonError } from "./errorHandlers.js";
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
        await handleScreenshotError(error);
        return;
    }

    try {
        const imagesAreTheSame = await areImagesTheSame(image1, image2);

        if (!imagesAreTheSame) {
            await updateSendCleanup({image2});
        } else {
            console.log('Images are the same.');
        }
    } catch (error) {
        await handleImageComparisonError({error, image2});
        return;
    }
};