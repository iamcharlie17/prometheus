'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ImageIcon } from "lucide-react";

const BasicInfo = ({ setSoftwareData, softwareData, handleFileUpload, handleNext, isStep1Valid, loading }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                    Enter the basic details about your software product
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name">Software Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter software name"
                        value={softwareData.name}
                        onChange={(e) =>
                            setSoftwareData((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="version">Software Version</Label>
                    <Input
                        id="version"
                        placeholder="Enter software version"
                        value={softwareData.version}
                        onChange={(e) =>
                            setSoftwareData((prev) => ({ ...prev, version: e.target.value }))
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe your software and its features"
                        rows={4}
                        value={softwareData.description}
                        onChange={(e) =>
                            setSoftwareData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="logo">Logo</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            {
                                softwareData.icon_url ?
                                    <img src={softwareData.icon_url} alt="Logo" className="w-8 h-8 text-muted-foreground" />
                                    : <ImageIcon className="w-8 h-8 text-muted-foreground" />
                            }
                            <div className="text-center">
                                <p className="text-sm text-muted-foreground">
                                    {softwareData.icon_url
                                        ? "Uploaded"
                                        : "Click to upload logo"}
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
                                    onClick={() =>
                                        document.getElementById("logo-upload")?.click()
                                    }
                                >
                                    {loading ? "Uploading..." : "Choose File"}
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
                        onChange={(e) =>
                            setSoftwareData((prev) => ({ ...prev, price: parseFloat(e.target.value) }))
                        }
                    />
                </div>

                <div className="flex justify-end">
                    <Button
                        onClick={handleNext}
                        disabled={!isStep1Valid}
                        className="gap-2"
                    >
                        Next
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BasicInfo;