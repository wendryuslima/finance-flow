"use client";

import { redirect } from "next/navigation";

import { authClient } from "./_lib/auth-client";
import { DashboardBalanceChart } from "./components/dashboard-balance-chart";
import { DashboardCategoryChart } from "./components/dashboard-category-chart";
import {
  dashboardCategoryData,
  dashboardMetrics,
  dashboardStatusDistribution,
  dashboardTrend,
} from "./components/dashboard-data";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardInsightsCard } from "./components/dashboard-insights-card";
import { DashboardMetricCard } from "./components/dashboard-metric-card";
import { DashboardSidebar } from "./components/dashboard-sidebar";

const HomePage = () => {
  const { data: session } = authClient.useSession();

  if (!session) {
    redirect("/auth");
  }

  return (
    <main className="page-shell min-h-screen">
      <DashboardHeader />
      <DashboardSidebar />
      <section className="px-4 py-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {dashboardMetrics.map((metric) => (
            <DashboardMetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <DashboardBalanceChart data={dashboardTrend} />
          <DashboardInsightsCard data={dashboardStatusDistribution} />
        </div>

        <div className="mt-4">
          <DashboardCategoryChart data={dashboardCategoryData} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
