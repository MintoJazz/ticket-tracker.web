import { z } from 'zod';

export const WorkspaceSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1, 'Nome do workspace é obrigatório'),
    description: z.string().optional(),
    created_at: z.string().datetime(),
});