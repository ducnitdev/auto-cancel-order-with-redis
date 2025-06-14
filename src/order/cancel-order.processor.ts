import { Process, Processor } from "@nestjs/bull";
import { OrderService } from "./order.service";
import { Job } from "bull";

// cancel-order.processor.ts
@Processor('cancel-order')
export class CancelOrderProcessor {
  constructor(private readonly orderService: OrderService) {}

  @Process('auto-cancel')
  async handleCancelJob(job: Job) {
    const order = await this.orderService.findById(job.data.orderId);
    if (order?.status === 'pending') {
      await this.orderService.cancelOrder(order.id);
    }
  }
}
