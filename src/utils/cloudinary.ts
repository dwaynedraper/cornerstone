import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload to a specific folder
export const uploadToFolder = async (path: string, folderName: string) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      folder: folderName,
    });
    return result;
  } catch (error) {
    console.error("Error uploading to folder:", error);
    throw error;
  }
};

// Function to upload with specific tags
export const uploadWithTags = async (path: string, tags: string[]) => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      tags: tags,
    });
    return result;
  } catch (error) {
    console.error("Error uploading with tags:", error);
    throw error;
  }
};

// Function to retrieve images by folder
export const getImagesByFolder = async (folderName: string) => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: `${folderName}/`, // Folder name
    });
    return result.resources;
  } catch (error) {
    console.error("Error retrieving images by folder:", error);
    throw error;
  }
};

// Function to retrieve images by tag
export const getImagesByTag = async (tagName: string) => {
  try {
    const result = await cloudinary.api.resources_by_tag(tagName);
    return result.resources;
  } catch (error) {
    console.error("Error retrieving images by tag:", error);
    throw error;
  }
};
