import { SearchMetrics } from "@/types/product";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Zap, Target, TrendingUp } from "lucide-react";

interface SearchMetricsProps {
  metrics: SearchMetrics;
}

export function SearchMetricsDisplay({ metrics }: SearchMetricsProps) {
  const metricItems = [
    {
      icon: Clock,
      label: "Total Latency",
      value: `${metrics.latency.toFixed(0)}ms`,
      color: "text-primary"
    },
    {
      icon: Zap,
      label: "Embedding Time",
      value: `${metrics.queryEmbeddingTime.toFixed(0)}ms`,
      color: "text-accent"
    },
    {
      icon: Target,
      label: "Matching Time",
      value: `${metrics.matchingTime.toFixed(0)}ms`,
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      label: "Top Match Score",
      value: `${(metrics.topScore * 100).toFixed(1)}%`,
      color: "text-accent"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricItems.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/50">
              <item.icon className={`w-6 h-6 mb-2 ${item.color}`} />
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
