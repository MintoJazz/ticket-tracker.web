import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { CreateTicketSchema, UpdateTicketSchema } from '../../schemas';

export const ticketHandlers = [
  http.get('/tickets', ({ request }) => {
    const url = new URL(request.url);
    const workspaceId = url.searchParams.get('workspace_id');
    const status = url.searchParams.get('status');

    let tickets = [...db.tickets];

    if (workspaceId) {
      tickets = tickets.filter(t => t.workspace_id === workspaceId);
    }
    if (status) {
      tickets = tickets.filter(t => t.status === status);
    }

    return HttpResponse.json({ tickets });
  }),

  http.post('/tickets', async ({ request }) => {
    try {
      const authHeader = request.headers.get('Authorization');
      const reporterId = authHeader ? authHeader.split('-')[2] : 'u-1'; // Mocking fallback to admin user
      
      const body = await request.json();
      const parsed = CreateTicketSchema.safeParse(body);
      
      if (!parsed.success) {
        return HttpResponse.json({ error: parsed.error.issues }, { status: 400 });
      }

      const newTicket = {
        id: `t-${Date.now()}`,
        workspace_id: parsed.data.workspace_id,
        title: parsed.data.title,
        description: parsed.data.description,
        status: 'open' as const,
        priority: parsed.data.priority,
        assignee_id: parsed.data.assignee_id,
        reporter_id: reporterId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      db.tickets.push(newTicket);
      db.save();

      return HttpResponse.json({ ticket: newTicket }, { status: 201 });
    } catch (e) {
      console.error(e);
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }),

  http.get('/tickets/:id', ({ params }) => {
    const { id } = params;
    const ticket = db.tickets.find(t => t.id === id);

    if (!ticket) {
      return HttpResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return HttpResponse.json({ ticket });
  }),

  http.patch('/tickets/:id', async ({ request, params }) => {
    try {
      const { id } = params;
      const ticketIndex = db.tickets.findIndex(t => t.id === id);

      if (ticketIndex === -1) {
        return HttpResponse.json({ error: 'Ticket not found' }, { status: 404 });
      }

      const body = await request.json();
      const parsed = UpdateTicketSchema.safeParse(body);
      
      if (!parsed.success) {
        return HttpResponse.json({ error: parsed.error.issues }, { status: 400 });
      }

      const updatedTicket = {
        ...db.tickets[ticketIndex],
        ...parsed.data,
        updated_at: new Date().toISOString(),
      };

      db.tickets[ticketIndex] = updatedTicket;
      db.save();

      return HttpResponse.json({ ticket: updatedTicket });
    } catch (e) {
      console.error(e);
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }),
];
