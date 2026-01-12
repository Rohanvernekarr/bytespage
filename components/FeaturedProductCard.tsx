"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { Star, ShoppingCart } from "lucide-react";

interface FeaturedProductCardProps {
  product: Product;
}

export function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);

  const isAdded = items.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="mt-8 flex flex-col md:flex-row overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto">
         <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
            <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            />
        </div>
      </div>
      
      <div className="flex flex-col justify-center p-6 md:w-1/2 lg:p-12">
        <h3 className="text-2xl font-bold tracking-tight text-foreground mb-2">
          {product.title}
        </h3>
        <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star
                key={i}
                className={`h-4 w-4 ${
                    i < Math.floor(product.rating || 0)
                    ? "fill-primary text-primary dark:text-white"
                    : "fill-muted text-muted-foreground"
                }`}
                />
            ))}
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>

        <div className="flex flex-col gap-1 mb-6">
             <span className="text-sm text-muted-foreground">Category</span>
             <span className="font-medium">{product.category}</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="text-3xl font-bold text-primary dark:text-white">${product.price}</span>
          {isAdded ? (
            <Link
              href="/cart"
              className="rounded-md bg-green-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              View Cart
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
