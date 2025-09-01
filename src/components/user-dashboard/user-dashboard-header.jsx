import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  ShoppingCart,
  Settings,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

export function UserDashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/user-dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  LK
                </span>
              </div>
              <span className="font-semibold text-lg">LicenseKey Pro</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/user-dashboard"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                My Licenses
              </Link>
              <Link
                href="/marketplace"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Software
              </Link>
              <Link
                href="/user-dashboard/downloads"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Downloads
              </Link>
              <Link
                href="/user-dashboard/support"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Support
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              asChild
            >
              <Link href="/marketplace">
                <ShoppingCart className="w-4 h-4" />
                Browse Software
              </Link>
            </Button>

            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="User"
                    />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Jane Smith
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      jane.smith@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
