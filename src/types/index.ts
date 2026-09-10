import { z } from 'zod';
import {
  UserSchema,
  WorkspaceSchema,
  TicketSchema,
  WorklogSchema,
  LoginSchema,
  CreateTicketSchema,
  UpdateTicketSchema,
  CreateWorklogSchema,
  UpdateWorklogSchema,
  UserRoleSchema,
  AcceptInviteSchema,
  AcceptInviteFormSchema,
  GetInviteResponseSchema,
  AcceptInviteResponseSchema,
} from '../schemas';

// ==========================================
// Entity Types
// ==========================================

export type UserRole = z.infer<typeof UserRoleSchema>;
export type User = z.infer<typeof UserSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
export type Ticket = z.infer<typeof TicketSchema>;
export type Worklog = z.infer<typeof WorklogSchema>;

// ==========================================
// Request Payload Types
// ==========================================

export type LoginPayload = z.infer<typeof LoginSchema>;
export type CreateTicketPayload = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketPayload = z.infer<typeof UpdateTicketSchema>;
export type CreateWorklogPayload = z.infer<typeof CreateWorklogSchema>;
export type UpdateWorklogPayload = z.infer<typeof UpdateWorklogSchema>;

export type AcceptInvitePayload = z.infer<typeof AcceptInviteSchema>;
export type AcceptInviteFormValues = z.infer<typeof AcceptInviteFormSchema>;
export type GetInviteResponse = z.infer<typeof GetInviteResponseSchema>;
export type AcceptInviteResponse = z.infer<typeof AcceptInviteResponseSchema>;