import axios from 'axios';
import fs from 'fs';

export const downloadImage = async (url, path) => {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        })

        const writer = fs.createWriteStream(path);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        })
    }
    catch (error) {
        console.error('Error downloading image:', error.message);
        throw error;
    }
}
