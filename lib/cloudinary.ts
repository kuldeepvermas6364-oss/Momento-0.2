import { v2 as cloudinary } from "cloudinary";

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.warn("Cloudinary env vars missing — media uploads will not work");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  secure: true,
});

export default cloudinary;

/**
 * Upload a file to Cloudinary from a buffer.
 * Returns the secure URL of the uploaded asset.
 */
export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "video" = "image"
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `momento/${folder}`,
        resource_type: resourceType,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          reject(new Error(error.message || "Upload failed"));
          return;
        }
        if (!result) {
          reject(new Error("Upload returned no result"));
          return;
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
    uploadStream.end(buffer);
  });
}

/**
 * Delete an asset from Cloudinary by public ID.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Get a transformed URL (e.g. resized, compressed).
 */
export function getOptimizedUrl(
  url: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  const { width, height, quality = "auto" } = options;
  // Insert transformations into the Cloudinary URL
  const transforms = [
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    `q_${quality}`,
    "f_auto",
  ]
    .filter(Boolean)
    .join(",");

  return url.replace("/upload/", `/upload/${transforms}/`);
}
