# 🚨 Rakshak.AI - Real-Time Threat Detection & Protection System

**Rakshak.AI** is an intelligent, real-time cyber threat detection and protection system designed to monitor, detect, and block unauthorized access, malicious IPs, and cyberattacks as they happen. Built for Hackathons like [Triwizardathon](https://triwizardathon.com/), this project provides a full-stack secure infrastructure using cutting-edge tools.

---

## 🧠 Built By Team: **Code Genius**

### 👥 Contributors:
- **Shubham Uprade**  
  *Frontend, Backend Development, UI/UX, Dashboard Design*
- **Chandrabhan Gadeshwar**  
  *Backend API, Python Scripting, Threat Simulation, Docker Integration*

---


## 📁 Folder Structure

```bash
Rakshak.Ai/
├── client/
│   ├── src/
│   │   ├── components/           # Navbar, Dashboard, AttackSimulator, etc.
│   │   ├── pages/                # Login.jsx, AdminDashboard.jsx, UserDashboard.jsx
│   │   ├── context/              # AuthContext.jsx for auth state
│   │   └── utils/                # axiosConfig.js, geoFlag.js
│   └── tailwind.config.js       # TailwindCSS configuration
│
├── server/
│   ├── routes/                  # logs.js, auth.js, control.js – API routes
│   ├── middleware/              # Logging and Auth Middleware
│   ├── models/                  # Mongoose Models – Log, User, Stats, BlockedIP
│   ├── utils/                   # abuseCheck.js, geoLookup.js, jwtUtils.js
│   └── server.js                # Express server entry point
│
├── db/                         # MongoDB container setup
├── attack-simulator/           # Python scripts for simulating attacks
├── docker-compose.yml          # Orchestrates all services
└── README.md                   # Documentation

# 🛡️ Rakshak.AI - Real-Time Threat Detection & Defense Dashboard

Rakshak.AI is a full-stack cybersecurity platform designed to detect, simulate, and block real-time web threats. It provides both **Admin** and **User Dashboards**, live traffic monitoring, attack simulation, and integration with security APIs like AbuseIPDB and Geo-IP services.

---

## 🌐 Features Overview

### 🔐 Authentication System
Role-based login secured using JWT tokens.

- **Admin**: Full access to dashboards, logs, IP controls, and simulators.
- **User**: Limited access to simulation tools and basic logs.
- Secure routing ensures **no unauthorized access** to admin resources.

---

### 📊 Admin Dashboard Features
The admin panel is designed for real-time visibility and control:

- **Live Stats Panel**:
  - Total requests
  - Threats blocked
  - Alerts triggered
  - Countries tracked
  - Anomalies detected
  - Blocked IPs

- **Interactive Graphs (Chart.js)**:
  - Weekly trends of traffic
  - Safe vs malicious request patterns

---

### 🌍 Geo-IP Detection & Mapping
- Integrates with **ip-api.com** and **ipinfo.io**
- Converts each IP into:
  - Country name & flag
  - ISP
  - Geo coordinates
- Filter and analyze by country to detect region-based attacks.

---

### 📡 Real-Time Traffic Logs
Live monitoring and updating logs every 3 seconds.

- Logs contain:
  - IP Address
  - Country
  - ISP
  - Method & URL
  - Time of request
  - Threat detected (if any)
  - Status (Safe, Suspicious, Blocked)

- **Color-coded Log View**:
  - 🟩 Green: Safe
  - 🟨 Yellow: Suspicious
  - 🟥 Red: Blocked

---

### 💥 Attack Simulation Tools
Simulate attacks for learning, testing, and demoing defense:

- `flood.sh`: HTTP Flood (DDoS simulation)
- `brute-force.sh`: Repeated login attempts
- `stuffing.js`: Credential stuffing simulation
- Also accessible via the Web UI Simulator tab

---

### 🛡️ Real-Time Threat Detection
AI-like backend logic to detect and block in real time:

- Detects:
  - Brute-force patterns
  - DDoS/flooding attempts
  - Bot headers & anomalies
- **IP Blocking**:
  - Automatically blocks IPs
  - Stores in MongoDB
  - Admin can manually unblock via dashboard

---

### 🧭 UI Navigation & Pages
Built with **React.js + Tailwind CSS**, routes are role-based:

| Path             | Description                         |
|------------------|-------------------------------------|
| `/login`         | Secure login for Admin & User       |
| `/dashboard`     | Role-based dashboard                |
| `/logs`          | Real-time traffic logs              |
| `/alerts`        | View blocked/malicious alerts       |
| `/control`       | Admin control for IP blocking       |
| `/simulators`    | Trigger test attacks                |
| `/logout`        | End session securely                |

---

## 🛠️ Technologies Used

| Layer       | Stack                                 |
|-------------|----------------------------------------|
| Frontend    | React.js, Tailwind CSS, Axios, Toastify |
| Backend     | Node.js, Express.js, JWT Auth         |
| Database    | MongoDB with Mongoose ORM             |
| Security    | AbuseIPDB API, ip-api.com, ipinfo.io  |
| Charts      | Chart.js for real-time data viz       |
| DevOps      | Docker + Docker Compose               |

---

## 🧪 Sample Log Format


---

## 📦 How to Run the Project (Dev Setup)

### Prerequisites
- Docker & Docker Compose installed
- Ports `5173`, `5000`, and `27017` free

### 🔧 Steps

```bash
# 1. Clone the repository
git clone https://github.com/Sonu1511-sss/Rakshak.Ai-Final.git
cd Rakshak.Ai-Final

# 2. Build and Run with Docker
docker-compose up --build

Then visit:
Frontend – http://localhost:3000
Backend – http://localhost:5000

🔐 Security & Privacy
JWT-based token authentication

Secure routing for sensitive routes

Logs and IPs stored in encrypted MongoDB collections

Optional integration with AbuseIPDB for enhanced protection

🚀 Future Roadmap
🧠 AI-powered anomaly detection

🌐 Live heatmap of global threats

🔔 Email/SMS alerting system (Twilio)

📡 WebSocket-based live updates

📊 Machine Learning for threat scoring

👥 Who Should Use This?
👨‍💻 Hackathon & Cybersecurity Students

🧪 Pen-testing & Security Simulation

🏢 Internal Security Teams for monitoring

📚 Trainers/Institutions teaching real-time defense

