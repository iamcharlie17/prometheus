import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockPurchases, mockUsers, mockSoftware } from "@/lib/mock-data"

export function RecentSales() {
  // Get recent purchases with user and software details
  const recentSales = mockPurchases
    .filter((purchase) => purchase.status === "completed")
    .slice(0, 5)
    .map((purchase) => {
      const customer = mockUsers.find((user) => user.id === purchase.customerId)
      const software = mockSoftware.find((sw) => sw.id === purchase.softwareId)
      return {
        ...purchase,
        customerName: customer ? customer.name : "Unknown Customer",
        customerEmail: customer ? customer.email : "",
        softwareName: software ? software.name : "Unknown Software",
      }
    })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>
          Latest software purchases and license activations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentSales.map((sale) => (
            <div key={sale.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder.svg?height=36&width=36"
                  alt="Customer"
                />
                <AvatarFallback>
                  {sale.customerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {sale.customerName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sale.softwareName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${sale.amount.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">
                  {sale.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
