"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, DollarSign } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function FeaturedSoftware() {
  const [featuredSoftware, setFeaturedSoftware] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        const response = await fetch("/api/software");
        if (!response.ok) {
          throw new Error("Failed to fetch software");
        }
        const data = await response.json();
        setFeaturedSoftware(data.slice(0, 3)); // Take the first 3 as featured
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoftware();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Featured Software</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Skeleton loaders */}
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
          <div className="h-64 bg-muted animate-pulse rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Featured Software</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/marketplace">View All</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredSoftware.map((software) => (
          <Card
            key={software.id}
            className="group hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={
                      software.iconUrl || "/placeholder.svg?height=48&width=48"
                    }
                    alt={software.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div>
                    <CardTitle className="text-lg">{software.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">4.8</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        v{software.version}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Featured
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-2">
                {software.description}
              </CardDescription>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">${software.price}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Download className="w-4 h-4" />
                  <span>1.2k downloads</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" asChild>
                  <Link href={`/marketplace/software/${software.id}`}>
                    View Details
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
