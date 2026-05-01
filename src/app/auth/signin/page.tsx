import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Use your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";

              const email = formData.get("email") as string;
              const password = formData.get("password") as string;

              // No redirect: false → Auth.js will redirect automatically on success
              await signIn("credentials", {
                email,
                password,
                redirectTo: "/",  // Optional: force redirect here after success
              });

              // If we reach here, signIn failed → show error
              // (But in practice, redirect happens server-side, so this won't run on success)
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

         <p className="mt-4 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
        </p>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Test credentials: test@example.com / password123
          </p>
        </CardContent>
      </Card>
    </div>
  );
}