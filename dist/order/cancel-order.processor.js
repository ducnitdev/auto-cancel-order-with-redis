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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelOrderProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const order_service_1 = require("./order.service");
let CancelOrderProcessor = class CancelOrderProcessor {
    orderService;
    constructor(orderService) {
        this.orderService = orderService;
    }
    async handleCancelJob(job) {
        const order = await this.orderService.findById(job.data.orderId);
        if (order?.status === 'pending') {
            await this.orderService.cancelOrder(order.id);
        }
    }
};
exports.CancelOrderProcessor = CancelOrderProcessor;
__decorate([
    (0, bull_1.Process)('auto-cancel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CancelOrderProcessor.prototype, "handleCancelJob", null);
exports.CancelOrderProcessor = CancelOrderProcessor = __decorate([
    (0, bull_1.Processor)('cancel-order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], CancelOrderProcessor);
//# sourceMappingURL=cancel-order.processor.js.map