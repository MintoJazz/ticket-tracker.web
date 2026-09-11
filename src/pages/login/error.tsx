import { useRouteError } from "react-router";
import { AlertCircle } from "lucide-react";
import {
    Empty,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia,
    EmptyContent
} from "@/components/ui/empty";

export function LoginError() {
    const error = useRouteError();

    return (
        <Empty className="bg-destructive/10 text-destructive border-solid max-w-md mx-auto mt-8">
            <EmptyMedia variant="icon">
                <AlertCircle className="text-destructive" />
            </EmptyMedia>
            <EmptyTitle>Erro ao carregar o login</EmptyTitle>
            <EmptyDescription className="text-destructive/80">
                {error instanceof Error ? error.message : "Ocorreu um erro inesperado na tela de login."}
            </EmptyDescription>
            <EmptyContent>
                <a href="/login" className="text-sm font-medium underline">
                    Tentar novamente
                </a>
            </EmptyContent>
        </Empty>
    );
}
