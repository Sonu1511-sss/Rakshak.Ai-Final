#!/bin/bash

# Brute Force Attack Simulator for Rakshak.AI
# Simulates login attempts with common passwords

echo "🔓 Starting Brute Force Attack Simulation..."
echo "Target: http://localhost:3000/api/auth/login"
echo "Simulating failed login attempts..."

# Common passwords for brute force simulation
PASSWORDS=(
  "123456"
  "password"
  "admin"
  "root"
  "qwerty"
  "letmein"
  "welcome"
  "monkey"
  "dragon"
  "master"
)

# Common usernames
USERNAMES=(
  "admin"
  "administrator"
  "root"
  "user"
  "test"
  "guest"
  "demo"
)

ATTACKER_IP="123.45.67.89"

echo "🎯 Attacking from IP: $ATTACKER_IP"

# Simulate brute force attempts
for i in {1..100}; do
  USERNAME=${USERNAMES[$RANDOM % ${#USERNAMES[@]}]}
  PASSWORD=${PASSWORDS[$RANDOM % ${#PASSWORDS[@]}]}
  
  # Send login attempt
  curl -s -X POST \
    -H "Content-Type: application/json" \
    -H "X-Forwarded-For: $ATTACKER_IP" \
    -H "X-Real-IP: $ATTACKER_IP" \
    -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" \
    "http://localhost:5000/api/auth/login" > /dev/null
  
  echo "🔑 Attempt $i: $USERNAME:$PASSWORD"
  
  # Delay between attempts
  sleep 0.5
done

echo "✅ Brute force simulation completed!"
echo "Check Rakshak.AI dashboard for security alerts"