"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  total: {
    label: "Total Students",
  },
  boy: {
    label: "Boys",
    color: "hsl(var(--chart-2))",
  },
  girl: {
    label: "Girls",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface CountChartContainerProps {
  boys: number;
  girls: number;
}

function CountChartContainer({ boys, girls }: CountChartContainerProps) {
  const chartData = [
    { student: "total", total: boys + girls, fill: "#ffffff" },
    { student: "girl", total: girls, fill: "#fef08a" },
    { student: "boy", total: boys, fill: "#bae6fd" },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full h-full"
    >
      <RadialBarChart
        data={chartData}
        innerRadius={50}
        outerRadius={100}
        barSize={32}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="student" />}
        />
        <RadialBar dataKey="total" background />
      </RadialBarChart>
    </ChartContainer>
  );
}

export default CountChartContainer;
