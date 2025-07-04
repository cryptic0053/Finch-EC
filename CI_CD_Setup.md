# CI/CD Pipeline Setup (GitHub Actions)

## Tool Used
GitHub Actions is used for automated build, test, lint, and Docker image deployment.

---

## 🔧 Frontend Pipeline

- **Runs on**: Push or PR to `main` branch
- **Steps**:
  - Checkout code
  - Setup Node.js (v18)
  - Install dependencies
  - Run linter (soft fail)
  - Skip or run tests (soft fail)
  - Build app
  - Build Docker image
  - Push to Docker Hub

---

## 🐍 Backend Pipeline

- **Runs on**: Push or PR to `main` branch
- **Steps**:
  - Checkout code
  - Setup Python (v3.10)
  - Install dependencies
  - Skip or run tests (soft fail)
  - Build Docker image
  - Push to Docker Hub

---

## 📊 Monitor Pipelines

- Go to the GitHub repo → **Actions** tab
- Select a workflow run
- View logs, steps, and Docker push status
