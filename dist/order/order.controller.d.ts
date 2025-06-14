import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(body: {
        customerId: string;
        totalPrice: number;
    }): Promise<{
        customerId: string;
        totalPrice: number;
    } & import("./order.entity").Order>;
    pay(id: string): Promise<void>;
    cancel(id: string): Promise<void>;
    get(id: string): Promise<import("./order.entity").Order | null>;
}
