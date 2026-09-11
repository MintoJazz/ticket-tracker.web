import { useRouteError, isRouteErrorResponse } from "react-router";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyTitle,
    EmptyDescription,
    EmptyMedia,
    EmptyContent
} from "@/components/ui/empty";

export function GlobalError() {
    const error = useRouteError();

    let errorMessage = "Ocorreu um erro inesperado.";

    if (isRouteErrorResponse(error)) {
        errorMessage = `${error.status} ${error.statusText} - ${error.data || "A página que você tentou acessar quebrou ou não existe."}`;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="flex min-h-screen bg-background p-4 items-center justify-center">
            <Empty className="border-none max-w-md">
                <EmptyMedia>
                    <div className="bg-destructive/10 p-4 rounded-full">
                        <AlertCircle className="size-12 text-destructive" />
                    </div>
                </EmptyMedia>
                <EmptyTitle className="text-2xl mt-4">Ops! Algo deu errado.</EmptyTitle>
                <EmptyDescription className="text-base text-muted-foreground">
                    {errorMessage}
                </EmptyDescription>
                <EmptyContent className="flex-row justify-center gap-4 mt-4 w-full">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </Button>
                    <Button onClick={() => window.location.href = "/"}>
                        Ir para Início
                    </Button>
                </EmptyContent>
            </Empty>
        </div>
    );
}
