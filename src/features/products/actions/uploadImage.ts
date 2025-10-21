"use server";
import type { UploadApiResponse } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";

import {
  devVariables,
  prodVariables,
} from "@/constants/envVariables";
import { ImageUploadState } from "@/types/formProps";

interface FileFormDataProps {
  fileFormData: File;
  imageName: string;
}
// *----------------------------------- add cloudinary image -----------------------------------
// config cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default async function uploadSingleImageAction(
  props: FileFormDataProps,
): Promise<ImageUploadState> {
  //validate image file in addProductDetailsAction.ts for a better error handling

  // check the environment and set the cloudinary folder accordingly
  const cloudinaryFolder =
    process.env.NODE_ENV === "production"
      ? prodVariables.cloudinaryFolder
      : devVariables.cloudinaryFolder;

  // convert image file to array buffer
  let arrayBuffer: ArrayBuffer;
  try {
    arrayBuffer = await props.fileFormData.arrayBuffer();
  } catch (error) {
    console.error("Error converting image file to ArrayBuffer:", error);
    return {
      success: false,
      globalError: "Fehler beim Konvertieren der Bilddatei.",
    };
  }
  const buffer = Buffer.from(arrayBuffer);

  // upload image to cloudinary via stream
  let uploadResult: UploadApiResponse | undefined = undefined;
  try {
    uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: props.imageName,
          folder: cloudinaryFolder, // use the folder from environment variables
          resource_type: "image",
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (!result) {
            reject(new Error("Cloudinary upload returned no result."));
          } else {
            resolve(result);
          }
        },
      );
      uploadStream.end(buffer);
    });
  } catch (error: any) {
    console.error("Unexpected error during Cloudinary upload:", error);
    return {
      success: false,
      globalError: "Fehler beim Hochladen zu Cloudinary.",
    };
  }
  // Check if the upload result is valid
  if (
    !uploadResult ||
    typeof uploadResult !== "object" ||
    !("secure_url" in uploadResult)
  ) {
    console.error("Unexpected result from Cloudinary upload:", uploadResult);
    return {
      success: false,
      globalError: "Cloudinary Upload-Ergebnis war unerwartet.",
    };
  }
  return {
    success: true,
    url: uploadResult.secure_url as string, // secure_url is the URL of the uploaded image
  };
}
