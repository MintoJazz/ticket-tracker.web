import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { CreateTicketSchema } from "@/schemas/ticket"
import { FormRoot, FormContent } from "@/components/form-component"
import { ControlledField } from "@/components/controlled-field"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "../ui/textarea"

export type TicketFormData = z.infer<typeof CreateTicketSchema>

export interface TicketFormProps {
    initialValues?: Partial<TicketFormData>
    onSubmit: (data: TicketFormData) => void | Promise<void>
    isSubmitting?: boolean
}

export function TicketForm({
    initialValues,
    onSubmit,
    isSubmitting = false
}: TicketFormProps) {
    const resolver = zodResolver(CreateTicketSchema) as Resolver<TicketFormData>
    const defaultValues: Partial<TicketFormData> = {
        title: "",
        description: "",
        priority: "medium",
        workspace_id: "",
        assignee_id: "",
        ...initialValues
    }

    const form = useForm<TicketFormData>({ resolver, defaultValues })

    return (
        <FormRoot form={form} onSubmit={onSubmit} id="ticket-form" className="gap-4">
            <FormContent className="gap-4">
                <Field>
                    <FieldLabel htmlFor="title">Título</FieldLabel>
                    <ControlledField name="title">
                        <Input id="title" placeholder="Título do ticket" disabled={isSubmitting} />
                    </ControlledField>
                </Field>

                <Field>
                    <FieldLabel htmlFor="description">Descrição</FieldLabel>
                    <ControlledField name="description">
                        <Textarea placeholder="Descreva os detalhes do ticket" />
                    </ControlledField>
                </Field>
            </FormContent>
            
            <Field>
                <Button type="submit" form="ticket-form" disabled={isSubmitting}>
                    {isSubmitting ? "Salvando..." : "Salvar Ticket"}
                </Button>
            </Field>
        </FormRoot>
    )
}
