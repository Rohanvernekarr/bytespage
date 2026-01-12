import { Suspense } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ProductList } from "@/components/ProductList";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Product Listing</h1>
        
        <div className="flex flex-col gap-8 md:flex-row">
            <Suspense fallback={<div className="w-full md:w-64 h-96 bg-gray-100 rounded-lg animate-pulse" />}>
                <Sidebar />
            </Suspense>
          
          <div className="flex-1">
             <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                 {[1,2,3,4,5,6].map(i => (
                     <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
                 ))}
             </div>}>
                <ProductList />
             </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
