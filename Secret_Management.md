
# Secret_Management.md

## 🔐 Overview

This document outlines the strategy and implementation of secret management in the Kubernetes deployment of the Finch application.

Secrets include sensitive data such as database credentials and API keys, which must be protected from exposure in version control, logs, and environment configurations.

---

## 🧾 Kubernetes Secrets Used

### 1. `db-secret.yaml`

Stores PostgreSQL credentials required by the backend application.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-secret
type: Opaque
stringData:
  db_name: postgres
  db_user: postgres
  db_password: mypostgres123

```

### 2. `stripe-secret.yaml`

Stores the Stripe API key used for payment integration.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: stripe-secret
type: Opaque
stringData:
  stripe_key: sk_test_dummykey1234567890

```

> Note: You can generate base64 values using `echo -n 'value' | base64`

---

## 🛠️ Usage in Deployments

These secrets are mounted into the backend application using the `envFrom` method in the `backend-deployment.yaml`:

```yaml
envFrom:
  - secretRef:
      name: db-secret
  - secretRef:
      name: stripe-secret
```

This allows all key-value pairs inside the secret to become environment variables inside the container.

---

## ✅ Best Practices

- **Never commit actual secret values** to Git repositories.
- Use `kubectl create secret` to manage secrets from CLI securely.
- Rotate secrets regularly.
- Consider using external secret managers (e.g., HashiCorp Vault, AWS Secrets Manager) for production-grade setups.

---

## 🧪 Applying Secrets

You can apply the secrets using the following command:

```bash
kubectl apply -f db-secret.yaml
kubectl apply -f stripe-secret.yaml
```

Make sure the secrets are created **before** the backend pods start to ensure proper environment setup.
