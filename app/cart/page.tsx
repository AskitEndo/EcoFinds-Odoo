// app/cart/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

// In a real app, this data would come from a state management solution or database
const mockCartItems = [
  {
    id: "1",
    title: "Vintage Leather Jacket",
    price: 75.0,
    imageUrl: "https://placehold.co/600x400/D2B48C/31343C?text=Jacket",
    quantity: 1,
  },
  {
    id: "2",
    title: "First Edition Novel",
    price: 45.5,
    imageUrl: "https://placehold.co/600x400/87CEEB/31343C?text=Book",
    quantity: 1,
  },
];

export default function CartPage() {
  const subtotal = mockCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>

      {mockCartItems.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <p className="text-gray-500">Your cart is empty.</p>
          <Link href="/" className="mt-4 inline-block">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {mockCartItems.map((item) => (
              <Card
                key={item.id}
                className="flex items-center p-4 justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 rounded-md overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p>Qty: {item.quantity}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Shipping</p>
                <p className="font-semibold">FREE</p>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-bold text-xl mt-4">
                <p>Total</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <Button size="lg" className="w-full mt-6">
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
