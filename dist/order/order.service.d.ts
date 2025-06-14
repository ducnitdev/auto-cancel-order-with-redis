import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { Order } from './order.entity';
export declare class OrderService {
    private readonly repo;
    private readonly cancelQueue;
    constructor(repo: Repository<Order>, cancelQueue: Queue);
    createOrder(customerId: string, totalPrice: number): Promise<{
        customerId: string;
        totalPrice: number;
    } & Order>;
    cancelOrder(orderId: string): Promise<void>;
    markPaid(orderId: string): Promise<void>;
    findById(orderId: string): Promise<Order | null>;
}
