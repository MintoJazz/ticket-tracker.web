import { z } from 'zod';
import {
  WorkspaceSchema,
  WorkspaceResponseSchema,
  GetWorkspacesResponseSchema
} from '../schemas/workspace';

export type Workspace = z.infer<typeof WorkspaceSchema>;
export type WorkspaceResponse = z.infer<typeof WorkspaceResponseSchema>;
export type GetWorkspacesResponse = z.infer<typeof GetWorkspacesResponseSchema>;
