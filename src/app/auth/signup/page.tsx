import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import bcrypt from "bcryptjs";

// Import the mock users array and make it mutable (we'll export it from auth.ts later)
import { users } from "@/auth";  // ← We'll adjust auth.ts to export users

const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUp() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Sign up to start shopping</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              "use server";

              const name = formData.get("name") as string;
              const email = formData.get("email") as string;
              const password = formData.get("password") as string;

              // Validate with Zod
              const result = signUpSchema.safeParse({ name, email, password });

              if (!result.success) {
                // For simplicity, show first error (improve with field errors later)
                const errorMsg = result.error.issues[0]?.message || "Invalid input";
                console.error(errorMsg);
                alert(errorMsg);
                return;
              }

              // Check if user already exists
              if (users.some((u) => u.email === email)) {
                alert("Email already in use");
                return;
              }

              // Hash password and create user
              const hashedPassword = await bcrypt.hash(password, 10);

              users.push({
                id: (users.length + 1).toString(),
                name,
                email,
                password: hashedPassword,
              });

              console.log("New user created:", email);

              // Auto sign-in after signup (redirect to home)
              redirect("/");
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" type="text" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}