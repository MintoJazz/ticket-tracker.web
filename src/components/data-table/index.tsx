import { type ReactNode, useMemo, useState } from 'react'
import {
    flexRender,
    createFilteredRowModel,
    createPaginatedRowModel,
    createSortedRowModel,
    type ColumnDef,
    type StockFeatures,
    tableFeatures,
    stockFeatures,
    type RowData,
    useTable,
    type ColumnFiltersState,
    type OnChangeFn,
    type PaginationState,
    type Row,
    type RowSelectionState,
    type SortingState,
    type Table as TanStackTable,
    type ColumnVisibilityState as VisibilityState,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { DataTableRowActions } from './row-actions'
import { DataTablePagination, type DataTablePaginationProps } from './data-table-pagination'
import { DataTableToolbar, type DataTableToolbarProps } from './data-table-toolbar'
import type { RowAction } from '@/types'

export interface DataTableCoreProps<TData extends RowData, TValue = any, TContext = any> {
    columns: ColumnDef<StockFeatures, TData, TValue>[]
    data: TData[]
    className?: string
    getRowId?: (originalRow: TData, index: number, parent?: Row<StockFeatures, TData>) => string
    emptyMessage?: ReactNode
    isLoading?: boolean
    enableSorting?: boolean
    enableFiltering?: boolean
    enablePagination?: boolean
    enableColumnVisibility?: boolean
    enableRowSelection?: boolean | ((row: Row<StockFeatures, TData>) => boolean)
    sorting?: SortingState
    onSortingChange?: (state: SortingState) => void
    columnFilters?: ColumnFiltersState
    onColumnFiltersChange?: (state: ColumnFiltersState) => void
    globalFilter?: string
    onGlobalFilterChange?: (state: string) => void
    columnVisibility?: VisibilityState
    onColumnVisibilityChange?: (state: VisibilityState) => void
    rowSelection?: RowSelectionState
    onRowSelectionChange?: (state: RowSelectionState) => void
    pagination?: PaginationState
    onPaginationChange?: (state: PaginationState) => void
    initialState?: Partial<{
        sorting: SortingState
        columnFilters: ColumnFiltersState
        globalFilter: string
        columnVisibility: VisibilityState
        rowSelection: RowSelectionState
        pagination: PaginationState
    }>
    pageCount?: number
    rowCount?: number
    autoResetPageIndex?: boolean
    renderToolbar?: (props: { table: TanStackTable<StockFeatures, TData> }) => ReactNode
    renderPagination?: (props: { table: TanStackTable<StockFeatures, TData> }) => ReactNode
    renderRow?: (props: { row: ReturnType<TanStackTable<StockFeatures, TData>['getRowModel']>['rows'][number] }) => ReactNode
    
    rowActions?: RowAction<TData, TContext>[]
    rowActionContext?: TContext
}

export interface DataTableProps<TData extends RowData, TValue = any, TContext = any> 
    extends DataTableCoreProps<TData, TValue, TContext>, 
            Omit<DataTablePaginationProps<TData>, 'table'>, 
            Omit<DataTableToolbarProps<TData>, 'table'> {}

export function DataTable<TData extends RowData, TValue = unknown, TContext = any>({
    columns,
    data,
    className,
    getRowId,
    emptyMessage = 'Nenhum resultado encontrado.',
    isLoading = false,
    enableSorting = false,
    enableFiltering = false,
    enablePagination = false,
    enableColumnVisibility = false,
    enableRowSelection = false,
    sorting,
    onSortingChange,
    columnFilters,
    onColumnFiltersChange,
    globalFilter,
    onGlobalFilterChange,
    columnVisibility,
    onColumnVisibilityChange,
    rowSelection,
    onRowSelectionChange,
    pagination,
    onPaginationChange,
    initialState,
    pageCount,
    rowCount,
    autoResetPageIndex,
    renderToolbar,
    renderPagination,
    renderRow,
    rowActions,
    rowActionContext,
}: DataTableProps<TData, TValue, TContext>) {
    const isManualPagination = !enablePagination && !!onPaginationChange
    const isManualSorting = !enableSorting && !!onSortingChange
    const isManualFiltering = !enableFiltering && (!!onColumnFiltersChange || !!onGlobalFilterChange)

    const [sortingState, setSortingState] = useState<SortingState>(initialState?.sorting ?? [])
    const [columnFiltersState, setColumnFiltersState] = useState<ColumnFiltersState>(initialState?.columnFilters ?? [])
    const [globalFilterState, setGlobalFilterState] = useState<string>(initialState?.globalFilter ?? '')
    const [columnVisibilityState, setColumnVisibilityState] = useState<VisibilityState>(initialState?.columnVisibility ?? {})
    const [rowSelectionState, setRowSelectionState] = useState<RowSelectionState>(initialState?.rowSelection ?? {})
    const [paginationState, setPaginationState] = useState<PaginationState>(initialState?.pagination ?? { pageIndex: 0, pageSize: 10 })

    const resolvedSorting = sorting ?? sortingState
    const resolvedColumnFilters = columnFilters ?? columnFiltersState
    const resolvedGlobalFilter = globalFilter ?? globalFilterState
    const resolvedColumnVisibility = columnVisibility ?? columnVisibilityState
    const resolvedRowSelection = rowSelection ?? rowSelectionState
    const resolvedPagination = pagination ?? paginationState

    const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
        const newValue = typeof updater === 'function' ? (updater as (old: SortingState) => SortingState)(resolvedSorting) : updater
        setSortingState(newValue)
        onSortingChange?.(newValue)
    }

    const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (updater) => {
        const newValue = typeof updater === 'function' ? (updater as (old: ColumnFiltersState) => ColumnFiltersState)(resolvedColumnFilters) : updater
        setColumnFiltersState(newValue)
        onColumnFiltersChange?.(newValue)
    }

    const handleGlobalFilterChange: OnChangeFn<any> = (updater) => {
        const newValue = typeof updater === 'function' ? (updater as (old: string) => string)(resolvedGlobalFilter) : updater
        setGlobalFilterState(newValue)
        onGlobalFilterChange?.(newValue)
    }

    const handleColumnVisibilityChange: OnChangeFn<VisibilityState> = (updater) => {
        const newValue = typeof updater === 'function' ? (updater as (old: VisibilityState) => VisibilityState)(resolvedColumnVisibility) : updater
        setColumnVisibilityState(newValue)
        onColumnVisibilityChange?.(newValue)
    }

    const handleRowSelectionChange: OnChangeFn<RowSelectionState> = (updater) => {
        const newValue = typeof updater === 'function' ? (updater as (old: RowSelectionState) => RowSelectionState)(resolvedRowSelection) : updater
        setRowSelectionState(newValue)
        onRowSelectionChange?.(newValue)
    }

    const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
        const newValue = typeof updater === 'function' ? (updater as (old: PaginationState) => PaginationState)(resolvedPagination) : updater
        setPaginationState(newValue)
        onPaginationChange?.(newValue)
    }

    const features = tableFeatures({
        ...stockFeatures,
        ...(enableSorting ? { sortedRowModel: createSortedRowModel() } : {}),
        ...(enableFiltering ? { filteredRowModel: createFilteredRowModel() } : {}),
        ...(enablePagination ? { paginatedRowModel: createPaginatedRowModel() } : {}),
    })

    const finalColumns = useMemo(() => {
        if (rowActions && rowActions.length > 0) {
            return [
                ...columns,
                {
                    id: 'actions',
                    cell: ({ row }) => (
                        <DataTableRowActions row={row} actions={rowActions} context={rowActionContext as TContext} />
                    ),
                } as ColumnDef<StockFeatures, TData, any>,
            ]
        }
        return columns
    }, [columns, rowActions, rowActionContext])

    const table = useTable({
        features,
        data,
        columns: finalColumns as ColumnDef<StockFeatures, TData, any>[],
        getRowId,
        state: { 
            sorting: resolvedSorting, 
            columnFilters: resolvedColumnFilters, 
            globalFilter: resolvedGlobalFilter, 
            columnVisibility: resolvedColumnVisibility, 
            rowSelection: resolvedRowSelection, 
            pagination: resolvedPagination 
        },
        initialState,
        onSortingChange: handleSortingChange,
        onColumnFiltersChange: handleColumnFiltersChange,
        onGlobalFilterChange: handleGlobalFilterChange,
        onColumnVisibilityChange: handleColumnVisibilityChange,
        onRowSelectionChange: handleRowSelectionChange,
        onPaginationChange: handlePaginationChange,
        enableSorting: enableSorting || isManualSorting,
        enableFilters: enableFiltering || isManualFiltering,
        enableHiding: enableColumnVisibility,
        enableRowSelection,
        manualPagination: isManualPagination,
        manualSorting: isManualSorting,
        manualFiltering: isManualFiltering,
        pageCount,
        rowCount,
        autoResetPageIndex,
    })

    const rows = table.getRowModel().rows

    return (
        <div className={cn('flex flex-col gap-4', className)}>
            {renderToolbar ? (
                renderToolbar({ table })
            ) : (enableFiltering || enableColumnVisibility) ? (
                <DataTableToolbar
                    table={table as any}
                    enableFiltering={enableFiltering}
                    enableColumnVisibility={enableColumnVisibility}
                />
            ) : null}
            <div className="overflow-hidden rounded-lg border bg-card">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="whitespace-nowrap">
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={finalColumns.length} className="h-24 text-center text-muted-foreground">Carregando...</TableCell></TableRow>
                        ) : rows.length ? (
                            rows.map((row) => renderRow?.({ row }) ?? (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={finalColumns.length} className="h-24 text-center text-muted-foreground">{emptyMessage}</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {renderPagination ? (
                renderPagination({ table })
            ) : enablePagination ? (
                <DataTablePagination table={table as any} />
            ) : null}
        </div>
    )
}
