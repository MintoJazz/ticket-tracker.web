import { ticketService } from "@/services/ticket.service"

export async function ticketsLoader() {
    const { data } = await ticketService.findMany()
    return { tickets: data?.tickets || [] }
}
