import React, { useState, useEffect } from 'react';
import { 
  dashboardStats, 
  zones, 
  recentActions, 
  notifications,
  productionMetrics,
  machineStatus,
  energyData,
  dataSimulator 
} from '../data';
import type { Zone, Action, Notification } from '../data/types';
import { 
  Users, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Clock,
  CheckCircle,
  XCircle,
  Info,
  Bell,
  Zap,
  Activity,
  Settings,
  Gauge
} from 'lucide-react';
import './ComprehensiveDashboard.css';

const ComprehensiveDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [, setUpdateTrigger] = useState(0);

  useEffect(() => {
    // Start the data simulator for real-time updates
    dataSimulator.start();
    
    const handleDataUpdate = () => {
      setUpdateTrigger(prev => prev + 1);
    };
    
    dataSimulator.addListener(handleDataUpdate);

    return () => {
      dataSimulator.removeListener(handleDataUpdate);
    };
  }, []);

  const getStatusColor = (status: Zone['status']) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActionIcon = (type: Action['type']) => {
    switch (type) {
      case 'entry': return <Users className="w-4 h-4 text-green-600" />;
      case 'exit': return <Users className="w-4 h-4 text-gray-600" />;
      case 'task_complete': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'task_start': return <Activity className="w-4 h-4 text-purple-600" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'info': return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('th-TH', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('th-TH');
  };

  const getZonesByDepartment = () => {
    const deptZones: Record<string, Zone[]> = {};
    zones.forEach(zone => {
      if (!deptZones[zone.department]) {
        deptZones[zone.department] = [];
      }
      deptZones[zone.department].push(zone);
    });
    return deptZones;
  };

  const getMachinesByStatus = () => {
    const statusCount = {
      running: machineStatus.filter(m => m.status === 'running').length,
      warning: machineStatus.filter(m => m.status === 'warning').length,
      maintenance: machineStatus.filter(m => m.status === 'maintenance').length,
      idle: machineStatus.filter(m => m.status === 'idle').length,
      error: machineStatus.filter(m => m.status === 'error').length
    };
    return statusCount;
  };

  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read);
  };

  const getCriticalAlerts = () => {
    return notifications.filter(n => !n.read && (n.type === 'error' || n.priority === 'high'));
  };

  const deptZones = getZonesByDepartment();
  const machinesByStatus = getMachinesByStatus();
  const unreadNotifications = getUnreadNotifications();
  const criticalAlerts = getCriticalAlerts();
  const recentActionsFiltered = recentActions.slice(0, 12);

  return (
    <div className="comprehensive-dashboard">
      {/* Enhanced Header */}
      <div className="dashboard-header-comprehensive">
        <div className="header-main">
          <div className="header-info">
            <h1>CMKL Smart Factory Dashboard</h1>
            <p>Comprehensive real-time monitoring and optimization system</p>
            <div className="live-status">
              <div className="live-dot"></div>
              <span>Live System - Last Updated: {formatTime(new Date().toISOString())}</span>
            </div>
          </div>
          <div className="header-controls">
            <select 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="time-range-selector"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button 
              className="scenario-btn"
              onClick={() => dataSimulator.triggerScenario('production_peak')}
              title="Simulate Production Peak"
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button 
              className="scenario-btn"
              onClick={() => dataSimulator.triggerScenario('emergency')}
              title="Simulate Emergency"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
            <button 
              className="scenario-btn"
              onClick={() => dataSimulator.triggerScenario('normal')}
              title="Reset to Normal"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Critical Alerts Bar */}
        {criticalAlerts.length > 0 && (
          <div className="critical-alerts-bar">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>{criticalAlerts.length} critical alert(s) require immediate attention</span>
            <button className="view-alerts-btn">View All</button>
          </div>
        )}
      </div>

      {/* Enhanced Stats Grid */}
      <div className="enhanced-stats-grid">
        <div className="stat-card-enhanced production">
          <div className="stat-icon-enhanced">
            <Activity className="w-8 h-8" />
          </div>
          <div className="stat-content-enhanced">
            <div className="stat-label-enhanced">Production Today</div>
            <div className="stat-value-enhanced">{productionMetrics.todayProduced.toLocaleString()}</div>
            <div className="stat-secondary">Target: {productionMetrics.targetProduction.toLocaleString()}</div>
            <div className="stat-progress">
              <div 
                className="progress-bar-enhanced"
                style={{ 
                  width: `${Math.min(100, (productionMetrics.todayProduced / productionMetrics.targetProduction) * 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced personnel">
          <div className="stat-icon-enhanced">
            <Users className="w-8 h-8" />
          </div>
          <div className="stat-content-enhanced">
            <div className="stat-label-enhanced">Active Personnel</div>
            <div className="stat-value-enhanced">{dashboardStats.totalPersonnel}</div>
            <div className="stat-secondary">Across {dashboardStats.activeZones} zones</div>
            <div className="personnel-distribution">
              {Object.entries(deptZones).slice(0, 3).map(([dept, zones]) => (
                <span key={dept} className="dept-count">
                  {dept}: {zones.reduce((sum, z) => sum + z.currentPersonnel, 0)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced efficiency">
          <div className="stat-icon-enhanced">
            <Gauge className="w-8 h-8" />
          </div>
          <div className="stat-content-enhanced">
            <div className="stat-label-enhanced">System Efficiency</div>
            <div className="stat-value-enhanced">{dashboardStats.systemEfficiency.toFixed(1)}%</div>
            <div className="stat-secondary">Uptime: {productionMetrics.uptime.toFixed(1)}%</div>
            <div className="efficiency-gauge">
              <div 
                className="gauge-fill"
                style={{ 
                  transform: `rotate(${(dashboardStats.systemEfficiency / 100) * 180}deg)` 
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced energy">
          <div className="stat-icon-enhanced">
            <Zap className="w-8 h-8" />
          </div>
          <div className="stat-content-enhanced">
            <div className="stat-label-enhanced">Energy Usage</div>
            <div className="stat-value-enhanced">{energyData.currentUsage.toFixed(0)} kWh</div>
            <div className="stat-secondary">Peak: {energyData.peakUsage.toFixed(0)} kWh</div>
            <div className="energy-indicator">
              <div className={`energy-status ${energyData.currentUsage > energyData.averageUsage * 1.2 ? 'high' : 'normal'}`}>
                {energyData.currentUsage > energyData.averageUsage * 1.2 ? 'High Usage' : 'Normal'}
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced defects">
          <div className="stat-icon-enhanced">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="stat-content-enhanced">
            <div className="stat-label-enhanced">Defects Today</div>
            <div className="stat-value-enhanced">{dashboardStats.todayDefectsDetected}</div>
            <div className="stat-secondary">Rate: {productionMetrics.defectRate.toFixed(1)}%</div>
            <div className={`defect-trend ${productionMetrics.defectRate <= productionMetrics.targetDefectRate ? 'good' : 'warning'}`}>
              {productionMetrics.defectRate <= productionMetrics.targetDefectRate ? '✓ On Target' : '⚠ Above Target'}
            </div>
          </div>
        </div>

        <div className="stat-card-enhanced machines">
          <div className="stat-icon-enhanced">
            <Settings className="w-8 h-8" />
          </div>
          <div className="stat-content-enhanced">
            <div className="stat-label-enhanced">Machine Status</div>
            <div className="stat-value-enhanced">{machinesByStatus.running}</div>
            <div className="stat-secondary">Running machines</div>
            <div className="machine-status-summary">
              <span className="status-item running">{machinesByStatus.running} Running</span>
              <span className="status-item warning">{machinesByStatus.warning} Warning</span>
              <span className="status-item maintenance">{machinesByStatus.maintenance} Maintenance</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Grid */}
      <div className="dashboard-main-grid">
        {/* Department Overview */}
        <div className="dashboard-section-enhanced department-overview">
          <div className="section-header-enhanced">
            <h2>
              <MapPin className="w-5 h-5" />
              Department Overview
            </h2>
            <div className="section-controls">
              <button className="view-toggle active">Grid</button>
              <button className="view-toggle">List</button>
            </div>
          </div>
          <div className="department-grid-enhanced">
            {Object.entries(deptZones).map(([department, deptZoneList]) => {
              const totalPersonnel = deptZoneList.reduce((sum, zone) => sum + zone.currentPersonnel, 0);
              const totalCapacity = deptZoneList.reduce((sum, zone) => sum + zone.maxCapacity, 0);
              const utilization = (totalPersonnel / totalCapacity) * 100;
              const criticalZones = deptZoneList.filter(z => z.status === 'critical').length;
              const warningZones = deptZoneList.filter(z => z.status === 'warning').length;
              
              return (
                <div key={department} className="department-card-enhanced">
                  <div className="dept-header">
                    <h3>{department}</h3>
                    <div className={`dept-status ${criticalZones > 0 ? 'critical' : warningZones > 0 ? 'warning' : 'normal'}`}>
                      {criticalZones > 0 ? 'Critical' : warningZones > 0 ? 'Warning' : 'Normal'}
                    </div>
                  </div>
                  <div className="dept-metrics">
                    <div className="metric">
                      <span className="metric-label">Personnel</span>
                      <span className="metric-value">{totalPersonnel}/{totalCapacity}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Zones</span>
                      <span className="metric-value">{deptZoneList.length}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Utilization</span>
                      <span className="metric-value">{utilization.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="utilization-bar-enhanced">
                    <div 
                      className="utilization-fill-enhanced"
                      style={{ 
                        width: `${Math.min(100, utilization)}%`,
                        backgroundColor: utilization > 100 ? '#ef4444' : utilization > 90 ? '#f59e0b' : '#10b981'
                      }}
                    ></div>
                  </div>
                  <div className="zone-list-mini">
                    {deptZoneList.map(zone => (
                      <div key={zone.id} className={`zone-mini ${zone.status}`} title={zone.name}>
                        <span className="zone-name">{zone.name}</span>
                        <span className="zone-count">{zone.currentPersonnel}/{zone.maxCapacity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="dashboard-section-enhanced activity-feed">
          <div className="section-header-enhanced">
            <h2>
              <Activity className="w-5 h-5" />
              Real-time Activity Feed
            </h2>
            <div className="activity-stats">
              <span>{recentActionsFiltered.length} recent actions</span>
            </div>
          </div>
          <div className="activity-list-enhanced">
            {recentActionsFiltered.map((action) => (
              <div key={action.id} className="activity-item-enhanced">
                <div className="activity-icon-enhanced">
                  {getActionIcon(action.type)}
                </div>
                <div className="activity-content-enhanced">
                  <div className="activity-description">{action.description}</div>
                  <div className="activity-meta">
                    <span className="activity-person">{action.personName}</span>
                    <span className="activity-time">
                      <Clock className="w-3 h-3" />
                      {formatTime(action.timestamp)}
                    </span>
                    <span className={`activity-type-badge ${action.type}`}>
                      {action.type.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Notifications Panel */}
        <div className="dashboard-section-enhanced notifications-enhanced">
          <div className="section-header-enhanced">
            <h2>
              <Bell className="w-5 h-5" />
              System Notifications
            </h2>
            <div className="notification-summary">
              <span className="unread-count">{unreadNotifications.length} unread</span>
              <span className="critical-count">{criticalAlerts.length} critical</span>
            </div>
          </div>
          <div className="notifications-list-enhanced">
            {notifications.slice(0, 8).map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item-enhanced ${notification.read ? 'read' : 'unread'} ${notification.type}`}
              >
                <div className="notification-icon-enhanced">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content-enhanced">
                  <div className="notification-header">
                    <h4>{notification.title}</h4>
                    <div className={`priority-indicator priority-${notification.priority}`}>
                      {notification.priority}
                    </div>
                  </div>
                  <p>{notification.message}</p>
                  <span className="notification-time">{formatDateTime(notification.timestamp)}</span>
                </div>
                {!notification.read && <div className="unread-indicator"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;