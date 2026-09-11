import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { authService } from "@/services/auth.service"
import type { LoginPayload } from "@/types";

export function useLoginPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { login } = authService;
    const navigate = useNavigate()

    async function handleLogin(values: LoginPayload) {
        setIsSubmitting(true)

        const response = await login(values)

        if (response.success) {
            toast.success("Login realizado com sucesso")
            navigate("/")
        } else {
            toast.error("Credenciais inválidas")
            console.log("Credenciais inválidas", response.error);
        }
        setIsSubmitting(false)
    }

    return {
        isSubmitting,
        handleLogin
    }
}
