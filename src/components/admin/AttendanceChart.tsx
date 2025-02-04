import { Ellipsis } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AttendaceChartContainer from "./AttendaceChartContainer";
import { prisma } from "@/lib/prisma";

async function AttendanceChart() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);
  const resData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Monday: {
        present: 0,
        absent: 0,
      },
      Tuesday: {
        present: 0,
        absent: 0,
      },
      Wednesday: {
        present: 0,
        absent: 0,
      },
      Thursday: {
        present: 0,
        absent: 0,
      },
      Friday: {
        present: 0,
        absent: 0,
      },
    };

  resData.forEach((attendance) => {
    const itemDay = new Date(attendance.date);

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayDame = daysOfWeek[dayOfWeek - 1];

      if (attendance.present) {
        attendanceMap[dayDame].present += 1;
      } else {
        attendanceMap[dayDame].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    today: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <Card className="flex flex-col p-4 w-full h-full border-none">
      <CardHeader className="flex flex-row justify-between items-center p-0">
        <CardTitle>Attendances</CardTitle>
        <CardDescription>
          <Ellipsis className="w-6 h-6" />
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full h-full p-0">
        <AttendaceChartContainer data={data} />
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
  );
}

export default AttendanceChart;
