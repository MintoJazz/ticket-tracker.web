import { api, request } from "@/lib/api";
import type { DashboardResponse, RankingResponse } from "@/types";

export const reportService = {
    getDashboard: async() => await request(api.get<DashboardResponse>('/reports/dashboard')),
    getRanking: async() => await request(api.get<RankingResponse>('/reports/ranking'))
}