
# 🛡️ Rakshak.AI - Real-Time Threat Detection & Defense Dashboard

**Rakshak.AI** is an intelligent, real-time cyber threat detection and protection system designed to monitor, detect, and block unauthorized access, malicious IPs, and cyberattacks as they happen. Built for Hackathons like [Triwizardathon](https://triwizardathon.com/), this project provides a full-stack secure infrastructure using cutting-edge tools.

---

## 🧠 Built By Team: **Code Genius**

### 👥 Contributors:
- **Shubham Uprade** *Frontend, Backend Development, UI/UX, Dashboard Design*
- **Chandrabhan Gadeshwar** *Backend API, Python Scripting, Threat Simulation, Docker Integration*

---

## 📁 Folder Structure

```bash
Rakshak.Ai/
├── .git/                               # Git version control files
├── .github/                            # GitHub specific configurations (e.g., workflows)
├── .gitignore                          # Files/directories to ignore in Git
├── .env.example                        # Example environment variables file
├── analyzer/                           # (Potentially related to threat analysis)
├── attack-simulator/                   # Python scripts for simulating attacks
├── docs/                               # Project documentation
├── nginx/                              # Nginx configuration (likely for reverse proxy/load balancing)
├── node_modules/                       # Node.js dependencies
├── src/                                # Frontend source code (React.js)
│   ├── components/                     # Navbar, Dashboard, AttackSimulator, etc.
│   ├── context/                        # AuthContext.jsx for auth state
│   ├── pages/                          # Login.jsx, AdminDashboard.jsx, UserDashboard.jsx
│   └── utils/                          # axiosConfig.js, geoFlag.js
├── db/                                 # MongoDB container setup (implied from README)
├── public/                             # Public assets for the frontend
├── routes/                             # API routes (logs.js, auth.js, control.js)
├── middleware/                         # Logging and Auth Middleware
├── models/                             # Mongoose Models (Log, User, Stats, BlockedIP)
├── utils/                              # abuseCheck.js, geoLookup.js, jwtUtils.js
├── server.js                           # Express server entry point (backend)
├── docker-compose.yml                  # Orchestrates all services
├── Dockerfile-frontend                 # Dockerfile for the frontend
├── eslint.config.js                    # ESLint configuration
├── index.html                          # Frontend entry point
├── package-lock.json                   # Node.js dependency lock file
├── package.json                        # Node.js project metadata and scripts
├── postcss.config.js                   # PostCSS configuration
├── README.md                           # Project documentation (this file)
├── tailwind.config.js                  # TailwindCSS configuration
├── tsconfig.app.json                   # TypeScript configuration for the app
├── tsconfig.json                       # Base TypeScript configuration
├── tsconfig.node.json                  # TypeScript configuration for Node.js
└── vite.config.ts                      # Vite configuration (for frontend build)
````

## 🌐 Features Overview

### 🔐 Authentication System

Rakshak.AI implements a robust role-based authentication system secured using JWT (JSON Web Tokens):

  - **Admin**: Full access to all dashboards, detailed logs, IP control functionalities, and attack simulators.
  - **User**: Limited access primarily to view logs and utilize the attack simulation tools.
  - Secure routing ensures **no unauthorized access** to restricted administrative resources.

### 📊 Admin Dashboard Features

The admin panel provides a comprehensive interface for real-time visibility and control:

  - **Live Stats Panel**: Displays critical metrics such as:
      - Total requests
      - Threats blocked
      - Alerts triggered
      - Countries tracked
      - Anomalies detected
      - Currently blocked IPs
  - **Interactive Graphs (Chart.js)**: Visualizes data trends, including:
      - Weekly traffic patterns
      - Ratio of safe vs. malicious request patterns

### 🌍 Geo-IP Detection & Mapping

Leverages external APIs for comprehensive geographical insights:

  - Integrates with **ip-api.com** and **ipinfo.io** to enrich IP data.
  - Converts each IP address into:
      - Country name & flag emoji
      - Internet Service Provider (ISP) details
      - Geographical coordinates
  - Enables filtering and analysis of traffic by country to identify region-based attacks.

### 📡 Real-Time Traffic Logs

Provides live monitoring of network traffic with updates every 3 seconds:

  - Logs contain detailed information for each request:
      - IP Address
      - Country
      - ISP
      - HTTP Method & URL
      - Time of request
      - Threat detected (if any)
      - Status (Safe, Suspicious, Blocked)
  - **Color-coded Log View** for quick identification:
      - 🟩 Green: Safe
      - 🟨 Yellow: Suspicious
      - 🟥 Red: Blocked (Malicious)

### 💥 Attack Simulation Tools

Built-in tools to simulate common cyberattacks, ideal for learning, testing, and demonstrations:

  - `flood.sh`: Simulates HTTP Flood (DDoS) attacks.
  - `brute-force.sh`: Simulates repeated login attempts.
  - `stuffing.js`: Simulates credential stuffing scenarios.
  - All simulation tools are also accessible directly via the Web UI Simulator tab.

### 🛡️ Real-Time Threat Detection

The backend middleware inspects every incoming request, applying AI-like logic to detect and block threats in real-time:

  - Detects various attack patterns:
      - Brute-force attempts
      - DDoS/flooding attempts
      - Bot headers & other anomalies
  - **IP Blocking**:
      - Automatically blocks identified malicious IPs.
      - Stores blocked IPs persistently in MongoDB.
      - Administrators can manually unblock IPs via the dashboard's control panel.

### 🧭 UI Navigation & Pages

The user interface is built with **React.js** and styled with **Tailwind CSS**, featuring role-based routing:

| Path          | Description                                 |
|---------------|---------------------------------------------|
| `/login`      | Secure login for Admin & User               |
| `/dashboard`  | Role-based dashboard (Admin/User)           |
| `/logs`       | Real-time traffic logs                      |
| `/alerts`     | View blocked/malicious alerts               |
| `/control`    | Admin control for IP blocking/unblocking    |
| `/simulators` | Trigger test attacks                        |
| `/logout`     | End session securely                        |

-----

## 🛠️ Technologies Used

| Layer       | Stack                                       |
|-------------|---------------------------------------------|
| Frontend    | React.js, Tailwind CSS, Axios, React-Toastify |
| Backend     | Node.js, Express.js, JWT Auth               |
| Database    | MongoDB with Mongoose ORM                   |
| Security    | AbuseIPDB API, ip-api.com, ipinfo.io        |
| Charts      | Chart.js for real-time data visualization   |
| DevOps      | Docker + Docker Compose                     |

-----

## 🧪 Sample Log Format

| IP Address   | Country   | ISP    | Method | URL        | Time  | Threat      | Status  |
|--------------|-----------|--------|--------|------------|-------|-------------|---------|
| 92.183.XX.XX | 🇮🇳 India  | Airtel | GET    | /api/login | 13:41 | Brute Force | Blocked |

-----

## 📦 How to Run the Project (Dev Setup)

### Prerequisites

  - Docker & Docker Compose installed
  - Ensure ports `5173` (Frontend), `5000` (Backend), and `27017` (MongoDB) are free.

### 🔧 Steps

```bash
# 1. Clone the repository
git clone [https://github.com/Sonu1511-sss/Rakshak.Ai-Final.git](https://github.com/Sonu1511-sss/Rakshak.Ai-Final.git)
cd Rakshak.Ai-Final

# 2. Build and Run with Docker Compose
docker-compose up --build
```

Then visit:

  - **Frontend** → `http://localhost:3000`
  - **Backend** → `http://localhost:5000`

### 🔐 Security & Privacy

  - JWT-based token authentication for all user sessions.
  - Secure routing implementation for sensitive endpoints.
  - Logs and IP information are stored securely in MongoDB collections.
  - Optional integration with AbuseIPDB enhances threat intelligence.

-----

## 🚀 Future Roadmap

  - 🧠 **AI-powered anomaly detection**: Implement advanced machine learning models for more sophisticated threat detection.
  - 🌐 **Live heatmap of global threats**: Visualize attack origins on a world map in real-time.
  - 🔔 **Email/SMS alerting system**: Integrate with services like Twilio for instant notifications.
  - 📡 **WebSocket-based live updates**: Enhance real-time log streaming and dashboard updates for even faster response.
  - 📊 **Machine Learning for threat scoring**: Develop a system to assign threat scores to requests for prioritized handling.

## 👥 Who Should Use This?

  - 👨‍💻 **Hackathon & Cybersecurity Students**: Excellent project for learning and demonstrating cybersecurity concepts.
  - 🧪 **Pen-testing & Security Simulation**: Useful for simulating attacks and testing defense mechanisms.
  - 🏢 **Internal Security Teams**: Can be adapted for monitoring and managing real-time threats in smaller environments.
  - 📚 **Trainers/Institutions**: A practical example for teaching real-time cybersecurity defense.

## 🤝 License & Credits

  - 🛠 Built with ❤️ by Team **Code Genius**.
  - 👨‍💻 **Contributors:**
      - **Shubham Uprade** – Frontend & Backend Development
      - **Chandrabhan Gadeshwar** – Backend & Python Development
  - 💡 Inspired by the vision of creating intelligent and real-time cybersecurity solutions to safeguard digital systems from evolving threats.

🔐 This project is open-source and distributed under a custom license provided in the repository. Please refer to the `LICENSE` file for details.


