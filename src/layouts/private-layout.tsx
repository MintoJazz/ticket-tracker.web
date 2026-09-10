import { authService } from "@/services/auth.service";
import { Outlet, redirect, useLoaderData } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import type { User } from "@/types";

export async function privateLoader() {
    const { success, data } = await authService.getUser();
    if (!success) return redirect("/login");

    return data;
}

export default function PrivateLayout() {
    const data = useLoaderData() as { user: User };

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex w-full flex-col">
                <AppHeader user={data.user} />
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </main>
        </SidebarProvider>
    );
}