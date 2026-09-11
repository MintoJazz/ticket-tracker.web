import { cn } from "@/lib/utils"
import { AcceptInviteForm } from "@/components/auth/accept-invite-form"
import { FieldDescription } from "@/components/ui/field"
import { useAcceptInvitePage } from "@/hooks/use-accept-invite-page"

export function AcceptInvitePage({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const { inviteData, token, isSubmitting, handleAcceptInvite } = useAcceptInvitePage()

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
