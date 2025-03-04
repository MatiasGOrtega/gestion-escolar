import CardCharacteristic from "@/components/CardCharacteristic";
import Link from "next/link";
import CardTeacherInfo from "@/components/teacher/CardTeacherInfo";
import { buttonVariants } from "@/components/ui/button";
import Performance from "@/components/admin/Performance";
import Announcement from "@/components/Announcement";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { auth } from "@clerk/nextjs/server";
import { getTeacherById } from "@/actions/teacher.action";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const teacher = await getTeacherById(id);

  if (!teacher) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <CardTeacherInfo teacher={teacher} role={role} />
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <CardCharacteristic
              name="Attendance"
              value={"90%"}
              imageLink="/singleClass.png"
            />
            <CardCharacteristic
              name="Grade"
              value={teacher._count.subjects}
              imageLink="/singleBranch.png"
            />
            <CardCharacteristic
              name="Lessons"
              value={teacher._count.lessons}
              imageLink="/singleLesson.png"
            />
            <CardCharacteristic
              name="Classes"
              value={teacher._count.classes}
              imageLink="/singleClass.png"
            />
          </div>
        </div>
        <div className="mt-4 rounded-md p-4 h-[800px]">
          <h1 className="text-xl font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type={"teacherId"} id={teacher.id} />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              href={`/list/classes?supervisorId=${teacher.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-sky-50 shadow hover:bg-sky-200`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              href={`/list/students?teacherId=${teacher.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-purple-50 shadow hover:bg-purple-200`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              href={`/list/lessons?teacherId=${teacher.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-yellow-50 shadow hover:bg-yellow-200`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              href={`/list/exams?teacherId=${teacher.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-pink-50 shadow hover:bg-pink-200`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              href={`/list/assignments?teacherId=${teacher.id}`}
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-sky-50 shadow hover:bg-sky-200`}
            >
              Teacher&apos;s Assignments
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
