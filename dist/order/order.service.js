"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bull_1 = require("@nestjs/bull");
const order_entity_1 = require("./order.entity");
let OrderService = class OrderService {
    repo;
    cancelQueue;
    constructor(repo, cancelQueue) {
        this.repo = repo;
        this.cancelQueue = cancelQueue;
    }
    async createOrder(customerId, totalPrice) {
        const order = await this.repo.save({ customerId, totalPrice });
        await this.cancelQueue.add('auto-cancel', { orderId: order.id }, {
            delay: 60 * 1000,
        });
        return order;
    }
    async cancelOrder(orderId) {
        const order = await this.repo.findOneBy({ id: orderId });
        if (order && order.status === 'pending') {
            order.status = 'cancelled';
            await this.repo.save(order);
        }
    }
    async markPaid(orderId) {
        const order = await this.repo.findOneBy({ id: orderId });
        if (order && order.status === 'pending') {
            order.status = 'paid';
            await this.repo.save(order);
        }
    }
    async findById(orderId) {
        return this.repo.findOneBy({ id: orderId });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, bull_1.InjectQueue)('cancel-order')),
    __metadata("design:paramtypes", [typeorm_2.Repository, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map