import { Ellipsis } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import CountChartContainer from "./CountChartContainer";
import { prisma } from "@/lib/prisma";

async function CountChart() {
  const data = await prisma.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((student) => student.sex === "MALE")?._count || 0;
  const girls = data.find((student) => student.sex === "FEMALE")?._count || 0;
  return (
    <Card className="p-4 w-full h-full border-none">
      <CardHeader className="flex flex-row justify-between items-center p-0">
        <CardTitle>Students</CardTitle>
        <CardDescription>
          <Ellipsis className="w-6 h-6" />
        </CardDescription>
      </CardHeader>
      <CardContent className="relative w-full h-[75%] p-0">
        <CountChartContainer boys={boys} girls={girls} />
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
          <h1 className="font-bold">{boys}</h1>
          <h2 className="text-xs text-gray-300">
            Boys({Math.round((boys / (boys + girls)) * 100)}%)
          </h2>
        </div>
        <div className="">
          <div className="w-5 h-5 bg-yellow-200 rounded-full" />
          <h1 className="font-bold">{girls}</h1>
          <h2 className="text-xs text-gray-300">
            Girls({Math.round((girls / (boys + girls)) * 100)}%)
          </h2>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CountChart;
