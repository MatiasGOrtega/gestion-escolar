"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface AttendaceChartContainerProps {
  data: {
    today: string;
    present: number;
    absent: number;
  }[];
}

function AttendaceChartContainer({ data }: AttendaceChartContainerProps) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto w-full h-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="today"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="present" fill="#fef08a" radius={4} />
        <Bar dataKey="absent" fill="#bae6fd" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export default AttendaceChartContainer;
