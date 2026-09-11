import { z } from 'zod';
import {
  WorklogSchema,
  CreateWorklogSchema,
  UpdateWorklogSchema,
  WorklogResponseSchema,
  GetWorklogsResponseSchema
} from '../schemas/worklog';

export type Worklog = z.infer<typeof WorklogSchema>;
export type CreateWorklogPayload = z.infer<typeof CreateWorklogSchema>;
export type UpdateWorklogPayload = z.infer<typeof UpdateWorklogSchema>;
export type WorklogResponse = z.infer<typeof WorklogResponseSchema>;
export type GetWorklogsResponse = z.infer<typeof GetWorklogsResponseSchema>;
