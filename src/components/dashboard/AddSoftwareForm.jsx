"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ArrowLeft, ArrowRight, Check, ImageIcon } from "lucide-react";



export function AddSoftwareForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [softwareData, setSoftwareData] = useState({
        title: "",
        version: "",
        description: "",
        logo: null,
        price: "",
        route: "",
        documentation: "",
        executable: null,
    });

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFileUpload = (file, type) => {
        setSoftwareData((prev) => ({
            ...prev,
            [type]: file,
        }));
    };

    const handleSubmit = () => {
        console.log("Submitting software data:", softwareData);
        alert({
            title: "Software Added Successfully",
            description: "Your software has been added to the system.",
        });
        // Reset form or redirect
        setSoftwareData({
            title: "",
            version: "",
            description: "",
            logo: null,
            price: "",
            route: "",
            documentation: "",
            executable: null,
        });
        setCurrentStep(1);
    };

    const isStep1Valid = softwareData.title && softwareData.description && softwareData.price;
    const isStep2Valid = softwareData.route && softwareData.documentation;
    const isStep3Valid = softwareData.executable;

    return (
        <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-4 mb-8">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}
                        >
                            {step < currentStep ? <Check className="w-4 h-4" /> : step}
                        </div>
                        {step < 3 && <div className={`w-16 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
                    </div>
                ))}
            </div>

            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Enter the basic details about your software product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Software Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter software title"
                                value={softwareData.title}
                                onChange={(e) => setSoftwareData((prev) => ({ ...prev, title: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="version">Software Version</Label>
                            <Input
                                id="version"
                                placeholder="Enter software version"
                                value={softwareData.version}
                                onChange={(e) => setSoftwareData((prev) => ({ ...prev, version: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your software and its features"
                                rows={4}
                                value={softwareData.description}
                                onChange={(e) => setSoftwareData((prev) => ({ ...prev, description: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe your software and its features"
                                rows={4}
                                value={softwareData.description}
                                onChange={(e) => setSoftwareData((prev) => ({ ...prev, description: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                                <div className="flex flex-col items-center justify-center space-y-2">
                                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">
                                            {softwareData.logo ? softwareData.logo.name : "Click to upload logo"}
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            id="logo-upload"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleFileUpload(file, "logo");
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 bg-transparent"
                                            onClick={() => document.getElementById("logo-upload")?.click()}
                                        >
                                            Choose File
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                value={softwareData.price}
                                onChange={(e) => setSoftwareData((prev) => ({ ...prev, price: e.target.value }))}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button onClick={handleNext} disabled={!isStep1Valid} className="gap-2">
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 2: API Route and Documentation */}
            {currentStep === 2 && (
                <Card>
                    <CardHeader>
                        <CardTitle>API Integration</CardTitle>
                        <CardDescription>Configure the API route and provide documentation for developers</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="route">API Route</Label>
                            <Input
                                id="route"
                                placeholder="/api/validate-license"
                                value={softwareData.route}
                                onChange={(e) => setSoftwareData((prev) => ({ ...prev, route: e.target.value }))}
                            />
                            <p className="text-sm text-muted-foreground">
                                The endpoint where your application will validate license keys
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="documentation">Integration Documentation</Label>
                            <Textarea
                                id="documentation"
                                placeholder="Provide detailed instructions on how to integrate this route into their application..."
                                rows={8}
                                value={softwareData.documentation}
                                onChange={(e) => setSoftwareData((prev) => ({ ...prev, documentation: e.target.value }))}
                            />
                            <p className="text-sm text-muted-foreground">Include code examples, parameters, and expected responses</p>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={handleBack} className="gap-2 bg-transparent">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                            <Button onClick={handleNext} disabled={!isStep2Valid} className="gap-2">
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Step 3: File Upload */}
            {currentStep === 3 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Software Upload</CardTitle>
                        <CardDescription>Upload your software executable file to complete the setup</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label>Executable File</Label>
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <Upload className="w-12 h-12 text-muted-foreground" />
                                    <div className="text-center">
                                        <p className="text-lg font-medium">
                                            {softwareData.executable ? softwareData.executable.name : "Upload Software File"}
                                        </p>
                                        <p className="text-sm text-muted-foreground">Supported formats: .exe, .dmg, .deb, .zip, .tar.gz</p>
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
                                            type="button"
                                            variant="outline"
                                            className="mt-4 bg-transparent"
                                            onClick={() => document.getElementById("executable-upload")?.click()}
                                        >
                                            Choose File
                                        </Button>


                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <h4 className="font-medium">Summary</h4>
                            <div className="text-sm space-y-1">
                                <p>
                                    <span className="font-medium">Title:</span> {softwareData.title}
                                </p>
                                <p>
                                    <span className="font-medium">Price:</span> ${softwareData.price}
                                </p>
                                <p>
                                    <span className="font-medium">API Route:</span> {softwareData.route}
                                </p>
                                <p>
                                    <span className="font-medium">Logo:</span> {softwareData.logo?.name || "Not uploaded"}
                                </p>
                                <p>
                                    <span className="font-medium">Executable:</span> {softwareData.executable?.name || "Not uploaded"}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <Button variant="outline" onClick={handleBack} className="gap-2 bg-transparent">
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </Button>
                            <Button onClick={handleSubmit} disabled={!isStep3Valid} className="gap-2 bg-green-600 hover:bg-green-700">
                                <Check className="w-4 h-4" />
                                Confirm & Add Software
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
