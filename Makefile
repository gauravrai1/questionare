# Variables
IMAGE_NAME_BACKEND := backend-app
CONTAINER_NAME_BACKEND := backend-container
IMAGE_NAME_FRONTEND := frontend-app
CONTAINER_NAME_FRONTEND := frontend-container

# Docker targets
build-backend:
	docker build -t $(IMAGE_NAME_BACKEND) ./backend

run-backend:
	docker run -d -p 3000:3000 --name $(CONTAINER_NAME_BACKEND) $(IMAGE_NAME_BACKEND)

stop-backend:
	docker stop $(CONTAINER_NAME_BACKEND)

remove-backend:
	docker rm $(CONTAINER_NAME_BACKEND)

restart-backend: stop-backend remove-backend run-backend

build-frontend:
	docker build -t $(IMAGE_NAME_FRONTEND) ./frontend

run-frontend:
	docker run -d -p 3001:3001 --name $(CONTAINER_NAME_FRONTEND) $(IMAGE_NAME_FRONTEND)

stop-frontend:
	docker stop $(CONTAINER_NAME_FRONTEND)

remove-frontend:
	docker rm $(CONTAINER_NAME_FRONTEND)

restart-frontend: stop-frontend remove-frontend run-frontend

# Combined target to build and run both backend and frontend
build-and-run: build-backend run-backend build-frontend run-frontend