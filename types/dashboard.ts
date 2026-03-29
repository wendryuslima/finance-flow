export type DashboardAccountStatus = "paid" | "pending" | "overdue";

export interface DashboardMetric {
  id: string;
  label: string;
  countLabel: string;
  value: string;
  tone: DashboardAccountStatus;
}

export interface DashboardTrendPoint {
  month: string;
  total: number;
}

export interface DashboardStatusDistributionPoint {
  status: DashboardAccountStatus;
  label: string;
  value: number;
}

export interface DashboardCategoryPoint {
  category: string;
  total: number;
}
