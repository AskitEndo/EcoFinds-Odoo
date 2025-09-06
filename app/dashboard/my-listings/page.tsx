// app/dashboard/my-listings/page.tsx
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const prisma = new PrismaClient();

async function getUserProducts() {
  const session = await auth();
  const userId = session?.userId;
  if (!userId) {
    redirect("/sign-in");
  }
  const products = await prisma.product.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export default async function MyListingsPage() {
  const products = await getUserProducts();

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Listings</h1>
        <Link href="/products/new">
          <Button>+ Add New Product</Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">You haven't listed any products yet.</p>
          <Link href="/products/new" className="mt-4 inline-block">
            <Button>List Your First Item</Button>
          </Link>
        </div>
      ) : (
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
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                {/* The Delete button will be implemented next */}
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
