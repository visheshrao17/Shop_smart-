# ECR Repository (Phase 3 Requirement)
resource "aws_ecr_repository" "app_repo" {
  name                 = "${var.app_name}-repo"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  # Prevent accidental deletion — losing all Docker images would be catastrophic
  lifecycle {
    prevent_destroy = true
  }
}

# ECS Cluster
resource "aws_ecs_cluster" "app_cluster" {
  name = "${var.app_name}-cluster"

  # Prevent accidental deletion of the entire cluster
  lifecycle {
    prevent_destroy = true
  }
}

# Fetch existing AWS Academy Role
data "aws_iam_role" "ecs_execution_role" {
  name = "AWSServiceRoleForECS"
}

# ECS Task Definition
resource "aws_ecs_task_definition" "app_task" {
  family                   = "${var.app_name}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = data.aws_iam_role.ecs_execution_role.arn

  # For the initial terraform apply, we use a placeholder image.
  # The actual image will be pushed and updated by the GitHub Actions deployment step.
  container_definitions = jsonencode([
    {
      name  = var.app_name
      image = "nginx:latest" # Placeholder, replaced by CI/CD
      portMappings = [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ]
      essential = true

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "PORT"
          value = tostring(var.container_port)
        }
      ]
    }
  ])
}

# ECS Service (Phase 3 Requirement)
resource "aws_ecs_service" "app_service" {
  name            = "${var.app_name}-service"
  cluster         = aws_ecs_cluster.app_cluster.id
  task_definition = aws_ecs_task_definition.app_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  network_configuration {
    subnets          = [aws_subnet.public_1.id, aws_subnet.public_2.id]
    security_groups  = [aws_security_group.ecs_tasks.id]
    assign_public_ip = true
  }

  # Ignore changes to the task definition made outside of Terraform (by GitHub Actions)
  lifecycle {
    ignore_changes = [task_definition]
  }
}
