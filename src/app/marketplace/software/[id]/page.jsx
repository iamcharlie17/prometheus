"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, User, ArrowLeft, Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const SoftwareDetailPage = () => {
  const [software, setSoftware] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    const fetchSoftwareDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/software/${id}`,{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        });
        if (!res.ok) {
          throw new Error("Software not found or not available.");
        }
        const data = await res.json();
        console.log(data);
        setSoftware(data.filter(s => s.id === id)[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSoftwareDetails();
  }, [id]);

  console.log(software, "fjowhfowf");

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Loading software details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          An Error Occurred
        </h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button asChild>
          <Link href="/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <Button variant="outline" asChild className="gap-2">
            <Link href="/marketplace">
              <ArrowLeft className="w-4 h-4" />
              Back to Marketplace
            </Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Details Section */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-start gap-4">
                <Image
                  src={
                    software?.iconUrl || "/placeholder.svg?height=64&width=64"
                  }
                  alt={software?.name}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div>
                  <CardTitle className="text-3xl">{software?.name}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{software?.name}</span>
                    </div>
                    <Badge variant="secondary">v{software?.version}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base whitespace-pre-wrap">
                  {software?.description}
                </p>
              </CardContent>
            </Card>
          </div>
          {/* Purchase Section */}
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Purchase License</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">${software?.price}</span>
                  <span className="text-muted-foreground">/ year</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Includes updates and standard support.
                </p>
                <Button size="lg" className="w-full">
                  Purchase Now
                </Button>
                {software?.download_url && (
                  <Button variant="secondary" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download Now
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SoftwareDetailPage;
