import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirsToSearch = [
  path.join(__dirname, '../src'),
  path.join(__dirname, '../') // for index.html
];

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  // Replace .png and .jpg with .webp, except og-image
  newContent = newContent.replace(/(?<!og-image-nazareno)\.png/g, '.webp');
  newContent = newContent.replace(/(?<!a[1-2])\.jpe?g/g, '.webp'); // a1.jpg is commented out, but let's replace all jpgs

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function traverse(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', 'dist', '.git', 'public', 'scripts'].includes(file)) {
        traverse(fullPath);
      }
    } else {
      if (['.tsx', '.ts', '.html'].includes(path.extname(fullPath))) {
        replaceInFile(fullPath);
      }
    }
  }
}

dirsToSearch.forEach(traverse);
