import Performance from "@/components/admin/Performance";
import Announcement from "@/components/Announcement";
import CardStudentInfo from "@/components/student/CardStudentInfo";
import CardCharacteristic from "@/components/CardCharacteristic";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { Class, Student } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { studentAttendancePercentage } from "@/actions/student.action";

type Params = Promise<{ id: string }>;

async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });

  if (!student) {
    return notFound();
  }

  const porcentageAttendance = await studentAttendancePercentage(student.id);

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <CardStudentInfo student={student} role={role} />
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <CardCharacteristic
              name="Attendance"
              value={`${porcentageAttendance || "-"}%`}
              imageLink="/singleClass.png"
            />
            <CardCharacteristic
              name="Grade"
              value={`${student}th`}
              imageLink="/singleBranch.png"
            />
            <CardCharacteristic
              name="Lessons"
              value={student.class._count.lessons}
              imageLink="/singleLesson.png"
            />
            <CardCharacteristic
              name="Class Name"
              value={"6A"}
              imageLink="/singleClass.png"
            />
          </div>
        </div>
        <div className="mt-4 rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type={"classId"} id={student.class.id} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              href={`/list/lessons?classId=${student.class.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} rounded-md bg-sky-50 shadow hover:bg-sky-200`}
            >
              Student&apos;s Lessons
            </Link>
            <Link
              href={`/list/teachers?classId=${student.class.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-purple-50 shadow hover:bg-purple-200`}
            >
              Student&apos;s Teachers
            </Link>
            <Link
              href={`/list/exams?classId=${student.class.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-yellow-50 shadow hover:bg-yellow-200`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              href={`/list/assignments?classId=${student.class.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-pink-50 shadow hover:bg-pink-200`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              href={`/list/results?classId=${student.class.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-sky-50 shadow hover:bg-sky-200`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcement />
      </div>
    </div>
  );
}

export default Page;
