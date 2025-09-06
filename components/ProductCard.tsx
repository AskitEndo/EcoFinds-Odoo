// components/ProductCard.tsx
"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  productId: string;
  imageUrl: string;
  title: string;
  category: string;
  price: number;
}

export default function ProductCard({
  productId,
  imageUrl,
  title,
  category,
  price,
}: ProductCardProps) {
  // Fallback placeholder if image fails or is missing
  const [imgSrc, setImgSrc] = useState(
    imageUrl || "https://placehold.co/600x600/E6CFA9/9A3F3F?text=No+Image"
  );
  return (
    <Link href={`/products/${productId}`}>
      <Card className="w-full h-full flex flex-col overflow-hidden transition-shadow hover:shadow-2xl bg-[#E6CFA9] border-2 border-[#C1856D]">
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
            <Image
              src={imgSrc}
              alt={title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() =>
                setImgSrc(
                  "https://placehold.co/600x600/E6CFA9/9A3F3F?text=No+Image"
                )
              }
              priority={false}
            />
          </div>
        </CardHeader>
        <div className="p-3 flex-grow flex flex-col">
          <p className="text-[10px] font-semibold text-[#C1856D] uppercase tracking-wide mb-1">
            {category}
          </p>
          <CardTitle className="mt-1 text-base font-bold line-clamp-2 flex-grow text-[#9A3F3F]">
            {title}
          </CardTitle>
          <p className="mt-2 text-lg font-extrabold text-[#9A3F3F]">
            ${price.toFixed(2)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
