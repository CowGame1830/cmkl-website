import { 
  zones, 
  recentActions, 
  notifications, 
  dashboardStats,
  machineStatus,
  energyData
} from './mockData';
import type { 
  Action, 
  Notification 
} from './types';

// Simulate real-time data updates
export class DataSimulator {
  private updateInterval: number | null = null;
  private listeners: Array<() => void> = [];

  start() {
    if (this.updateInterval) return;
    
    this.updateInterval = setInterval(() => {
      this.updateZonePersonnel();
      this.updateDashboardStats();
      this.updateMachineStatus();
      this.updateEnergyConsumption();
      this.generateRandomActions();
      this.generateRandomNotifications();
      this.notifyListeners();
    }, 15000); // Update every 15 seconds
  }

  stop() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  addListener(callback: () => void) {
    this.listeners.push(callback);
  }

  removeListener(callback: () => void) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback());
  }

  private updateZonePersonnel() {
    zones.forEach(zone => {
      // Simulate personnel movement with small random changes
      const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
      zone.currentPersonnel = Math.max(0, 
        Math.min(zone.maxCapacity + 3, zone.currentPersonnel + change)
      );
      
      // Update zone status based on personnel count
      const utilization = zone.currentPersonnel / zone.maxCapacity;
      if (utilization > 1.0) {
        zone.status = 'critical';
      } else if (utilization > 0.9) {
        zone.status = 'warning';
      } else {
        zone.status = 'normal';
      }
    });
  }

  private updateDashboardStats() {
    // Update total personnel
    dashboardStats.totalPersonnel = zones.reduce(
      (total, zone) => total + zone.currentPersonnel, 0
    );
    
    // Simulate small changes in other metrics
    dashboardStats.systemEfficiency += (Math.random() - 0.5) * 0.5;
    dashboardStats.systemEfficiency = Math.max(85, Math.min(98, dashboardStats.systemEfficiency));
    
    dashboardStats.todayDefectsDetected += Math.random() > 0.85 ? 1 : 0;
    
    // Count current alerts
    dashboardStats.alertsToday = notifications.filter(
      n => !n.read && (n.type === 'warning' || n.type === 'error')
    ).length;
  }

  private updateMachineStatus() {
    machineStatus.forEach(machine => {
      if (machine.status === 'running') {
        // Simulate efficiency fluctuations
        machine.efficiency += (Math.random() - 0.5) * 2;
        machine.efficiency = Math.max(70, Math.min(100, machine.efficiency));
        
        // Random chance of issues
        if (Math.random() > 0.98) {
          machine.status = machine.efficiency < 80 ? 'warning' : 'running';
        }
      } else if (machine.status === 'maintenance' && Math.random() > 0.9) {
        machine.status = 'running';
        machine.efficiency = 90 + Math.random() * 10;
      } else if (machine.status === 'warning' && Math.random() > 0.8) {
        machine.status = 'running';
        machine.efficiency = Math.max(machine.efficiency, 85);
      }
    });
  }

  private updateEnergyConsumption() {
    // Simulate energy consumption changes
    const currentHour = new Date().getHours();
    const baseConsumption = this.getBaseEnergyConsumption(currentHour);
    const randomVariation = (Math.random() - 0.5) * 50;
    
    energyData.currentUsage = Math.max(200, baseConsumption + randomVariation);
    energyData.peakUsage = Math.max(energyData.peakUsage, energyData.currentUsage);
    
    // Update hourly consumption array
    const currentTime = `${currentHour.toString().padStart(2, '0')}:00`;
    const lastEntry = energyData.hourlyConsumption[energyData.hourlyConsumption.length - 1];
    
    if (lastEntry.time !== currentTime) {
      energyData.hourlyConsumption.push({
        time: currentTime,
        usage: energyData.currentUsage
      });
      
      // Keep only last 24 hours
      if (energyData.hourlyConsumption.length > 24) {
        energyData.hourlyConsumption.shift();
      }
    } else {
      lastEntry.usage = energyData.currentUsage;
    }
  }

  private getBaseEnergyConsumption(hour: number): number {
    // Simulate typical industrial energy consumption patterns
    if (hour >= 6 && hour <= 18) {
      return 750 + Math.sin((hour - 6) * Math.PI / 12) * 150; // Day shift pattern
    } else if (hour >= 19 && hour <= 23) {
      return 600 + Math.sin((hour - 19) * Math.PI / 5) * 100; // Evening shift
    } else {
      return 400 + Math.random() * 100; // Night/maintenance
    }
  }

  private generateRandomActions() {
    if (Math.random() > 0.7) { // 30% chance to generate new action
      const actionTypes: Action['type'][] = ['entry', 'exit', 'task_start', 'task_complete', 'alert'];
      const names = [
        'Alex Johnson', 'Maria Santos', 'David Lee', 'Sarah Wilson', 'Tom Brown',
        'Jessica Davis', 'Mark Rodriguez', 'Lisa Kim', 'Ryan Taylor', 'Amy Chen'
      ];
      
      const descriptions = {
        entry: [
          'Entered for shift change',
          'Arrived for scheduled maintenance',
          'Entered for quality inspection',
          'Started overtime shift'
        ],
        exit: [
          'Exited for lunch break',
          'Completed shift duties',
          'Left for meeting',
          'Exited for emergency response'
        ],
        task_start: [
          'Started quality control procedure',
          'Initiated equipment calibration',
          'Began inventory audit',
          'Started safety inspection'
        ],
        task_complete: [
          'Completed production batch',
          'Finished maintenance procedure',
          'Quality check passed',
          'Safety inspection completed'
        ],
        alert: [
          'Equipment alarm triggered',
          'Quality threshold exceeded',
          'Safety protocol activated',
          'Maintenance required'
        ]
      };

      const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
      const randomZone = zones[Math.floor(Math.random() * zones.length)];
      const personName = names[Math.floor(Math.random() * names.length)];
      const description = descriptions[actionType][
        Math.floor(Math.random() * descriptions[actionType].length)
      ];

      const newAction: Action = {
        id: `action-${Date.now()}-${Math.random()}`,
        type: actionType,
        personId: `emp-${Math.floor(Math.random() * 1000)}`,
        personName,
        timestamp: new Date().toISOString(),
        description: `${description} - ${randomZone.name}`,
        zoneId: randomZone.id
      };

      recentActions.unshift(newAction);
      
      // Keep only last 50 actions
      if (recentActions.length > 50) {
        recentActions.pop();
      }
    }
  }

  private generateRandomNotifications() {
    if (Math.random() > 0.85) { // 15% chance to generate new notification
      const notificationTypes: Notification['type'][] = ['info', 'warning', 'error', 'success'];
      
      const notificationTemplates = {
        info: [
          { title: 'Shift Change Reminder', message: 'Next shift change in 30 minutes' },
          { title: 'Training Session', message: 'Safety training session starting soon' },
          { title: 'Production Update', message: 'Daily production target on track' }
        ],
        warning: [
          { title: 'Zone Capacity Alert', message: 'Zone approaching maximum capacity' },
          { title: 'Equipment Attention', message: 'Machine efficiency below optimal range' },
          { title: 'Maintenance Due', message: 'Preventive maintenance scheduled' }
        ],
        error: [
          { title: 'Equipment Malfunction', message: 'Critical equipment requires immediate attention' },
          { title: 'Safety Alert', message: 'Safety protocol breach detected' },
          { title: 'System Error', message: 'System component failure detected' }
        ],
        success: [
          { title: 'Quality Target Met', message: 'Daily quality target achieved' },
          { title: 'Maintenance Complete', message: 'Scheduled maintenance completed successfully' },
          { title: 'Production Milestone', message: 'Production milestone reached ahead of schedule' }
        ]
      };

      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const template = notificationTemplates[type][
        Math.floor(Math.random() * notificationTemplates[type].length)
      ];
      
      const priorities: Notification['priority'][] = ['low', 'medium', 'high'];
      const priority = type === 'error' ? 'high' : 
                     type === 'warning' ? 'medium' : 
                     priorities[Math.floor(Math.random() * priorities.length)];

      const newNotification: Notification = {
        id: `notif-${Date.now()}-${Math.random()}`,
        type,
        title: template.title,
        message: template.message,
        timestamp: new Date().toISOString(),
        read: false,
        priority
      };

      notifications.unshift(newNotification);
      
      // Keep only last 30 notifications
      if (notifications.length > 30) {
        notifications.pop();
      }
    }
  }

  // Method to manually trigger a specific scenario for demo purposes
  triggerScenario(scenario: 'emergency' | 'maintenance' | 'production_peak' | 'normal') {
    switch (scenario) {
      case 'emergency':
        this.generateEmergencyScenario();
        break;
      case 'maintenance':
        this.generateMaintenanceScenario();
        break;
      case 'production_peak':
        this.generateProductionPeakScenario();
        break;
      case 'normal':
        this.resetToNormalOperation();
        break;
    }
    this.notifyListeners();
  }

  private generateEmergencyScenario() {
    // Simulate emergency situation
    const emergencyZone = zones[Math.floor(Math.random() * zones.length)];
    emergencyZone.status = 'critical';
    emergencyZone.currentPersonnel = Math.max(emergencyZone.maxCapacity + 2, emergencyZone.currentPersonnel);

    notifications.unshift({
      id: `emergency-${Date.now()}`,
      type: 'error',
      title: 'EMERGENCY ALERT',
      message: `Critical situation in ${emergencyZone.name} - Immediate evacuation required`,
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'high'
    });

    recentActions.unshift({
      id: `emergency-action-${Date.now()}`,
      type: 'alert',
      personId: 'system',
      personName: 'System Alert',
      timestamp: new Date().toISOString(),
      description: `Emergency protocol activated in ${emergencyZone.name}`,
      zoneId: emergencyZone.id
    });
  }

  private generateMaintenanceScenario() {
    const maintenanceZones = zones.filter(z => z.department === 'Engineering');
    maintenanceZones.forEach(zone => {
      zone.currentPersonnel = Math.max(zone.currentPersonnel + 3, zone.maxCapacity - 1);
    });

    notifications.unshift({
      id: `maintenance-${Date.now()}`,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Major maintenance operation starting - increased engineering personnel deployed',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'medium'
    });
  }

  private generateProductionPeakScenario() {
    const productionZones = zones.filter(z => z.department === 'Production');
    productionZones.forEach(zone => {
      zone.currentPersonnel = Math.min(zone.maxCapacity, zone.currentPersonnel + 5);
    });

    dashboardStats.systemEfficiency = Math.min(98, dashboardStats.systemEfficiency + 5);
    energyData.currentUsage = Math.min(1200, energyData.currentUsage + 200);

    notifications.unshift({
      id: `peak-${Date.now()}`,
      type: 'success',
      title: 'Peak Production Mode',
      message: 'High-demand production period activated - all systems optimized',
      timestamp: new Date().toISOString(),
      read: false,
      priority: 'low'
    });
  }

  private resetToNormalOperation() {
    zones.forEach(zone => {
      zone.currentPersonnel = Math.floor(zone.maxCapacity * 0.8); // 80% capacity
      zone.status = 'normal';
    });

    dashboardStats.systemEfficiency = 92;
    energyData.currentUsage = 750;
  }
}

// Export singleton instance
export const dataSimulator = new DataSimulator();