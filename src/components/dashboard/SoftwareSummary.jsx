'use client'

const SoftwareSummary = ({softwareData}) => {
    return (
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium">Summary</h4>
            <div className="text-sm space-y-1">
                <p>
                    <span className="font-medium">Name:</span> {softwareData.name}
                </p>
                <p>
                    <span className="font-medium">Price:</span> ${softwareData.price}
                </p>
                <p>
                    <span className="font-medium">Logo:</span>{" "}
                    {softwareData.icon_url || "Not uploaded"}
                </p>
                <p>
                    <span className="font-medium">Executable:</span>{" "}
                    {softwareData.download_url || "Not uploaded"}
                </p>
            </div>
        </div>
    );
};

export default SoftwareSummary;