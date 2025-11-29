import type { User, Zone, Action, Notification, DashboardStats, DefectDetection } from './types';

// Sample dashboard statistics
export const dashboardStats: DashboardStats = {
  totalPersonnel: 234,
  activeZones: 12,
  todayDefectsDetected: 47,
  systemEfficiency: 91.8,
  alertsToday: 15
};

// Sample zones data
export const zones: Zone[] = [
  {
    id: 'zone-1',
    name: 'Assembly Line A',
    department: 'Production',
    currentPersonnel: 28,
    maxCapacity: 30,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-2',
    name: 'Assembly Line B',
    department: 'Production',
    currentPersonnel: 25,
    maxCapacity: 30,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-3',
    name: 'Quality Control Lab',
    department: 'Quality Assurance',
    currentPersonnel: 12,
    maxCapacity: 15,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-4',
    name: 'Final Inspection',
    department: 'Quality Assurance',
    currentPersonnel: 8,
    maxCapacity: 10,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-5',
    name: 'Packaging Station 1',
    department: 'Packaging',
    currentPersonnel: 18,
    maxCapacity: 15,
    status: 'warning',
    actions: []
  },
  {
    id: 'zone-6',
    name: 'Packaging Station 2',
    department: 'Packaging',
    currentPersonnel: 14,
    maxCapacity: 15,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-7',
    name: 'Raw Materials Storage',
    department: 'Logistics',
    currentPersonnel: 22,
    maxCapacity: 25,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-8',
    name: 'Finished goods Warehouse',
    department: 'Logistics',
    currentPersonnel: 16,
    maxCapacity: 20,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-9',
    name: 'Shipping Dock',
    department: 'Logistics',
    currentPersonnel: 19,
    maxCapacity: 18,
    status: 'critical',
    actions: []
  },
  {
    id: 'zone-10',
    name: 'Machine Maintenance',
    department: 'Engineering',
    currentPersonnel: 9,
    maxCapacity: 12,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-11',
    name: 'Facility Maintenance',
    department: 'Engineering',
    currentPersonnel: 6,
    maxCapacity: 8,
    status: 'normal',
    actions: []
  },
  {
    id: 'zone-12',
    name: 'Research & Development',
    department: 'R&D',
    currentPersonnel: 11,
    maxCapacity: 15,
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
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    description: 'Entered Assembly Line A for shift handover',
    zoneId: 'zone-1'
  },
  {
    id: 'action-2',
    type: 'task_complete',
    personId: 'emp-002',
    personName: 'Sarah Johnson',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    description: 'Completed quality inspection batch #QC-2024-1129-045',
    zoneId: 'zone-3'
  },
  {
    id: 'action-3',
    type: 'alert',
    personId: 'emp-003',
    personName: 'Mike Wilson',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    description: 'Shipping dock capacity exceeded - immediate action required',
    zoneId: 'zone-9'
  },
  {
    id: 'action-4',
    type: 'task_start',
    personId: 'emp-004',
    personName: 'Lisa Chen',
    timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    description: 'Started maintenance procedure on Machine #M-204',
    zoneId: 'zone-10'
  },
  {
    id: 'action-5',
    type: 'exit',
    personId: 'emp-005',
    personName: 'David Rodriguez',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    description: 'Exited Packaging Station 1 for lunch break',
    zoneId: 'zone-5'
  },
  {
    id: 'action-6',
    type: 'entry',
    personId: 'emp-006',
    personName: 'Emily Watson',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    description: 'Entered R&D Lab for prototype testing',
    zoneId: 'zone-12'
  },
  {
    id: 'action-7',
    type: 'task_complete',
    personId: 'emp-007',
    personName: 'Robert Kim',
    timestamp: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    description: 'Completed shipment preparation SP-2024-1129-089',
    zoneId: 'zone-8'
  },
  {
    id: 'action-8',
    type: 'alert',
    personId: 'emp-008',
    personName: 'Maria Garcia',
    timestamp: new Date(Date.now() - 1000 * 60 * 28).toISOString(),
    description: 'Equipment malfunction detected in Assembly Line B',
    zoneId: 'zone-2'
  },
  {
    id: 'action-9',
    type: 'task_start',
    personId: 'emp-009',
    personName: 'James Thompson',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    description: 'Initiated quality audit procedure QA-2024-Week48',
    zoneId: 'zone-4'
  },
  {
    id: 'action-10',
    type: 'entry',
    personId: 'emp-010',
    personName: 'Amanda Liu',
    timestamp: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    description: 'Entered Raw Materials Storage for inventory check',
    zoneId: 'zone-7'
  },
  {
    id: 'action-11',
    type: 'task_complete',
    personId: 'emp-011',
    personName: 'Michael Brown',
    timestamp: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
    description: 'Completed facility safety inspection rounds',
    zoneId: 'zone-11'
  },
  {
    id: 'action-12',
    type: 'exit',
    personId: 'emp-012',
    personName: 'Jennifer Davis',
    timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    description: 'Exited Packaging Station 2 for equipment maintenance',
    zoneId: 'zone-6'
  }
];

// Sample notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'error',
    title: 'Critical Zone Overflow',
    message: 'Shipping dock is operating at 106% capacity (19/18) - Immediate intervention required',
    timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-2',
    type: 'warning',
    title: 'Zone Capacity Alert',
    message: 'Packaging Station 1 is operating over capacity (18/15)',
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-3',
    type: 'error',
    title: 'Equipment Malfunction',
    message: 'Assembly Line B - Conveyor belt motor requires immediate maintenance',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-4',
    type: 'info',
    title: 'Shift Change Reminder',
    message: 'Next shift change in 25 minutes - Prepare handover documents',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    read: false,
    priority: 'medium'
  },
  {
    id: 'notif-5',
    type: 'warning',
    title: 'Safety Inspection Due',
    message: 'Monthly safety inspection for Maintenance zones is overdue by 2 days',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    read: false,
    priority: 'medium'
  },
  {
    id: 'notif-6',
    type: 'success',
    title: 'Quality Target Exceeded',
    message: 'Daily quality target achieved at 97.2% - 2.2% above target',
    timestamp: new Date(Date.now() - 1000 * 60 * 32).toISOString(),
    read: true,
    priority: 'low'
  },
  {
    id: 'notif-7',
    type: 'info',
    title: 'Production Milestone',
    message: '10,000th unit produced today - Congratulations to the production team!',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    read: true,
    priority: 'low'
  },
  {
    id: 'notif-8',
    type: 'warning',
    title: 'Inventory Alert',
    message: 'Raw material stock level for Component X dropping below reorder point',
    timestamp: new Date(Date.now() - 1000 * 60 * 52).toISOString(),
    read: false,
    priority: 'medium'
  },
  {
    id: 'notif-9',
    type: 'error',
    title: 'Temperature Alert',
    message: 'Quality Control Lab temperature exceeded optimal range (28°C) - Check HVAC system',
    timestamp: new Date(Date.now() - 1000 * 60 * 65).toISOString(),
    read: false,
    priority: 'high'
  },
  {
    id: 'notif-10',
    type: 'success',
    title: 'Maintenance Complete',
    message: 'Scheduled maintenance on Machine #M-156 completed successfully',
    timestamp: new Date(Date.now() - 1000 * 60 * 78).toISOString(),
    read: true,
    priority: 'low'
  },
  {
    id: 'notif-11',
    type: 'info',
    title: 'Training Session Reminder',
    message: 'New safety protocol training session starts at 2:00 PM in Conference Room B',
    timestamp: new Date(Date.now() - 1000 * 60 * 85).toISOString(),
    read: true,
    priority: 'medium'
  },
  {
    id: 'notif-12',
    type: 'warning',
    title: 'Energy Consumption Alert',
    message: 'Power usage in Production zones 15% higher than normal - Check equipment efficiency',
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    read: true,
    priority: 'medium'
  }
];

// Sample defect detection results
export const defectDetections: DefectDetection[] = [
  {
    id: 'detect-1',
    prompt: 'Detect surface scratches and dents on aluminum housing components',
    imageUrl: 'https://images.unsplash.com/photo-1581092795706-519d8c0c1fd0?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-1',
        type: 'Surface Scratch',
        description: 'Minor linear scratch detected on aluminum surface, 2.3mm length',
        severity: 'low',
        location: { x: 120, y: 80, width: 50, height: 8 },
        confidence: 0.89
      },
      {
        id: 'defect-1b',
        type: 'Minor Dent',
        description: 'Small indentation detected, depth approximately 0.5mm',
        severity: 'low',
        location: { x: 280, y: 150, width: 25, height: 25 },
        confidence: 0.76
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    confidence: 0.89,
    status: 'completed'
  },
  {
    id: 'detect-2',
    prompt: 'Inspect welding quality and joint integrity in steel frame assembly',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-2',
        type: 'Weld Porosity',
        description: 'Multiple gas pockets detected in weld bead - incomplete fusion',
        severity: 'high',
        location: { x: 200, y: 150, width: 80, height: 40 },
        confidence: 0.94
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    confidence: 0.94,
    status: 'completed'
  },
  {
    id: 'detect-3',
    prompt: 'Check electronic circuit boards for component placement and solder joint quality',
    imageUrl: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-3a',
        type: 'Cold Solder Joint',
        description: 'Insufficient solder joint detected on resistor R47',
        severity: 'medium',
        location: { x: 150, y: 120, width: 15, height: 10 },
        confidence: 0.87
      },
      {
        id: 'defect-3b',
        type: 'Component Misalignment',
        description: 'Capacitor C23 positioned 1.2mm off center',
        severity: 'low',
        location: { x: 220, y: 180, width: 20, height: 15 },
        confidence: 0.82
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 72).toISOString(),
    confidence: 0.85,
    status: 'completed'
  },
  {
    id: 'detect-4',
    prompt: 'Analyze paint finish quality and coverage uniformity on automotive parts',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop',
    detectedDefects: [],
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    confidence: 0.91,
    status: 'completed'
  },
  {
    id: 'detect-5',
    prompt: 'Detect cracks and stress fractures in injection molded plastic components',
    imageUrl: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-5',
        type: 'Stress Crack',
        description: 'Hairline crack detected near mounting point - potential failure risk',
        severity: 'critical',
        location: { x: 180, y: 90, width: 60, height: 3 },
        confidence: 0.96
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 118).toISOString(),
    confidence: 0.96,
    status: 'completed'
  },
  {
    id: 'detect-6',
    prompt: 'Inspect textile fabric for holes, tears, and color inconsistencies',
    imageUrl: 'https://images.unsplash.com/photo-1586295166156-b6cc32ec2d10?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-6a',
        type: 'Fabric Tear',
        description: 'Small tear detected in fabric weave, 4mm length',
        severity: 'medium',
        location: { x: 240, y: 160, width: 30, height: 8 },
        confidence: 0.88
      },
      {
        id: 'defect-6b',
        type: 'Color Variation',
        description: 'Slight color inconsistency detected - dye concentration variance',
        severity: 'low',
        location: { x: 120, y: 200, width: 80, height: 60 },
        confidence: 0.73
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 142).toISOString(),
    confidence: 0.81,
    status: 'completed'
  },
  {
    id: 'detect-7',
    prompt: 'Quality check for food packaging seal integrity and contamination',
    imageUrl: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=400&h=300&fit=crop',
    detectedDefects: [
      {
        id: 'defect-7',
        type: 'Seal Defect',
        description: 'Incomplete heat seal detected on package edge - potential contamination risk',
        severity: 'high',
        location: { x: 300, y: 45, width: 90, height: 12 },
        confidence: 0.92
      }
    ],
    timestamp: new Date(Date.now() - 1000 * 60 * 165).toISOString(),
    confidence: 0.92,
    status: 'completed'
  },
  {
    id: 'detect-8',
    prompt: 'Currently processing batch #QC-2024-1129-089',
    imageUrl: 'https://images.unsplash.com/photo-1565008447742-97d724846c9f?w=400&h=300&fit=crop',
    detectedDefects: [],
    timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    confidence: 0,
    status: 'processing'
  }
];

// Sample users data for factory personnel
export const users: User[] = [
  {
    id: 1,
    name: "Alexandra Mitchell",
    email: "a.mitchell@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    role: "admin",
    department: "Management"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    email: "m.rodriguez@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "supervisor",
    department: "Production"
  },
  {
    id: 3,
    name: "Dr. Sarah Chen",
    email: "s.chen@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
    role: "supervisor",
    department: "Quality Assurance"
  },
  {
    id: 4,
    name: "James Thompson",
    email: "j.thompson@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "operator",
    department: "Quality Assurance"
  },
  {
    id: 5,
    name: "Emily Watson",
    email: "e.watson@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    role: "supervisor",
    department: "R&D"
  },
  {
    id: 6,
    name: "David Kim",
    email: "d.kim@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    role: "supervisor",
    department: "Engineering"
  },
  {
    id: 7,
    name: "Lisa Anderson",
    email: "l.anderson@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    role: "supervisor",
    department: "Logistics"
  },
  {
    id: 8,
    name: "Robert Johnson",
    email: "r.johnson@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop&crop=face",
    role: "operator",
    department: "Production"
  },
  {
    id: 9,
    name: "Maria Garcia",
    email: "m.garcia@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    role: "operator",
    department: "Packaging"
  },
  {
    id: 10,
    name: "Michael Brown",
    email: "m.brown@cmklfactory.com",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face",
    role: "operator",
    department: "Engineering"
  }
];

// Additional mock data for more comprehensive frontend experience
export const productionMetrics = {
  todayProduced: 8756,
  targetProduction: 9200,
  defectRate: 2.8,
  targetDefectRate: 3.5,
  efficiency: 91.8,
  uptime: 94.2,
  energyConsumption: 847.3, // kWh
  co2Emissions: 234.1 // kg CO2
};

export const machineStatus = [
  { id: 'M-001', name: 'Assembly Robot A1', status: 'running', efficiency: 97.2, lastMaintenance: '2024-11-25', nextMaintenance: '2024-12-05' },
  { id: 'M-002', name: 'Assembly Robot A2', status: 'running', efficiency: 94.8, lastMaintenance: '2024-11-23', nextMaintenance: '2024-12-03' },
  { id: 'M-003', name: 'Conveyor Belt B1', status: 'maintenance', efficiency: 0, lastMaintenance: '2024-11-29', nextMaintenance: '2024-11-29' },
  { id: 'M-004', name: 'Quality Scanner QS-1', status: 'running', efficiency: 99.1, lastMaintenance: '2024-11-20', nextMaintenance: '2024-12-01' },
  { id: 'M-005', name: 'Packaging Unit P1', status: 'running', efficiency: 89.3, lastMaintenance: '2024-11-26', nextMaintenance: '2024-12-06' },
  { id: 'M-006', name: 'Packaging Unit P2', status: 'warning', efficiency: 76.4, lastMaintenance: '2024-11-15', nextMaintenance: '2024-11-30' },
  { id: 'M-007', name: 'Welding Station W1', status: 'running', efficiency: 92.7, lastMaintenance: '2024-11-22', nextMaintenance: '2024-12-02' },
  { id: 'M-008', name: 'Paint Booth PB-1', status: 'idle', efficiency: 0, lastMaintenance: '2024-11-28', nextMaintenance: '2024-12-08' }
];

export const energyData = {
  currentUsage: 847.3, // kWh
  peakUsage: 952.1,
  averageUsage: 786.5,
  hourlyConsumption: [
    { time: '00:00', usage: 456.2 },
    { time: '01:00', usage: 434.1 },
    { time: '02:00', usage: 445.8 },
    { time: '03:00', usage: 467.3 },
    { time: '04:00', usage: 523.7 },
    { time: '05:00', usage: 634.9 },
    { time: '06:00', usage: 756.2 },
    { time: '07:00', usage: 834.5 },
    { time: '08:00', usage: 891.3 },
    { time: '09:00', usage: 847.3 }
  ]
};

export const qualityTrends = {
  weeklyDefectRates: [
    { week: 'Week 44', rate: 3.2 },
    { week: 'Week 45', rate: 2.9 },
    { week: 'Week 46', rate: 3.1 },
    { week: 'Week 47', rate: 2.8 },
    { week: 'Week 48', rate: 2.8 }
  ],
  defectCategories: [
    { category: 'Surface Defects', count: 23, percentage: 34.8 },
    { category: 'Dimensional Issues', count: 18, percentage: 27.3 },
    { category: 'Assembly Defects', count: 15, percentage: 22.7 },
    { category: 'Material Defects', count: 10, percentage: 15.2 }
  ]
};

export const scheduleData = [
  { 
    id: 'sched-1', 
    task: 'Machine M-006 Preventive Maintenance',
    type: 'maintenance',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
    estimatedDuration: '3 hours',
    assignedTo: 'Michael Brown',
    priority: 'high'
  },
  {
    id: 'sched-2',
    task: 'Quality Audit - Assembly Line A & B',
    type: 'audit',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString(),
    estimatedDuration: '4 hours',
    assignedTo: 'Dr. Sarah Chen',
    priority: 'medium'
  },
  {
    id: 'sched-3',
    task: 'Safety Training Session - New Protocols',
    type: 'training',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    estimatedDuration: '2 hours',
    assignedTo: 'All Staff',
    priority: 'medium'
  },
  {
    id: 'sched-4',
    task: 'Inventory Cycle Count - Raw Materials',
    type: 'inventory',
    scheduledTime: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
    estimatedDuration: '6 hours',
    assignedTo: 'Lisa Anderson',
    priority: 'low'
  }
];