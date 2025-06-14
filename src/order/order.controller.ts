import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body: { customerId: string; totalPrice: number }) {
    return this.orderService.createOrder(body.customerId, body.totalPrice);
  }

  @Post(':id/pay')
  pay(@Param('id') id: string) {
    return this.orderService.markPaid(id);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.orderService.cancelOrder(id);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.orderService.findById(id);
  }
}
