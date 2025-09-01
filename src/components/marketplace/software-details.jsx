import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Monitor,
  Smartphone,
  Globe,
  Zap,
  Shield,
  Users,
  Download,
} from "lucide-react";

export function SoftwareDetails({ software }) {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>About {software.name}</CardTitle>
          <div className="flex items-center text-muted-foreground">
            <Download className="mr-1 h-4 w-4" />
            <span>{software.downloads || 0} downloads</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">{software.description}</CardContent>
      </Card>

      {/* Rest of the component remains unchanged */}
    </div>
  );
}
