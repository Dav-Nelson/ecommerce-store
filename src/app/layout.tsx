import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search, User } from "lucide-react";
import Link from "next/link";
import { auth, signOut } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "Full-stack e-commerce learning project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();  // Call once here (server component is async)

  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            {/* Logo / Home link */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight">Nel Store</span>
            </Link>

            {/* Search (centered on desktop) */}
            <div className="hidden md:flex flex-1 justify-center max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile search icon */}
              <Button variant="ghost" size="icon" asChild className="md:hidden">
                <Link href="/search">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>

              {/* Cart */}
              <Button variant="ghost" size="icon" asChild>
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>

              {/* Auth section */}
              {session?.user ? (
                <div className="flex items-center space-x-3">
                  {/* Optional: Add avatar later when you have image in session */}
                  {/* <div className="h-8 w-8 rounded-full bg-gray-200" /> */}
                  <span className="text-sm font-medium hidden sm:inline">
                    {session.user.name ?? "User"}
                  </span>
                  <form
                    action={async () => {
                      "use server";
                      await signOut({ redirectTo: "/" });
                    }}
                  >
                    <Button variant="outline" size="sm" type="submit">
                      Sign Out
                    </Button>
                  </form>
                </div>
              ) : (
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
              )}

              {/* Account/Profile link (only show if signed in, optional) */}
              {session?.user && (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/account">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Account</span>
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}