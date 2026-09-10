import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ControlledField } from "@/components/controlled-field"
import { AcceptInviteFormSchema } from "@/schemas"
import type { AcceptInvitePayload, AcceptInviteFormValues, GetInviteResponse } from "@/types"
import { FormRoot, FormContent } from "../form-component"

interface AcceptInviteFormProps extends Omit<React.ComponentProps<typeof Card>, "onSubmit"> {
    inviteData: GetInviteResponse
    inviteToken: string
    onSubmit: (values: AcceptInvitePayload) => void | Promise<void>
    isSubmitting?: boolean
}

export function AcceptInviteForm({
    inviteData,
    inviteToken,
    onSubmit,
    isSubmitting = false,
    ...props
}: AcceptInviteFormProps) {
    const resolver = zodResolver(AcceptInviteFormSchema)
    const defaultValues = {
        name: "",
        password: "",
        confirmPassword: "",
        inviteToken,
    }

    const form = useForm<AcceptInviteFormValues>({
        resolver, defaultValues
    })

    function handleSubmit(values: AcceptInviteFormValues) {
        const { confirmPassword, ...rest } = values
        return onSubmit(rest)
    }

    return (
        <Card {...props}>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Complete seu cadastro</CardTitle>
                <CardDescription>
                    Você foi convidado para <strong>{inviteData.workspace.name}</strong>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormRoot form={form} onSubmit={handleSubmit} id="accept-invite-form" className="gap-4">
                    <FormContent className="gap-4">
                        <Field>
                            <FieldLabel htmlFor="invite-email">Email</FieldLabel>
                            <Input
                                id="invite-email"
                                type="email"
                                value={inviteData.email}
                                disabled
                                readOnly
                            />
                            <FieldDescription>Definido pelo convite e não pode ser alterado.</FieldDescription>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                            <ControlledField name="name">
                                <Input id="name" type="text" placeholder="John Doe" disabled={isSubmitting} />
                            </ControlledField>
                        </Field>

                        <Field>
                            <Field className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="password">Senha</FieldLabel>
                                    <ControlledField name="password">
                                        <Input id="password" type="password" disabled={isSubmitting} />
                                    </ControlledField>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="confirm-password">Confirmar Senha</FieldLabel>
                                    <ControlledField name="confirmPassword">
                                        <Input id="confirm-password" type="password" disabled={isSubmitting} />
                                    </ControlledField>
                                </Field>
                            </Field>
                            <FieldDescription>Deve ter pelo menos 6 caracteres.</FieldDescription>
                        </Field>
                    </FormContent>

                    <Field>
                        <Button type="submit" form="accept-invite-form" disabled={isSubmitting}>
                            {isSubmitting ? "Criando conta..." : "Criar Conta"}
                        </Button>
                    </Field>
                </FormRoot>
            </CardContent>
        </Card>
    )
}
