import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { withAuth } from '../middleware';
import type { DashboardResponse, RankingResponse } from '@/types';

export const reportHandlers = [
  http.get('/reports/dashboard', withAuth(() => {
    const totalTickets = db.tickets.length;
    const openTickets = db.tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = db.tickets.filter(t => t.status === 'in_progress').length;
    const resolvedTickets = db.tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length;

    return HttpResponse.json<DashboardResponse>({
      metrics: {
        total: totalTickets,
        open: openTickets,
        in_progress: inProgressTickets,
        resolved: resolvedTickets,
      }
    });
  })),

  http.get('/reports/ranking', withAuth(() => {
    const userStats = db.users.map(user => {
      const resolvedCount = db.tickets.filter(
        t => t.assignee_id === user.id && (t.status === 'resolved' || t.status === 'closed')
      ).length;

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        resolved_count: resolvedCount,
      };
    });

    const ranking = [...userStats].sort((a, b) => b.resolved_count - a.resolved_count);

    return HttpResponse.json<RankingResponse>({ ranking });
  })),
];