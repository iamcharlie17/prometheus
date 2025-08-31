"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/utils/uploadImage";
import ProgressIndicator from "./ProgressIndicator";
import BasicInfo from "./BasicInfo";
import FileUpload from "./FileUpload";
import { useRouter } from "next/navigation";



export function AddSoftwareForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [softwareData, setSoftwareData] = useState({
        name: "",
        version: "",
        description: "",
        icon_url: "",
        price: 0,
        download_url: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleNext = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFileUpload = async (file, type) => {
        if (type == "logo") {
            try {
                setLoading(true);
                const response = await uploadImage(file);
                setSoftwareData((prev) => ({ ...prev, icon_url: response?.data?.url }));
                console.log("Image uploaded successfully:", response);
            } catch (error) {
                console.error("Error uploading image:", error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                if (file) await uploadFile(file);
            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setLoading(false);
            }
        }
    };

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
        setLoading(true);
        try {
            const { signedUrl, fileUrl } = await getSignedUrl(file);

            await fetch(signedUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type,
                },
                body: file, // raw file content
            });

            setSoftwareData((prev) => ({ ...prev, download_url: fileUrl }));
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {

        try {
            setLoading(true)
            const res = await fetch("/api/software/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    ...softwareData
                }),
            });

            if (!res.ok) throw new Error("Failed to add software");
            //redirect to dashboard
            router.push("/dashboard");
            setSoftwareData({
                name: "",
                version: "",
                description: "",
                icon_url: "",
                price: "",
                download_url: "",
            });
            setCurrentStep(1);

            alert("Software added successfully!");
        } catch (error) {
            console.error("Error adding software:", error);
        } finally {
            setLoading(false);
        }
    };

    const isStep1Valid = softwareData.name && softwareData.description && softwareData.price && softwareData.icon_url;
    const isStep2Valid = softwareData.download_url;

    return (
        <div className="space-y-6">
            {/* Progress Indicator */}
            <ProgressIndicator currentStep={currentStep} />

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
                <BasicInfo
                    setSoftwareData={setSoftwareData}
                    softwareData={softwareData}
                    handleFileUpload={handleFileUpload}
                    handleNext={handleNext}
                    isStep1Valid={isStep1Valid}
                    loading={loading}
                />
            )}

            {/* Step 2: File Upload */}
            {currentStep === 2 && (
                <FileUpload
                    softwareData={softwareData}
                    handleBack={handleBack}
                    loading={loading}
                    handleFileUpload={handleFileUpload}
                    handleSubmit={handleSubmit}
                    isStep2Valid={isStep2Valid}
                />
            )}
        </div>
    );
}
