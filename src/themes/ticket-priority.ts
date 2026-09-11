import { ArrowDown, ArrowRight, ArrowUp, AlertOctagon } from "lucide-react";
import type { ThemeConfig } from "./ticket";

export const ticketPriorityTheme: Record<string, ThemeConfig> = {
  low: {
    label: 'Baixa',
    color: 'text-slate-700 dark:text-slate-400',
    icon: ArrowDown,
  },
  medium: {
    label: 'Média',
    color: 'text-blue-700 dark:text-blue-400',
    icon: ArrowRight,
  },
  high: {
    label: 'Alta',
    color: 'text-amber-700 dark:text-amber-400',
    icon: ArrowUp,
  },
  urgent: {
    label: 'Urgente',
    color: 'text-red-700 dark:text-red-400',
    icon: AlertOctagon,
  },
}