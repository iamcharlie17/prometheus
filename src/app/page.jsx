import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Zap, Lock, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  LK
                </span>
              </div>
              <span className="font-semibold text-lg">LicenseKey Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Professional Software
            <span className="text-primary"> Licensing Platform</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Secure license key generation, automated distribution, and
            comprehensive analytics for software developers and businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/dashboard">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-balance">
              Everything You Need
            </h2>
            <p className="text-muted-foreground text-lg text-pretty max-w-2xl mx-auto">
              Complete licensing solution with enterprise-grade security and
              developer-friendly APIs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Shield className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Secure Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cryptographically secure license keys with customizable
                  formats and validation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">
                  Automated Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instant license delivery upon purchase with email
                  notifications and download links.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">
                  Anti-Piracy Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced validation APIs with device fingerprinting and usage
                  monitoring.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comprehensive insights into sales, activations, and license
                  usage patterns.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">
            Ready to Secure Your Software?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty max-w-2xl mx-auto">
            Join thousands of developers who trust LicenseKey Pro to protect and
            monetize their software.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/dashboard">
              Get Started Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                LK
              </span>
            </div>
            <span className="font-semibold">LicenseKey Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 LicenseKey Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
