"use client";
import { Ellipsis } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
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
const chartData = [
  { month: "March", income: 237, expense: 120 },
  { month: "April", income: 73, expense: 190 },
  { month: "May", income: 209, expense: 130 },
  { month: "June", income: 214, expense: 140 },
  { month: "July", income: 214, expense: 140 },
  { month: "August", income: 214, expense: 140 },
  { month: "September", income: 214, expense: 140 },
  { month: "October", income: 214, expense: 140 },
  { month: "November", income: 214, expense: 140 },
  { month: "December", income: 214, expense: 140 },
];
const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function FinanceChart() {
  return (
    <Card className="p-4 w-full h-full border-none">
      <CardHeader className="flex flex-row justify-between items-center p-0">
        <CardTitle>Finance</CardTitle>
        <CardDescription>
          <Ellipsis className="w-6 h-6" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="expense"
              type="natural"
              fill="#fef08a"
              fillOpacity={0.4}
              stroke="#ffe000"
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill="#bae6fd"
              fillOpacity={0.4}
              stroke="#00a7ff"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-center gap-16">
        <div className="">
          <div className="w-5 h-5 bg-sky-200 rounded-full" />
          <h1 className="font-bold">285</h1>
          <h2 className="text-xs text-gray-300">Income</h2>
        </div>
        <div className="">
          <div className="w-5 h-5 bg-yellow-200 rounded-full" />
          <h1 className="font-bold">220</h1>
          <h2 className="text-xs text-gray-300">Expense</h2>
        </div>
      </CardFooter>
    </Card>
  );
}

export default FinanceChart;
