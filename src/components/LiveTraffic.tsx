import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Activity, TrendingUp, AlertTriangle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LiveTraffic() {
  const [trafficData, setTrafficData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Normal Traffic',
        data: [],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Suspicious Traffic',
        data: [],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Blocked Traffic',
        data: [],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      y: {
        grid: {
          color: '#374151',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      setTrafficData(prev => {
        const newLabels = [...prev.labels, timeLabel].slice(-20);
        const newDatasets = prev.datasets.map((dataset, index) => ({
          ...dataset,
          data: [
            ...dataset.data,
            Math.floor(Math.random() * (index === 0 ? 1000 : index === 1 ? 200 : 50)) + 50
          ].slice(-20),
        }));

        return {
          labels: newLabels,
          datasets: newDatasets,
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const currentMetrics = [
    {
      label: 'Current RPS',
      value: '1,247',
      icon: Activity,
      color: 'text-cyber-400',
      bg: 'bg-cyber-500/10',
    },
    {
      label: 'Peak Today',
      value: '3,892',
      icon: TrendingUp,
      color: 'text-success-400',
      bg: 'bg-success-500/10',
    },
    {
      label: 'Anomalies/min',
      value: '12',
      icon: AlertTriangle,
      color: 'text-warning-400',
      bg: 'bg-warning-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentMetrics.map((metric, index) => (
          <div key={metric.label} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{metric.label}</p>
                <p className={`text-xl font-bold ${metric.color}`}>{metric.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${metric.bg}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Real-Time Traffic Analysis</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
            <span className="text-success-400 text-sm">Live</span>
          </div>
        </div>
        <div className="h-96">
          <Line data={trafficData} options={options} />
        </div>
      </div>
    </div>
  );
}