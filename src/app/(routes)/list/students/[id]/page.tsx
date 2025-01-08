import Performance from "@/components/admin/Performance";
import Announcement from "@/components/Announcement";
import BigCalendar from "@/components/BigCalendar";
import CardStudentInfo from "@/components/student/CardStudentInfo";
import CardCharacteristic from "@/components/teacher/CardCharacteristic";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "lucide-react";

function Page() {
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <CardStudentInfo />
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            <CardCharacteristic
              name="Attendance"
              value={"90%"}
              imageLink="/singleClass.png"
            />
            <CardCharacteristic
              name="Grade"
              value={"6th"}
              imageLink="/singleBranch.png"
            />
            <CardCharacteristic
              name="Lessons"
              value={18}
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
          <BigCalendar />
        </div>
      </div>
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              href="/"
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-sky-50 shadow hover:bg-sky-200`}
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              href="/"
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-purple-50 shadow hover:bg-purple-200`}
            >
              Teacher&apos;s Students
            </Link>
            <Link
              href="/"
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-yellow-50 shadow hover:bg-yellow-200`}
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              href="/"
              className={`${buttonVariants({
                variant: "outline",
              })} p-3 rounded-md bg-pink-50 shadow hover:bg-pink-200`}
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              href="/"
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
