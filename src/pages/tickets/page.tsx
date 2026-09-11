import { TicketTable } from "@/components/tickets/ticket-table"
import { CreateTicketDialog } from "@/components/tickets/create-ticket-dialog"
import { EditTicketDialog } from "@/components/tickets/edit-ticket-dialog"
import { useTicketsPage } from "@/hooks/use-tickets-page"

export function TicketsPage() {
    const {
        tickets,
        editingTicket,
        setEditingTicket,
        handleCreateTicket,
        handleEditTicket,
        handleDeleteTicket
    } = useTicketsPage()

    return (
        <div className="flex flex-col gap-6 p-6 w-full">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
                <CreateTicketDialog onSubmit={handleCreateTicket} />
            </div>

            <div className="mt-4">
                <TicketTable 
                    data={tickets} 
                    actionContext={{
                        onEdit: (ticket) => setEditingTicket(ticket),
                        onDelete: handleDeleteTicket
                    }} 
                />
            </div>

            <EditTicketDialog 
                ticket={editingTicket} 
                open={!!editingTicket} 
                onOpenChange={(open) => !open && setEditingTicket(null)} 
                onSubmit={handleEditTicket} 
            />
        </div>
    )
}
