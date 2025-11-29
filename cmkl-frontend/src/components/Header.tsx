import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationDropdown from './NotificationDropdown';
import { 
  BarChart3, 
  Search, 
  Settings, 
  User,
  Activity
} from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActiveLink = (path: string) => {
    return location.pathname === path || 
           (path === '/dashboard' && location.pathname === '/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-gray-900">AI Factory</span>
                <div className="text-xs text-gray-500">Dashboard System</div>
              </div>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-1">
              <Link 
                to="/dashboard" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActiveLink('/dashboard') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/defect-detector" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActiveLink('/defect-detector') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Defect Detection</span>
              </Link>
              <Link 
                to="/optimizer" 
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActiveLink('/optimizer') 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>Optimizer Agent</span>
              </Link>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <NotificationDropdown />

            {/* Settings */}
            <button 
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 group"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            {/* User Profile */}
            <button className="flex items-center space-x-2 p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden sm:block font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 px-4 py-2">
        <div className="flex space-x-1">
          <Link 
            to="/dashboard" 
            className={`flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActiveLink('/dashboard') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link 
            to="/defect-detector" 
            className={`flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActiveLink('/defect-detector') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Defect</span>
          </Link>
          <Link 
            to="/optimizer" 
            className={`flex-1 flex items-center justify-center space-x-1 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActiveLink('/optimizer') 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Optimizer</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;