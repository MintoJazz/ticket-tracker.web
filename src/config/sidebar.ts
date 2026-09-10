import { 
    LayoutDashboard, 
    Ticket,
    User,
    Settings,
    LogOut,
    type LucideIcon
} from "lucide-react";

import { useNavigate } from "react-router";
import { authService } from "@/services/auth.service";

export interface NavItem {
    title: string;
    url: string;
    icon: LucideIcon;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface UserMenuItem {
    title: string;
    icon: LucideIcon;
    onClick?: () => void | Promise<void>;
}

export const useSidebarConfig = () => {
    const navigate = useNavigate();

    return {
        navGroups: [
            {
                title: "Menu",
                items: [
                    {
                        title: "Dashboard",
                        url: "/",
                        icon: LayoutDashboard,
                    },
                    {
                        title: "Tickets",
                        url: "/tickets",
                        icon: Ticket,
                    },
                ],
            },
        ] as NavGroup[],

        userMenu: [
            {
                title: "Minha Conta",
                icon: User,
                onClick: () => navigate('/profile')
            },
            {
                title: "Configurações",
                icon: Settings,
                onClick: () => navigate('/settings')
            },
            {
                title: "Sair",
                icon: LogOut,
                onClick: async () => {
                    await authService.logout();
                    navigate('/login');
                }
            }
        ] as UserMenuItem[]
    };
};
