// Additional mock data and utility functions for enhanced frontend experience

// Sample industrial images for defect detection testing
export const sampleImages = [
  {
    id: 'sample-1',
    name: 'Circuit Board Assembly',
    url: 'https://images.unsplash.com/photo-1518314916381-77a37c2a49ae?w=600&h=400&fit=crop',
    description: 'Electronic circuit board with various components',
    category: 'electronics'
  },
  {
    id: 'sample-2',
    name: 'Metal Welding Joint',
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop',
    description: 'Steel welding joint in industrial setting',
    category: 'welding'
  },
  {
    id: 'sample-3',
    name: 'Aluminum Housing',
    url: 'https://images.unsplash.com/photo-1581092795706-519d8c0c1fd0?w=600&h=400&fit=crop',
    description: 'Machined aluminum component surface',
    category: 'machining'
  },
  {
    id: 'sample-4',
    name: 'Automotive Paint Finish',
    url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
    description: 'Automotive part with paint finish',
    category: 'coating'
  },
  {
    id: 'sample-5',
    name: 'Plastic Injection Molding',
    url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop',
    description: 'Injection molded plastic component',
    category: 'plastics'
  },
  {
    id: 'sample-6',
    name: 'Fabric Textile',
    url: 'https://images.unsplash.com/photo-1586295166156-b6cc32ec2d10?w=600&h=400&fit=crop',
    description: 'Industrial textile material',
    category: 'textile'
  },
  {
    id: 'sample-7',
    name: 'Food Package Seal',
    url: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=600&h=400&fit=crop',
    description: 'Food packaging with heat seal',
    category: 'packaging'
  }
];

// Pre-defined detection prompts for different industries
export const detectionPrompts = [
  {
    category: 'electronics',
    prompts: [
      'Detect cold solder joints and component misalignment on circuit board',
      'Check for broken traces and damaged components',
      'Identify poor component placement and orientation issues',
      'Find flux residue and contamination on PCB surface',
      'Detect component polarity errors and missing parts'
    ]
  },
  {
    category: 'welding',
    prompts: [
      'Inspect weld bead quality and detect porosity',
      'Check for incomplete fusion and lack of penetration',
      'Identify cracks and undercutting in weld joints',
      'Detect spatter and discoloration around welds',
      'Assess weld profile and consistency'
    ]
  },
  {
    category: 'machining',
    prompts: [
      'Detect surface scratches and tool marks on metal surfaces',
      'Check for burrs and rough edges on machined parts',
      'Identify dimensional deviations and geometric tolerances',
      'Find surface defects like pitting and corrosion',
      'Detect improper surface finish and texture'
    ]
  },
  {
    category: 'coating',
    prompts: [
      'Inspect paint coverage and detect missed areas',
      'Check for orange peel and surface texture issues',
      'Identify runs, sags, and drips in paint application',
      'Detect color variations and shade differences',
      'Find contamination and foreign particles in coating'
    ]
  },
  {
    category: 'plastics',
    prompts: [
      'Detect stress cracks and crazing in plastic parts',
      'Check for flash and parting line defects',
      'Identify sink marks and warping in molded parts',
      'Find contamination and color streaks',
      'Detect surface blemishes and texture variations'
    ]
  },
  {
    category: 'textile',
    prompts: [
      'Inspect fabric for holes, tears, and snags',
      'Check weave consistency and thread tension',
      'Detect color variations and dye defects',
      'Identify foreign fibers and contamination',
      'Find pattern misalignment and printing defects'
    ]
  },
  {
    category: 'packaging',
    prompts: [
      'Check seal integrity and detect leakage points',
      'Inspect print quality and label alignment',
      'Detect package deformation and damage',
      'Find contamination and foreign objects',
      'Assess fill levels and content consistency'
    ]
  }
];

// Real-time factory metrics simulation
export const generateRealTimeMetrics = () => {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // Simulate shift-based production patterns
  const isWorkingHours = hour >= 6 && hour <= 22;
  const isShiftChange = minute >= 55 || minute <= 5;
  
  const baseProduction = isWorkingHours ? 350 : 50;
  const shiftMultiplier = isShiftChange ? 0.7 : 1.0;
  
  return {
    currentProductionRate: Math.floor(baseProduction * shiftMultiplier + (Math.random() - 0.5) * 50),
    qualityRate: 95 + (Math.random() - 0.5) * 4,
    energyConsumption: isWorkingHours ? 850 + Math.random() * 200 : 300 + Math.random() * 100,
    personnelActive: isWorkingHours ? 180 + Math.random() * 40 : 20 + Math.random() * 10,
    machineEfficiency: 88 + Math.random() * 10,
    alertCount: Math.floor(Math.random() * 5),
    timestamp: now.toISOString()
  };
};

// Factory floor layout data for visualization
export const factoryLayout = {
  zones: [
    { id: 'A1', name: 'Assembly Line A', x: 10, y: 20, width: 200, height: 80, color: '#3b82f6' },
    { id: 'A2', name: 'Assembly Line B', x: 10, y: 120, width: 200, height: 80, color: '#3b82f6' },
    { id: 'Q1', name: 'Quality Control', x: 230, y: 20, width: 120, height: 80, color: '#10b981' },
    { id: 'Q2', name: 'Final Inspection', x: 230, y: 120, width: 120, height: 80, color: '#10b981' },
    { id: 'P1', name: 'Packaging 1', x: 370, y: 20, width: 100, height: 80, color: '#f59e0b' },
    { id: 'P2', name: 'Packaging 2', x: 370, y: 120, width: 100, height: 80, color: '#f59e0b' },
    { id: 'W1', name: 'Raw Materials', x: 10, y: 220, width: 150, height: 60, color: '#8b5cf6' },
    { id: 'W2', name: 'Finished Goods', x: 320, y: 220, width: 150, height: 60, color: '#8b5cf6' },
    { id: 'M1', name: 'Maintenance', x: 180, y: 220, width: 120, height: 60, color: '#ef4444' },
    { id: 'R1', name: 'R&D Lab', x: 490, y: 20, width: 100, height: 180, color: '#06b6d4' }
  ],
  equipment: [
    { id: 'R1', name: 'Robot A1', x: 50, y: 40, zoneId: 'A1', status: 'running' },
    { id: 'R2', name: 'Robot A2', x: 150, y: 40, zoneId: 'A1', status: 'running' },
    { id: 'R3', name: 'Robot B1', x: 50, y: 140, zoneId: 'A2', status: 'maintenance' },
    { id: 'R4', name: 'Robot B2', x: 150, y: 140, zoneId: 'A2', status: 'running' },
    { id: 'S1', name: 'Scanner QC1', x: 280, y: 50, zoneId: 'Q1', status: 'running' },
    { id: 'S2', name: 'Scanner QC2', x: 280, y: 150, zoneId: 'Q2', status: 'warning' },
    { id: 'P1', name: 'Packer 1', x: 400, y: 50, zoneId: 'P1', status: 'running' },
    { id: 'P2', name: 'Packer 2', x: 400, y: 150, zoneId: 'P2', status: 'running' }
  ]
};

// Performance benchmarks and KPIs
export const performanceKPIs = {
  production: {
    dailyTarget: 9200,
    weeklyTarget: 64400,
    monthlyTarget: 276000,
    efficiency: {
      target: 92,
      excellent: 95,
      good: 90,
      poor: 85
    }
  },
  quality: {
    defectRateTarget: 3.5,
    firstPassYield: 96.5,
    customerComplaintTarget: 2,
    returnRateTarget: 1.5
  },
  safety: {
    incidentFreeTarget: 90, // days
    safetyTrainingCompliance: 98,
    nearMissReports: 15 // monthly target
  },
  energy: {
    consumptionTarget: 800, // kWh daily average
    peakDemandLimit: 1200,
    efficiencyImprovement: 5 // % yearly target
  }
};

// Shift schedules and personnel data
export const shiftSchedules = [
  {
    id: 'shift-1',
    name: 'Day Shift',
    startTime: '06:00',
    endTime: '14:00',
    personnel: 120,
    supervisor: 'Marcus Rodriguez',
    departments: ['Production', 'Quality Assurance', 'Logistics']
  },
  {
    id: 'shift-2',
    name: 'Afternoon Shift',
    startTime: '14:00',
    endTime: '22:00',
    personnel: 95,
    supervisor: 'Sarah Chen',
    departments: ['Production', 'Quality Assurance', 'Packaging']
  },
  {
    id: 'shift-3',
    name: 'Night Shift',
    startTime: '22:00',
    endTime: '06:00',
    personnel: 35,
    supervisor: 'David Kim',
    departments: ['Engineering', 'Logistics', 'Security']
  }
];

// Supply chain and inventory data
export const inventoryData = [
  {
    id: 'comp-001',
    name: 'Aluminum Housing Components',
    currentStock: 2450,
    reorderPoint: 500,
    maxStock: 3000,
    unit: 'pieces',
    supplier: 'MetalCorp Industries',
    leadTime: '5 days',
    status: 'normal'
  },
  {
    id: 'comp-002',
    name: 'Electronic Control Modules',
    currentStock: 180,
    reorderPoint: 200,
    maxStock: 800,
    unit: 'units',
    supplier: 'TechComponents Ltd',
    leadTime: '14 days',
    status: 'low'
  },
  {
    id: 'comp-003',
    name: 'Packaging Materials',
    currentStock: 15600,
    reorderPoint: 2000,
    maxStock: 20000,
    unit: 'units',
    supplier: 'PackagePro Solutions',
    leadTime: '3 days',
    status: 'normal'
  },
  {
    id: 'comp-004',
    name: 'Industrial Adhesive',
    currentStock: 45,
    reorderPoint: 50,
    maxStock: 200,
    unit: 'liters',
    supplier: 'ChemSupply Inc',
    leadTime: '7 days',
    status: 'critical'
  }
];

// Environmental and sustainability metrics
export const sustainabilityMetrics = {
  energyEfficiency: {
    renewableEnergyUsage: 34.5, // percentage
    carbonFootprint: 2.3, // tons CO2/day
    energyIntensity: 0.45, // kWh per unit produced
    wasteReduction: 12.8 // percentage improvement this year
  },
  waterUsage: {
    dailyConsumption: 850, // liters
    recycledWater: 65, // percentage
    wasteWaterTreatment: 98.5 // percentage treated
  },
  materials: {
    recycledContent: 28, // percentage of recycled materials
    wasteToLandfill: 3.2, // percentage
    materialEfficiency: 94.1 // percentage utilization
  }
};