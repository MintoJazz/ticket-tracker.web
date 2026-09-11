import type { Row, RowData, StockFeatures } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type RowAction } from '@/types'

interface DataTableRowActionsProps<TData extends RowData, TContext> {
    row: Row<StockFeatures, TData>
    actions: RowAction<TData, TContext>[]
    context: TContext
}

export function DataTableRowActions<TData extends RowData, TContext>({
    row,
    actions,
    context,
}: DataTableRowActionsProps<TData, TContext>) {
    const visibleActions = actions.filter((action) => !action.hidden || !action.hidden(row))

    if (visibleActions.length === 0) return null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {visibleActions.map((action, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => action.onClick(row, context)}
                        className={action.variant === 'destructive' ? 'text-destructive focus:text-destructive' : ''}
                    >
                        {action.icon && <span className="mr-2">{action.icon}</span>}
                        {action.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
