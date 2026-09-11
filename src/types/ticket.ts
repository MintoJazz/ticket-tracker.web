import { z } from 'zod';
import {
  TicketPrioritySchema,
  TicketStatusSchema,
  TicketSchema,
  CreateTicketSchema,
  UpdateTicketSchema,
  TicketResponseSchema,
  GetTicketsResponseSchema
} from '../schemas/ticket';

export type TicketPriority = z.infer<typeof TicketPrioritySchema>;
export type TicketStatus = z.infer<typeof TicketStatusSchema>;
export type Ticket = z.infer<typeof TicketSchema>;
export type CreateTicketPayload = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketPayload = z.infer<typeof UpdateTicketSchema>;
export type TicketResponse = z.infer<typeof TicketResponseSchema>;
export type GetTicketsResponse = z.infer<typeof GetTicketsResponseSchema>;
