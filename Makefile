setup:
	docker volume create nodemodules
install:
	docker-compose -f docker-compose.builder.yml run --rm install
dev:
	docker-compose -f docker-compose.dev.yml up
bundle:
	docker-compose -f docker-compose.builder.yml run --rm build