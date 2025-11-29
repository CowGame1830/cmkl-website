// Type definitions for AI Factory Dashboard
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'operator' | 'supervisor';
  department: string;
}

export interface DefectDetection {
  id: string;
  prompt: string;
  imageUrl?: string;
  detectedDefects: Defect[];
  timestamp: string;
  confidence: number;
  status: 'processing' | 'completed' | 'failed';
}

export interface Defect {
  id: string;
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: { x: number; y: number; width: number; height: number };
  confidence: number;
}

export interface Zone {
  id: string;
  name: string;
  department: string;
  currentPersonnel: number;
  maxCapacity: number;
  status: 'normal' | 'warning' | 'critical';
  actions: Action[];
}

export interface Action {
  id: string;
  type: 'entry' | 'exit' | 'task_start' | 'task_complete' | 'alert';
  personId: string;
  personName: string;
  timestamp: string;
  description: string;
  zoneId: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface DashboardStats {
  totalPersonnel: number;
  activeZones: number;
  todayDefectsDetected: number;
  systemEfficiency: number;
  alertsToday: number;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}