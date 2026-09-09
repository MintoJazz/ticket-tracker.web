import { z } from 'zod';

// ==========================================
// Entity Schemas
// ==========================================

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  role: z.enum(['admin', 'tech', 'user']),
  avatar_url: z.string().url().optional(),
  created_at: z.string().datetime(),
});

export const WorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome do workspace é obrigatório'),
  description: z.string().optional(),
  created_at: z.string().datetime(),
});

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

export const WorklogSchema = z.object({
  id: z.string().uuid(),
  ticket_id: z.string().uuid(),
  user_id: z.string().uuid(),
  description: z.string().optional(),
  started_at: z.string().datetime(),
  ended_at: z.string().datetime().optional(),
});

// ==========================================
// Request Payload Schemas
// ==========================================

export const LoginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  role: z.enum(['admin', 'tech', 'user']).default('user'),
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

export const CreateWorklogSchema = z.object({
  description: z.string().optional(),
});

export const UpdateWorklogSchema = z.object({
  ended_at: z.string().datetime(),
  description: z.string().optional(),
});
