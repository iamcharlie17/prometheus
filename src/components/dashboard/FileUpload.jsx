"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, ArrowLeft, Check } from "lucide-react";
import SoftwareSummary from "./SoftwareSummary";


const FileUpload = ({ softwareData, handleBack, loading, handleFileUpload, handleSubmit, isStep2Valid }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Software Upload</CardTitle>
                <CardDescription>
                    Upload your software executable file to complete the setup
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label>Executable File</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <Upload className="w-12 h-12 text-muted-foreground" />
                            <div className="text-center">
                                <p className="text-lg font-medium">
                                    {softwareData.executable
                                        ? softwareData.executable.name
                                        : "Upload Software File"}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Supported formats: .exe, .dmg, .deb, .zip, .tar.gz
                                </p>
                                <input
                                    type="file"
                                    accept=".exe,.dmg,.deb,.zip,.tar.gz,.app"
                                    className="hidden"
                                    id="executable-upload"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleFileUpload(file, "executable");
                                    }}
                                />
                                <Button
                                    disabled={loading}
                                    type="button"
                                    variant="outline"
                                    className="mt-4 bg-transparent"
                                    onClick={() =>
                                        document
                                            .getElementById("executable-upload")
                                            ?.click()
                                    }
                                >
                                    {
                                        loading ? "Uploading..." : "Choose File"
                                    }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <SoftwareSummary softwareData={softwareData} />

                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        className="gap-2 bg-transparent"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={!isStep2Valid || loading}
                        className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                        <Check className="w-4 h-4" />
                        {
                            loading ? "Loading..." : "Confirm & Add Software"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default FileUpload;