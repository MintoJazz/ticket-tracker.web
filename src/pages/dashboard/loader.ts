import { reportService } from "@/services/report.service";

export async function dashoardLoader() {
    const [dashboardResult, rankingResult] = await Promise.all([
        reportService.getDashboard(),
        reportService.getRanking()
    ]);

    if (!dashboardResult.success) throw dashboardResult.error
    if (!rankingResult.success) throw rankingResult.error

    const { metrics } = dashboardResult.data
    const { ranking } = rankingResult.data

    return { metrics, ranking };
}