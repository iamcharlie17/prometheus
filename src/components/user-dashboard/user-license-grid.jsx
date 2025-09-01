"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { maskLicenseKey } from "@/lib/utils/license-generator";
import { MoreHorizontal, Download, Copy, Eye, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function UserLicenseGrid() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/license/purchased", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        // Transform API data to match your component's expected format
        const transformedLicenses = data.map((license) => ({
          id: license.ID,
          licenseKey: license.LICENSE_KEY,
          status: license.STATUS,
          expiresAt: license.EXPIRES_AT ? new Date(license.EXPIRES_AT) : null,
          software: {
            name: license.SOFTWARE_NAME || "Unknown Software",
            version: license.VERSION || "1.00",
            iconUrl: license.ICON_URL || null,
            downloadUrl: license.DOWNLOAD_URL || null,
          },
          currentActivations: 1, // You might want to get this from API
          maxActivations: 1, // You might want to get this from API
          createdAt: license.EXPIRES_AT ? new Date(license.CREATED_AT) : null, // You might want to get this from API
        }));

        setLicenses(transformedLicenses);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "default";
      case "expired":
        return "destructive";
      case "revoked":
        return "secondary";
      case "pending":
        return "outline";
      default:
        return "outline";
    }
  };

  const copyLicenseKey = (licenseKey) => {
    navigator.clipboard.writeText(licenseKey);
    // In a real app, you'd show a toast notification here
  };

  const getExpiryStatus = (expiresAt) => {
    if (!expiresAt) return null;
    const daysUntilExpiry = Math.ceil(
      (expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );

    if (daysUntilExpiry < 0) return { text: "Expired", variant: "destructive" };
    if (daysUntilExpiry <= 7)
      return { text: `${daysUntilExpiry} days left`, variant: "destructive" };
    if (daysUntilExpiry <= 30)
      return { text: `${daysUntilExpiry} days left`, variant: "outline" };
    return null;
  };

  if (loading) {
    return <div>Loading licenses...</div>;
  }

  if (licenses.length === 0) {
    return <div>No licenses found.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Software Licenses</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {licenses.map((license) => {
          const expiryStatus = getExpiryStatus(license.expiresAt);

          return (
            <Card key={license.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      {license.software?.iconUrl ? (
                        <Image
                          src={license.software.iconUrl || "/placeholder.svg"}
                          alt={license.software.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-medium">
                          {license.software?.name?.charAt(0) || "?"}
                        </span>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {license.software?.name || "Unknown Software"}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        v{license.software?.version || "1.0"}
                      </p>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => copyLicenseKey(license.licenseKey)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy License Key
                      </DropdownMenuItem>
                      {license.software?.download_url && (
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download Software
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reactivate
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(license.status)}>
                    {license.status}
                  </Badge>
                  {expiryStatus && (
                    <Badge variant={expiryStatus.variant}>
                      {expiryStatus.text}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">License Key</span>
                    <span className="font-mono">
                      {maskLicenseKey(license.licenseKey)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Activations</span>
                    <span>
                      {license.currentActivations}/{license.maxActivations}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Purchased</span>
                    <span>{license.createdAt.toLocaleDateString()}</span>
                  </div>

                  {license.expiresAt && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Expires</span>
                      <span>{license.expiresAt.toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {license.software?.downloadUrl && (
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                  >
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
