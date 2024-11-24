"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MedicationStatistic {
  medication_name: string;
  total: number;
}

interface RefillStatsBarChartProps {
  byMedicationData: MedicationStatistic[];
}

const RefillStatsBarChart: React.FC<RefillStatsBarChartProps> = ({
  byMedicationData,
}) => {
  const enhancedData = byMedicationData.map((stat, index) => ({
    ...stat,
    fill: `hsl(var(--chart-${(index % 10) + 1}))`, 
  }));

  const chartConfig: ChartConfig = enhancedData.reduce(
    (config, stat, index) => ({
      ...config,
      [stat.medication_name]: {
        label: stat.medication_name,
        color: `hsl(var(--chart-${(index % 10) + 1}))`, 
      },
    }),
    {
      total: {
        label: "Total Requests", 
      },
    }
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Refill Requests by Medication</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] max-h-[400px] w-full"
        >
          <BarChart data={enhancedData} width={600} height={400}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="medication_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="total" radius={4}>
              {enhancedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RefillStatsBarChart;
