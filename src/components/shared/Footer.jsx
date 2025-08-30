
const Footer = () => {
    return (
        <footer className="border-t bg-card py-12 px-4">
            <div className="container mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xs">LK</span>
                    </div>
                    <span className="font-semibold">LicenseKey Pro</span>
                </div>
                <p className="text-sm text-muted-foreground">© 2024 LicenseKey Pro. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;