import { Ticket } from "lucide-react"
import {
    Empty,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia
} from "@/components/ui/empty"

export function TicketTableEmpty() {
    return (
        <Empty className="border-none shadow-none bg-transparent my-8 mx-auto max-w-md">
            <EmptyMedia variant="icon">
                <Ticket className="text-muted-foreground w-12 h-12" />
            </EmptyMedia>
            <EmptyTitle>Nenhum ticket encontrado</EmptyTitle>
            <EmptyDescription>
                Você ainda não possui nenhum ticket cadastrado. Crie um novo ticket para começar.
            </EmptyDescription>
        </Empty>
    )
}
