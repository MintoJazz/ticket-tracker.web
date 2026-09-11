import { useState } from "react"
import { useLoaderData, useRevalidator } from "react-router"
import { toast } from "sonner"
import { ticketService } from "@/services/ticket.service"
import type { Ticket } from "@/types"
import type { TicketFormData } from "@/components/tickets/ticket-form"

export function useTicketsPage() {
    const { create, updateById } = ticketService
    const { tickets } = useLoaderData() as { tickets: Ticket[] }
    const { revalidate } = useRevalidator()
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)

    const handleCreateTicket = async (data: TicketFormData) => {
        const { success, error } = await create(data)
        if (!success) {
            toast.error("Erro ao criar ticket")
            console.log("Error on creating ticket:", error)
        }
        else {
            toast.success("Ticket criado com sucesso!")
            revalidate()
        }
    }

    const handleEditTicket = async (id: string, data: TicketFormData) => {
        const { success, error } = await updateById(id, data)
        if (!success) {
            toast.error("Erro ao atualizar ticket")
            console.log("Error on updating ticket:", error);
        }
        else {
            toast.success("Ticket atualizado com sucesso!")
            revalidate()
        }
    }

    const handleDeleteTicket = async (ticket: Ticket) => {
        console.log("Delete ticket", ticket.id)
        toast.info("A exclusão de tickets ainda não está implementada.")
    }

    return {
        tickets,
        editingTicket,
        setEditingTicket,
        handleCreateTicket,
        handleEditTicket,
        handleDeleteTicket
    }
}
