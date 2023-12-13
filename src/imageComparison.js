import Pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import fs from "fs";

const compareImages = (image1, image2) => {
    fs.createReadStream(image1)
    .pipe(new PNG())
    .on("parsed", function() {
        const img1 = this;

        fs.createReadStream(image2)
            .pipe(new PNG())
            .on("parsed", function() {
                const img2 = this;

                const diff = new PNG({ width: img1.width, height: img1.height });

                const numDiffPixels = Pixelmatch(
                    img1.data,
                    img2.data,
                    diff.data,
                    img1.width,
                    img1.height,
                    { threshold: 0.1 }
                );

                console.log('Number of different',numDiffPixels);

                diff.pack().pipe(fs.createWriteStream("diff.png"));

                if (numDiffPixels > 0) {
                    console.log("Images are not the same");
                } else {
                    console.log("Images are the same");
                }
            })
            .on("error", function(err) {
                console.log(err);
            });
    })

}

export default compareImages;