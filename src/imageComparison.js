import Pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { readAndParseImage } from "./imageParser.js";
import { removeRedShades } from "./removeRedShades.js";


const areImagesTheSame = async (image1, image2) => {

    const img1 = await readAndParseImage(image1);
    const img2 = await readAndParseImage(image2);
    
    const shadesOfRed = [
        { r: 219, g: 253, b: 90 },  
        { r: 225, g: 124, b: 116 } 
    ];

    removeRedShades(img1, shadesOfRed);
    removeRedShades(img2, shadesOfRed);
    

    const diff = new PNG({width: img1.width, height: img1.height});
    const numDiffPixels = Pixelmatch(
        img1.data,
        img2.data,
        diff.data,
        img1.width,
        img1.height,
        {threshold: 0.1}
    );
    
    return numDiffPixels === 0;
}

export default areImagesTheSame;