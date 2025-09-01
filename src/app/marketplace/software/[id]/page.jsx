"use client";

import { notFound, useParams } from "next/navigation";
import { SoftwareHeader } from "@/components/marketplace/software-header";
import { SoftwareDetails } from "@/components/marketplace/software-details";
import { SoftwarePurchase } from "@/components/marketplace/software-purchase";
import { SoftwareReviews } from "@/components/marketplace/software-reviews";
import { LicenseInfo } from "@/components/marketplace/license-info";
import { mockSoftware } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useEffect, use, useState } from "react";
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";

function SoftwarePage() {
  const params = useParams();
  const id = params.id;

  const [software, setSoftware] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [licenseInfo, setLicenseInfo] = useState(null);
  const [isLicenseLoading, setIsLicenseLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/software/${id}`, {
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
        setSoftware(data[0] || data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const getLicenseInfo = async () => {
      try {
        setIsLicenseLoading(true);
        const response = await fetch(`/api/software/${id}/purchased`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLicenseInfo(data[0]);
          console.log("LicenseInfo", data);
        }
      } catch (error) {
        console.error("Error fetching license info:", error);
      } finally {
        setIsLicenseLoading(false);
      }
    };

    fetchData();
    getLicenseInfo();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading software details...</p>
        </div>
      </div>
    );
  }

  if (!software || error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />
      <div className="container mx-auto px-4 py-8 space-y-8">
        <SoftwareHeader software={software} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <SoftwareDetails software={software} />
            {/* <SoftwareReviews />*/}
          </div>

          <div>
            {isLicenseLoading ? (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-4/6 mb-4"></div>
                  <div className="h-10 bg-muted rounded w-full mb-2"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>
              </div>
            ) : licenseInfo && licenseInfo.STATUS ? (
              <LicenseInfo licenseInfo={licenseInfo} />
            ) : (
              <SoftwarePurchase software={software} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SoftwarePage;
