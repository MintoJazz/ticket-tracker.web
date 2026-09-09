import { request, api } from "@/lib/api";
import { CreateTicketSchema, UpdateTicketSchema } from "@/schemas";
import type { Ticket } from "@/types";
import { failed } from "@/types/result";

export const ticketService = {
    findMany: async() => await request(api.get<{ tickets: Ticket[] }>('/tickets')),
    findOneById: async(id: number) => await request(api.get<{ ticket: Ticket }>(`/tickets/${id}`)),
    updateById: async(id: number, data: unknown) => {
        const { success, data: validatedData, error } = UpdateTicketSchema.safeParse(data)

        if (!success) return failed(error)

        return await request(api.put<{ ticket: Ticket }>(`/tickets/${id}`, validatedData))
    },
    create: async(data: unknown) => {
        const { success, data: validatedData, error } = CreateTicketSchema.safeParse(data)

        if (!success) return failed(error)

        return await request(api.post<{ ticket: Ticket }>('/tickets', validatedData))
    }
}