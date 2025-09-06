// components/ProductCard.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
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
  return (
    <Link href={`/products/${productId}`}>
      <Card className="w-full h-full flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0 flex-shrink-0">
          <div className="relative aspect-square w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <div className="p-4 flex-grow flex flex-col">
          <p className="text-sm font-medium text-gray-500 capitalize">
            {category}
          </p>
          <CardTitle className="mt-1 text-lg font-semibold line-clamp-2 flex-grow">
            {title}
          </CardTitle>
          <p className="mt-2 text-xl font-bold text-gray-800">
            ${price.toFixed(2)}
          </p>
        </div>
      </Card>
    </Link>
  );
}
