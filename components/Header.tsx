// components/Header.tsx
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0] shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-green-700 flex items-center gap-2"
        >
          <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-green-700 text-lg font-bold shadow-sm">
            🌱
          </span>
          EcoFinds
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <SignedIn>
            <Link href="/dashboard/my-listings">
              <Button
                variant="ghost"
                className="hover:bg-green-100 hover:text-green-700 transition-colors"
              >
                My Listings
              </Button>
            </Link>
            <Link href="/dashboard/purchases">
              <Button
                variant="ghost"
                className="hover:bg-green-100 hover:text-green-700 transition-colors"
              >
                Purchases
              </Button>
            </Link>
            <Link href="/products/new">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-colors">
                + List an Item
              </Button>
            </Link>
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-green-100 hover:text-green-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <div className="ml-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 hover:border-green-700"
              >
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md transition-colors">
                Sign Up
              </Button>
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
