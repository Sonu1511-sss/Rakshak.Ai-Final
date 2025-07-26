import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from datetime import datetime, timedelta
import joblib
import os

class AnomalyDetector:
    def __init__(self):
        self.model = IsolationForest(
            contamination=0.1,  # Expect 10% of data to be anomalies
            random_state=42,
            n_estimators=100
        )
        self.scaler = StandardScaler()
        self.is_trained = False
        self.feature_names = [
            'requests_per_second',
            'response_time',
            'error_rate', 
            'unique_ips',
            'bandwidth_usage',
            'geographic_entropy',
            'user_agent_diversity'
        ]
        self.statistics = {
            'total_predictions': 0,
            'anomalies_detected': 0,
            'last_training': None,
            'model_accuracy': 0.0
        }
    
    def train(self, training_data):
        """Train the anomaly detection model"""
        try:
            print("🔧 Training anomaly detection model...")
            
            # Convert training data to numpy array
            if isinstance(training_data, list):
                X = np.array(training_data)
            else:
                X = training_data
                
            if X.shape[0] < 10:
                print("⚠️ Not enough training data, generating synthetic data...")
                X = self.generate_synthetic_training_data()
            
            # Normalize features
            X_scaled = self.scaler.fit_transform(X)
            
            # Train the isolation forest
            self.model.fit(X_scaled)
            
            # Calculate training accuracy (approximation)
            predictions = self.model.predict(X_scaled)
            # Convert to binary (1 for normal, 0 for anomaly)
            binary_pred = (predictions == 1).astype(int)
            
            # For unsupervised learning, we estimate accuracy based on contamination rate
            expected_normal_rate = 0.9  # 90% normal traffic expected
            actual_normal_rate = np.mean(binary_pred)
            self.statistics['model_accuracy'] = 1 - abs(expected_normal_rate - actual_normal_rate)
            
            self.is_trained = True
            self.statistics['last_training'] = datetime.now().isoformat()
            
            print(f"✅ Model training completed. Estimated accuracy: {self.statistics['model_accuracy']:.3f}")
            return True
            
        except Exception as e:
            print(f"❌ Training failed: {str(e)}")
            return False
    
    def detect_anomaly(self, features):
        """Detect if the given features represent an anomaly"""
        if not self.is_trained:
            print("⚠️ Model not trained yet, using rule-based detection...")
            return self.rule_based_detection(features)
        
        try:
            # Ensure features are in the right shape
            if len(features.shape) == 1:
                features = features.reshape(1, -1)
            
            # Normalize features
            features_scaled = self.scaler.transform(features)
            
            # Predict anomaly
            prediction = self.model.predict(features_scaled)[0]
            anomaly_score = self.model.decision_function(features_scaled)[0]
            
            # Convert prediction (-1 for anomaly, 1 for normal)
            is_anomaly = prediction == -1
            
            # Calculate confidence based on anomaly score
            confidence = abs(anomaly_score)
            
            # Determine risk level
            if confidence > 0.5:
                risk_level = 'high'
            elif confidence > 0.2:
                risk_level = 'medium'
            else:
                risk_level = 'low'
            
            # Update statistics
            self.statistics['total_predictions'] += 1
            if is_anomaly:
                self.statistics['anomalies_detected'] += 1
            
            return is_anomaly, confidence, risk_level
            
        except Exception as e:
            print(f"❌ Anomaly detection failed: {str(e)}")
            return False, 0.0, 'unknown'
    
    def rule_based_detection(self, features):
        """Fallback rule-based anomaly detection when ML model isn't ready"""
        if len(features.shape) == 1:
            features = features.reshape(1, -1)
        
        # Simple thresholds for rule-based detection
        rps = features[0][0]  # requests per second
        error_rate = features[0][2]  # error rate
        unique_ips = features[0][3]  # unique IPs
        
        # Rule-based anomaly detection
        is_anomaly = False
        confidence = 0.0
        risk_level = 'low'
        
        # High RPS anomaly
        if rps > 1000:
            is_anomaly = True
            confidence = min((rps - 1000) / 1000, 1.0)
            risk_level = 'high' if rps > 2000 else 'medium'
        
        # High error rate anomaly  
        elif error_rate > 0.1:  # 10% error rate
            is_anomaly = True
            confidence = min(error_rate, 1.0)
            risk_level = 'high' if error_rate > 0.5 else 'medium'
        
        # Too many unique IPs (potential DDoS)
        elif unique_ips > 500:
            is_anomaly = True
            confidence = min((unique_ips - 500) / 500, 1.0)
            risk_level = 'medium'
        
        return is_anomaly, confidence, risk_level
    
    def generate_synthetic_training_data(self, n_samples=1000):
        """Generate synthetic training data for initial model training"""
        print("🔄 Generating synthetic training data...")
        
        np.random.seed(42)
        
        # Normal traffic patterns
        normal_data = []
        for _ in range(int(n_samples * 0.9)):  # 90% normal traffic
            normal_data.append([
                np.random.normal(100, 20),    # requests_per_second
                np.random.normal(200, 50),    # response_time (ms)
                np.random.beta(1, 20),        # error_rate (low)
                np.random.normal(50, 15),     # unique_ips
                np.random.normal(1000, 200),  # bandwidth_usage (KB)
                np.random.uniform(0.3, 0.8),  # geographic_entropy
                np.random.uniform(0.4, 0.9)   # user_agent_diversity
            ])
        
        # Anomalous traffic patterns
        anomaly_data = []
        for _ in range(int(n_samples * 0.1)):  # 10% anomalous traffic
            anomaly_type = np.random.choice(['ddos', 'bruteforce', 'scan'])
            
            if anomaly_type == 'ddos':
                anomaly_data.append([
                    np.random.normal(2000, 500),   # High RPS
                    np.random.normal(500, 100),    # High response time
                    np.random.beta(3, 7),          # Higher error rate
                    np.random.normal(1000, 200),   # Many unique IPs
                    np.random.normal(5000, 1000),  # High bandwidth
                    np.random.uniform(0.1, 0.4),   # Low geographic entropy
                    np.random.uniform(0.1, 0.3)    # Low user agent diversity
                ])
            elif anomaly_type == 'bruteforce':
                anomaly_data.append([
                    np.random.normal(500, 100),    # Moderate RPS
                    np.random.normal(150, 30),     # Fast response time
                    np.random.beta(8, 2),          # Very high error rate
                    np.random.normal(5, 2),        # Few unique IPs
                    np.random.normal(100, 50),     # Low bandwidth
                    np.random.uniform(0.8, 1.0),   # High geographic entropy
                    np.random.uniform(0.9, 1.0)    # High user agent diversity
                ])
            else:  # scan
                anomaly_data.append([
                    np.random.normal(50, 10),      # Low RPS
                    np.random.normal(100, 20),     # Fast response time
                    np.random.beta(5, 5),          # Moderate error rate
                    np.random.normal(10, 5),       # Few unique IPs
                    np.random.normal(50, 20),      # Very low bandwidth
                    np.random.uniform(0.6, 0.9),   # Moderate geographic entropy
                    np.random.uniform(0.2, 0.5)    # Low user agent diversity
                ])
        
        # Combine and shuffle data
        all_data = normal_data + anomaly_data
        np.random.shuffle(all_data)
        
        return np.array(all_data)
    
    def get_statistics(self):
        """Get model statistics"""
        return {
            **self.statistics,
            'is_trained': self.is_trained,
            'feature_count': len(self.feature_names),
            'anomaly_rate': (
                self.statistics['anomalies_detected'] / max(self.statistics['total_predictions'], 1)
            )
        }
    
    def get_accuracy(self):
        """Get model accuracy"""
        return self.statistics['model_accuracy']
    
    def save_model(self, filepath):
        """Save the trained model"""
        if self.is_trained:
            joblib.dump({
                'model': self.model,
                'scaler': self.scaler,
                'statistics': self.statistics,
                'feature_names': self.feature_names
            }, filepath)
            return True
        return False
    
    def load_model(self, filepath):
        """Load a trained model"""
        try:
            data = joblib.load(filepath)
            self.model = data['model']
            self.scaler = data['scaler']
            self.statistics = data['statistics']
            self.feature_names = data['feature_names']
            self.is_trained = True
            return True
        except:
            return False