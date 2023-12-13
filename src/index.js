import takeScreenshot from "./puppeteer";
import compareImages from "./imageComparison";

export const runProcess = async () => {

    const image1 = 'full_calendar2.png'
    const image2 = await takeScreenshot();

    compareImages(image1, image2);

}

