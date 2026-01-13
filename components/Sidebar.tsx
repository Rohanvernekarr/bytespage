"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Category } from "@/types";

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = (searchParams.get("category") as Category) || "All";
  const currentPriceMax = Number(searchParams.get("maxPrice")) || 1000;

  const [priceMax, setPriceMax] = useState(currentPriceMax);

  useEffect(() => {
    setPriceMax(currentPriceMax);
  }, [currentPriceMax]);

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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceMax(Number(e.target.value));
  };

  const handlePriceCommit = () => {
    router.push(
      pathname + "?" + createQueryString("maxPrice", priceMax.toString()),
    );
  };

  const categories: Category[] = [
    "All",
    "Electronics",
    "Clothing",
    "Home",
    "Accessories",
  ];

  return (
    <aside className="w-full space-y-8 rounded-lg border border-border bg-primary p-6 md:w-64 md:shrink-0 h-fit">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Category</h3>
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
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Price</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceMax}
            onChange={handlePriceChange}
            onMouseUp={handlePriceCommit}
            onTouchEnd={handlePriceCommit}
            className="w-full accent-white cursor-pointer"
          />
          <div className="flex items-center justify-between text-sm text-white">
            <span>$0</span>
            <span>${priceMax}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
