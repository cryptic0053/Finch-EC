
# Kubernetes_Architecture.md

## 📦 Overview

This Kubernetes architecture delivers a scalable and resilient microservice-based deployment for the Finch application. It includes a Vue-based frontend, Node.js backend, Redis caching layer, and a PostgreSQL database. The setup supports external routing using an Ingress controller and internal communication via ClusterIP services. Secrets are securely injected into the backend using Kubernetes Secrets.

---

## 🧩 Components Breakdown

### 🖥️ Frontend (Vue.js)

- **Deployment Manifest:** `frontend-deployment.yaml`  
- **Service Manifest:** `frontend-service.yaml`  
- **Ingress Path:** `/`  
- **Exposed Port:** 80 (internal)
- **Service Type:** ClusterIP  
- **Role:** Serves static client-side content

---

### ⚙️ Backend (Node.js)

- **Deployment Manifest:** `backend-deployment.yaml`  
- **Service Manifest:** `backend-service.yaml`  
- **Ingress Path:** `/api`  
- **Exposed Port:** 8000 (internal)
- **Service Type:** ClusterIP  
- **Role:** Handles API requests from the frontend and communicates with Redis/PostgreSQL  
- **Secrets Injected:**
  - [`db-secret.yaml`](./db-secret.yaml): PostgreSQL credentials
  - [`stripe-secret.yaml`](./stripe-secret.yaml): Stripe payment API key

---

### 🛢️ PostgreSQL (Database)

- **Deployment Manifest:** `postgres-deployment.yaml`  
- **Service Manifest:** `postgres-service.yaml`  
- **Persistent Volume Claim:** `postgres-pvc.yaml`  
- **Exposed Port:** 5432  
- **Service Type:** ClusterIP  
- **Role:** Stores persistent user and application data

---

### 🚀 Redis (Cache)

- **Deployment Manifest:** `redis-deployment.yaml`  
- **Service Manifest:** `redis-service.yaml`  
- **Persistent Volume Claim:** `redis-pvc.yaml`  
- **Exposed Port:** 6379  
- **Service Type:** ClusterIP  
- **Role:** Caches frequent requests and temporary application state

---

## 🌐 Ingress Controller

- **Manifest File:** `ingress.yaml`  
- **Domain:** `finch.local`  
- **Ingress Class:** nginx (assumed)
- **Routing Rules:**
  - `/` → `frontend-service` (port 80)
  - `/api` → `backend-service` (port 8000)
- **Purpose:** Provides external HTTP(S) access to internal services with routing logic

---

## 🔐 Secrets Management

- **Manifests:**
  - `db-secret.yaml`: Contains `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
  - `stripe-secret.yaml`: Contains `stripe_key` for secure API interaction
- **Usage:**
  - Backend deployment mounts these via `envFrom` to expose them as environment variables within the container.
- **Security Practices:**
  - Secrets are stored as Kubernetes `Opaque` objects.
  - Avoids hardcoding sensitive information in any application or YAML config.

---

## ✅ Summary Table

| Component     | Deployment File         | Service File         | Port | Extra |
|---------------|--------------------------|------------------------|------|--------|
| Frontend      | `frontend-deployment.yaml` | `frontend-service.yaml` | 80   | `/` via Ingress |
| Backend       | `backend-deployment.yaml`  | `backend-service.yaml`  | 8000 | `/api` via Ingress, uses secrets |
| PostgreSQL    | `postgres-deployment.yaml` | `postgres-service.yaml` | 5432 | Persistent Volume |
| Redis         | `redis-deployment.yaml`    | `redis-service.yaml`    | 6379 | Persistent Volume |
| Ingress       | `ingress.yaml`             | —                      | 80   | Domain: `finch.local` |
| Secrets       | `db-secret.yaml`, `stripe-secret.yaml` | — | — | Mounted in backend |
