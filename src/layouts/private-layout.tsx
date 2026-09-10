import { authService } from "@/services/auth.service";
import { Outlet, redirect } from "react-router";

export async function privateLoader() {
    const { success, data } = await authService.getUser();
    if (!success) return redirect("/login");

    return data;
}

export default function PrivateLayout() {
    return <Outlet />
}