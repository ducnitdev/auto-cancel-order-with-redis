// 4. Order Service: src/order/order.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
    @InjectQueue('cancel-order')
    private readonly cancelQueue: Queue,
  ) {}

  async createOrder(customerId: string, totalPrice: number) {
    const order = await this.repo.save({ customerId, totalPrice });
    await this.cancelQueue.add('auto-cancel', { orderId: order.id }, {
      delay: 60 * 1000,
    });
    return order;
  }

  async cancelOrder(orderId: string) {
    const order = await this.repo.findOneBy({ id: orderId });
    if (order && order.status === 'pending') {
      order.status = 'cancelled';
      await this.repo.save(order);
    }
  }

  async markPaid(orderId: string) {
    const order = await this.repo.findOneBy({ id: orderId });
    if (order && order.status === 'pending') {
      order.status = 'paid';
      await this.repo.save(order);
    }
  }

  async findById(orderId: string) {
    return this.repo.findOneBy({ id: orderId });
  }
}