import React from 'react';
import { dashboardStats, zones, recentActions, notifications } from '../data/mockData';
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
  Bell
} from 'lucide-react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Factory AI Dashboard</h1>
        <p>Real-time monitoring and optimization system</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <div className="stat-content">
            <h3>Total Personnel</h3>
            <p className="stat-number">{dashboardStats.totalPersonnel}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
          <div className="stat-content">
            <h3>Active Zones</h3>
            <p className="stat-number">{dashboardStats.activeZones}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <AlertTriangle className="w-8 h-8 text-orange-600" />
          </div>
          <div className="stat-content">
            <h3>Defects Today</h3>
            <p className="stat-number">{dashboardStats.todayDefectsDetected}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
          <div className="stat-content">
            <h3>System Efficiency</h3>
            <p className="stat-number">{dashboardStats.systemEfficiency}%</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Zone Status */}
        <div className="dashboard-section">
          <h2>Zone Status</h2>
          <div className="zone-grid">
            {zones.map((zone) => (
              <div key={zone.id} className="zone-card">
                <div className="zone-header">
                  <h3>{zone.name}</h3>
                  <span className={`zone-status ${getStatusColor(zone.status)}`}>
                    {zone.status.charAt(0).toUpperCase() + zone.status.slice(1)}
                  </span>
                </div>
                <p className="zone-department">{zone.department}</p>
                <div className="zone-personnel">
                  <span>Personnel: {zone.currentPersonnel}/{zone.maxCapacity}</span>
                  <div className="personnel-bar">
                    <div 
                      className="personnel-fill" 
                      style={{ 
                        width: `${(zone.currentPersonnel / zone.maxCapacity) * 100}%`,
                        backgroundColor: zone.status === 'warning' ? '#f59e0b' : 
                                       zone.status === 'critical' ? '#ef4444' : '#10b981'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Actions */}
        <div className="dashboard-section">
          <h2>Recent Actions</h2>
          <div className="actions-list">
            {recentActions.map((action) => (
              <div key={action.id} className="action-item">
                <div className="action-icon">
                  {getActionIcon(action.type)}
                </div>
                <div className="action-content">
                  <p className="action-description">{action.description}</p>
                  <div className="action-meta">
                    <span className="action-person">{action.personName}</span>
                    <span className="action-time">
                      <Clock className="w-3 h-3" />
                      {formatTime(action.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="dashboard-section">
          <h2>System Notifications</h2>
          <div className="notifications-list">
            {notifications.slice(0, 6).map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <h4>{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time">{formatTime(notification.timestamp)}</span>
                </div>
                <div className={`priority-indicator priority-${notification.priority}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;