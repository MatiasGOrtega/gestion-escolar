import { prisma } from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

interface BigCalendarContainerProps {
  type: "teacherId" | "classId";
  id: string | number | null;
}

async function BigCalendarContainer({ type, id }: BigCalendarContainerProps) {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? {
            teacherId: id as string,
          }
        : {
            classId: id as number,
          }),
    },
  });

  const data = dataRes.map((lesson)=>({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }))

const schedule = adjustScheduleToCurrentWeek(data);

  return <BigCalendar data={schedule} />;
}

export default BigCalendarContainer;
