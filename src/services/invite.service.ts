import { api, request } from "@/lib/api";
import { AcceptInviteSchema } from "@/schemas";
import type { GetInviteResponse, AcceptInviteResponse } from "@/types";
import { failed, success } from "@/types/result";

export const inviteService = {
    getInvite: async (token: string) => await request(api.get<GetInviteResponse>(`/invites/${token}`)),
    acceptInvite: async (formData: unknown) => {
        const parsed = AcceptInviteSchema.safeParse(formData);
        if (!parsed.success) return failed(parsed.error);

        const response = await request(
            api.post<AcceptInviteResponse>(
                "/invites/accept",
                parsed.data
            )
        );

        if (!response.success) return response;
        return success(response.data.user);
    },
};