import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BarChart3, Lock, Shield, Zap } from 'lucide-react';

const Features = () => {
    return (
       <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-balance">Everything You Need</h2>
            <p className="text-muted-foreground text-lg text-pretty max-w-2xl mx-auto">
              Complete licensing solution with enterprise-grade security and developer-friendly APIs.
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
                  Cryptographically secure license keys with customizable formats and validation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Automated Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Instant license delivery upon purchase with email notifications and download links.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Lock className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Anti-Piracy Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Advanced validation APIs with device fingerprinting and usage monitoring.
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
                  Comprehensive insights into sales, activations, and license usage patterns.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
};

export default Features;