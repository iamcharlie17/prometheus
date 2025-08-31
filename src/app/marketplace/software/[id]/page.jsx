"use client";

import { notFound, useParams } from "next/navigation";
import { SoftwareHeader } from "@/components/marketplace/software-header";
import { SoftwareDetails } from "@/components/marketplace/software-details";
import { SoftwarePurchase } from "@/components/marketplace/software-purchase";
import { SoftwareReviews } from "@/components/marketplace/software-reviews";
import { mockSoftware } from "@/lib/mock-data";

import { useEffect, use, useState } from "react";

function SoftwarePage() {
  const params = useParams();
  const id = params.id;

  const [software, setSoftware] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  console.log(software);
  if (!software || error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <SoftwareHeader software={software} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <SoftwareDetails software={software} />
            {/* <SoftwareReviews />*/}
          </div>

          <div>
            <SoftwarePurchase software={software} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SoftwarePage;
