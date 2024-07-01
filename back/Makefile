.PHONY: up down pgadmin

up:
	docker-compose up -d

down:
	docker-compose down

pgadmin:
	open http://localhost:5050

dev:
	make up & npm run dev

test:
	npm run test

build:
	npm run build

start:
	make build & npm run start

migrate:
	npx prisma migrate dev --name $(name)
