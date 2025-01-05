"use client";
import { Ellipsis } from "lucide-react";
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
import Image from "next/image";
const chartData = [
  { student: "total", total: 505, fill: "#ffffff" },
  { student: "girl", total: 220, fill: "#fef08a" },
  { student: "boy", total: 285, fill: "#bae6fd" },
];
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
function CountChart() {
  return (
    <Card className="flex flex-col p-4 w-full h-full border-none">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Students</CardTitle>
        <CardDescription>
          <Ellipsis className="w-6 h-6" />
        </CardDescription>
      </CardHeader>
      <CardContent className="relative w-full h-[75%] p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square"
        >
          <RadialBarChart
            data={chartData}
            innerRadius={60}
            outerRadius={120}
            barSize={32}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="student" />}
            />
            <RadialBar dataKey="total" background />
          </RadialBarChart>
        </ChartContainer>
        <Image
          src="/maleFemale.png"
          alt="chart"
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </CardContent>
      <CardFooter className="flex justify-center gap-16">
        <div className="">
          <div className="w-5 h-5 bg-sky-200 rounded-full" />
          <h1 className="font-bold">285</h1>
          <h2 className="text-xs text-gray-300">Boys(55%)</h2>
        </div>
        <div className="">
          <div className="w-5 h-5 bg-yellow-200 rounded-full" />
          <h1 className="font-bold">220</h1>
          <h2 className="text-xs text-gray-300">Girls(45%)</h2>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CountChart;
