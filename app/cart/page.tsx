"use client";

import { useCartStore } from "@/store/useCartStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, Minus, Plus, ArrowLeft } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
        <div className="space-y-4">
            <div className="h-24 w-full bg-muted rounded-lg animate-pulse"></div>
            <div className="h-24 w-full bg-muted rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12 flex flex-col items-center justify-center min-h-[50vh] text-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Your cart is empty</h1>
        <p className="text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8 py-2"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/5"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between self-stretch sm:flex-row sm:items-center">
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.category}
                  </p>
                  <span className="font-medium text-primary sm:hidden">
                    ${item.price}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-6 sm:mt-0">
                  <div className="flex items-center rounded-md border border-border">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-l-md bg-transparent hover:bg-muted focus:outline-none disabled:opacity-50"
                      disabled={item.quantity <= 1}
                      title="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <div className="flex h-8 w-10 items-center justify-center text-sm font-medium">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-r-md bg-transparent hover:bg-muted focus:outline-none disabled:opacity-50"
                      disabled={item.quantity >= 99}
                      title="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <div className="hidden text-right sm:block w-24">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      {item.quantity > 1 && (
                          <p className="text-xs text-muted-foreground">${item.price} each</p>
                      )}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-border pb-4">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <button
                className="w-full rounded-md bg-primary py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
