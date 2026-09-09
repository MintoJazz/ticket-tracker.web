import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { LoginSchema, RegisterSchema } from '../../schemas';

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
      // Mocking password check as any password valid for the found email
      if (!user) {
        return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = generateToken(user.id);
      
      return HttpResponse.json({
        user,
        token
      });
    } catch (e) {
      console.error(e);
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }),

  http.post('/auth/register', async ({ request }) => {
    try {
      const body = await request.json();
      const parsed = RegisterSchema.safeParse(body);
      
      if (!parsed.success) {
        return HttpResponse.json({ error: parsed.error.issues }, { status: 400 });
      }

      const existing = db.users.some(u => u.email === parsed.data.email);
      if (existing) {
        return HttpResponse.json({ error: 'Email already exists' }, { status: 409 });
      }

      const newUser = {
        id: `u-${Date.now()}`,
        name: parsed.data.name,
        email: parsed.data.email,
        role: parsed.data.role,
        created_at: new Date().toISOString(),
      };

      db.users.push(newUser);
      db.save();

      const token = generateToken(newUser.id);

      return HttpResponse.json({
        user: newUser,
        token
      }, { status: 201 });
    } catch (e) {
      console.error(e);
      return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }),

  http.get('/auth/me', ({ request }) => {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer mock-token-')) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = authHeader.split('-')[2];
    const user = db.users.find(u => u.id === userId);

    if (!user) {
      return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return HttpResponse.json({ user });
  }),
];
