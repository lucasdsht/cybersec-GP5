.PHONY: up down pgadmin

up:
	docker-compose up -d

down:
	docker-compose down

pgadmin:
	open http://localhost:5050

dev:
	make up & pnpm dev

test:
	pnpm test

build:
	pnpm build

start:
	make build & pnpm start

migrate:
	npx prisma migrate dev --name $(name)
