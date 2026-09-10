import { request, api } from "@/lib/api";
import { CreateTicketSchema, UpdateTicketSchema } from "@/schemas";
import type { Ticket } from "@/types";
import { failed } from "@/types/result";

export const ticketService = {
    findMany: async() => await request(api.get<{ tickets: Ticket[] }>('/tickets')),
    findOneById: async(id: string) => await request(api.get<{ ticket: Ticket }>(`/tickets/${id}`)),
    updateById: async(id: string, formData: unknown) => {
        const { success, data, error } = UpdateTicketSchema.safeParse(formData)
        if (!success) return failed(error)
        return await request(api.patch<{ ticket: Ticket }>(`/tickets/${id}`, data))
    },
    create: async(formData: unknown) => {
        const { success, data, error } = CreateTicketSchema.safeParse(formData)
        if (!success) return failed(error)
        return await request(api.post<{ ticket: Ticket }>('/tickets', data))
    }
}