#!/bin/bash

# Port Scanning Simulator for Rakshak.AI
# Simulates network reconnaissance

echo "🔍 Starting Port Scan Simulation..."
echo "Simulating network reconnaissance..."

SCANNER_IP="78.123.45.67"
TARGET_HOST="localhost"

# Common ports to scan
PORTS=(21 22 23 25 53 80 110 143 443 993 995 3000 3306 5000 5432 6379 8000 8080 8443 9000)

echo "🎯 Scanning from IP: $SCANNER_IP"
echo "🎯 Target: $TARGET_HOST"

for PORT in "${PORTS[@]}"; do
  echo "🔍 Scanning port $PORT..."
  
  # Simulate port scan request
  curl -s --connect-timeout 1 \
    -H "X-Forwarded-For: $SCANNER_IP" \
    -H "X-Real-IP: $SCANNER_IP" \
    -H "User-Agent: nmap/7.80" \
    "http://$TARGET_HOST:$PORT" > /dev/null 2>&1
  
  # Log the scan attempt
  curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: $SCANNER_IP" \
    -d "{\"type\":\"port_scan\",\"port\":$PORT,\"target\":\"$TARGET_HOST\"}" \
    "http://localhost:5000/api/monitor/log-scan" > /dev/null
  
  sleep 0.2
done

echo "✅ Port scan simulation completed!"
echo "Check Rakshak.AI dashboard for reconnaissance alerts"