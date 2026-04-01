import { redirect } from "next/navigation";

import { getDashboardCharts } from "@/app/_data-access/get-dashboard-charts";
import { getDashboardMetrics } from "@/app/_data-access/get-dashboard-metrics";
import { getCurrentSession } from "@/lib/auth-session";
import { resolveMonthParam } from "@/lib/months";

import { DashboardBalanceChart } from "./components/dashboard-balance-chart";
import { DashboardCategoryChart } from "./components/dashboard-category-chart";
import { DashboardHeader } from "./components/dashboard-header";
import { DashboardInsightsCard } from "./components/dashboard-insights-card";
import { DashboardMetricCard } from "./components/dashboard-metric-card";
import { DashboardSidebar } from "./components/dashboard-sidebar";

type HomePageProps = {
  searchParams?:
    | Record<string, string | string[] | undefined>
    | Promise<Record<string, string | string[] | undefined>>;
};

const HomePage = async ({ searchParams }: HomePageProps = {}) => {
  const session = await getCurrentSession();

  if (!session) {
    redirect("/auth");
  }

  const resolvedSearchParams = (await searchParams) ?? undefined;
  const month = resolveMonthParam(resolvedSearchParams?.month ?? null);

  const [dashboardMetrics, dashboardCharts] = await Promise.all([
    getDashboardMetrics({ month }),
    getDashboardCharts({ month }),
  ]);

  const { trend, statusDistribution, categoryDistribution } = dashboardCharts;

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
          <DashboardBalanceChart data={trend} />
          <DashboardInsightsCard data={statusDistribution} />
        </div>

        <div className="mt-4">
          <DashboardCategoryChart data={categoryDistribution} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
