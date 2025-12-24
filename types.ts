export interface Metric {
  id: string;
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

export interface DashboardState {
  metrics: Metric[];
  revenueData: ChartDataPoint[];
  userActivityData: ChartDataPoint[];
  recentActivity: ActivityItem[];
}
