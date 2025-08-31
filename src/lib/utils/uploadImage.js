'use client'
import axios from "axios";

const key = "50e5f1d5cc97aa1b9e315257fb4dbeb8";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file); // 👈 must include image field


  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${key}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error.response?.data || error.message);
    throw error;
  }
};