from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from model import AnomalyDetector

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize the anomaly detector
detector = AnomalyDetector()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'ML Anomaly Detector',
        'timestamp': datetime.now().isoformat(),
        'model_status': 'ready' if detector.is_trained else 'training'
    })

@app.route('/analyze', methods=['POST'])
def analyze_traffic():
    try:
        data = request.get_json()
        
        if not data or 'traffic_data' not in data:
            return jsonify({'error': 'Missing traffic_data'}), 400
        
        # Extract features from traffic data
        features = extract_features(data['traffic_data'])
        
        # Perform anomaly detection
        is_anomaly, confidence, risk_level = detector.detect_anomaly(features)
        
        return jsonify({
            'is_anomaly': bool(is_anomaly),
            'confidence': float(confidence),
            'risk_level': risk_level,
            'timestamp': datetime.now().isoformat(),
            'features_analyzed': len(features)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/train', methods=['POST'])
def train_model():
    try:
        data = request.get_json()
        
        if not data or 'training_data' not in data:
            return jsonify({'error': 'Missing training_data'}), 400
        
        # Train the model with new data
        success = detector.train(data['training_data'])
        
        if success:
            return jsonify({
                'status': 'training_completed',
                'timestamp': datetime.now().isoformat(),
                'model_accuracy': detector.get_accuracy()
            })
        else:
            return jsonify({'error': 'Training failed'}), 500
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/statistics', methods=['GET'])
def get_statistics():
    try:
        stats = detector.get_statistics()
        return jsonify(stats)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def extract_features(traffic_data):
    """Extract relevant features from traffic data for anomaly detection"""
    features = []
    
    if isinstance(traffic_data, list):
        for entry in traffic_data:
            feature_vector = [
                entry.get('requests_per_second', 0),
                entry.get('response_time', 0),
                entry.get('error_rate', 0),
                entry.get('unique_ips', 0),
                entry.get('bandwidth_usage', 0),
                entry.get('geographic_entropy', 0),
                entry.get('user_agent_diversity', 0)
            ]
            features.append(feature_vector)
    else:
        # Single data point
        feature_vector = [
            traffic_data.get('requests_per_second', 0),
            traffic_data.get('response_time', 0),
            traffic_data.get('error_rate', 0),
            traffic_data.get('unique_ips', 0),
            traffic_data.get('bandwidth_usage', 0),
            traffic_data.get('geographic_entropy', 0),
            traffic_data.get('user_agent_diversity', 0)
        ]
        features = [feature_vector]
    
    return np.array(features)

if __name__ == '__main__':
    print("🤖 Starting ML Anomaly Detection Service...")
    print("📊 Loading and training initial model...")
    
    # Generate some synthetic training data for demo
    synthetic_data = detector.generate_synthetic_training_data()
    detector.train(synthetic_data)
    
    port = int(os.getenv('PORT', 8000))
    debug = os.getenv('DEBUG', 'False').lower() == 'true'
    
    print(f"🚀 ML Service running on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug)