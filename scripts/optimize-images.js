import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');

async function optimizeImages() {
  const files = fs.readdirSync(publicDir);
  
  for (const file of files) {
    if (file.match(/\.(png|jpe?g)$/i) && !file.includes('og-image')) {
      // Exclude og-image-nazareno.png as it might be better as png for meta tags
      const filePath = path.join(publicDir, file);
      const parsedPath = path.parse(file);
      const outputFilePath = path.join(publicDir, `${parsedPath.name}.webp`);
      
      console.log(`Optimizing ${file}...`);
      
      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(outputFilePath);
        
        console.log(`✅ Created ${parsedPath.name}.webp`);
        
        // Optionally, if we wanted to delete the original, we could do it here
        // fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`❌ Error optimizing ${file}:`, err);
      }
    }
  }
}

optimizeImages();
