import { z } from 'zod';
import {
  DashboardMetricsSchema,
  DashboardResponseSchema,
  RankingUserSchema,
  RankingResponseSchema
} from '../schemas/report';

export type DashboardMetrics = z.infer<typeof DashboardMetricsSchema>;
export type DashboardMetricKey = keyof z.infer<typeof DashboardMetricsSchema>;
export type DashboardResponse = z.infer<typeof DashboardResponseSchema>;
export type RankingUser = z.infer<typeof RankingUserSchema>;
export type RankingResponse = z.infer<typeof RankingResponseSchema>;
