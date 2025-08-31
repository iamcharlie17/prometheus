"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Bell, Plus, Settings, LogOut, User } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import useRole from "@/hooks/useRole";

const DeveloperMenu = ({ user }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user?.NAME || "Developer"} />
                    <AvatarFallback>{user?.NAME[0]}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.NAME}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.EMAIL}</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <button onClick={() => { localStorage.removeItem("token");}}>Log out</button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const DeveloperNavbar = ({ user }) => (
    <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">PT</span>
                        </div>
                        <span className="font-semibold text-lg">PROMETHEUS</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {[
                            { href: "/dashboard", label: "Dashboard" },
                            { href: "/dashboard/software", label: "Software" },
                            { href: "/dashboard/licenses", label: "Licenses" },
                            { href: "/dashboard/analytics", label: "Analytics" },
                            { href: "/dashboard/api-keys", label: "API Keys" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/dashboard/add-software">
                            <Plus className="w-4 h-4" />
                            Add Software
                        </Link>
                    </Button>


                    <Button variant="ghost" size="sm">
                        <Bell className="w-4 h-4" />
                    </Button>

                    <DeveloperMenu user={user} />
                </div>
            </div>
        </div>
    </header>
);

const DefaultNavbar = ({ user }) => (
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
                    {user ? (
                        <>
                            <Link href="/auth/profile">{user.NAME}</Link>
                            <Link href="/auth/signout">
                                <Button>Sign Out</Button>
                            </Link>
                        </>
                    ) : (
                        <Link href="/auth/signin">
                            <Button>Get Started</Button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    </header>
);

const Navbar = () => {
    const { user } = useAuth();
    const { isDeveloper } = useRole();

    return isDeveloper ? <DeveloperNavbar user={user} /> : <DefaultNavbar user={user} />;
};

export default Navbar;
