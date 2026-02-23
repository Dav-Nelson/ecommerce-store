import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-5xl font-bold text-gray-900 mb-8">
        E-Commerce Store
      </h1>

      <div className="w-full max-w-md space-y-6">
        {/* Example Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>
              A full-stack e-commerce project built step by step
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Search products..." />
            <Button className="w-full">Get Started</Button>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-gray-500">
          shadcn/ui is working!
        </p>
      </div>
    </main>
  );
}