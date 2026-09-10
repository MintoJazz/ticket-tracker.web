import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { AcceptInviteSchema } from '@/schemas';
import type { User, GetInviteResponse, AcceptInviteResponse } from '@/types';

export const inviteHandlers = [
    // 1. GET: Valida o token assim que a página /invite/[token] carregar
    http.get('/invites/:token', ({ params }) => {
        const { token } = params;

        // Cenário de Erro
        if (token === 'token-invalido') {
            return HttpResponse.json(
                { error: 'Este convite não é mais válido ou já foi utilizado.' },
                { status: 400 }
            );
        }

        // Cenário de Sucesso (Mockando com base no seed do banco real)
        if (token === 'token-valido-sistemas') {
            return HttpResponse.json<GetInviteResponse>({
                email: 'novo.dev@empresa.com',
                workspace: { id: 'w-1', name: 'General Workspace' },
                role: 'tech'
            }, { status: 200 });
        }

        return HttpResponse.json({ error: 'Convite não encontrado.' }, { status: 404 });
    }),

    // 2. POST: Recebe Nome e Senha e finaliza a criação da conta
    http.post('/invites/accept', async ({ request }) => {
        try {
            const body = await request.json();
            const parsed = AcceptInviteSchema.safeParse(body);

            if (!parsed.success) {
                return HttpResponse.json({ error: parsed.error.issues }, { status: 400 });
            }

            if (parsed.data.inviteToken === 'token-invalido') {
                return HttpResponse.json({ error: 'Convite inválido ou expirado.' }, { status: 401 });
            }

            // Simula a Transação Atômica do SQL
            const newUser: User = {
                id: `u-${Date.now()}`,
                name: parsed.data.name,
                email: 'novo.dev@empresa.com', // Extraído do payload JWT real
                role: 'tech',
                created_at: new Date().toISOString(),
            };

            db.users.push(newUser);
            db.save();

            // Gera o token e realiza auto-login após o cadastro
            const token = `mock-token-${newUser.id}-${Date.now()}`;

            return HttpResponse.json<AcceptInviteResponse>({
                message: 'Conta criada com sucesso!',
                user: newUser,
                token
            }, { status: 201 });

        } catch (e) {
            console.error(e);
            return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
    })
];