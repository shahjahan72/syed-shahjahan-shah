const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'images');
const outputDir = path.join(__dirname, 'images', 'webp');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Get all image files
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, `${path.parse(file).name}.webp`);

            sharp(inputPath)
                .webp({ quality: 80 })
                .toFile(outputPath)
                .then(() => console.log(`Converted ${file} to WebP`))
                .catch(err => console.error(`Error converting ${file}:`, err));
        }
    });
});