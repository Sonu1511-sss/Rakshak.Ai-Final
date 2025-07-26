#!/bin/bash

# DDoS Attack Simulator for Rakshak.AI
# Simulates high-volume traffic from multiple IPs

echo "🚨 Starting DDoS Attack Simulation..."
echo "Target: http://localhost:3000"
echo "Duration: 60 seconds"
echo "Rate: 100 requests/second"

# Array of fake IPs to simulate distributed attack
IPS=(
  "185.234.67.89"
  "123.45.67.890" 
  "78.123.45.67"
  "45.67.89.123"
  "192.168.1.100"
  "10.0.0.50"
  "172.16.0.25"
  "203.0.113.45"
)

# User agents to simulate different bots
USER_AGENTS=(
  "Mozilla/5.0 (compatible; Baiduspider/2.0)"
  "Mozilla/5.0 (compatible; Googlebot/2.1)"
  "curl/7.68.0"
  "python-requests/2.25.1"
  "Wget/1.20.3"
)

# Start attack simulation
for i in {1..600}; do
  # Random IP and User-Agent
  IP=${IPS[$RANDOM % ${#IPS[@]}]}
  UA=${USER_AGENTS[$RANDOM % ${#USER_AGENTS[@]}]}
  
  # Send request with fake IP header
  curl -s -H "X-Forwarded-For: $IP" \
       -H "User-Agent: $UA" \
       -H "X-Real-IP: $IP" \
       "http://localhost:3000/api/monitor/stats" > /dev/null &
  
  # Print progress every 50 requests
  if [ $((i % 50)) -eq 0 ]; then
    echo "📊 Sent $i requests..."
  fi
  
  # Small delay to control rate
  sleep 0.01
done

wait
echo "✅ DDoS simulation completed!"
echo "Check Rakshak.AI dashboard for detected threats"