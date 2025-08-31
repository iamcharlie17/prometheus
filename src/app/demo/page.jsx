//app/demo/page.js
"use client";

import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";  // ✅ add this line

export default function HomePage() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Upload Executable</h1>

            <UploadButton
                endpoint="executableUploader"  // <-- must match core.js
                onClientUploadComplete={(res) => {
                    console.log("Upload completed:", res);
                    alert(`File uploaded! URL: ${res[0].url}`);
                }}
                onUploadError={(error) => {
                    alert(`Upload failed: ${error.message}`);
                }}
            />

        </div>
    );
}
