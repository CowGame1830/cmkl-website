import React, { useState, useEffect } from 'react';
import { 
  productionMetrics, 
  machineStatus, 
  energyData, 
  qualityTrends, 
  scheduleData,
  dataSimulator 
} from '../data';

import { 
  Activity, 
  Zap, 
  Gauge, 
  Calendar,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  Pause
} from 'lucide-react';

interface RealTimeMetricsProps {
  className?: string;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({ className }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    // Start the data simulator
    dataSimulator.start();
    
    // Add listener for data updates
    const handleDataUpdate = () => {
      setUpdateTrigger(prev => prev + 1);
    };
    dataSimulator.addListener(handleDataUpdate);

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      dataSimulator.removeListener(handleDataUpdate);
      clearInterval(timeInterval);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'maintenance': return <Wrench className="w-4 h-4 text-blue-600" />;
      case 'idle': return <Pause className="w-4 h-4 text-gray-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`real-time-metrics ${className}`}>
      {/* Live Status Header */}
      <div className="metrics-header">
        <div className="header-info">
          <h2>Live Factory Metrics</h2>
          <div className="live-indicator">
            <div className="live-dot"></div>
            <span>Live - {formatTime(currentTime)}</span>
          </div>
        </div>
        <div className="current-date">
          {formatDate(currentTime)}
        </div>
      </div>

      {/* Production Overview */}
      <div className="metrics-section production-overview">
        <h3>
          <Activity className="w-5 h-5" />
          Production Overview
        </h3>
        <div className="production-cards">
          <div className="metric-card">
            <div className="metric-label">Units Produced Today</div>
            <div className="metric-value">{productionMetrics.todayProduced.toLocaleString()}</div>
            <div className="metric-target">Target: {productionMetrics.targetProduction.toLocaleString()}</div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${Math.min(100, (productionMetrics.todayProduced / productionMetrics.targetProduction) * 100)}%`
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Defect Rate</div>
            <div className="metric-value">{productionMetrics.defectRate.toFixed(1)}%</div>
            <div className="metric-target">Target: ≤{productionMetrics.targetDefectRate}%</div>
            <div className={`status-indicator ${productionMetrics.defectRate <= productionMetrics.targetDefectRate ? 'good' : 'warning'}`}>
              {productionMetrics.defectRate <= productionMetrics.targetDefectRate ? '✓ On Target' : '⚠ Above Target'}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">Overall Efficiency</div>
            <div className="metric-value">{productionMetrics.efficiency.toFixed(1)}%</div>
            <div className="efficiency-gauge">
              <div 
                className="gauge-fill"
                style={{ 
                  transform: `rotate(${(productionMetrics.efficiency / 100) * 180}deg)`
                }}
              ></div>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-label">System Uptime</div>
            <div className="metric-value">{productionMetrics.uptime.toFixed(1)}%</div>
            <div className="uptime-indicator">
              <div className={`uptime-status ${productionMetrics.uptime >= 95 ? 'excellent' : productionMetrics.uptime >= 90 ? 'good' : 'needs-attention'}`}>
                {productionMetrics.uptime >= 95 ? 'Excellent' : productionMetrics.uptime >= 90 ? 'Good' : 'Needs Attention'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Energy Consumption */}
      <div className="metrics-section energy-section">
        <h3>
          <Zap className="w-5 h-5" />
          Energy & Environmental Impact
        </h3>
        <div className="energy-cards">
          <div className="energy-card current-usage">
            <div className="energy-header">
              <span>Current Usage</span>
              <div className="live-indicator small">
                <div className="live-dot small"></div>
                Live
              </div>
            </div>
            <div className="energy-value">{energyData.currentUsage.toFixed(1)} kWh</div>
            <div className="energy-comparison">
              <span>Peak: {energyData.peakUsage.toFixed(1)} kWh</span>
              <span>Avg: {energyData.averageUsage.toFixed(1)} kWh</span>
            </div>
          </div>

          <div className="energy-card co2-emissions">
            <div className="energy-header">
              <span>CO₂ Emissions Today</span>
            </div>
            <div className="energy-value">{productionMetrics.co2Emissions.toFixed(1)} kg</div>
            <div className="emissions-trend">
              <span className="trend-indicator down">↓ 3.2% vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Energy Chart */}
        <div className="energy-chart">
          <h4>Energy Consumption (Last 24 Hours)</h4>
          <div className="chart-container">
            {energyData.hourlyConsumption.map((data, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(data.usage / energyData.peakUsage) * 100}%`
                  }}
                  title={`${data.time}: ${data.usage.toFixed(1)} kWh`}
                ></div>
                <span className="bar-label">{data.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Machine Status */}
      <div className="metrics-section machine-status">
        <h3>
          <Gauge className="w-5 h-5" />
          Machine Status Monitor
        </h3>
        <div className="machine-grid">
          {machineStatus.map((machine) => (
            <div key={machine.id} className="machine-card">
              <div className="machine-header">
                <div className="machine-info">
                  <span className="machine-name">{machine.name}</span>
                  <span className="machine-id">{machine.id}</span>
                </div>
                <div className={`machine-status-badge ${getStatusColor(machine.status)}`}>
                  {getStatusIcon(machine.status)}
                  <span>{machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}</span>
                </div>
              </div>
              <div className="machine-metrics">
                <div className="efficiency-display">
                  <span className="label">Efficiency</span>
                  <span className="value">{machine.efficiency.toFixed(1)}%</span>
                </div>
                <div className="maintenance-info">
                  <span className="label">Next Maintenance</span>
                  <span className="date">{new Date(machine.nextMaintenance).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="efficiency-bar">
                <div 
                  className="efficiency-fill"
                  style={{ 
                    width: `${machine.efficiency}%`,
                    backgroundColor: machine.efficiency >= 90 ? '#10b981' : 
                                   machine.efficiency >= 75 ? '#f59e0b' : '#ef4444'
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="metrics-section schedule-section">
        <h3>
          <Calendar className="w-5 h-5" />
          Upcoming Schedule
        </h3>
        <div className="schedule-list">
          {scheduleData.slice(0, 4).map((item) => (
            <div key={item.id} className="schedule-item">
              <div className={`schedule-type type-${item.type}`}>
                {item.type === 'maintenance' && <Wrench className="w-4 h-4" />}
                {item.type === 'audit' && <CheckCircle className="w-4 h-4" />}
                {item.type === 'training' && <Activity className="w-4 h-4" />}
                {item.type === 'inventory' && <Clock className="w-4 h-4" />}
                <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
              </div>
              <div className="schedule-details">
                <div className="schedule-task">{item.task}</div>
                <div className="schedule-meta">
                  <span className="schedule-time">
                    {new Date(item.scheduledTime).toLocaleDateString()} at{' '}
                    {new Date(item.scheduledTime).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  <span className="schedule-duration">{item.estimatedDuration}</span>
                  <span className="schedule-assignee">Assigned: {item.assignedTo}</span>
                </div>
              </div>
              <div className={`priority-badge priority-${item.priority}`}>
                {item.priority}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Trends */}
      <div className="metrics-section quality-trends">
        <h3>Quality Trends</h3>
        <div className="trends-container">
          <div className="weekly-trends">
            <h4>Weekly Defect Rate</h4>
            <div className="trend-chart">
              {qualityTrends.weeklyDefectRates.map((week, index) => (
                <div key={index} className="trend-item">
                  <div className="trend-bar">
                    <div 
                      className="trend-fill"
                      style={{ 
                        height: `${(week.rate / 4) * 100}%`,
                        backgroundColor: week.rate <= 3 ? '#10b981' : '#f59e0b'
                      }}
                    ></div>
                  </div>
                  <span className="trend-label">{week.week}</span>
                  <span className="trend-value">{week.rate}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="defect-categories">
            <h4>Defect Categories</h4>
            <div className="categories-list">
              {qualityTrends.defectCategories.map((category, index) => (
                <div key={index} className="category-item">
                  <div className="category-info">
                    <span className="category-name">{category.category}</span>
                    <span className="category-count">{category.count} issues</span>
                  </div>
                  <div className="category-percentage">{category.percentage.toFixed(1)}%</div>
                  <div className="category-bar">
                    <div 
                      className="category-fill"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .real-time-metrics {
          padding: 1rem;
          background: #f8fafc;
          min-height: 100vh;
        }

        .metrics-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          margin-bottom: 2rem;
        }

        .header-info h2 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        .live-indicator {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.25rem;
          color: #10b981;
          font-weight: 500;
        }

        .live-indicator.small {
          font-size: 0.875rem;
          margin-top: 0;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .live-dot.small {
          width: 6px;
          height: 6px;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .current-date {
          color: #6b7280;
          font-weight: 500;
        }

        .metrics-section {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .metrics-section h3 {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .production-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .metric-card {
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          text-align: center;
        }

        .metric-label {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .metric-target {
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        .progress-bar {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #10b981;
          transition: width 0.5s ease;
        }

        .status-indicator {
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-indicator.good {
          background: #dcfce7;
          color: #166534;
        }

        .status-indicator.warning {
          background: #fef3c7;
          color: #92400e;
        }

        .energy-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .energy-card {
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .energy-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .energy-value {
          font-size: 1.875rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .energy-comparison {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .energy-chart {
          border-top: 1px solid #e5e7eb;
          padding-top: 1.5rem;
        }

        .energy-chart h4 {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .chart-container {
          display: flex;
          align-items: end;
          gap: 2px;
          height: 120px;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
        }

        .chart-bar {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          height: 100%;
        }

        .bar-fill {
          width: 100%;
          background: #3b82f6;
          border-radius: 2px 2px 0 0;
          min-height: 2px;
          transition: height 0.5s ease;
        }

        .bar-label {
          font-size: 0.625rem;
          color: #6b7280;
          margin-top: 0.25rem;
          transform: rotate(-45deg);
          white-space: nowrap;
        }

        .machine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }

        .machine-card {
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .machine-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .machine-name {
          font-weight: 600;
          color: #1f2937;
        }

        .machine-id {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .machine-status-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .machine-metrics {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
          font-size: 0.875rem;
        }

        .efficiency-bar {
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .efficiency-fill {
          height: 100%;
          transition: width 0.5s ease;
        }

        .schedule-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .schedule-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .schedule-type {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
        }

        .schedule-type.type-maintenance {
          background: #dbeafe;
          color: #1e40af;
        }

        .schedule-type.type-audit {
          background: #dcfce7;
          color: #166534;
        }

        .schedule-type.type-training {
          background: #fef3c7;
          color: #92400e;
        }

        .schedule-type.type-inventory {
          background: #f3e8ff;
          color: #7c2d12;
        }

        .schedule-details {
          flex: 1;
        }

        .schedule-task {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .schedule-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .priority-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .priority-badge.priority-high {
          background: #fee2e2;
          color: #dc2626;
        }

        .priority-badge.priority-medium {
          background: #fef3c7;
          color: #d97706;
        }

        .priority-badge.priority-low {
          background: #f0f9ff;
          color: #0284c7;
        }

        .trends-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .trend-chart {
          display: flex;
          align-items: end;
          gap: 1rem;
          height: 100px;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
        }

        .trend-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }

        .trend-bar {
          width: 30px;
          height: 60px;
          background: #e5e7eb;
          border-radius: 4px;
          display: flex;
          align-items: end;
        }

        .trend-fill {
          width: 100%;
          border-radius: 4px;
          min-height: 2px;
        }

        .trend-label {
          font-size: 0.75rem;
          color: #6b7280;
        }

        .trend-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1f2937;
        }

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .category-info {
          flex: 1;
        }

        .category-name {
          font-weight: 600;
          color: #1f2937;
        }

        .category-count {
          font-size: 0.875rem;
          color: #6b7280;
          margin-left: 0.5rem;
        }

        .category-percentage {
          font-weight: 600;
          color: #1f2937;
          min-width: 50px;
          text-align: right;
        }

        .category-bar {
          width: 100px;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .category-fill {
          height: 100%;
          background: #3b82f6;
          transition: width 0.5s ease;
        }

        @media (max-width: 768px) {
          .metrics-header {
            flex-direction: column;
            gap: 1rem;
          }

          .trends-container {
            grid-template-columns: 1fr;
          }

          .production-cards {
            grid-template-columns: 1fr;
          }

          .schedule-item {
            flex-direction: column;
            align-items: start;
            gap: 0.5rem;
          }

          .schedule-meta {
            flex-direction: column;
            gap: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RealTimeMetrics;