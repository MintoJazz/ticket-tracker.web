import { api, request } from "@/lib/api";
import { CreateWorklogSchema } from "@/schemas";
import type { Worklog } from "@/types";
import { failed } from "@/types/result";

export const worklogService = {
    findManyByTicketId: async (ticketId: number) => await request(api.get<{ worklogs: Worklog[] }>(`/tickets/${ticketId}/worklogs`)),
    create: async(ticketId: number, data: unknown) => {
        const { success, data: validatedData, error } = CreateWorklogSchema.safeParse(data) 
        if (!success) return failed(error)
        return await request(api.post<{ worklog: Worklog }>(`tickets/${ticketId}/worklogs`, validatedData))
    },
}