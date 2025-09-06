import { PrismaClient } from "@prisma/client";
import ProductCard from "@/components/ProductCard";

const prisma = new PrismaClient();

// This is a Server Component, so we can fetch data directly
async function getProducts() {
  const products = await prisma.product.findMany({
    // Get the newest products first
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Featured Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500 mt-12">
          No products have been listed yet. Be the first!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              productId={product.id}
              title={product.title}
              category={product.category}
              price={product.price}
              imageUrl={product.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
