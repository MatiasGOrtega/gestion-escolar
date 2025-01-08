"use client";
import { RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Ellipsis } from "lucide-react";
const chartData = [{ name: "Groups", a: 92, b: 8 },];
const chartConfig = {
  a: {
    label: "Group A",
    color: "hsl(var(--chart-1))",
  },
  b: {
    label: "Group B",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function Performance() {
  return (
    <Card className="flex flex-col border-none relative">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl font-semibold">Performance</CardTitle>
        <CardDescription>
          <Ellipsis className="w-6 h-6" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={100}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <RadialBar
              dataKey="a"
              stackId="a"
              cornerRadius={5}
              fill="#C3EBFA"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="b"
              fill="#FAE27C"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl font-bold">9.2</h1>
          <p className="text-xs text-gray-300">of 10 max LTS</p>
        </div>
        <h2 className="absolute bottom-16 left-0 right-0 m-auto text-center">
          1st Semester - 2nd Semester
        </h2>
      </CardFooter>
    </Card>
  );
}

export default Performance;
