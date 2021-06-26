cnf ?= .env.development
include $(cnf)
export $(shell sed 's/=.*//' $(cnf))

MAJOR?=0
MINOR?=1
VERSION=$(MAJOR).$(MINOR)

APP_NAME = client-service

HUB_NAMESPACE = ${docker_username}		#docker_username shall be pulled from env (OS)

IMAGE_NAME = $(docker_username)/$(APP_NAME)

DOCKER_FILE_DIR = .

DOCKERFILE = ${DOCKER_FILE_DIR}/Dockerfile

#Docker tasks
#Build the container


init:
	@echo 'Makefile ready'
	@echo 'Docker Namespace ${HUB_NAMESPACE}'
	@echo 'Docker Image ${IMAGE_NAME}'

build: ##Build the development container
	@echo 'Building the container image.'
	docker build -f ${DOCKERFILE} --tag $(IMAGE_NAME) .

build-nc: ## Build the container without caching
	@echo 'Building the container image without caching.'
	docker build -f ${DOCKERFILE} --tag ${IMAGE_NAME} .

run : ##Run the container on port 
	@echo 'Running the container on port ${PORT}'
	docker run -i -t --rm -p $(PORT):$(PORT) $(IMAGE_NAME)
	
up:
	@echo '${VERSION}'
	make build
	make run

publish:
	@echo 'Publishing ${IMAGE_NAME} to ${HUB_NAMESPACE}'
	docker push ${IMAGE_NAME}
