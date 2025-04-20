// This script can be run with "npx ts-node scripts/optimize-images.ts"
// It optimizes all images in the public directory for better performance

import fs from "fs"
import path from "path"
import sharp from "sharp"

const PUBLIC_DIR = path.join(process.cwd(), "public")
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"]

// Sizes for responsive images
const SIZES = [640, 750, 828, 1080, 1200, 1920]

// Function to optimize a single image
async function optimizeImage(filePath: string) {
  try {
    const ext = path.extname(filePath).toLowerCase()
    if (!IMAGE_EXTENSIONS.includes(ext)) return

    console.log(`Optimizing: ${filePath}`)

    const filename = path.basename(filePath, ext)
    const dirname = path.dirname(filePath)

    // Create WebP version
    await sharp(filePath)
      .webp({ quality: 80 })
      .toFile(path.join(dirname, `${filename}.webp`))

    // Create responsive versions
    for (const width of SIZES) {
      // Skip if the original image is smaller
      const metadata = await sharp(filePath).metadata()
      if (metadata.width && metadata.width < width) continue

      // Create resized JPG
      await sharp(filePath)
        .resize(width)
        .jpeg({ quality: 80, progressive: true })
        .toFile(path.join(dirname, `${filename}-${width}.jpg`))

      // Create resized WebP
      await sharp(filePath)
        .resize(width)
        .webp({ quality: 80 })
        .toFile(path.join(dirname, `${filename}-${width}.webp`))
    }

    console.log(`✅ Optimized: ${filePath}`)
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error)
  }
}

// Function to walk through directories recursively
async function processDirectory(directory: string) {
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      await processDirectory(filePath)
    } else if (stat.isFile()) {
      await optimizeImage(filePath)
    }
  }
}

// Main function
async function main() {
  console.log("🔍 Starting image optimization...")
  await processDirectory(PUBLIC_DIR)
  console.log("✨ Image optimization complete!")
}

main().catch(console.error)
