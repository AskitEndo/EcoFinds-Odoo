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
    <main className="min-h-screen bg-[#FBF9D1]">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-gradient-to-b from-[#E6CFA9] to-[#FBF9D1] border-b-4 border-[#C1856D] relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-5xl w-full">
          <div className="flex-1 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/ecofindslogo_nobg.png"
                alt="EcoFinds Logo"
                className="h-16 w-16 rounded-full border-2 border-[#9A3F3F] bg-[#FBF9D1] shadow-lg"
              />
              <span className="text-4xl md:text-5xl font-extrabold text-[#9A3F3F] drop-shadow-sm tracking-tight">
                EcoFinds
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#9A3F3F] mb-2">
              Sustainable Second-Hand Marketplace
            </h2>
            <p className="text-lg md:text-xl text-[#9A3F3F] max-w-xl mb-6">
              Discover unique pre-owned treasures, extend product lifecycles,
              and join a community passionate about sustainability. Buy, sell,
              and make a difference—one find at a time.
            </p>
            <a href="/products/new" className="inline-block">
              <button className="px-6 py-3 rounded-full bg-[#9A3F3F] text-[#FBF9D1] font-semibold text-lg shadow-lg hover:bg-[#C1856D] transition-colors">
                + List Your First Item
              </button>
            </a>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src="/ecofindslogo_nobg.png"
              alt="EcoFinds Hero"
              className="rounded-3xl shadow-2xl w-full max-w-xs md:max-w-sm border-4 border-[#E6CFA9]"
            />
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#C1856D] opacity-20 rounded-full blur-2xl z-0" />
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#E6CFA9] opacity-30 rounded-full blur-2xl z-0" />
      </section>

      {/* Product Feed */}
      <section className="container mx-auto py-12 px-2 md:px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#9A3F3F] drop-shadow-sm">
          Featured Products
        </h1>
        {products.length === 0 ? (
          <p className="text-center text-[#C1856D] mt-12 text-lg font-medium">
            No products have been listed yet. Be the first!
          </p>
        ) : (
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-[#C1856D]/40 scrollbar-track-[#FBF9D1]">
            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-[260px] max-w-[320px] flex-shrink-0"
              >
                <ProductCard
                  productId={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              </div>
            ))}
          </div>
        )}
        {/* Custom scrollbar styles moved to globals.css for Server Component compatibility */}
      </section>
    </main>
  );
}
