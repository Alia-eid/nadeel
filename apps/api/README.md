# API Setup

## 1) Configure environment

Copy `.env.example` to `.env` and set real values.

## 2) Run database migration

```bash
npm run prisma:migrate --prefix apps/api -- --name init
```

## 3) Generate Prisma client

```bash
npm run prisma:generate --prefix apps/api
```

## 4) Seed sample products

```bash
npm run seed --prefix apps/api
```

## 5) Start API

```bash
npm run dev --prefix apps/api
```

## 6) Create the single admin account

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `ADMIN_NAME` in `apps/api/.env`, then run:

```bash
npm run create-admin --prefix apps/api
```

Health route: `GET /api/health`
