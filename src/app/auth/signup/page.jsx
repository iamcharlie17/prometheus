
"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 1. Initialize role state, defaulting to 'user'
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 3. Send the current 'role' from state to the API
        body: JSON.stringify({ name, email, password, role }),
      });

      console.log(res);
      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to sign in...");
        setTimeout(() => {
          // router.push("/auth/signin");
        }, 2000);
      } else {
        const { error } = await res.json();
        setError(error || "An unexpected error occurred.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Select your role and create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 p-3 rounded-md">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-primary bg-primary/10 border border-primary/20 p-3 rounded-md">
              {success}
            </p>
          )}

          {/* 2. When a tab is clicked, onValueChange fires and updates the role state */}
          <Tabs
            defaultValue="user"
            onValueChange={(value) => setRole(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">Sign up as User</TabsTrigger>
              <TabsTrigger value="developer">Sign up as Developer</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleSubmit} className="grid gap-4 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-center block">
          Already have an account?{" "}
          <Link href="/auth/signin" className="underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
