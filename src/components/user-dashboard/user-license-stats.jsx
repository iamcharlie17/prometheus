import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockLicenses, mockUsers } from "@/lib/mock-data";
import { Shield, Download, Calendar, AlertTriangle } from "lucide-react";

export function UserLicenseStats() {
  const currentUserId =
    mockUsers.find((user) => user.role === "customer")?.id || "";
  const userLicenses = mockLicenses.filter(
    (license) => license.customerId === currentUserId,
  );

  const activeLicenses = userLicenses.filter(
    (license) => license.status === "active",
  ).length;
  const expiredLicenses = userLicenses.filter(
    (license) => license.status === "expired",
  ).length;
  const totalActivations = userLicenses.reduce(
    (sum, license) => sum + license.currentActivations,
    0,
  );
  const expiringLicenses = userLicenses.filter((license) => {
    if (!license.expiresAt) return false;
    const daysUntilExpiry = Math.ceil(
      (license.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  }).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeLicenses}</div>
          <p className="text-xs text-muted-foreground">
            {userLicenses.length} total licenses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Activations
          </CardTitle>
          <Download className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalActivations}</div>
          <p className="text-xs text-muted-foreground">Across all devices</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiringLicenses}</div>
          <p className="text-xs text-muted-foreground">Within 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiredLicenses}</div>
          <p className="text-xs text-muted-foreground">Expired licenses</p>
        </CardContent>
      </Card>
    </div>
  );
}
