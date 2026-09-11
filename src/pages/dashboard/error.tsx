import { useRouteError } from "react-router";
import { AlertCircle } from "lucide-react";
import {
    Empty,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia,
    EmptyContent
} from "@/components/ui/empty";

export function DashboardError() {
    const error = useRouteError();

    return (
        <Empty className="bg-destructive/10 text-destructive border-solid max-w-2xl mx-auto mt-8">
            <EmptyMedia variant="icon">
                <AlertCircle className="text-destructive" />
            </EmptyMedia>
            <EmptyTitle>Erro ao carregar o dashboard</EmptyTitle>
            <EmptyDescription className="text-destructive/80">
                {error instanceof Error ? error.message : "Ocorreu um erro inesperado ao carregar as métricas."}
            </EmptyDescription>
            <EmptyContent>
                <a href="/dashboard" className="text-sm font-medium underline">
                    Tentar novamente
                </a>
            </EmptyContent>
        </Empty>
    );
}
