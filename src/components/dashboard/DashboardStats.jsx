import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, Users, Activity } from "lucide-react"

export function DashboardStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign,
    },
    {
      title: "Active Licenses",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive",
      icon: Activity,
    },
    {
      title: "Software Products",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: Package,
    },
    {
      title: "Total Customers",
      value: "892",
      change: "+15.3%",
      changeType: "positive",
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                {stat.change}
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
