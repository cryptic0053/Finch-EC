# Docker Containerization

This phase involved building production-grade Docker images for both frontend and backend apps using multi-stage builds and best practices.

---

## Backend (Django)

- Multi-stage build (Ubuntu 22.04)
- Python virtual environment (`venv`)
- PostgreSQL client support (`libpq-dev`)
- Secure: runs with a non-root user (`appuser`)
- CMD: `migrate`, `createsuperuser`, `runserver`

## Frontend (Vue + NGINX)

- Stage 1: Build with Node.js 18 Alpine
- Stage 2: Serve with NGINX (static deployment)
- Lightweight, fast, ready for production

## Optimization Techniques

- Multi-stage builds for minimal image size
- `.dockerignore` for build efficiency
- `docker-compose.yml` for local orchestration

---

## Usage (Local)

```bash
docker-compose up --build
