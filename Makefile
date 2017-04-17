

compose:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

shell-node:
	docker-compose exec node /bin/sh

shell-influxdb:
	docker-compose exec influx /bin/sh

influx:
	docker-compose exec influx influx

test-node:
	docker-compose exec node /bin/sh -c mocha

.PHONY:
	compose build down shell-node shell-influx test-node influx
