'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockSoftware } from "@/lib/mock-data"
import { Package, DollarSign, Download, Settings, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "@/providers/AuthProvider"

export function SoftwareOverview() {
  const { user } = useAuth();

  const [softwares, setSoftwares] = useState([]);
  useEffect(() => {
    const fetchSoftwares = async () => {
      const res = await fetch("/api/software");
      const data = await res.json();
      setSoftwares(data);
    };
    fetchSoftwares();
  }, []);



  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Software Products</CardTitle>
          <CardDescription>Manage and monitor your software catalog</CardDescription>
        </div>
        <Button size="sm" className="gap-2">
          <Package className="w-4 h-4" />
          <Link href="/dashboard/add-software">Add New Software</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {softwares.filter(s => s.DEVELOPER_ID == user?.ID).map((software) => (
            <Card key={software.ID} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <img
                        src={software.ICON_URL || "/placeholder.svg?height=40&width=40"}
                        alt={software.NAME}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{software.NAME}</h3>
                      <p className="text-xs text-muted-foreground">v{software.VERSION}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a
                          href={software.DOWNLOAD_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {software.DESCRIPTION}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">${software.PRICE}</span>
                  </div>
                  <Badge variant={"default"}>
                    Active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
