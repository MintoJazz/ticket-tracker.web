import { z } from 'zod';

export const TicketSchema = z.object({
    id: z.string().uuid(),
    workspace_id: z.string().uuid(),
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    status: z.enum(['open', 'in_progress', 'resolved', 'closed']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']),
    assignee_id: z.string().uuid().optional(),
    reporter_id: z.string().uuid(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export const CreateTicketSchema = z.object({
    workspace_id: z.string().uuid(),
    title: z.string().min(1, 'Título é obrigatório'),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    assignee_id: z.string().uuid().optional(),
});

export const UpdateTicketSchema = z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['open', 'in_progress', 'resolved', 'closed']).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    assignee_id: z.string().uuid().optional(),
});