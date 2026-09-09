import { z } from 'zod';
import {
  UserSchema,
  WorkspaceSchema,
  TicketSchema,
  WorklogSchema,
  LoginSchema,
  RegisterSchema,
  CreateTicketSchema,
  UpdateTicketSchema,
  CreateWorklogSchema,
  UpdateWorklogSchema,
} from '../schemas';

// ==========================================
// Entity Types
// ==========================================

export type User = z.infer<typeof UserSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
export type Ticket = z.infer<typeof TicketSchema>;
export type Worklog = z.infer<typeof WorklogSchema>;

// ==========================================
// Request Payload Types
// ==========================================

export type LoginPayload = z.infer<typeof LoginSchema>;
export type RegisterPayload = z.infer<typeof RegisterSchema>;
export type CreateTicketPayload = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketPayload = z.infer<typeof UpdateTicketSchema>;
export type CreateWorklogPayload = z.infer<typeof CreateWorklogSchema>;
export type UpdateWorklogPayload = z.infer<typeof UpdateWorklogSchema>;
