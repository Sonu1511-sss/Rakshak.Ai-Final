# 🔐 Rakshak.AI – Smart Real-Time Threat Detection System

Rakshak.AI is an advanced cybersecurity platform developed as part of the [Triwizardathon Hackathon](https://triwizardathon.com/). It intelligently detects and blocks **unauthorized access**, **malicious IPs**, **DDoS**, and **brute-force attacks** in **real-time**, ensuring your system remains secure and protected at all times.

---

## 🚀 Key Features

- 🔍 **Real-Time Traffic Monitoring** – Instantly view traffic logs and geolocation data
- 🛡️ **Threat Detection & Prevention** – Auto-blocks suspicious or malicious IPs
- 👮 **Role-based Dashboards** – Separate interfaces for Admin and Users
- 🌐 **Geolocation Tracking** – Detects country of origin of IPs using geo lookup
- ⚠️ **Attack Simulation Tools** – Simulate Brute-force & DDoS attacks for testing
- 📦 **Docker Support** – Fully containerized using `docker-compose`

---

## 🧠 Tech Stack

**Frontend**: React.js, Tailwind CSS  
**Backend**: Node.js, Express.js, MongoDB, JWT  
**Python**: DDoS & Brute-force Attack Simulator  
**Other Tools**: Docker, IP Quality Score API, GeoIP Lookup

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

🔒 Dashboard Overview
👑 Admin Dashboard
View all traffic logs in real-time

Auto-block malicious IPs

See attack attempts by country

Manually block or unblock IPs

👤 User Dashboard
Monitor personal logs

View recent activity

Secure personal access

⚙️ Real-Time Logging & Detection
GeoIP + Abuse IP Database: Each IP is checked against abuse records

Country Flag Integration: View where threats are coming from

Log Storage: All traffic logs stored in MongoDB with timestamps

💻 Attack Simulator
Located inside attack-simulator/ folder.

Brute Force Script: Tests how the system responds to login attacks

DDoS Simulator: Sends multiple fake requests to mimic traffic floods

👥 Team – Code Genius
Name	Role
Chandrabhan Gadeshwar	Backend Developer, Python Scripts
Shubham Uprade	Full Stack Developer – Frontend & Backend

🏆 Hackathon Participation
This project was built for the Triwizardathon Hackathon.
It showcases real-time security intelligence, automation, and safe simulation of attacks in a production-ready environment.

# 1. Clone the repo
git clone https://github.com/Sonu1511-sss/Rakshak.Ai-Final.git

# 2. Navigate into the folder
cd Rakshak.Ai-Final

# 3. Start services with Docker
docker-compose up --build

# App will be live at: http://localhost:3000
