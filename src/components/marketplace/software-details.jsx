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
} from "lucide-react";

export function SoftwareDetails({ software }) {
  // const features = [
  //   "Advanced code completion and IntelliSense",
  //   "Real-time collaboration with team members",
  //   "Built-in AI assistant for code suggestions",
  //   "Integrated debugging and testing tools",
  //   "Support for 50+ programming languages",
  //   "Customizable themes and extensions",
  //   "Git integration and version control",
  //   "Cloud synchronization across devices",
  // ];

  // const systemRequirements = [
  //   { label: "Operating System", value: "Windows 10+, macOS 10.15+, Linux" },
  //   { label: "Memory", value: "4 GB RAM minimum, 8 GB recommended" },
  //   { label: "Storage", value: "2 GB available space" },
  //   { label: "Processor", value: "Intel i5 or AMD equivalent" },
  // ];

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About {software.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {software.description}
          {/* <p className="text-muted-foreground leading-relaxed">
            {software.name} is a professional-grade development tool designed
            for modern software teams. With cutting-edge AI assistance and
            seamless collaboration features, it empowers developers to write
            better code faster than ever before.
          </p>

          <p className="text-muted-foreground leading-relaxed">
            Whether you're working on web applications, mobile apps, or
            enterprise software,
            {software.name} provides the tools and intelligence you need to
            boost productivity and maintain code quality across your entire
            development lifecycle.
          </p>*/}
        </CardContent>
      </Card>

      {/* Features */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Key Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>*/}

      {/* System Requirements */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            System Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {systemRequirements.map((req, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-border last:border-0"
              >
                <span className="font-medium">{req.label}</span>
                <span className="text-muted-foreground text-sm">
                  {req.value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>*/}

      {/* Compatibility */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Platform Compatibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              Desktop
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Smartphone className="w-3 h-3" />
              Mobile
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Web
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Enterprise
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              Team
            </Badge>
          </div>
        </CardContent>
      </Card>*/}
    </div>
  );
}
