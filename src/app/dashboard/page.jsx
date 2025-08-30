import { Suspense } from "react";
// import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RecentSales } from "@/components/dashboard/RecentSales";
import { SoftwareOverview } from "@/components/dashboard/SoftwareOverview";
import { LicenseActivity } from "@/components/dashboard/LicenseActivity";
import Navbar from "@/components/shared/Navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* <DashboardHeader /> */}
      <Navbar />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Developer Dashboard
          </h1>
          <p className="text-muted-foreground text-pretty">
            Manage your software products, track sales, and monitor license usage.
          </p>
        </div>

        <Suspense fallback={<div className="h-32 bg-muted animate-pulse rounded-lg" />}>
          <DashboardStats />
        </Suspense>

        <div className="grid gap-8 md:grid-cols-2">
          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <RecentSales />
          </Suspense>

          <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
            <LicenseActivity />
          </Suspense>
        </div>

        <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
          <SoftwareOverview />
        </Suspense>
      </main>
    </div>
  );
}
