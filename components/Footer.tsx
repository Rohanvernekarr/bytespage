"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Category } from "@/types";

export function Footer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentCategory = (searchParams.get("category") as Category) || "All";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "All" || value === "") {
        params.delete(name);
      } else {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleCategoryChange = (category: string) => {
    router.push(pathname + "?" + createQueryString("category", category));
  };
  const categories: Category[] = ["All", "Electronics"];

  return (
    <footer className="w-full bg-primary text-white py-12 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4 items-center">
            <h3 className="text-xl font-bold">Filters</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full border border-primary flex items-center justify-center cursor-pointer ${currentCategory === category ? "bg-primary" : "bg-transparent"}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {currentCategory === category && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )}
                  </div>
                  <label
                    className="cursor-pointer text-sm font-medium text-white hover:text-gray-300"
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-sm text-white mt-4">&copy; 2024 BytesPage</p>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <h3 className="text-xl font-bold">About Us</h3>
            <div className="flex flex-col gap-2 text-white">
              <Link
                href="/about"
                className="hover:text-white/80 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-white/80 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-center">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                className="p-2 rounded-full hover:bg-white/50 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com"
                className="p-2 rounded-full hover:bg-white/50 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="p-2 rounded-full hover:bg-white/50 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
