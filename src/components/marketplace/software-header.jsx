import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Star, Shield } from "lucide-react";
import Image from "next/image";

export function SoftwareHeader({ software }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-lg border">
      <div className="flex-shrink-0">
        <Image
          src={software.iconUrl || "/placeholder.svg?height=120&width=120"}
          alt={software.name}
          width={120}
          height={120}
          className="rounded-lg border"
        />
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-foreground">
              {software.name}
            </h1>
            <Badge variant="secondary">v{software.version}</Badge>
            {software.isActive && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <p className="text-lg text-muted-foreground mb-4">
            {software.description}
          </p>

          {/* <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>4.8 (124 reviews)</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>2.3k downloads</span>
            </div>
          </div>*/}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-primary">
            ${software.price}
          </div>
          {/* <Button size="lg" className="bg-primary hover:bg-primary/90">
            Purchase License
          </Button>*/}
        </div>
      </div>
    </div>
  );
}
