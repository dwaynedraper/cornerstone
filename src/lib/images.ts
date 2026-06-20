import "server-only";
import sharp from "sharp";

/**
 * Compress an uploaded image to a fast, web-ready WebP:
 * - auto-orients from EXIF, then drops all metadata (incl. GPS)
 * - caps the longest edge at 2048px (never upscales)
 * - WebP at quality 80
 * `next/image` still serves per-device AVIF/WebP on top of this.
 */
export async function toOptimizedWebp(file: File): Promise<Buffer> {
  const input = Buffer.from(await file.arrayBuffer());
  return sharp(input)
    .rotate()
    .resize(2048, 2048, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
}
