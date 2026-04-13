import tinify from 'tinify';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const tinyPngApiKey = process.env.TINYPNG_KEY || process.env.TINIFY_KEY;

if (!tinyPngApiKey || tinyPngApiKey === 'YOUR_API_KEY_HERE') {
  console.error("Errore: imposta la variabile d'ambiente TINYPNG_KEY o TINIFY_KEY con la tua API key TinyPNG.");
  process.exit(1);
}

tinify.key = tinyPngApiKey;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, 'assets', 'img', 'catalogo');
const images = [
  'areddi.jpg',
  'art wall.jpg',
  'bachetto.jpg',
  'concept capricci.jpg',
  'cut art.jpg',
  'Magnium.jpg',
  'poolys-mood.jpg',
  'porta.jpg',
  'scafal semplice.jpg',
  'wall bar.jpg'
];

async function compressImage(imageName) {
  const sourcePath = path.join(imagesDir, imageName);
  const tempPath = sourcePath + '.temp';

  try {
    console.log(`Comprimendo ${imageName}...`);
    const source = tinify.fromFile(sourcePath);
    await source.toFile(tempPath);

    // Sostituisci l'originale con la versione compressa
    fs.renameSync(tempPath, sourcePath);
    console.log(`${imageName} compresso con successo!`);
  } catch (error) {
    console.error(`Errore nel comprimere ${imageName}:`, error);
  }
}

async function compressAll() {
  for (const image of images) {
    await compressImage(image);
  }
  console.log('Compressione completata!');
}

compressAll();