// components/Header.tsx
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-[#E6CFA9] to-[#FBF9D1] shadow-md border-b border-[#C1856D] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="inline-block rounded-full overflow-hidden bg-[#FBF9D1] border-2 border-[#9A3F3F] shadow-md">
            <img
              src="/ecofindslogo_nobg.png"
              alt="EcoFinds Logo"
              className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
            />
          </span>
          <span className="text-3xl font-extrabold tracking-tight text-[#9A3F3F] drop-shadow-sm">
            EcoFinds
          </span>
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
