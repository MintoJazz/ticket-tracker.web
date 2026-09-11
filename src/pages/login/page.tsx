import { LoginForm } from "@/components/auth/login-form";
import { FieldDescription } from "@/components/ui/field";
import { useLoginPage } from "@/hooks/use-login-page";

export function LoginPage() {
    const { isSubmitting, handleLogin } = useLoginPage()

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
