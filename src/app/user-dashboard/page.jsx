import { Suspense } from "react";
import { UserDashboardHeader } from "@/components/user-dashboard/user-dashboard-header";
// import { UserLicenseStats } from "@/components/user-dashboard/user-license-stats";
import { UserLicenseGrid } from "@/components/user-dashboard/user-license-grid";
// import { RecentActivations } from "@/components/user-dashboard/recent-activations";

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <UserDashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            My Licenses
          </h1>
          <p className="text-muted-foreground text-pretty">
            View and manage all your purchased software licenses in one place.
          </p>
        </div>

        {/* <Suspense
          fallback={<div className="h-32 bg-muted animate-pulse rounded-lg" />}
        >
          <UserLicenseStats />
        </Suspense>*/}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Suspense
              fallback={
                <div className="h-96 bg-muted animate-pulse rounded-lg" />
              }
            >
              <UserLicenseGrid />
            </Suspense>
          </div>

          <div>
            {/* <Suspense
              fallback={
                <div className="h-96 bg-muted animate-pulse rounded-lg" />
              }
            >
              <RecentActivations />
            </Suspense>*/}
          </div>
        </div>
      </main>
    </div>
  );
}
