export type TProduct = {
    category: string;
    brand: string;
    name: string;
    compatibility: string;
    quantity: number;
    interface: string;
    condition: string;
    capacity: string;
    price: number;
    warrantyPeriod: number;
    color?: string;
    availability: "in stock" | "out of stock";
};
