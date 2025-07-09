# 📈 Monitoring Setup for Kubernetes Cluster

## 📦 Stack Components

This setup includes the following tools, all deployed into the `monitoring` namespace:

- **Prometheus** – Metrics collection
- **Grafana** – Dashboard visualization
- **Node Exporter** – System-level metrics
- **Loki** – Log aggregation backend
- **Promtail** – Log shipper from pods to Loki

---

## 📁 Namespace

All monitoring components are deployed in:

```bash
kubectl create namespace monitoring
```

---

## ⚙️ 1. Prometheus

### 🧾 Deployment

- Deployed using a YAML file `prometheus-deployment.yaml`
- Scrapes metrics from node-exporter and Promtail

### 🧠 Key Configurations

- `prometheus.yml` config includes scrape jobs for:
  - `node-exporter`
  - `promtail`

---

## ⚙️ 2. Grafana

### 🧾 Deployment

- Image: `grafana/grafana:latest`
- Exposed on port `3000`

### 🔑 Default Login

- Username: `admin`
- Password: `admin` (change immediately)

### 📊 Dashboards

- Datasources added:
  - Prometheus (for metrics)
  - Loki (for logs)
- Dashboards created for:
  - Node metrics
  - Pod logs

---

## ⚙️ 3. Loki

### 🧾 Deployment

- Image: `grafana/loki:2.9.3`
- Port: `3100`
- Uses **boltdb-shipper** with **filesystem** storage
- Configured using a ConfigMap `loki-config`
- Volumes mounted:
  - `/loki` → `emptyDir`
  - `/wal` → `emptyDir`

### ✅ Fixes Applied

- Mounted full `/loki` directory to avoid compactor error
- Added `/wal` mount to fix ingester WAL issue

---

## ⚙️ 4. Promtail

### 🧾 Deployment

- Shipped logs from Kubernetes pods to Loki
- Configured to use `/var/log/containers` and `/var/log/pods`
- Installed using a `DaemonSet`

---

## ⚙️ 5. Node Exporter

### 🧾 Deployment

- Installed as a `DaemonSet`
- Exposes system-level metrics (CPU, Memory, Disk)
- Port: `9100`

---

## 🔍 Verification Commands

```bash
kubectl get pods -n monitoring

kubectl logs -n monitoring deploy/loki

kubectl port-forward svc/grafana 3000:3000 -n monitoring
```

Open Grafana dashboard:
```
http://localhost:3000
```

---

## ✅ Summary

| Component    | Purpose               | Status   |
|--------------|------------------------|----------|
| Prometheus   | Metrics collection     | ✅ Running |
| Grafana      | Visualization           | ✅ Running |
| Loki         | Logs backend            | ✅ Running |
| Promtail     | Log shipper             | ✅ Running |
| Node Exporter| System metrics          | ✅ Running |

---

