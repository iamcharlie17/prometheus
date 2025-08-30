import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
    return (
        <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Secure Your Software?</h2>
          <p className="text-muted-foreground text-lg mb-8 text-pretty max-w-2xl mx-auto">
            Join thousands of developers who trust LicenseKey Pro to protect and monetize their software.
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/dashboard">
              Get Started Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    );
};

export default CTA;