import takeScreenshot from "./puppeteer.js";
import areImagesTheSame from "./imageComparison.js"
import uploadImage from "./cloudinary.js";



export const runProcess = async () => {

    const image1 = 'full_calendar2.png'
    const image2 = await takeScreenshot();
    const imagesAreTheSame = await areImagesTheSame(image1, image2);




    if(imagesAreTheSame){
        console.log('Images are the same');
    } else {
        console.log('Images are different, uploading new image');
        uploadImage(image2);
    }
}

