import React, { useState, useRef, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, BellOff } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import type { Notification } from '../data/types';
import './NotificationDropdown.css';

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type: Notification['type']) => {
    const iconProps = { className: "w-4 h-4" };
    switch (type) {
      case 'error':
        return <AlertTriangle {...iconProps} />;
      case 'warning':
        return <AlertTriangle {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
      case 'success':
        return <CheckCircle {...iconProps} />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - notifTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="notification-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="notification-trigger"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={`notification-dropdown-menu ${isClosing ? 'closing' : ''}`}>
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="mark-all-read-btn"
                >
                  <Check className="w-3 h-3" />
                  Mark all read
                </button>
              )}
              <button
                onClick={closeDropdown}
                className="close-dropdown-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">
                <BellOff className="empty-icon" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <>
                {notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification-item ${!notification.read ? 'unread' : ''}`}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="notification-content">
                      <div className={`notification-icon ${notification.type}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="notification-details">
                        <div className="notification-title-row">
                          <h4 className={`notification-title ${!notification.read ? 'unread' : ''}`}>
                            {notification.title}
                          </h4>
                          <span className="notification-time">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        <p className={`notification-message ${!notification.read ? 'unread' : ''}`}>
                          {notification.message}
                        </p>
                        {notification.priority && notification.priority !== 'low' && (
                          <span className={`notification-priority ${notification.priority}`}>
                            {notification.priority} priority
                          </span>
                        )}
                      </div>
                      {!notification.read && (
                        <div className="notification-unread-indicator"></div>
                      )}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {notifications.length > 10 && (
            <div className="notification-footer">
              <button className="view-all-btn">
                View all notifications ({notifications.length - 10} more)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;