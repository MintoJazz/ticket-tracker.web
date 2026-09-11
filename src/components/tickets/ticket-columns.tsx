import { type ColumnDef, type StockFeatures } from '@tanstack/react-table'
import { type Ticket } from '@/types'

const statusMap: Record<string, string> = {
    open: 'Aberto',
    in_progress: 'Em Progresso',
    resolved: 'Resolvido',
    closed: 'Fechado',
}

const priorityMap: Record<string, string> = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta',
    urgent: 'Urgente',
}

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
            return statusMap[status] || status
        },
    },
    {
        accessorKey: 'priority',
        header: 'Prioridade',
        cell: ({ row }) => {
            const priority = row.original.priority
            return priorityMap[priority] || priority
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
