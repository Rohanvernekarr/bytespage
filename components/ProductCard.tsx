"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);
  
  const isAdded = items.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
         <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
            
             <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
         </div>
      </Link>
      
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
            <h3 className="text-lg font-semibold tracking-tight text-foreground line-clamp-1" title={product.title}>
            {product.title}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-muted-foreground">{product.rating || 0}</span>
            </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-primary dark:text-white">${product.price}</span>
          {isAdded ? (
            <Link
              href="/cart"
              className="rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              View Cart
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
