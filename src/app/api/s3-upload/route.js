// frontend/app/api/s3-upload/route.js

import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  endpoint: process.env.S3_ENDPOINT || "http://localhost:9000",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "admin",
    secretAccessKey: process.env.S3_SECRET_KEY || "12345678",
  },
  forcePathStyle: true, // Required for MinIO
});

export async function POST(request) {
  try {
    const { fileName, fileType } = await request.json();
    const bucketName = process.env.S3_BUCKET_NAME || "file-bucket";

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 60, // URL expires in 60 seconds
    });

    const fileUrl = `${process.env.S3_ENDPOINT || "http://localhost:9000"}/${bucketName}/${fileName}`;

    return NextResponse.json({ signedUrl, fileUrl });
  } catch (error) {
    console.error("Error creating signed URL:", error);
    return NextResponse.json(
      { error: "Error creating signed URL" },
      { status: 500 },
    );
  }
}
