import { z } from 'zod';

export const DashboardMetricsSchema = z.object({
    total: z.number(),
    open: z.number(),
    in_progress: z.number(),
    resolved: z.number(),
});

export const DashboardResponseSchema = z.object({
    metrics: DashboardMetricsSchema,
});

export const RankingUserSchema = z.object({
    user: z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
    }),
    resolved_count: z.number(),
});

export const RankingResponseSchema = z.object({
    ranking: z.array(RankingUserSchema),
});
