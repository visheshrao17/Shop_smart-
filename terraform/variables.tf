variable "aws_region" {
  description = "The AWS region to deploy resources into"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "The name of the application"
  type        = string
  default     = "shopsmart"
}

variable "container_port" {
  description = "The port the container listens on"
  type        = number
  default     = 5001
}
