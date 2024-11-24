"use client";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OverallRefillStatistics {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

interface RefillStatusesPieChartProps {
  overallData: OverallRefillStatistics;
}

const RefillStatusesPieChart: React.FC<RefillStatusesPieChartProps> = ({
  overallData,
}) => {
  const chartData = [
    { status: "Pending", count: overallData.pending, fill: "hsl(var(--chart-1))" },
    { status: "Approved", count: overallData.approved, fill: "hsl(var(--chart-2))" },
    { status: "Rejected", count: overallData.rejected, fill: "hsl(var(--chart-3))" },
  ];

  const chartConfig = {
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-1))",
    },
    approved: {
      label: "Approved",
      color: "hsl(var(--chart-2))",
    },
    rejected: {
      label: "Rejected",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Overall Refill Requests</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="count" nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RefillStatusesPieChart;
