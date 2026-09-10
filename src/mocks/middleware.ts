import { HttpResponse, type DefaultBodyType, type PathParams, type StrictRequest } from 'msw'
import { db } from './db'
import type { User } from '@/types'

type AuthResolverArgs<Params extends PathParams, Body extends DefaultBodyType> = {
    request: StrictRequest<Body>
    params: Params
    cookies: Record<string, string>
    user: User
}

export function withAuth<Params extends PathParams = PathParams, Body extends DefaultBodyType = DefaultBodyType>(
    resolver: (args: AuthResolverArgs<Params, Body>) => Response | Promise<Response>
) {
    return async (args: { request: StrictRequest<Body>, params: Params, cookies: Record<string, string> }) => {
        const { cookies } = args
        const token = cookies.token

        if (!token) {
            return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = token.split('-').slice(2, -1).join('-')
        
        const user = db.users.find(u => u.id === userId)

        if (!user) {
            return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        return resolver({ ...args, user })
    }
}