import { z } from 'zod';

export const WorklogSchema = z.object({
    id: z.string().uuid(),
    ticket_id: z.string().uuid(),
    user_id: z.string().uuid(),
    description: z.string().optional(),
    started_at: z.string().datetime(),
    ended_at: z.string().datetime().optional(),
});

export const CreateWorklogSchema = z.object({
    description: z.string().optional(),
});

export const UpdateWorklogSchema = z.object({
    ended_at: z.string().datetime(),
    description: z.string().optional(),
});

export const WorklogResponseSchema = z.object({
    worklog: WorklogSchema,
});

export const GetWorklogsResponseSchema = z.object({
    worklogs: z.array(WorklogSchema),
});