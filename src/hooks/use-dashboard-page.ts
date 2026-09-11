import { useLoaderData } from "react-router";
import type { DashboardResponse, RankingResponse, DashboardMetricKey } from "@/types";

export function useDashboardPage() {
    const { metrics, ranking } = useLoaderData() as {
        metrics: DashboardResponse['metrics'],
        ranking: RankingResponse['ranking']
    };

    const metricKeys: DashboardMetricKey[] = ['total', 'open', 'in_progress', 'resolved'];

    return {
        metrics,
        ranking,
        metricKeys
    };
}
