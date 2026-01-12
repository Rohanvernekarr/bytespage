"use client";

import { useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/useCartStore";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find((p) => p.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const items = useCartStore((state) => state.items);
  
  const [quantity, setQuantity] = useState(1);
  const isAdded = items.some((item) => item.id === product?.id);

  if (!product) {
    notFound();
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
         <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-zinc-800">
            <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
            />
         </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold text-primary">
                ${product.price}
              </span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <span className="text-base font-medium text-muted-foreground">
                  {product.rating || 0}
                </span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
            </div>
            <div className="mt-2 inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {product.category}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              Description
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
          </div>

          <div className="mt-auto space-y-6 pt-6 border-t border-border">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Quantity
                </label>
                <div className="flex items-center rounded-md border border-border">
                  <button
                    onClick={handleDecrease}
                    className="flex h-10 w-10 items-center justify-center rounded-l-md bg-background text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex h-10 w-12 items-center justify-center border-x border-border bg-background text-sm font-medium">
                    {quantity}
                  </div>
                  <button
                    onClick={handleIncrease}
                    className="flex h-10 w-10 items-center justify-center rounded-r-md bg-background text-muted-foreground hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:opacity-50"
                    disabled={quantity >= 99}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {isAdded ? (
                <Link
                  href="/cart"
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-green-600 h-10 px-8 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-green-700"
                >
                  <ShoppingCart className="h-4 w-4" />
                  View Cart
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary h-10 px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
