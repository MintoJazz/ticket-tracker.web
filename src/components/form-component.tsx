import { FormProvider, type FieldValues, type SubmitErrorHandler, type UseFormReturn } from "react-hook-form";
import { FieldGroup } from "./ui/field";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function FormRoot<T extends FieldValues>({
    form,
    onSubmit,
    onError,
    id,
    className,
    children
}: {
    form: UseFormReturn<T>,
    onSubmit: (data: T) => void,
    onError?: SubmitErrorHandler<T>,
    id?: string,
    className?: string,
    children: ReactNode
}) {
    return (
        <FormProvider {...form}>
            <form id={id} onSubmit={form.handleSubmit(onSubmit, onError)} className={cn("flex flex-col", className)}>
                {children}
            </form>
        </FormProvider>
    )
}

export function FormContent({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <FieldGroup className={className ?? "gap-2"}>
            {children}
        </FieldGroup>
    )
}

export function FormFooter({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={className ?? "flex items-center justify-end gap-1"}>
            {children}
        </div>
    )
}

interface Props<T extends FieldValues> {
    id: string
    submitText?: string
    children: ReactNode
    form: UseFormReturn<T>
    onError?: SubmitErrorHandler<T>
    onSubmit: (form: T) => void,
}

export default function Form<T extends FieldValues>({ id, form, onSubmit, onError, children, submitText = "Salvar" }: Props<T>) {
    return (
        <FormRoot form={form} onSubmit={onSubmit} onError={onError} id={id} className="gap-4">
            <FormContent>
                {children}
            </FormContent>
            <Button type="submit" form={id}>
                {submitText}
            </Button>
        </FormRoot>
    )
}