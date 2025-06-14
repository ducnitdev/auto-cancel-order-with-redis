import { OrderService } from "./order.service";
import { Job } from "bull";
export declare class CancelOrderProcessor {
    private readonly orderService;
    constructor(orderService: OrderService);
    handleCancelJob(job: Job): Promise<void>;
}
