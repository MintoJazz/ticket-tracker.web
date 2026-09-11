import type { DashboardMetricKey } from "@/types";
import { AlertCircle, CheckCircle2, Ticket, Timer, type LucideIcon } from "lucide-react";

export interface DashboardMetricTheme {
  label: string;
  icon: LucideIcon;
  containerClassName?: string;
  classes?: {
    title?: string;
    value?: string;
    icon?: string;
    trendContainer?: string;
  };
  trendColorsOverride?: {
    positive?: { text: string; bg: string };
    negative?: { text: string; bg: string };
    neutral?: { text: string; bg: string };
  };
}

export const DASHBOARD_METRICS_THEMES: Record<DashboardMetricKey, DashboardMetricTheme> = {
  total: {
    label: 'Total de Chamados',
    icon: Ticket,
    containerClassName: '',
    classes: {
      title: '',
      value: '',
      icon: '',
    }
  },
  open: {
    label: 'Abertos',
    icon: AlertCircle,
    containerClassName: 'bg-amber-500/10 border-amber-500/20',
    classes: {
      title: 'text-amber-700 dark:text-amber-500',
      value: 'text-amber-900 dark:text-amber-400',
      icon: 'text-amber-600 dark:text-amber-500',
    }
  },
  in_progress: {
    label: 'Em Andamento',
    icon: Timer,
    containerClassName: 'bg-blue-500/10 border-blue-500/20',
    classes: {
      title: 'text-blue-700 dark:text-blue-500',
      value: 'text-blue-900 dark:text-blue-400',
      icon: 'text-blue-600 dark:text-blue-500',
    }
  },
  resolved: {
    label: 'Resolvidos',
    icon: CheckCircle2,
    containerClassName: 'bg-emerald-500/10 border-emerald-500/20',
    classes: {
      title: 'text-emerald-700 dark:text-emerald-500',
      value: 'text-emerald-900 dark:text-emerald-400',
      icon: 'text-emerald-600 dark:text-emerald-500',
    }
  }
};