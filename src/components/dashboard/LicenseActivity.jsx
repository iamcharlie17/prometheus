import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockLicenses, mockSoftware } from "@/lib/mock-data"
import { Shield, AlertTriangle, CheckCircle } from "lucide-react"

export function LicenseActivity() {
  const licenseActivity = mockLicenses.map((license) => {
    const software = mockSoftware.find((sw) => sw.id === license.softwareId)
    return {
      ...license,
      softwareName: software?.name || "Unknown Software",
    }
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "expired":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "default"
      case "expired":
        return "destructive"
      case "revoked":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>License Activity</CardTitle>
        <CardDescription>Monitor license usage and activations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {licenseActivity.map((license) => (
            <div key={license.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon(license.status)}
                <div>
                  <p className="text-sm font-medium">{license.softwareName}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {license.licenseKey.split("-").slice(0, 2).join("-")}...
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusVariant(license.status)}>{license.status}</Badge>
                <div className="text-right text-xs text-muted-foreground">
                  <div>
                    {license.currentActivations}/{license.maxActivations} used
                  </div>
                  {license.expiresAt && <div>Expires {license.expiresAt.toLocaleDateString()}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
