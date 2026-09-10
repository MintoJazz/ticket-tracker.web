"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ControlledField } from "@/components/controlled-field"
import { FormRoot, FormContent } from "../form-component"
import type { LoginPayload } from "@/types"
import { LoginSchema } from "@/schemas"

interface LoginFormProps extends Omit<React.ComponentProps<typeof Card>, "onSubmit"> {
    onSubmit: (values: LoginPayload) => void | Promise<void>
    isSubmitting?: boolean
}

export function LoginForm({
    onSubmit,
    isSubmitting = false,
    ...props
}: LoginFormProps) {
    const resolver = zodResolver(LoginSchema);
    const defaultValues = {
        email: "",
        password: "",
    }

    const form = useForm<LoginPayload>({resolver, defaultValues})

    return (
        <Card {...props}>
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>
                    Login with your Apple or Google account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormRoot form={form} onSubmit={onSubmit} id="login-form" className="gap-4">
                    <FormContent className="gap-4">
                        <Field>
                            <Button variant="outline" type="button" disabled={isSubmitting}>
                                {/* ícone Apple */}
                                Login with Apple
                            </Button>
                            <Button variant="outline" type="button" disabled={isSubmitting}>
                                {/* ícone Google */}
                                Login with Google
                            </Button>
                        </Field>

                        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                            Or continue with
                        </FieldSeparator>

                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <ControlledField name="email">
                                <Input id="email" type="email" placeholder="m@example.com" disabled={isSubmitting} />
                            </ControlledField>
                        </Field>

                        <Field>
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
                            <ControlledField name="password">
                                <Input id="password" type="password" disabled={isSubmitting} />
                            </ControlledField>
                        </Field>
                    </FormContent>

                    <Field>
                        <Button type="submit" form="login-form" disabled={isSubmitting}>
                            {isSubmitting ? "Entrando..." : "Login"}
                        </Button>
                    </Field>
                </FormRoot>
            </CardContent>
        </Card>
    )
}