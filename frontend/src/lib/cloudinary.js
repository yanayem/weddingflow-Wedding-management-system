import axios from "axios";

/**
 * Uploads an image to Cloudinary using an unsigned upload preset.
 * Note: You must create an 'unsigned' upload preset in your Cloudinary Dashboard.
 *
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The URL of the uploaded image
 */
export const uploadImage = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "weddingflow_uploads";

  if (!cloudName) {
    throw new Error("Cloudinary Cloud Name is missing in .env");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  console.log("Attempting upload to Cloudinary with preset:", uploadPreset);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    return res.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Error Details:", error.response?.data);
    const errorMessage = error.response?.data?.error?.message || "Image upload failed";
    throw new Error(`Cloudinary: ${errorMessage} (Preset: ${uploadPreset})`);
  }
};
