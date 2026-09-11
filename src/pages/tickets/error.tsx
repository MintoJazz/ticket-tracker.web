import { useRouteError } from "react-router";
import { AlertCircle } from "lucide-react";
import {
    Empty,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia,
    EmptyContent
} from "@/components/ui/empty";

export function TicketsError() {
    const error = useRouteError();

    return (
        <div className="flex w-full h-full p-6 items-center justify-center">
            <Empty className="bg-destructive/10 text-destructive border-solid max-w-md">
                <EmptyMedia variant="icon">
                    <AlertCircle className="text-destructive w-12 h-12" />
                </EmptyMedia>
                <EmptyTitle>Erro ao carregar tickets</EmptyTitle>
                <EmptyDescription className="text-destructive/80">
                    {error instanceof Error ? error.message : "Ocorreu um erro inesperado ao tentar carregar a página de tickets."}
                </EmptyDescription>
                <EmptyContent>
                    <a href="/tickets" className="text-sm font-medium underline">
                        Tentar novamente
                    </a>
                </EmptyContent>
            </Empty>
        </div>
    );
}
