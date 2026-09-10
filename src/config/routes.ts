import App from "@/App";
import PrivateLayout, { privateLoader } from "@/layouts/private-layout";
import { PublicLayout } from "@/layouts/public-layout";
import LoginPage from "@/pages/login-page";
import AcceptInvitePage, { inviteLoader } from "@/pages/accept-invite-page";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: PrivateLayout,
        loader: privateLoader,
        children: [
            {
                index: true,
                Component: App
            }
        ]
    },
    {
        Component: PublicLayout,
        children: [
            {
                path: "/login",
                Component: LoginPage
            },
            {
                path: "/invite/:token",
                loader: inviteLoader,
                Component: AcceptInvitePage
            },
        ]
    }
]