import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-background text-foreground py-12 text-center">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 items-center">
                <h3 className="text-xl font-bold">Filters</h3>
                <div className="flex flex-col gap-2 text-muted-foreground">
                    <Link href="/" className="hover:text-foreground transition-colors">All</Link>
                    <Link href="/electronics" className="hover:text-foreground transition-colors">Electronics</Link>
                </div>
                <p className="text-sm text-muted-foreground mt-4">&copy; 2024 BytesPage</p>
            </div>
            
            <div className="flex flex-col gap-4 items-center">
                <h3 className="text-xl font-bold">About Us</h3>
                 <div className="flex flex-col gap-2 text-muted-foreground">
                  <Link href="/about" className="hover:text-foreground transition-colors">About Us</Link>
                  <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                </div>
            </div>

            <div className="flex flex-col gap-4 items-center">
                <h3 className="text-xl font-bold">Follow Us</h3>
                 <div className="flex items-center gap-4">
                    <Link href="https://facebook.com" className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                        <Facebook className="h-5 w-5" />
                    </Link>
                    <Link href="https://x.com" className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                        <Twitter className="h-5 w-5" />
                    </Link>
                    <Link href="https://instagram.com" className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors">
                        <Instagram className="h-5 w-5" />
                    </Link>
                </div>
            </div>
            
        </div>
      </div>
    </footer>
  );
}
