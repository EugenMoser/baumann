"use server";
import { v2 as cloudinary } from "cloudinary";

import { devVariables, prodVariables } from "@/constants/envVariables";
import { requireAuth } from "@/lib/helpers/requireAuth";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Deletes a single image from Cloudinary by its full URL.
 * Extracts the public_id (with folder prefix) from the URL automatically.
 */
export async function deleteImageAction(
  imageUrl: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    await requireAuth();
  } catch {
    return { success: false, error: "Nicht autorisiert." };
  }

  try {
    const cloudinaryFolder =
      process.env.NODE_ENV === "production"
        ? prodVariables.cloudinaryFolder
        : devVariables.cloudinaryFolder;

    // Extract public_id from URL:
    // https://res.cloudinary.com/{cloud}/image/upload/v{version}/{folder}/{name}.{ext}
    const urlParts = imageUrl.split("/");
    const uploadIndex = urlParts.indexOf("upload");
    if (uploadIndex === -1) {
      return { success: false, error: "Ungültige Cloudinary-URL." };
    }

    // Skip "upload" and optional version segment (e.g. v1234567890)
    let rest = urlParts.slice(uploadIndex + 1);
    if (rest[0] && /^v\d+$/.test(rest[0])) {
      rest = rest.slice(1);
    }

    // Remove file extension from last segment
    const withExt = rest[rest.length - 1];
    rest[rest.length - 1] = withExt.replace(/\.[^/.]+$/, "");
    const publicId = rest.join("/");

    // Ensure the public_id starts with the expected folder
    if (!publicId.startsWith(cloudinaryFolder)) {
      return {
        success: false,
        error: `Bild gehört nicht zum Ordner "${cloudinaryFolder}".`,
      };
    }

    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unbekannter Fehler";
    return { success: false, error: message };
  }
}
