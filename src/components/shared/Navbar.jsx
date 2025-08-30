"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";


const Navbar = () => {

    return (
        <header className="border-b bg-card">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">PT</span>
                        </div>
                        <span className="font-semibold text-lg">PROMETHEUS</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/auth/signin"><Button>Get Started</Button></Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
