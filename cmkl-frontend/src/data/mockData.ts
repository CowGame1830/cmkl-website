import type { User, Zone, Action, Notification, DashboardStats, DefectDetection } from './types';

// Sample dashboard statistics
export const dashboardStats: DashboardStats = {
  totalPersonnel: 156,
  activeZones: 8,
  todayDefectsDetected: 23,
  systemEfficiency: 94.2,
  alertsToday: 7
};

// Sample zones data
export const zones: Zone[] = [
  {
    id: 'zone-1',
    name: 'Assembly Line A',
    department: 'Production',
    currentPersonnel: 24,
    maxCapacity: 30,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-2',
    name: 'Quality Control',
    department: 'QC',
    currentPersonnel: 8,
    maxCapacity: 10,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-3',
    name: 'Packaging',
    department: 'Production',
    currentPersonnel: 15,
    maxCapacity: 12,
    status: 'warning',
    actions: []
  },
  {
    id: 'zone-4',
    name: 'Warehouse',
    department: 'Logistics',
    currentPersonnel: 18,
    maxCapacity: 25,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-5',
    name: 'Maintenance',
    department: 'Engineering',
    currentPersonnel: 6,
    maxCapacity: 8,
    status: 'normal',
    actions: []
  }
];

// Sample actions data
export const recentActions: Action[] = [
  {
    id: 'action-1',
    type: 'entry',
    personId: 'emp-001',
    personName: 'John Smith',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    description: 'Entered Assembly Line A',
    zoneId: 'zone-1'
  },
  {
    id: 'action-2',
    type: 'task_complete',
    personId: 'emp-002',
    personName: 'Sarah Johnson',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    description: 'Completed quality inspection batch #QC-2024-1129-001',
    zoneId: 'zone-2'
  },
  {
    id: 'action-3',
    type: 'alert',
    personId: 'emp-003',
    personName: 'Mike Wilson',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    description: 'Zone capacity exceeded - immediate action required',
    zoneId: 'zone-3'
  },
  {
    id: 'action-4',
    type: 'exit',
    personId: 'emp-004',
    personName: 'Lisa Chen',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    description: 'Exited Warehouse for break',
    zoneId: 'zone-4'
  }
];

// Sample notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'warning',
    title: 'Zone Capacity Alert',
    message: 'Packaging zone is operating over capacity (15/12)',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-2',
    type: 'info',
    title: 'Shift Change Reminder',
    message: 'Next shift change in 30 minutes',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    read: false,
    priority: 'medium'
  },
  {
    id: 'notif-3',
    type: 'success',
    title: 'Quality Target Achieved',
    message: 'Daily quality target of 95% achieved',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: true,
    priority: 'low'
  },
  {
    id: 'notif-4',
    type: 'error',
    title: 'Equipment Alert',
    message: 'Machine #A-001 requires maintenance attention',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    read: false,
    priority: 'high'
  }
];

// Sample defect detection results
export const defectDetections: DefectDetection[] = [
  {
    id: 'detect-1',
    prompt: 'Detect surface scratches on metal components',
    imageUrl: 'https://images.unsplash.com/photo-1581092795706-519d8c0c1fd0?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-1',
        type: 'Surface Scratch',
        description: 'Minor scratch on surface',
        severity: 'low',
        location: { x: 120, y: 80, width: 50, height: 20 },
        confidence: 0.89
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    confidence: 0.89,
    status: 'completed'
  },
  {
    id: 'detect-2',
    prompt: 'Check for welding defects in joints',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-2',
        type: 'Poor Weld',
        description: 'Incomplete weld penetration detected',
        severity: 'high',
        location: { x: 200, y: 150, width: 80, height: 40 },
        confidence: 0.94
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    confidence: 0.94,
    status: 'completed'
  }
];

// Sample users data for factory personnel
export const users: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@factory.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "admin",
    department: "Management"
  },
  {
    id: 2,
    name: "Production Supervisor",
    email: "supervisor@factory.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    role: "supervisor",
    department: "Production"
  },
  {
    id: 3,
    name: "QC Operator",
    email: "qc@factory.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "operator",
    department: "Quality Control"
  }
];