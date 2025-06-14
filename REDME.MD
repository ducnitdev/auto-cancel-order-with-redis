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
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup PostgreSQL & Redis

#### Option A: Use Docker

```yaml
# docker-compose.yml
version: '3'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: ecommerce
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

```bash
docker-compose up -d
```

> Or create `ecommerce` database manually in PostgreSQL if not using Docker.

---

## ▶️ Running the App

```bash
npm run start:dev
```

App runs on `http://localhost:3000`

---

## 📬 API Endpoints

### ➕ Create Order

```http
POST /orders
{
  "customerId": "user123",
  "totalPrice": 200000
}
```

### 💸 Pay Order

```http
POST /orders/:id/pay
```

### 🛑 Cancel Order

```http
POST /orders/:id/cancel
```

### 🔍 Get Order Info

```http
GET /orders/:id
```

---

## ⏱️ Auto Cancel Flow

1. When an order is created, a job is scheduled in Redis (Bull queue) to auto-cancel after 15 minutes.
2. If the user pays before timeout, status becomes `paid` and cancel job does nothing.
3. If timeout is reached and still `pending`, order is auto-cancelled.

To test faster, you can change delay in `order.service.ts`:

```ts
delay: 60 * 1000  // 1 minute for testing
```

---

## 🧪 How to Test (using cURL)

### 1. Create an Order

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId": "user123", "totalPrice": 500000}'
```

### 2. Pay the Order

```bash
curl -X POST http://localhost:3000/orders/<ORDER_ID>/pay
```

### 3. Cancel the Order

```bash
curl -X POST http://localhost:3000/orders/<ORDER_ID>/cancel
```

### 4. Get Order Status

```bash
curl http://localhost:3000/orders/<ORDER_ID>
```

### 5. Test Auto Cancel

- After creating the order, **do not call `/pay`**.
- Wait for the delay (default 15 minutes or reduce to 1 minute in code).
- Then call `/orders/:id` to check if status is `cancelled`.

---

## 📂 Project Structure

```
src/
├── app.module.ts
└── order/
    ├── order.controller.ts
    ├── order.entity.ts
    ├── order.module.ts
    ├── order.service.ts
    └── cancel-order.processor.ts
```

---

## ✅ TODO (Ideas)

- Email notification on cancel
- Inventory rollback
- Order history for customer
- Unit tests with Jest
- Add Swagger docs

---

## 📄 License

MIT

---