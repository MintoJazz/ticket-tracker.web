import { LoginForm } from "@/components/auth/login-form";
import { FieldDescription } from "@/components/ui/field";
import { authService } from "@/services/auth.service"
import type { LoginPayload } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function LoginPage() {
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

    return (
        <div className="flex flex-col gap-6">
            <LoginForm onSubmit={handleLogin} isSubmitting={isSubmitting} />
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}