import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white dark:bg-black text-foreground shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="text-white">Logo</span>
        </Link>

        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search for products.."
              className="w-full rounded-md bg-muted px-9 py-2 text-sm text-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="group relative p-2 hover:bg-muted rounded-full transition-colors">
            <ShoppingCart className="h-6 w-6 text-foreground" />
          </Link>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <User className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>
      <div className="md:hidden px-4 pb-4">
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md bg-muted px-9 py-2 text-sm text-foreground"
            />
        </div>
      </div>
    </header>
  );
}
