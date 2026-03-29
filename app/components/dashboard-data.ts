import type {
  DashboardCategoryPoint,
  DashboardMetric,
  DashboardStatusDistributionPoint,
  DashboardTrendPoint,
} from "@/types/dashboard";

export const dashboardMetrics: DashboardMetric[] = [
  {
    id: "paid",
    label: "Pagas",
    countLabel: "2 contas",
    value: "R$ 549,00",
    tone: "paid",
  },
  {
    id: "pending",
    label: "Pendentes",
    countLabel: "0 contas",
    value: "R$ 0,00",
    tone: "pending",
  },
  {
    id: "overdue",
    label: "Atrasadas",
    countLabel: "4 contas",
    value: "R$ 2.650,50",
    tone: "overdue",
  },
];

export const dashboardTrend: DashboardTrendPoint[] = [
  { month: "Jan", total: 420 },
  { month: "Fev", total: 485 },
  { month: "Mar", total: 535 },
  { month: "Abr", total: 560 },
  { month: "Mai", total: 620 },
  { month: "Jun", total: 595 },
];

export const dashboardStatusDistribution: DashboardStatusDistributionPoint[] = [
  {
    status: "paid",
    label: "Pagas",
    value: 549,
  },
  {
    status: "pending",
    label: "Pendentes",
    value: 0,
  },
  {
    status: "overdue",
    label: "Atrasadas",
    value: 2650.5,
  },
];

export const dashboardCategoryData: DashboardCategoryPoint[] = [
  {
    category: "Moradia",
    total: 1800,
  },
  {
    category: "Outros",
    total: 820,
  },
  {
    category: "Saude",
    total: 560,
  },
];
