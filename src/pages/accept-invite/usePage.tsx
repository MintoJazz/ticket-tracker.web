import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router"
import { toast } from "sonner"
import { inviteService } from "@/services/invite.service"
import type { AcceptInvitePayload, GetInviteResponse } from "@/types"

export function usePage() {
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

    return {
        inviteData,
        token,
        isSubmitting,
        handleAcceptInvite
    }
}
