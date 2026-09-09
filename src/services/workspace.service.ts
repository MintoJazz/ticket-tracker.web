import { request, api } from "@/lib/api";
import type { Workspace } from "@/types";

export const workspaceService = {
    findMany: async() => await request(api.get<{ workspaces: Workspace[] }>('/workspaces')),
    findOne: async(id: number) => await request(api.get<{ workspace: Workspace }>(`/workspaces/${id}`))
}
