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

## 🧩 Project Structure

Rakshak.Ai/
├── client/
│ ├── src/
│ │ ├── components/ # Reusable UI components like Navbar, AttackSimulator, RealTimeLogs
│ │ ├── pages/ # Main views: Login.jsx, AdminDashboard.jsx, UserDashboard.jsx
│ │ ├── context/ # AuthContext.jsx for authentication state
│ │ └── utils/ # axiosConfig.js, geoFlag.js for API setup and IP flagging
│ └── tailwind.config.js # Tailwind CSS configuration
│
├── server/
│ ├── routes/ # API Endpoints - logs.js, auth.js, control.js
│ ├── middleware/ # Logging & Authorization Middleware
│ ├── models/ # MongoDB Schemas - Log, User, Stats, BlockedIP
│ ├── utils/ # Core logic - abuseCheck.js, geoLookup.js, jwtUtils.js
│ └── server.js # Express Server Entry Point
│
├── db/ # MongoDB setup for Docker
├── attack-simulator/ # Scripts to simulate DDoS & Brute-force attacks
├── docker-compose.yml # Docker container orchestration
└── README.md # 📘 This Documentation


---

## 🌐 Features Overview

### 🔐 Admin & User Dashboard
- **Admin Dashboard**:  
  View real-time traffic logs, IP lookup with geo flags, total blocked threats, and manual block control.
- **User Dashboard**:  
  Simulate attacks, test live defense responses, and view IP reputation.

### 📊 Real-Time Logs & Threat Detection
- Tracks suspicious traffic and displays live attack logs with details like IP, location, time, type of attack.
- Automatically flags and blocks abusive IPs using AbuseIPDB API integration.

### ⚙️ Attack Simulation
- Built-in simulator allows testing of brute-force and DDoS scenarios to observe how Rakshak.AI handles them.

### 🚀 Dockerized & Scalable
- Fully dockerized for easy setup.
- Supports scalable deployment with MongoDB, Node.js, and React apps in containers.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Docker**: Multi-container setup using `docker-compose`
- **Security APIs**: AbuseIPDB for reputation scoring, GeoIP Lookup
- **Others**: JWT Auth, Context API, Axios, Toastify, Chart.js

---

## 📦 How to Run the Project

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sonu1511-sss/Rakshak.Ai-Final.git
cd Rakshak.Ai-Final
