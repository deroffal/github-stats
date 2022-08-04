FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install && npm run build

FROM node:16

WORKDIR /app/

COPY --from=builder /app/dist .
