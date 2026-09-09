import { setupWorker } from 'msw/browser';
import { authHandlers } from './routes/auth';
import { workspaceHandlers } from './routes/workspaces';
import { ticketHandlers } from './routes/tickets';
import { worklogHandlers } from './routes/worklogs';
import { reportHandlers } from './routes/reports';

export const worker = setupWorker(
  ...authHandlers,
  ...workspaceHandlers,
  ...ticketHandlers,
  ...worklogHandlers,
  ...reportHandlers
);
