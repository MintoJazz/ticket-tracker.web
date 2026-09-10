import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button } from "@/components/ui/button";

export function GlobalError() {
    const error = useRouteError();

    let errorMessage = "Ocorreu um erro inesperado.";

    if (isRouteErrorResponse(error)) {
        errorMessage = `${error.status} ${error.statusText} - ${error.data || "A página que você tentou acessar quebrou ou não existe."}`;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <div className="flex flex-col items-center text-center max-w-md space-y-4">
                <div className="bg-destructive/10 p-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold">Ops! Algo deu errado.</h1>
                <p className="text-muted-foreground">{errorMessage}</p>
                <div className="flex gap-4 mt-4">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Tentar Novamente
                    </Button>
                    <Button onClick={() => window.location.href = "/"}>
                        Ir para Início
                    </Button>
                </div>
            </div>
        </div>
    );
}
