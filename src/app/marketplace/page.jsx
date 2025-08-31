import { MarketplaceHeader } from "@/components/marketplace/marketplace-header";
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters";
import { SoftwareGrid } from "@/components/marketplace/software-grid";
import { FeaturedSoftware } from "@/components/marketplace/featured-software";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketplaceHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            Software Marketplace
          </h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Discover and purchase professional software with instant license
            delivery
          </p>
        </div>

        {/* <FeaturedSoftware />*/}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* <aside className="lg:w-64">
            <MarketplaceFilters />
          </aside>*/}

          <main className="flex-1">
            <SoftwareGrid />
          </main>
        </div>
      </main>
    </div>
  );
}
