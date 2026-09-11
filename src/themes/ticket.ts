import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
  type LucideIcon,
} from 'lucide-react'

export interface ThemeConfig {
  label: string
  color: string
  icon: LucideIcon
}

export const ticketStatusTheme: Record<string, ThemeConfig> = {
  open: {
    label: 'Aberto',
    color: 'text-blue-700 dark:text-blue-400',
    icon: Circle,
  },
  in_progress: {
    label: 'Em Progresso',
    color: 'text-amber-700 dark:text-amber-400',
    icon: Clock,
  },
  resolved: {
    label: 'Resolvido',
    color: 'text-emerald-700 dark:text-emerald-400',
    icon: CheckCircle2,
  },
  closed: {
    label: 'Fechado',
    color: 'text-slate-700 dark:text-slate-400',
    icon: AlertCircle,
  },
}