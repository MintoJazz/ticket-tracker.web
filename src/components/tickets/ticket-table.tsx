import { DataTable, type DataTableProps } from '@/components/data-table'
import { ticketColumns } from './ticket-columns'
import { type Ticket } from '@/types'
import { TICKET_ACTIONS, type TicketActionContext } from './ticket-actions'
import { TicketTableEmpty } from './ticket-table-empty'

export interface TicketTableProps extends Omit<DataTableProps<Ticket, any, TicketActionContext>, 'columns' | 'data' | 'rowActions' | 'rowActionContext'> {
    data: Ticket[]
    actionContext: TicketActionContext
}

export function TicketTable({ data, actionContext, ...props }: TicketTableProps) {
    if (data.length === 0) {
        return <TicketTableEmpty />
    }

    return (
        <DataTable
            columns={ticketColumns}
            data={data}
            rowActions={TICKET_ACTIONS}
            rowActionContext={actionContext}
            {...props}
        />
    )
}
