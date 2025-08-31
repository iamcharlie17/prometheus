'use client'

import { Check } from "lucide-react";

const ProgressIndicator = ({currentStep}) => {
    return (
        <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2].map((step) => (
                <div key={step} className="flex items-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                            }`}
                    >
                        {step < currentStep ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 2 && (
                        <div
                            className={`w-16 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProgressIndicator;