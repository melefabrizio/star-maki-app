import imageCompression from "browser-image-compression";

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1500,
  useWebWorker: true,
  fileType: "image/jpeg",
  initialQuality: 0.8,
} as const;

export async function processPhoto(file: File): Promise<Blob> {
  const compressed = await imageCompression(file, COMPRESSION_OPTIONS);
  return compressed.slice(0, compressed.size, "image/jpeg");
}
