# 🚨 Rakshak.AI Attack Simulators

This directory contains scripts to simulate various cyber attacks for testing and demonstration purposes.

## 📋 Available Simulators

### 1. DDoS Attack Simulator (`flood.sh`)
Simulates a Distributed Denial of Service attack with:
- High-volume traffic (100 requests/second)
- Multiple fake source IPs
- Various user agents
- 60-second duration

```bash
chmod +x flood.sh
./flood.sh
```

### 2. Brute Force Attack Simulator (`brute-force.sh`)
Simulates login brute force attempts with:
- Common username/password combinations
- Failed authentication attempts
- Rate-limited requests
- 100 login attempts

```bash
chmod +x brute-force.sh
./brute-force.sh
```

### 3. Port Scan Simulator (`port-scan.sh`)
Simulates network reconnaissance with:
- Common port scanning
- Network discovery attempts
- Reconnaissance logging
- Security tool signatures

```bash
chmod +x port-scan.sh
./port-scan.sh
```

## 🎯 Usage Instructions

1. **Start Rakshak.AI Platform**:
   ```bash
   npm run dev
   ```

2. **Open Dashboard**: http://localhost:3000

3. **Run Attack Simulation**:
   ```bash
   cd attack-simulator
   ./flood.sh        # DDoS simulation
   ./brute-force.sh  # Brute force simulation
   ./port-scan.sh    # Port scan simulation
   ```

4. **Monitor Results**: Watch the dashboard for real-time threat detection

## ⚠️ Important Notes

- These scripts are for **educational and testing purposes only**
- Only use against your own systems or with explicit permission
- The simulators help demonstrate Rakshak.AI's detection capabilities
- All simulated attacks are logged and can be analyzed

## 🛡️ What You'll See

After running the simulators, you should observe:
- Real-time traffic spikes in the dashboard
- Anomaly detection alerts
- Automatic IP blocking (if enabled)
- Geographic threat visualization
- Security incident logging

## 🔧 Customization

You can modify the scripts to:
- Change attack intensity (request rate)
- Add new IP addresses
- Modify attack patterns
- Test different endpoints
- Simulate new attack types

## 📊 Monitoring Results

Check these dashboard sections after running simulations:
- **Live Traffic**: See traffic spikes and patterns
- **Threat Map**: Geographic distribution of attacks
- **Alerts**: Security incidents and responses
- **IP Blocker**: Automatically blocked addresses
- **Settings**: Adjust detection sensitivity