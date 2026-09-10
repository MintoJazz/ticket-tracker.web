import { api, request } from "@/lib/api";
import { CreateWorklogSchema } from "@/schemas";
import type { Worklog } from "@/types";
import { failed } from "@/types/result";

export const worklogService = {
    findManyByTicketId: async (ticketId: string) => await request(api.get<{ worklogs: Worklog[] }>(`/tickets/${ticketId}/worklogs`)),
    create: async(ticketId: string, formData: unknown) => {
        const { success, data, error } = CreateWorklogSchema.safeParse(formData) 
        if (!success) return failed(error)
        return await request(api.post<{ worklog: Worklog }>(`/tickets/${ticketId}/worklogs`, data))
    },
}