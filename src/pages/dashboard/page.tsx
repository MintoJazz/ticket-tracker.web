import { KpiCard } from "@/components/reports/kpi-component";
import { OperatorRankingTable } from "@/components/reports/operator-ranking-table";
import { DASHBOARD_METRICS_THEMES } from "@/themes/dashboard-metrics";
import { useDashboardPage } from "@/hooks/use-dashboard-page";

export default function DashboardPage() {
    const { metrics, ranking, metricKeys } = useDashboardPage();

    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {metricKeys.map(key => {
                    const theme = DASHBOARD_METRICS_THEMES[key];
                    return (
                        <KpiCard
                            key={key}
                            title={theme.label}
                            value={metrics[key]}
                            Icon={theme.icon}
                            className={theme.containerClassName}
                            classes={theme.classes}
                        />
                    );
                })}
            </div>

            <div className="mt-4">
                <OperatorRankingTable data={ranking} />
            </div>
        </div>
    );
}