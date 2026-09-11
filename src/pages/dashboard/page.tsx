import { useLoaderData } from "react-router";
import { KpiCard } from "@/components/reports/kpi-component";
import { OperatorRankingTable } from "@/components/reports/operator-ranking-table";
import type { DashboardResponse, RankingResponse, DashboardMetricKey } from "@/types";
import { DASHBOARD_METRICS_THEMES } from "@/themes/dashboard-metrics";

export default function DashboardPage() {
    const { metrics, ranking } = useLoaderData() as {
        metrics: DashboardResponse['metrics'],
        ranking: RankingResponse['ranking']
    };

    const metricKeys: DashboardMetricKey[] = ['total', 'open', 'in_progress', 'resolved'];

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