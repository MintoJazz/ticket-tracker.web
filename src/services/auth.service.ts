import { api, request } from "@/lib/api";
import { LoginSchema } from "@/schemas";
import type { User } from "@/types";
import { failed, success } from "@/types/result";

export const authService = {
    login: async (formData: unknown) => {
        const parsed = LoginSchema.safeParse(formData)
        if (!parsed.success) return failed(parsed.error)

        const response = await request(api.post<{ user: User }>(
            "/auth/login",
            parsed.data
        ))

        if (!response.success) return response
        
        return success(response.data.user)
    },
    getUser: async () => await request(api.get<{ user: User }>("/auth/me")),
    
    logout: async (): Promise<void> => {
        await request(api.post("/auth/logout"));
    },
};