import * as cloudinaryBase from "cloudinary";

const cloudinary = cloudinaryBase.v2;

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export default function uploadToCloudinary(fileBuffer: Buffer): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: process.env.CLOUDINARY_FOLDER, resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          return resolve(result);
        }
      )
      .end(fileBuffer);
  });
}
