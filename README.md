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

🌐 Features Overview
🔐 Authentication System
Role-based login secured using JWT tokens.

Admin: Full access to dashboards, logs, controls, simulators.

User: Limited access to view logs and simulate attacks.

Secure routing ensures no unauthorized access.

📊 Admin Dashboard Features
Live Stats Panel:

Total requests

Threats blocked

Alerts triggered

Countries tracked

Anomalies detected

Blocked IPs

Charts & Graphs (Chart.js):

Visual analytics over the past 7 days

Trends of safe vs malicious traffic

🌍 Geo-IP Detection & Mapping
Uses ip-api.com and ipinfo.io for:

Country name

Flag emoji

ISP & Region info

Filter and trace attacks by location and ISP.

📡 Real-Time Traffic Logs
Updates every 3 seconds showing:

IP Address

Country

ISP

Method & URL

Time

Threat

Status

📥 Detection Log Format

| IP Address   | Country    | ISP    | Method | URL        | Time  | Threat      | Status  |
| ------------ | ---------- | ------ | ------ | ---------- | ----- | ----------- | ------- |
| 92.183.XX.XX | 🇮🇳 India | Airtel | GET    | /api/login | 13:41 | Brute Force | Blocked |

Color-coded entries:

🟩 Safe (Green)

🟨 Suspicious (Yellow)

🟥 Malicious/Blocked (Red)

💥 Attack Simulation Tools
Simulate real-world attacks using built-in tools:

flood.sh: HTTP Flood (DDoS simulation)

brute-force.sh: Login brute-force attempts

stuffing.js: Credential stuffing simulation

All accessible via the Web UI

🛡️ Real-Time Threat Detection
Backend middleware inspects every request:

Detects brute-force, bots, floods

Flags anomalies and applies block logic

Blocked IPs:

Stored in MongoDB

Admins can manually unblock via control panel

🧭 UI Navigation & Pages

| Route         | Purpose                           |
| ------------- | --------------------------------- |
| `/login`      | Secure Login                      |
| `/dashboard`  | Role-based Dashboard (Admin/User) |
| `/logs`       | View Real-time Logs               |
| `/alerts`     | View Blocked/Malicious Traffic    |
| `/control`    | Admin Panel for IP Control        |
| `/simulators` | Attack Simulation Page            |
| `/logout`     | Secure Logout Function            |

🛠️ Technologies Used

| Layer    | Stack                                   |
| -------- | --------------------------------------- |
| Frontend | React.js, Tailwind CSS, Axios, Toastify |
| Backend  | Node.js, Express.js, JWT Auth           |
| Database | MongoDB + Mongoose ORM                  |
| Security | AbuseIPDB API, ip-api.com, ipinfo.io    |
| Charts   | Chart.js for stats visualization        |
| DevOps   | Docker + Docker Compose                 |

📦 How to Run the Project (Dev Setup)
⚙️ Prerequisites
Install Docker & Docker Compose

Ensure ports 5173, 5000, and 27017 are free

🧪 Setup Instructions

# 1. Clone the repository
git clone https://github.com/Sonu1511-sss/Rakshak.Ai-Final.git
cd Rakshak.Ai-Final

# 2. Run with Docker Compose
docker-compose up --build

🔗 Access Locally
Frontend → http://localhost:3000

Backend → http://localhost:5000

🔐 Security & Privacy
JWT-secured sessions for users

MongoDB stores logs/IPs securely

IPs verified via third-party APIs

Manual and auto threat blocking

No data shared unless permitted

🚀 Future Roadmap
🧠 ML-based Threat Scoring System

🌐 Global Heatmap for Attacks

🔔 Email/SMS Alerts (via Twilio)

📡 WebSocket Live Log Updates

🤖 AI Analysis of Bot vs Human Traffic

👥 Who Should Use This?
🔐 Hackathon Cybersecurity Projects

🎓 Security Students or Trainers

🏢 Internal Security Demonstrations

📊 Real-Time Demo Environments

🤝 License & Credits
🛠 Built with ❤️ by Team Code Genius

👨‍💻 Contributors:

Shubham Uprade – Frontend & Backend Development

Chandrabhan Gadeshwar – Backend & Python Development

💡 Inspired by the vision of creating intelligent and real-time cybersecurity solutions to safeguard digital systems from evolving threats.

🔐 This project is open-source and distributed under a custom license provided in the repository. Please refer to the LICENSE file for details.
---

Let me know if you'd like:
- A downloadable `.md` version
- A project page/landing page version
- Auto-deployment on GitHub Pages or Vercel

Would you like this `README.md` pushed to your GitHub project directly via instructions?
