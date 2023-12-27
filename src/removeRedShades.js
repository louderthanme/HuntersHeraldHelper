export const removeRedShades = (img, shadesOfRed) => {

    const colorThreshold = 2;

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            const idx = (img.width * y + x) << 2;
            const red = img.data[idx];
            const green = img.data[idx + 1];
            const blue = img.data[idx + 2];

            // Check if the pixel color is close to any of the shades of red
            if (shadesOfRed.some(shade => 
                Math.abs(red - shade.r) < colorThreshold &&
                Math.abs(green - shade.g) < colorThreshold &&
                Math.abs(blue - shade.b) < colorThreshold
            )) {
                // Set the pixel to white
                img.data[idx] = 255;
                img.data[idx + 1] = 255;
                img.data[idx + 2] = 255;
            }
        }
    }
};