import { X } from "lucide-react"
import type { Table as TanStackTable, RowData, StockFeatures } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"

export interface DataTableToolbarProps<TData extends RowData> {
    table: TanStackTable<StockFeatures, TData>
    enableColumnVisibility?: boolean
    enableFiltering?: boolean
}

export function DataTableToolbar<TData extends RowData>({
    table,
    enableColumnVisibility,
    enableFiltering,
}: DataTableToolbarProps<TData>) {
    const globalFilterValue = ((table as any).getState().globalFilter as string) ?? ""

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {enableFiltering && (
                    <Input
                        placeholder="Pesquisar..."
                        value={globalFilterValue}
                        onChange={(event) => table.setGlobalFilter(event.target.value)}
                        className="h-8 w-[150px] lg:w-[250px]"
                    />
                )}
                {globalFilterValue.length > 0 && (
                    <Button
                        variant="ghost"
                        onClick={() => table.setGlobalFilter("")}
                        className="h-8 px-2 lg:px-3"
                    >
                        Limpar
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            {enableColumnVisibility && <DataTableViewOptions table={table} />}
        </div>
    )
}
