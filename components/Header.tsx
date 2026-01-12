"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Moon, Sun } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const totalItems = useCartStore((state) => state.totalItems());
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary text-foreground shadow-sm">
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
              className="w-full rounded-md bg-muted px-9 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get("query")?.toString()}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 cursor-pointer rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-white" />
              )}
            </button>
          )}
          <Link href="/cart" className="group relative p-2 cursor-pointer rounded-full transition-colors">
            <ShoppingCart className="h-6 w-6 text-white" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="p-2 cursor-pointer rounded-full transition-colors">
            <User className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
     
       <div className="md:hidden px-4 pb-4">
        <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md bg-muted px-9 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              onChange={(e) => handleSearch(e.target.value)}
              defaultValue={searchParams.get("query")?.toString()}
            />
        </div>
      </div>
    </header>
  );
}
