import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { withAuth } from '../middleware';
import type { GetWorkspacesResponse, WorkspaceResponse } from '@/types';

export const workspaceHandlers = [
  http.get('/workspaces', withAuth(() => {
    return HttpResponse.json<GetWorkspacesResponse>({ workspaces: db.workspaces });
  })),

  http.get('/workspaces/:id', withAuth(({ params }) => {
    const { id } = params;
    const workspace = db.workspaces.find(w => w.id === id);

    if (!workspace) {
      return HttpResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    return HttpResponse.json<WorkspaceResponse>({ workspace });
  })),
];