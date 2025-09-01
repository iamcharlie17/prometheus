import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mockActivations,
  mockLicenses,
  mockSoftware,
  mockUsers,
} from "@/lib/mock-data";
import { Monitor, Smartphone, Laptop } from "lucide-react";

export function RecentActivations() {
  const currentUserId =
    mockUsers.find((user) => user.role === "customer")?.id || "";
  const userLicenses = mockLicenses.filter(
    (license) => license.customerId === currentUserId,
  );
  const userLicenseIds = userLicenses.map((license) => license.id);

  const recentActivations = mockActivations
    .filter((activation) => userLicenseIds.includes(activation.licenseId))
    .sort((a, b) => b.activatedAt.getTime() - a.activatedAt.getTime())
    .slice(0, 5);

  const getDeviceIcon = (deviceName) => {
    const name = deviceName.toLowerCase();
    if (name.includes("phone") || name.includes("mobile")) return Smartphone;
    if (name.includes("laptop") || name.includes("macbook")) return Laptop;
    return Monitor;
  };

  const getActivationData = (activation) => {
    const license = userLicenses.find((l) => l.id === activation.licenseId);
    const software = mockSoftware.find((s) => s.id === license?.softwareId);
    return { license, software };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent activations
          </p>
        ) : (
          recentActivations.map((activation) => {
            const { license, software } = getActivationData(activation);
            const DeviceIcon = getDeviceIcon(activation.deviceName);

            return (
              <div
                key={activation.id}
                className="flex items-center gap-3 p-3 rounded-lg border"
              >
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <DeviceIcon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate">
                      {software?.name || "Unknown Software"}
                    </p>
                    <Badge
                      variant={activation.isActive ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {activation.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {activation.deviceName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activation.activatedAt.toLocaleDateString()} at{" "}
                    {activation.activatedAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
