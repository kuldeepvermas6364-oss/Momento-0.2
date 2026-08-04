/**
 * /utils/media.ts
 * Media utility functions for images and videos.
 */

import { AppConfig } from "@/constants/config";

/**
 * Check if a file type is an allowed image.
 */
export function isImageFile(type: string): boolean {
  return AppConfig.ALLOWED_IMAGE_TYPES.includes(type);
}

/**
 * Check if a file type is an allowed video.
 */
export function isVideoFile(type: string): boolean {
  return AppConfig.ALLOWED_VIDEO_TYPES.includes(type);
}

/**
 * Validate file size against limits.
 */
export function isValidFileSize(bytes: number, type: "image" | "video"): boolean {
  const max = type === "image" ? AppConfig.MAX_IMAGE_SIZE : AppConfig.MAX_VIDEO_SIZE;
  return bytes <= max;
}

/**
 * Get file extension from filename or URL.
 */
export function getFileExtension(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || "";
}

/**
 * Generate a unique filename with timestamp.
 */
export function generateFileName(originalName: string): string {
  const ext = getFileExtension(originalName);
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}_${random}.${ext}`;
}

/**
 * Format bytes to human-readable string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Get optimized Cloudinary URL with transformations.
 */
export function getOptimizedMediaUrl(
  url: string,
  options: { width?: number; height?: number; quality?: string } = {}
): string {
  const { width, height, quality = "auto" } = options;
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

/**
 * Get video thumbnail from Cloudinary URL.
 */
export function getVideoThumbnail(videoUrl: string): string {
  return videoUrl
    .replace("/upload/", "/upload/so_0/")
    .replace(/\.(mp4|webm|mov)$/, ".jpg");
}