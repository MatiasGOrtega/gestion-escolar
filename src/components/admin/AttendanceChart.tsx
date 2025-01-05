"use client"
import { Ellipsis } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { today: "Monday", present: 186, absent: 80 },
  { today: "Tuesday", present: 305, absent: 200 },
  { today: "Wednesday", present: 237, absent: 120 },
  { today: "Thursday", present: 73, absent: 190 },
  { today: "Friday", present: 209, absent: 130 },
  { today: "Saturday", present: 214, absent: 140 },
  { today: "Sunday", present: 214, absent: 140 },
]
const chartConfig = {
  present: {
    label: "Present",
    color: "hsl(var(--chart-1))",
  },
  absent: {
    label: "Absent",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

function AttendanceChart() {
  return (
    <Card className="flex flex-col p-4 w-full h-full border-none">
      <CardHeader className="flex flex-row justify-between items-center p-0">
        <CardTitle>Attendances</CardTitle>
        <CardDescription>
          <Ellipsis className="w-6 h-6" />
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full p-0">
        <ChartContainer config={chartConfig} className="mx-auto w-full">
          <BarChart accessibilityLayer data={chartData}>
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
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-sky-200 rounded-full" />
          <h2 className="text-sky-300">Absent</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-200 rounded-full" />
          <h2 className="text-yellow-300">Present</h2>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AttendanceChart