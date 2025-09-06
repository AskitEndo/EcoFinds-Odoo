// app/products/[productId]/page.tsx
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // <-- We'll use a badge for the category

const prisma = new PrismaClient();

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound(); // This will automatically render the Next.js 404 page
  }
  return product;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProduct(params.productId);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Column */}
        <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Details Column */}
        <div className="flex flex-col">
          <Badge variant="outline" className="w-fit capitalize mb-2">
            {product.category}
          </Badge>
          <h1 className="text-4xl font-bold leading-tight">{product.title}</h1>
          <p className="text-3xl font-bold text-gray-800 my-4">
            ${product.price.toFixed(2)}
          </p>

          <div className="prose text-gray-600 mt-4">
            <p>{product.description}</p>
          </div>

          <div className="mt-auto pt-8">
            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
