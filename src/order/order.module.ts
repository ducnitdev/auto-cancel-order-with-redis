import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CancelOrderProcessor } from './cancel-order.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    BullModule.registerQueue({
      name: 'cancel-order',
    }),
  ],
  providers: [OrderService, CancelOrderProcessor],
  controllers: [OrderController],
})
export class OrderModule {}