import { useRouteError } from "react-router";

export function LoginError() {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center p-8 border rounded-md bg-destructive/10 text-destructive w-full max-w-md mx-auto mt-8">
            <h2 className="text-lg font-semibold mb-2">Erro ao carregar o login</h2>
            <p className="text-sm text-center mb-4">
                {error instanceof Error ? error.message : "Ocorreu um erro inesperado na tela de login."}
            </p>
            <a href="/login" className="text-sm font-medium underline">
                Tentar novamente
            </a>
        </div>
    );
}
