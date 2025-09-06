// app/dashboard/purchases/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PreviousPurchasesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Previous Purchases</h1>

      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">You have no previous purchases.</p>
        <p className="text-gray-500 mt-2">
          Start exploring to find your next great find!
        </p>
        <Link href="/" className="mt-4 inline-block">
          <Button>Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}
