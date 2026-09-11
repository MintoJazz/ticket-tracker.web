import type { ReactNode } from 'react'
import type {
    ColumnDef,
    ColumnFiltersState,
    OnChangeFn,
    PaginationState,
    RowSelectionState,
    SortingState,
    Table as TanStackTable,
    ColumnVisibilityState as VisibilityState,
    RowData,
    Row,
    StockFeatures,
} from '@tanstack/react-table'

export interface RowAction<TData extends RowData, TContext> {
    label: string | ReactNode
    icon?: ReactNode
    hidden?: (row: Row<StockFeatures, TData>) => boolean
    onClick: (row: Row<StockFeatures, TData>, context: TContext) => void | Promise<void>
    variant?: 'default' | 'destructive'
}

