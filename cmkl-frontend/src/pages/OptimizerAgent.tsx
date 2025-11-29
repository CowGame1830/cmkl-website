import React, { useState, useEffect } from 'react';
import { zones, recentActions, notifications } from '../data/mockData';
import type { Zone } from '../data/types';
import { 
  Users, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Bell,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import './OptimizerAgent.css';

const OptimizerAgent: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<string>('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const departments = ['all', ...Array.from(new Set(zones.map(zone => zone.department)))];

  const filteredZones = selectedDepartment === 'all' 
    ? zones 
    : zones.filter(zone => zone.department === selectedDepartment);

  const filteredActions = recentActions.filter(action => {
    const actionTime = new Date(action.timestamp);
    const hoursAgo = timeFilter === '1h' ? 1 : timeFilter === '24h' ? 24 : 168; // 168 = 7 days
    const cutoffTime = new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    
    return actionTime >= cutoffTime;
  });

  const getZoneUtilization = (zone: Zone) => {
    return Math.round((zone.currentPersonnel / zone.maxCapacity) * 100);
  };

  const getEfficiencyScore = (zone: Zone) => {
    const utilization = getZoneUtilization(zone);
    if (utilization <= 80) return 'High';
    if (utilization <= 95) return 'Medium';
    return 'Low';
  };

  const getEfficiencyColor = (score: string) => {
    switch (score) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDepartmentSummary = () => {
    const summary: Record<string, { total: number; capacity: number; zones: number }> = {};
    
    filteredZones.forEach(zone => {
      if (!summary[zone.department]) {
        summary[zone.department] = { total: 0, capacity: 0, zones: 0 };
      }
      summary[zone.department].total += zone.currentPersonnel;
      summary[zone.department].capacity += zone.maxCapacity;
      summary[zone.department].zones += 1;
    });

    return summary;
  };

  const getActionsByType = () => {
    const actionCounts = filteredActions.reduce((acc, action) => {
      acc[action.type] = (acc[action.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return actionCounts;
  };

  const getRecentAlerts = () => {
    return notifications.filter(notif => 
      (notif.type === 'warning' || notif.type === 'error') && !notif.read
    );
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRefresh = () => {
    setLastUpdated(new Date());
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const departmentSummary = getDepartmentSummary();
  const actionsByType = getActionsByType();
  const recentAlerts = getRecentAlerts();

  return (
    <div className="optimizer-container">
      <div className="optimizer-header">
        <h1>Optimizer Agent</h1>
        <p>Real-time personnel optimization and zone management</p>
        
        <div className="header-controls">
          <div className="filter-controls">
            <div className="filter-group">
              <label>Department:</label>
              <select 
                value={selectedDepartment} 
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Time Range:</label>
              <select 
                value={timeFilter} 
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>
          </div>
          
          <div className="refresh-controls">
            <label className="auto-refresh">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
              />
              Auto-refresh
            </label>
            <button onClick={handleRefresh} className="refresh-btn">
              <RefreshCw className="w-4 h-4" />
            </button>
            <span className="last-updated">
              Last updated: {formatTime(lastUpdated)}
            </span>
          </div>
        </div>
      </div>

      <div className="optimizer-grid">
        {/* Department Summary */}
        <div className="optimizer-section department-summary">
          <h2>
            <BarChart3 className="w-5 h-5" />
            Department Summary
          </h2>
          <div className="department-cards">
            {Object.entries(departmentSummary).map(([dept, stats]) => (
              <div key={dept} className="department-card">
                <h3>{dept}</h3>
                <div className="department-stats">
                  <div className="stat">
                    <span className="stat-label">Personnel:</span>
                    <span className="stat-value">{stats.total}/{stats.capacity}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Zones:</span>
                    <span className="stat-value">{stats.zones}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Utilization:</span>
                    <span className="stat-value">
                      {Math.round((stats.total / stats.capacity) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="utilization-bar">
                  <div 
                    className="utilization-fill" 
                    style={{ 
                      width: `${Math.min((stats.total / stats.capacity) * 100, 100)}%`,
                      backgroundColor: (stats.total / stats.capacity) > 0.9 ? '#ef4444' : 
                                     (stats.total / stats.capacity) > 0.8 ? '#f59e0b' : '#10b981'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Zone Details */}
        <div className="optimizer-section zone-details">
          <h2>
            <Users className="w-5 h-5" />
            Zone Details
          </h2>
          <div className="zone-table">
            <div className="table-header">
              <div>Zone</div>
              <div>Personnel</div>
              <div>Utilization</div>
              <div>Efficiency</div>
              <div>Status</div>
            </div>
            {filteredZones.map((zone) => (
              <div key={zone.id} className="table-row">
                <div className="zone-info">
                  <div className="zone-name">{zone.name}</div>
                  <div className="zone-dept">{zone.department}</div>
                </div>
                <div className="personnel-count">
                  {zone.currentPersonnel}/{zone.maxCapacity}
                </div>
                <div className="utilization-cell">
                  <span>{getZoneUtilization(zone)}%</span>
                  <div className="mini-bar">
                    <div 
                      className="mini-fill" 
                      style={{ 
                        width: `${getZoneUtilization(zone)}%`,
                        backgroundColor: getZoneUtilization(zone) > 90 ? '#ef4444' : 
                                       getZoneUtilization(zone) > 80 ? '#f59e0b' : '#10b981'
                      }}
                    ></div>
                  </div>
                </div>
                <div className="efficiency-cell">
                  <span className={`efficiency-badge ${getEfficiencyColor(getEfficiencyScore(zone))}`}>
                    {getEfficiencyScore(zone)}
                  </span>
                </div>
                <div className="status-cell">
                  <span className={`status-badge ${zone.status === 'normal' ? 'status-normal' : 
                                                  zone.status === 'warning' ? 'status-warning' : 'status-critical'}`}>
                    {zone.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Analytics */}
        <div className="optimizer-section action-analytics">
          <h2>
            <Activity className="w-5 h-5" />
            Action Analytics ({timeFilter})
          </h2>
          <div className="action-stats">
            {Object.entries(actionsByType).map(([type, count]) => (
              <div key={type} className="action-stat">
                <div className="action-type">{type.replace('_', ' ')}</div>
                <div className="action-count">{count}</div>
              </div>
            ))}
          </div>
          
          <div className="recent-actions">
            <h3>Recent Actions</h3>
            {filteredActions.slice(0, 8).map((action) => (
              <div key={action.id} className="action-item">
                <div className="action-time">
                  {new Date(action.timestamp).toLocaleTimeString('th-TH', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <div className="action-details">
                  <div className="action-person">{action.personName}</div>
                  <div className="action-description">{action.description}</div>
                </div>
                <div className={`action-type-badge ${action.type}`}>
                  {action.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="optimizer-section alerts-panel">
          <h2>
            <AlertTriangle className="w-5 h-5" />
            Active Alerts
          </h2>
          {recentAlerts.length > 0 ? (
            <div className="alerts-list">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                  <div className="alert-icon">
                    {alert.type === 'warning' ? 
                      <AlertTriangle className="w-4 h-4" /> : 
                      <Bell className="w-4 h-4" />
                    }
                  </div>
                  <div className="alert-content">
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-message">{alert.message}</div>
                    <div className="alert-time">
                      {new Date(alert.timestamp).toLocaleTimeString('th-TH')}
                    </div>
                  </div>
                  <div className={`alert-priority priority-${alert.priority}`}>
                    {alert.priority}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-alerts">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <p>No active alerts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptimizerAgent;