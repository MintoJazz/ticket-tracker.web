import { request, api } from "@/lib/api";
import type { WorkspaceResponse, GetWorkspacesResponse } from "@/types";

export const workspaceService = {
    findMany: async() => await request(api.get<GetWorkspacesResponse>('/workspaces')),
    findOne: async(id: string) => await request(api.get<WorkspaceResponse>(`/workspaces/${id}`))
}