import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Welcome to Our Store
        </h1>
        <p className="text-xl text-muted-foreground mb-10">
          A full-stack e-commerce project built step by step with Next.js, shadcn/ui, and more.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Browse Products</CardTitle>
              <CardDescription>Discover our collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/products">View Products</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
              <CardDescription>Ready to checkout?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Go to Cart
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}