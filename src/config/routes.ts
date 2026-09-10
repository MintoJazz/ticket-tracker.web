import App from "@/App";
import PrivateLayout, { privateLoader } from "@/layouts/private-layout";
import { PublicLayout } from "@/layouts/public-layout";
import { GlobalError } from "@/components/global-error";
import { LoginPage } from "@/pages/login/page";
import { LoginError } from "@/pages/login/error";
import { LoginLoading } from "@/pages/login/loading";
import { AcceptInvitePage } from "@/pages/accept-invite/page";
import { inviteLoader } from "@/pages/accept-invite/loader";
import { AcceptInviteError } from "@/pages/accept-invite/error";
import { AcceptInviteLoading } from "@/pages/accept-invite/loading";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
    {
        path: '/',
        Component: PrivateLayout,
        ErrorBoundary: GlobalError,

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
        ErrorBoundary: GlobalError,
        children: [
            {
                path: "/login",
                Component: LoginPage,
                ErrorBoundary: LoginError,
                HydrateFallback: LoginLoading,
            },
            {
                path: "/invite/:token",
                loader: inviteLoader,
                Component: AcceptInvitePage,
                ErrorBoundary: AcceptInviteError,
                HydrateFallback: AcceptInviteLoading,
            },
        ]
    }
]