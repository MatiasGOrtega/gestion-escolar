import { prisma } from "@/lib/prisma";
import { Ellipsis } from "lucide-react";

async function UserCard({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };

  const data = await modelMap[type].count();

  return (
    <div className="rounded-2xl odd:bg-purple-200 even:bg-yellow-200 p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2025/26
        </span>
        <Ellipsis className="w-6 h-6" />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}</h2>
    </div>
  );
}

export default UserCard;
