export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
    description?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Clothing' | 'Home' | 'Accessories';

export interface FilterState {
    category: string;
    priceRange: [number, number];
    searchQuery: string;
}
