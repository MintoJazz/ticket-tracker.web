import { z } from 'zod';

export const TicketPrioritySchema = z.enum(['low', 'medium', 'high', 'urgent']);
export const TicketStatusSchema = z.enum(['open', 'in_progress', 'resolved', 'closed']);

export const TicketSchema = z.object({
    id: z.string().uuid(),
    workspace_id: z.string().uuid(),
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    status: TicketStatusSchema,
    priority: TicketPrioritySchema,
    assignee_id: z.string().uuid().optional(),
    reporter_id: z.string().uuid(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const CreateTicketSchema = z.object({
    workspace_id: z.string().uuid(),
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    priority: TicketPrioritySchema.default('medium'),
    assignee_id: z.string().uuid().optional(),
});

export const UpdateTicketSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: TicketStatusSchema.optional(),
    priority: TicketPrioritySchema.optional(),
    assignee_id: z.string().uuid().optional(),
});

export const TicketResponseSchema = z.object({
    ticket: TicketSchema,
});

export const GetTicketsResponseSchema = z.object({
    tickets: z.array(TicketSchema),
});