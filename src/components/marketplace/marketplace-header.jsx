// src/components/marketplace/marketplace-header.jsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart } from "lucide-react";

export function MarketplaceHeader() {
  return (
    <header className="py-4 px-6 bg-card border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Prometheus
        </Link>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for software..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            My Account
          </Button>
          <Button variant="outline" size="icon">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
