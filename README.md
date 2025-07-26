# 🔰 Rakshak.AI – Real-Time Cyber Threat Detection & Monitoring Platform

## ✅ Technologies Used

- **Frontend:** React.js, Tailwind CSS, Axios, React Hot Toast, Chart.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Docker)
- **Real-Time Data:** Polling (with future support for Socket.IO)
- **GeoIP & ASN Detection:** ip-api.com, ipinfo.io
- **Threat Intelligence APIs:** AbuseIPDB, VirusTotal (optional)
- **DevOps & Deployment:** Docker, Docker Compose

---

## 📁 Folder Structure

```
bolt-ai/
├── client/
│   ├── src/
│   │   ├── components/           # Navbar, Dashboard, AttackSimulator, etc.
│   │   ├── pages/                # Login.jsx, AdminDashboard.jsx, UserDashboard.jsx
│   │   ├── context/              # AuthContext.jsx for state management
│   │   └── utils/                # axiosConfig.js, geoFlag.js
│   └── tailwind.config.js       # Styling config
│
├── server/
│   ├── routes/                  # API routes – logs.js, auth.js, control.js
│   ├── middleware/              # Logging and Auth Middleware
│   ├── models/                  # Mongoose Models – Log, User, Stats, BlockedIP
│   ├── utils/                   # Utility files – abuseCheck.js, geoLookup.js, jwtUtils.js
│   └── server.js                # Entry point for Express server
│
├── db/                         # MongoDB Docker setup
├── attack-simulator/           # DDoS & Brute-force simulation scripts
├── docker-compose.yml          # Docker orchestration
└── README.md                   # Project Documentation
```

---

## 🔐 Authentication System

- JWT-based secure login with **Admin** and **User** roles
- Role-based routing and dashboard access

---

## 📊 Admin Dashboard Features

- **Live Stats Panel:**
  - Total Requests, Threats Blocked, Alerts Triggered
  - Countries Tracked, Anomalies Detected, Blocked IP Count
  - Percent growth comparison (last 7 days)
- **Charts and Graphs:** Using Chart.js for real-time data

---

## 🌍 GeoIP + Country Mapping

- IP addresses are resolved to countries using `ip-api.com`
- Each IP in logs is shown with country name and flag emoji
- Country-wise filtering for insights

---

## 📡 Real-Time Traffic Logs

- Traffic is fetched every 3 seconds from the backend
- Color-coded table rows based on threat level
- Displays: IP, ISP, Method, Route, Time, Threat Type

---

## 💥 Attack Simulation Module

- Built-in attack testing using `/attack-simulator/`
- Scripts:
  - `flood.sh` → DDoS HTTP Flood
  - `brute-force.sh` → Login attempts
  - `stuffing.js` → Credential stuffing
- React button trigger also available in UI for demo

---

## 🛡️ Threat Detection & Blocking

- Traffic is evaluated using custom `trafficLogger` middleware
- Threat types:
  - DDoS, Brute-force, Bot, Unknown Pattern
- Auto-block logic for malicious IPs
- Admin panel allows manual unblock/block control

---

## 🧭 UI Navigation

- Navbar adapts based on user role
- Routes include:
  - `/login`
  - `/dashboard`
  - `/logs`
  - `/alerts`
  - `/control`
  - `/simulators`
  - `/logout`

---

## 🔁 Dev Setup & Run

```bash
git clone https://github.com/Sonu1511-sss/Rakshak.Ai-Final
cd bolt-ai
docker-compose up --build
```

Visit:
- Frontend → http://localhost:5173
- Backend API → http://localhost:5000

---

## 📥 Detection Log Format

| IP Address | Country | ISP | Method | URL | Time | Threat | Status |
|------------|---------|-----|--------|-----|------|--------|--------|
| 92.183.XX.XX | 🇮🇳 India | Airtel | GET | /api/login | 13:41 | Brute Force | Blocked |

---

## 🔐 Privacy & Compliance

- All user data secured using JWT
- Blocked IPs stored securely
- Optional integrations with external reputation APIs

---

## 🚀 Future Roadmap

- ML-based Threat Scoring
- Socket.IO Live Stream Logs
- Global Attack Map (Heatmap)
- Email/SMS Alerts via Twilio

---

## 👨‍💻 Ideal For:

- Hackathons - https://triwizardathon.com/
- Cybersecurity Demonstrations
- Hackathon Project
- Real-world PoC Security Systems

---

## 🔗 Credits

- Developed by Team Rakshak 💻
- Based on Bolt.AI Architecture
- Contributions welcome via GitHub PR
