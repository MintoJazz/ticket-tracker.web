import type { RowAction } from '@/types'
import type { Ticket } from '@/types'

export interface TicketActionContext {
    onEdit: (ticket: Ticket) => void
    onDelete: (ticket: Ticket) => void
}

export const TICKET_ACTIONS: RowAction<Ticket, TicketActionContext>[] = [
    {
        label: "Editar",
        onClick: (row, context) => context.onEdit(row.original)
    },
    {
        label: "Excluir",
        variant: "destructive",
        onClick: (row, context) => context.onDelete(row.original)
    }
]
