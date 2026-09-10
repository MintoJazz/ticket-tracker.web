import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const AcceptInviteSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
    inviteToken: z.string().min(1, 'Token de convite é obrigatório'),
});

export const AcceptInviteFormSchema = AcceptInviteSchema.extend({
    confirmPassword: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export const UserRoleSchema = z.enum(['admin', 'tech', 'user']);

export const UserSchema = z.object({
    id: z.string(),
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    role: UserRoleSchema,
    avatar_url: z.string().url().optional(),
    created_at: z.string().datetime(),
});

export const GetInviteResponseSchema = z.object({
    email: z.string().email(),
    workspace: z.object({
        id: z.string(),
        name: z.string()
    }),
    role: UserRoleSchema
});

export const AcceptInviteResponseSchema = z.object({
    message: z.string(),
    user: UserSchema,
    token: z.string()
});