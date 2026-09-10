import { api, request } from "@/lib/api";

export const reportService = {
    getDashboard: async() => await request(api.get('/reports/dashboard')),
    getRanking: async() => await request(api.get('/reports/ranking'))
}