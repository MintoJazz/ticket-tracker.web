import { type ColumnDef, type StockFeatures } from '@tanstack/react-table'
import { type Ticket } from '@/types'
import { ticketStatusTheme } from '@/themes/ticket'
import { ticketPriorityTheme } from '@/themes/ticket-priority'

export const ticketColumns: ColumnDef<StockFeatures, Ticket, any>[] = [
    {
        accessorKey: 'title',
        header: 'Título',
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const status = row.original.status
            const theme = ticketStatusTheme[status]

            if (!theme) return status

            const Icon = theme.icon

            return (
                <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${theme.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{theme.label}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'priority',
        header: 'Prioridade',
        cell: ({ row }) => {
            const priority = row.original.priority
            const theme = ticketPriorityTheme[priority]

            if (!theme) return priority

            const Icon = theme.icon

            return (
                <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${theme.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    <span>{theme.label}</span>
                </div>
            )
        },
    },
    {
        accessorKey: 'created_at',
        header: 'Criado em',
        cell: ({ row }) => {
            return new Date(row.original.created_at).toLocaleDateString('pt-BR')
        }
    }
]
