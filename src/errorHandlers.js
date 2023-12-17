import { sendEmail } from './emailHandler.js';
import updateSendCleanup from './updateSendCleanup.js';

export const handleScreenshotError = async (error) => {
    console.error('Error taking screenshot:', error.message);
    await sendEmail(process.env.HUNTER_HERALD_EMAIL,screenshotErrorEmailSubject, error.message, null);
    console.log('Email sent.');
    return; 
}

export const handleImageComparisonError = async ({error, image2}) => {
    if (error.message === 'Image sizes do not match.') {
        await updateSendCleanup({image2});
    } else {
        console.error('Error comparing images:', error.message);
        await sendEmail(process.env.HUNTER_HERALD_EMAIL,comparisonErrorEmailSubject, error.message, null);
        console.log('Email sent.');
        return;
    }
}