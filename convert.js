const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');

async function walk(dir) {
  let results = [];
  const list = await fs.readdir(dir);
  for (let file of list) {
    file = path.resolve(dir, file);
    const stat = await fs.stat(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(await walk(file));
    } else {
      results.push(file);
    }
  }
  return results;
}

async function convertImages() {
  try {
    const publicDir = path.join(__dirname, 'public');
    const files = await walk(publicDir);
    
    // Also including .webp to optimize existing webp files
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
    let count = 0;
    let savedBytes = 0;
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const dirname = path.dirname(file);
        const basename = path.basename(file, ext);
        const originalStat = await fs.stat(file);
        
        console.log(`Processing ${path.basename(file)}...`);
        
        // Read file into buffer to avoid locking the file
        const buffer = await fs.readFile(file);
        
        // Convert/Optimize to webp with high quality (85)
        const outputBuffer = await sharp(buffer)
          .webp({ quality: 85, effort: 6 })
          .toBuffer();
          
        // Write the optimized buffer directly back to the file
        // If it was another format, we'd write to a .webp file and delete original.
        // Since they are all .webp in this project already, we just overwrite.
        const newFilename = path.join(dirname, `${basename}.webp`);
        await fs.writeFile(newFilename, outputBuffer);
        
        // Delete original if it was not webp
        if (ext !== '.webp') {
          try {
            await fs.unlink(file);
          } catch (e) {
            console.error(`Could not delete original file ${file}:`, e.message);
          }
        }
        
        const newStat = await fs.stat(newFilename);
        const saved = originalStat.size - newStat.size;
        savedBytes += saved;
        
        console.log(`  -> Saved ${(saved / 1024).toFixed(2)} KB`);
        count++;
      }
    }
    
    console.log(`Successfully processed ${count} images.`);
    console.log(`Total space saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('Error processing images:', error);
  }
}

convertImages();
