import { api, request } from "@/lib/api";
import { LoginSchema, RegisterSchema } from "@/schemas";
import type { User } from "@/types";

export const authService = {
    login: async (formData: unknown) => {
        const result = LoginSchema.safeParse(formData)

        if (!result.success) return result

        const response = await request(api.post<{ user: User; token: string }>(
            "/auth/login",
            result.data
        ))

        if (!response.success) return response

        const { user, token } = response.data

        localStorage.setItem("token", token)

        return {
            success: true,
            data: user,
        }
    },

    register: async (formData: unknown) => {
        const result = RegisterSchema.safeParse(formData)

        if (!result.success) return result

        const response = await request(api.post<{ user: User; token: string }>(
            "/auth/register",
            result.data
        ))

        if (!response.success) return response;

        const { user, token } = response.data;

        localStorage.setItem("token", token);

        return {
            success: true,
            data: user,
        };
    },

    getUser: async () => {
        const response = await request(api.get<{ user: User }>("/auth/me"));

        if (!response.success) return response;

        return {
            success: true,
            data: response.data.user,
        };
    },
};
