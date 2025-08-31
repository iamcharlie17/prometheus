"use client"; // Next.js client component

import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  // Step 1: get signed URL from your API
  async function getSignedUrl(file) {
    const res = await fetch("/api/s3-upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    });

    if (!res.ok) throw new Error("Failed to get signed URL");

    return res.json(); // returns { signedUrl, fileUrl }
  }

  // Step 2: upload file to S3 using the signed URL
  async function uploadFile(file) {
    setUploading(true);
    try {
      const { signedUrl, fileUrl } = await getSignedUrl(file);

      await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file, // raw file content
      });

      setFileUrl(fileUrl);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) uploadFile(file);
    else alert("Please select a file first");
  };

  return (
    <div className="space-y-4">
      <input type="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      {fileUrl && (
        <div>
          File uploaded:{" "}
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            {fileUrl}
          </a>
        </div>
      )}
    </div>
  );
}
