import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { LoginSchema } from '../../schemas';
import type { LoginResponse, LogoutResponse, AuthUserResponse } from '@/types';
import { withAuth } from '../middleware';

const generateToken = (userId: string) => `mock-token-${userId}-${Date.now()}`;

export const authHandlers = [
  http.post('/auth/login', async ({ request }) => {
    try {
      const body = await request.json();
      const parsed = LoginSchema.safeParse(body);

      if (!parsed.success) {
        return HttpResponse.json({ error: parsed.error.issues }, { status: 400 });
      }

      const user = db.users.find(u => u.email === parsed.data.email);

      if (!user) {
        return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = generateToken(user.id);

      return HttpResponse.json<LoginResponse>(
        { user },
        {
          status: 200,
          headers: {
            'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
          }
        }
      );
    } catch (e) {
      console.error(e);
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }),

  http.post('/auth/logout', () => {
    return HttpResponse.json<LogoutResponse>(
      { message: 'Logged out' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
        }
      }
    );
  }),

  http.get('/auth/me', withAuth(({ user }) => {
    return HttpResponse.json<AuthUserResponse>({ user });
  })),
];