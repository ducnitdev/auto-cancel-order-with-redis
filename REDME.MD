# 🛒 NestJS E-commerce Checkout with Redis Auto-Cancel

This is a mini eCommerce checkout system built with **NestJS**, **PostgreSQL**, and **Redis** using **Bull Queue** to auto-cancel unpaid orders after a configurable time (default: 15 minutes).

---

## 🚀 Features

- Create Order (`pending` status)
- Pay Order (`pending` → `paid`)
- Auto-cancel unpaid order via Redis job queue
- Cancel manually anytime before payment
- Uses PostgreSQL via TypeORM
- Uses Redis Bull Queue for delayed job processing

---

## ⚙️ Tech Stack

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [Bull Queue](https://docs.bullmq.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

---

## 🧪 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nestjs-ecommerce-checkout.git
cd nestjs-ecommerce-checkout
