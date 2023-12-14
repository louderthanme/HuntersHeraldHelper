import fs from "fs";
import { PNG } from "pngjs";


export const readAndParseImage = (imagePath) => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(imagePath)
        .pipe(new PNG())
        .on("parsed", function() {
          resolve(this);
        })
        .on("error", reject);
    });
  }