import { inviteService } from "@/services/invite.service"
import { redirect, type LoaderFunctionArgs } from "react-router"

export async function inviteLoader({ params }: LoaderFunctionArgs) {
    const token = params.token
    if (!token) return redirect("/login")

    const response = await inviteService.getInvite(token)

    if (!response.success) {
        return redirect("/login")
    }

    return { inviteData: response.data, token }
}
