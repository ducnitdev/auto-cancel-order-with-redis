export declare class Order {
    id: string;
    customerId: string;
    status: 'pending' | 'paid' | 'cancelled';
    totalPrice: number;
    createdAt: Date;
}
