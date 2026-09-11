import type { Table as TanStackTable, RowData, StockFeatures } from "@tanstack/react-table"

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

export interface DataTablePaginationProps<TData extends RowData> {
    table: TanStackTable<StockFeatures, TData>
}

export function DataTablePagination<TData extends RowData>({
    table,
}: DataTablePaginationProps<TData>) {
    const pageIndex = (table as any).getState().pagination.pageIndex
    const pageCount = table.getPageCount() > 0 ? table.getPageCount() : 1

    return (
        <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} de{" "}
                {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
            </div>
            
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    Página {pageIndex + 1} de {pageCount}
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (table.getCanPreviousPage()) table.previousPage()
                                }}
                                className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : ""}
                                text="Anterior"
                            />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (table.getCanNextPage()) table.nextPage()
                                }}
                                className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : ""}
                                text="Próxima"
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
