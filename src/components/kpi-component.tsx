import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardAction } from "@/components/ui/card";
import { cn } from "cn";

interface KpiCardProps {
  title: string;
  value: string | number;
  trendValue?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  Icon?: LucideIcon;
  className?: string; // Estilos customizados para o container principal
  classes?: {
    title?: string;
    value?: string;
    icon?: string;
    trendContainer?: string;
  };
}

export function KpiCard({
  title,
  value,
  trendValue,
  trendType = 'neutral',
  Icon,
  className = '',
  classes = {}
}: KpiCardProps) {
  
  // Configuração das cores e ícones de tendência do Lucide
  const trendConfig = {
    positive: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', TrendIcon: TrendingUp },
    negative: { color: 'text-red-500', bg: 'bg-red-500/10', TrendIcon: TrendingDown },
    neutral: { color: 'text-muted-foreground', bg: 'bg-muted', TrendIcon: Minus },
  };

  const currentTrend = trendConfig[trendType];
  const TrendIcon = currentTrend.TrendIcon;

  return (
    <Card className={cn(className, "border")}>
      <CardHeader className="pb-2">
        <CardTitle className={cn("text-sm font-medium text-muted-foreground", classes.title)}>
          {title}
        </CardTitle>
        {Icon && (
          <CardAction className={cn("text-muted-foreground", classes.icon)}>
            <Icon size={20} strokeWidth={2} />
          </CardAction>
        )}
      </CardHeader>
      
      <CardContent>
        <div className={cn("text-3xl font-bold", classes.value)}>
          {value}
        </div>
        
        {trendValue && (
          <div className={cn("flex items-center gap-2 text-sm mt-3", classes.trendContainer)}>
            <span 
              className={cn("flex items-center gap-1 rounded-full px-2 py-0.5 font-medium", currentTrend.color, currentTrend.bg)}
            >
              <TrendIcon size={14} strokeWidth={2.5} />
              {trendValue}
            </span>
            <span className="text-xs text-muted-foreground">
              vs. período anterior
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}