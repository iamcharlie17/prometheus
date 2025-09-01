import { Button } from "@/components/ui/button";

export function LicenseInfo({ licenseInfo }) {
  // Format expiration date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDownload = () => {
    if (licenseInfo.DOWNLOAD_URL) {
      window.open(licenseInfo.DOWNLOAD_URL, "_blank");
    } else {
      console.error("No download URL available");
      // You could show a toast notification here
    }
  };

  const copyLicenseKey = () => {
    if (licenseInfo.LICENSE_KEY) {
      navigator.clipboard
        .writeText(licenseInfo.LICENSE_KEY)
        .then(() => {
          // You could show a toast notification here
          console.log("License key copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy license key:", err);
        });
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-6">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          License Information
        </h3>
        <p className="text-sm text-muted-foreground">
          You already own a license for this software
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Status:</span>
          <span
            className={`font-medium px-2 py-1 rounded text-xs ${
              licenseInfo.STATUS === "active"
                ? "text-green-600 bg-green-100 dark:bg-green-900/20"
                : "text-destructive bg-destructive/10"
            }`}
          >
            {licenseInfo.STATUS?.charAt(0)?.toUpperCase() +
              licenseInfo.STATUS?.slice(1) || "Unknown"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">License Key:</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
              {licenseInfo.LICENSE_KEY || "N/A"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyLicenseKey}
              className="h-8 w-8 p-0"
              title="Copy license key"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Expires:</span>
          <span className="font-medium">
            {formatDate(licenseInfo.EXPIRES_AT)}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="w-full"
          onClick={handleDownload}
          disabled={!licenseInfo.DOWNLOAD_URL}
        >
          Download Software
        </Button>
        <Button variant="outline" className="w-full">
          View License Agreement
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        Need help? Contact our support team for assistance with your license.
      </div>
    </div>
  );
}
