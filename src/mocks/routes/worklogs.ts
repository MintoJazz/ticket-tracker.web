import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { CreateWorklogSchema, UpdateWorklogSchema } from '../../schemas';
import type { GetWorklogsResponse, WorklogResponse } from '@/types';
import { withAuth } from '../middleware';

export const worklogHandlers = [
  http.get('/tickets/:id/worklogs', withAuth(({ params }) => {
    const { id } = params;
    const worklogs = db.worklogs.filter(w => w.ticket_id === id);
    return HttpResponse.json<GetWorklogsResponse>({ worklogs });
  })),

  http.post('/tickets/:id/worklogs', withAuth(async ({ request, params, user }) => {
    try {
      const { id } = params;
      const ticketExists = db.tickets.some(t => t.id === id);

      if (!ticketExists) {
        return HttpResponse.json({ error: 'Ticket not found' }, { status: 404 });
      }

      const body = await request.json().catch(() => ({}));
      const parsed = CreateWorklogSchema.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.json({ error: parsed.error.issues }, { status: 400 });
      }

      const newWorklog = {
        id: `wl-${Date.now()}`,
        ticket_id: id as string,
        user_id: user.id, // ID injetado automaticamente pelo middleware
        description: parsed.data.description,
        started_at: new Date().toISOString(),
      };

      db.worklogs.push(newWorklog);
      db.save();

      return HttpResponse.json<WorklogResponse>({ worklog: newWorklog }, { status: 201 });
    } catch (e) {
      console.error(e);
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  })),

  http.patch('/worklogs/:id', withAuth(async ({ request, params }) => {
    try {
      const { id } = params;
      const worklogIndex = db.worklogs.findIndex(w => w.id === id);

      if (worklogIndex === -1) {
        return HttpResponse.json({ error: 'Worklog not found' }, { status: 404 });
      }

      const body = await request.json();
      const parsed = UpdateWorklogSchema.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.json({ error: parsed.error.issues }, { status: 400 });
      }

      const updatedWorklog = {
        ...db.worklogs[worklogIndex],
        ...parsed.data,
      };

      db.worklogs[worklogIndex] = updatedWorklog;
      db.save();

      return HttpResponse.json<WorklogResponse>({ worklog: updatedWorklog });
    } catch (e) {
      console.error(e);
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  })),
];