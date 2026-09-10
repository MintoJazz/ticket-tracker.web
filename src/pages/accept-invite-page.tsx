import { cn } from "@/lib/utils"
import { AcceptInviteForm } from "@/components/auth/accept-invite-form"
import { FieldDescription } from "@/components/ui/field"
import { inviteService } from "@/services/invite.service"
import type { AcceptInvitePayload, GetInviteResponse } from "@/types"
import { useState } from "react"
import { redirect, useLoaderData, useNavigate, type LoaderFunctionArgs } from "react-router"
import { toast } from "sonner"

export async function inviteLoader({ params }: LoaderFunctionArgs) {
    const token = params.token
    if (!token) return redirect("/login")

    const response = await inviteService.getInvite(token)

    if (!response.success) {
        return redirect("/login")
    }

    return { inviteData: response.data, token }
}

export default function AcceptInvitePage({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { inviteData, token } = useLoaderData<{ inviteData: GetInviteResponse; token: string }>()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    async function handleAcceptInvite(values: AcceptInvitePayload) {
        setIsSubmitting(true)

        const response = await inviteService.acceptInvite(values)

        if (response.success) {
            toast.success("Conta criada com sucesso!")
            navigate("/")
        } else {
            toast.error("Erro ao criar conta")
            console.error("Erro ao aceitar convite", response.error)
        }
        setIsSubmitting(false)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <AcceptInviteForm
                inviteData={inviteData}
                inviteToken={token}
                onSubmit={handleAcceptInvite}
                isSubmitting={isSubmitting}
            />
            <FieldDescription className="px-6 text-center">
                Ao continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
                e <a href="#">Política de Privacidade</a>.
            </FieldDescription>
        </div>
    )
}
