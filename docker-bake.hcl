variable "TAG" {
  default = "latest"
}

variable "DOCKERHUB_USER" {
  default = "myuser"
}

group "default" {
  targets = ["backend", "frontend"]
}

target "backend" {
  context = "./backend"
  dockerfile = "Dockerfile"
  platforms = ["linux/amd64", "linux/arm64"]
  tags = ["${DOCKERHUB_USER}/myapp-backend:${TAG}"]
  output = ["type=registry"]
}

target "frontend" {
  context = "./frontend"
  dockerfile = "Dockerfile"
  platforms = ["linux/amd64", "linux/arm64"]
  tags = ["${DOCKERHUB_USER}/myapp-frontend:${TAG}"]
  output = ["type=registry"]
}
