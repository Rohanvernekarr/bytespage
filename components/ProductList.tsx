"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { FeaturedProductCard } from "@/components/FeaturedProductCard";
import { products } from "@/lib/data"; 
import { useMemo } from "react";

export function ProductList() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const maxPrice = searchParams.get("maxPrice");
  const query = searchParams.get("query");
  
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (query && !product.title.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      if (category && category !== "All" && product.category !== category) {
        return false;
      }

      if (maxPrice && product.price > Number(maxPrice)) {
        return false;
      }

      return true;
    });
  }, [category, maxPrice, query]);

  if (filteredProducts.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-center bg-gray-50 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold text-foreground">No products found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        {products.find(p => p.id === "7") && (
             <FeaturedProductCard product={products.find(p => p.id === "7")!} />
        )}
      </div>
    </div>
  );
}
