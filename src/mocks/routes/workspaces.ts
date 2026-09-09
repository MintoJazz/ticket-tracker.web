import { http, HttpResponse } from 'msw';
import { db } from '../db';

export const workspaceHandlers = [
  http.get('/workspaces', () => {
    return HttpResponse.json({ workspaces: db.workspaces });
  }),

  http.get('/workspaces/:id', ({ params }) => {
    const { id } = params;
    const workspace = db.workspaces.find(w => w.id === id);

    if (!workspace) {
      return HttpResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    return HttpResponse.json({ workspace });
  }),
];
