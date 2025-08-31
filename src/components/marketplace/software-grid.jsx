import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, DollarSign, ShoppingCart } from "lucide-react";
import { mockSoftware } from "@/lib/mock-data";
import Image from "next/image";
import Link from "next/link";

export function SoftwareGrid() {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">All Software</h2>
          <p className="text-sm text-muted-foreground">
            {mockSoftware.length} products available
          </p>
        </div>

        <select className="px-3 py-2 border rounded-md text-sm">
          <option>Sort by: Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest First</option>
          <option>Rating</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockSoftware.map((software) => (
          <Card
            key={software.id}
            className="group hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <Image
                  src={
                    software.iconUrl || "/placeholder.svg?height=40&width=40"
                  }
                  alt={software.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <div className="flex-1">
                  <CardTitle className="text-base">{software.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium">4.8</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      v{software.version}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="line-clamp-2 text-sm">
                {software.description}
              </CardDescription>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xl font-bold">${software.price}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Download className="w-3 h-3" />
                  <span>1.2k</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/marketplace/software/${software.id}`}>
                    View
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 bg-transparent"
                >
                  <ShoppingCart className="w-3 h-3" />
                  Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
