// components/MyListingsClient.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@prisma/client"; // Import the Product type from Prisma
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface MyListingsClientProps {
  initialProducts: Product[];
}

export default function MyListingsClient({
  initialProducts,
}: MyListingsClientProps) {
  const [products, setProducts] = useState(initialProducts);
  const router = useRouter();

  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the product.");
      }

      // Remove the deleted product from the local state to update the UI instantly
      setProducts(products.filter((p) => p.id !== productId));
    } catch (error) {
      console.error(error);
      // Here you could show an error toast
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <p className="text-gray-500">You haven't listed any products yet.</p>
        <Link href="/products/new" className="mt-4 inline-block">
          <Button>List Your First Item</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="flex items-center p-4 justify-between hover:bg-gray-50"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/products/${product.id}/edit`)}
            >
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your product listing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(product.id)}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Card>
      ))}
    </div>
  );
}
